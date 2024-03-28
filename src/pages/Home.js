import React, { useLayoutEffect, useRef, useState } from 'react';
import InView, { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import Cross from '../components/Cross';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import Text from '../components/Text';
import { get } from '../lib/apis';
import { AiOutlinePlus as AddIcon } from 'react-icons/ai';
import Link from '../components/Link';
import webm from '../assets/sample-5s.webm';

const LaterBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 50% 0px;
`;

function LazyCross(props) {
    const {
        author,
        title,
        sources,
        replays,
    } = props;

    const crossRef = useRef();

    const scrollEl = document.querySelector('#scroll');

    const [autoPlayRef, inAutoPlayView] = useInView({
        root: scrollEl,
        rootMargin: '-30% 0% -70% 0%',
    });

    useLayoutEffect(() => {
        const video = crossRef.current;

        if (inAutoPlayView) {
            video.play();
        } else {
            video.pause();
            video.seekTo(0);
        }
    }, [inAutoPlayView]);

    return (
        <Cross
            ref={crossRef}
            containerRef={autoPlayRef}
            author={author}
            title={title}
            sources={sources}
            replays={replays}
        />
    );
}

function Home() {
    const [crosses, setCrosses] = useState([]);
    const [page, setPage] = useState(0);
    const pageSize = 10;
    const [done, setDone] = useState(false);
    const scrollDivRef = useRef();

    async function fetchData(localPage, localPageSize) {
        const { data } = await get(`/crosses?page=${localPage}&size=${localPageSize}`);
        const { results, total } = data;

        if ((page * pageSize) >= total) {
            setDone(true);
        }

        setCrosses(prevCrosses => [...prevCrosses, ...results]);
    }

    async function fetchMore() {
        const nextPage = page === 0
            ? 0
            : page + 1;

        // await fetchData(nextPage, pageSize);
			//
			const clips = 
			[{url: webm, duration: 5, id: 1},
			{url: webm, duration: 5, id: 1},
			]
			const crosses = [...Array(10).keys()].map(i => ({id:i, title: 'Video', replays: 1, clips}));
		

			setCrosses(old => [...old, ...crosses]);
        setPage(prevPage => prevPage + 1);
    }

	console.log('crosses', crosses);

    function handleInViewChange(inView) {
        if (inView) {
            fetchMore();
        }
    }

    useLayoutEffect(() => {
        scrollDivRef.current = document.querySelector('#scroll');
    }, []);

    console.log(crosses);

    return (
        <Layout title='Popular Crosses' actions={(
            <Link to='/crosses/create'>
                <AddIcon style={{ fontSize: 26, color: 'black' }} />
            </Link>
        )}>
            {crosses && crosses.map((cross, index) => (
                <div key={index}>
                    <LazyCross
                        author={cross.user ? cross.user.username : 'anonymous'}
                        title={cross.title}
                        sources={cross.clips.map((clip) => ({
                            id: clip.id,
                            url: clip.url,
                            duration: clip.duration || 5
                        }))}
                        replays={cross.replays}
                    />
                </div>
            ))}
            {done ? (
                <LaterBox>
                    <Text textAlign='center'>
                        That's it for now.
                    </Text>
                    <Text textAlign='center'>
                        Check back later for more!
                    </Text>
                </LaterBox>
            ) : (
                <InView
                    root={scrollDivRef.current}
                    onChange={handleInViewChange}>
                    <Loading />
                </InView>
            )}
        </Layout>
    );
}

export default Home;
