import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Centered from '../components/Centered';
import Section from '../components/Section';
import api from '../lib/api';
import localState from '../lib/localState';
import Text from '../components/Text';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const Video = styled.video`
    margin-top: 1em;
    border-radius: 8px;
`;

function PickClip() {
    const [clips, setClips] = useState([]);
    const history = useHistory();

    async function fetchClips() {
        const { data } = await api.get('/clips');
        setClips(data);
    }

    useEffect(() => {
        fetchClips();
    }, []);

    function handlePickClip(id) {
        history.push(`/clips/${id}`);
    }

    if (!clips)
        return <Text>Loading...</Text>

    console.log(clips);

    return (
        <Layout>
            <Centered>
                <Section>
                    {clips.map(clip => (
                        <div key={clip.id}>
                            <img
                                width={450}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handlePickClip(clip.id)}
                                src={clip.thumbnailUrl} />
                        </div>
                    ))}
                </Section>
            </Centered>
        </Layout>
    );
}

export default PickClip;