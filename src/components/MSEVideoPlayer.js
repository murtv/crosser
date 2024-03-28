import React, { useRef, forwardRef, useImperativeHandle, useLayoutEffect, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import { useInView } from 'react-intersection-observer';

const StyledVideoContainer = styled.div`
    position: relative;
`;

const Overlay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: black;
    width: 100%;
    height: 100%;
    opacity: ${props => props.isHidden ? '0' : '.5'};
    visibility: ${props => props.isHidden ? 'hidden' : 'visible'};
    transition: 0.5s ease-in-out;
`;

const StyledVideo = styled.video`
    border-radius: 12;
`;

function Loading() {
    return (
        <ReactLoading type='balls' color='black' />
    );
}
const mimeType = 'video/webm; codecs="vorbis,vp9"';

class SourceBufferManager {
    constructor(sources, onSourceBufferSetup, onUpdateEnd) {
        this._sources = sources;
        this._onSourceBufferSetup = onSourceBufferSetup;
        this._onUpdateEndCallback = onUpdateEnd;
        this._isUpdating = false;
        this._isFinished = false;
        this._abortController = new AbortController();

        this._setupMediaSource();
    }

    get durationBuffered() {
        return this._mediaSource.duration;
    }

    get isReady() {
        return Boolean(this._mediaSource.sourceBuffers.length);
    }

    _setupMediaSource() {
        this._mediaSource = new MediaSource();
        this._mediaSource.addEventListener('sourceopen', this._onSourceOpen);
    }

    _onSourceOpen = () => {
        if (this._mediaSource.readyState !== 'open') return;
        this._setupSourceBuffer();
    }

    _onUpdateEnd = () => {
        this._isUpdating = false;

        if (!this._sources.length) {
            this._isFinished = true;
            this._mediaSource.endOfStream();
        } else {
            if (this.durationBuffered) {
                this._sourceBuffer.timestampOffset = this.durationBuffered;
            }
        }

        this._onUpdateEndCallback && this._onUpdateEndCallback();
    }

    _setupSourceBuffer() {
        this._isFinished = false;

        this._sourceBuffer = this._mediaSource.addSourceBuffer(mimeType);
        this._sourceBuffer.addEventListener('updateend', this._onUpdateEnd);

        this._onSourceBufferSetup && this._onSourceBufferSetup();
    }

    createObjectURL() {
        return URL.createObjectURL(this._mediaSource);
    }

    async appendNextSource() {
        const nextSource = this._sources.shift();
        if (!nextSource) return;

        this._isUpdating = true;

        const data = await this._fetchData(nextSource.url);
        this._sourceBuffer.appendBuffer(data);
    }

    async _fetchData(url) {
        try {

            const result = await fetch(url, {
                signal: this._abortController.signal
            });

            const buffer = await result.arrayBuffer();
            return new Uint8Array(buffer);
        } catch (error) {
            console.log(error);
        }
    }

    abortFetch() {
        this._abortController.abort();
        this._abortController = new AbortController();
    }
}

const MSEVideoPlayer = forwardRef((props, ref) => {
    const { sources, containerRef } = props;
    const [isPrefetched, setPrefetched] = useState(false);

    const videoRef = useRef();
    const videoSourceRef = useRef();

    const [inViewRef, inView] = useInView({
        rootMargin: '0px 0px 1px 0px',
        triggerOnce: true,
    });

    async function prefetchIfNeeded() {
        const videoSource = videoSourceRef.current;

        if (!isPrefetched) {
            videoSource.appendNextSource();
        }
    }

    useImperativeHandle(ref, () => ({
        play: async () => {
            await prefetchIfNeeded();
            videoRef.current.play();
        },
        pause: () => videoRef.current.pause(),
        seekTo: (time) => {
            videoRef.current.currentTime = time;
        },
        prefetch: () => prefetchIfNeeded()
    }), []);

    function onVideoTimeUpdate(event) {
        const videoSource = videoSourceRef.current;

        console.log(event.target.currentTime);

        if (videoSource.isFinished || videoSource.isUpdating) return;

        if (videoSource.durationBuffered - event.target.currentTime < 5) {
            videoSource.appendNextSource();
        }
    }

    const onVideoRef = useCallback((video) => {
        if (!video) return;

        videoRef.current = video;
        inViewRef(video);
    }, [inViewRef]);

    useLayoutEffect(() => {
        const video = videoRef.current;

        if (videoSourceRef.current) {
            videoSourceRef.current.abortFetch();
        }

        videoSourceRef.current = new SourceBufferManager(sources, () => {
            inView && prefetchIfNeeded();
        }, () => {
            setPrefetched(true);

            if (videoSourceRef.current.durationBuffered - video.currentTime < 5) {
                videoSourceRef.current.appendNextSource();
            }
        });

        video.src = videoSourceRef.current.createObjectURL();
        video.addEventListener('timeupdate', onVideoTimeUpdate);
    }, [sources]);

    useLayoutEffect(() => {
        if (inView && videoSourceRef.current.isReady) {
            prefetchIfNeeded();
        }
    }, [inView]);

    return (
        <StyledVideoContainer ref={containerRef}>
            <Overlay isHidden={isPrefetched}>
                {isPrefetched || <Loading />}
            </Overlay>
            <StyledVideo
                ref={onVideoRef}
                controls
                muted
                loop
                width='100%'
            />
        </StyledVideoContainer>
    );
});

export default MSEVideoPlayer;