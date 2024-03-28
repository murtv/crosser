import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

const webmMimeType = 'video/webm; codecs="vorbis,vp8"';

let count = 0;

function random() {
    return Math.floor(Math.random());
}

const data = [
    {
        url: 'https://projectone-media.s3.eu-west-2.amazonaws.com/8de86c6f-960f-4e59-88ea-03e1b6fca5a3.webm',
        duration: 13,
        id: 0,
    },
    {
        url: 'https://d38cmus8wojvo5.cloudfront.net/b41dc1e2-a739-4ec3-bf56-349d2a2667dd.webm',
        duration: 4.6,
        id: 1
    },
];

function useSourceBuffer(initSources) {
    let { current: sources } = useRef(initSources);
    const [mediaSource, setMediaSource] = useState();
    const [objectURL, setObjectURL] = useState();
    const [ready, setReady] = useState(false);

    function onUpdateEnd() {
        if (sources.length) {
            appendNextSource();
            return;
        }

        mediaSource.endOfStream();
    }

    function replaceSourceBuffer() {
        const sourceBuffer = mediaSource.sourceBuffers[0];
        if (sourceBuffer) {
            mediaSource.removeSourceBuffer(sourceBuffer);
        }

        mediaSource
            .addSourceBuffer(webmMimeType)
            .addEventListener('updateend', onUpdateEnd);

        setReady(true);
    }

    function onSourceOpen() {
        replaceSourceBuffer();
    }

    async function appendNextSource() {
        const sourceBuffer = mediaSource.sourceBuffers[0];

        if (mediaSource.duration) {
            sourceBuffer.timestampOffset = mediaSource.duration;
        }

        const source = sources.shift();
        const result = await fetch(source.url);
        const buffer = await result.arrayBuffer();
        sourceBuffer.appendBuffer(new Uint8Array(buffer));
    }

    useEffect(() => {
        sources = initSources;
        if (!mediaSource) {
            setMediaSource(new MediaSource());
        } else {
            if (mediaSource.readyState !== 'open') return; // replaceSourceBuffer will be called on sourceopen
            setReady(false);
        }
    }, [initSources]);

    useEffect(() => {
        if (!objectURL) return;

        if (!ready) {
            replaceSourceBuffer();
        }
    }, [ready]);

    useEffect(() => {
        if (mediaSource) {
            mediaSource.addEventListener('sourceopen', onSourceOpen);
            setObjectURL(URL.createObjectURL(mediaSource));
        }
    }, [mediaSource]);

    return { appendNextSource, objectURL, ready };
}

function Incubation() {
    const [videos, setVideos] = useState(data);

    const {
        appendNextSource,
        objectURL,
        ready
    } = useSourceBuffer(videos);

    const videoRef = useRef();

    useLayoutEffect(() => {
        const video = videoRef.current;
        if (objectURL) {
            video.src = objectURL;
        }
    }, [objectURL]);

    useLayoutEffect(() => {
        if (ready) {
            appendNextSource();
        }
    }, [ready]);

    function handleShuffle() {
        setVideos(prevVideos => [prevVideos[1], prevVideos[0]]);
    }

    return (
        <div style={{ width: 400, display: 'flex', flexDirection: 'column', }}>
            <video style={{ minWidth: '100%' }} controls ref={videoRef} />
            <button style={{ marginTop: 20 }} onClick={handleShuffle}>shuffle playlist</button>
        </div>
    );
}

export default Incubation;