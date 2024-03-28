import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Text from '../components/Text';
import Button from '../components/Button';
import { useHistory, useParams } from 'react-router';
import api from '../lib/api';
import { localState } from '../lib/localState';
import Cross from '../components/Cross';

function ViewClip() {
    const { id } = useParams();
    const [clip, setClip] = useState();

    const history = useHistory();

    async function fetchClip(id) {
        const { data } = await api.get(`/clips/${id}`);
        setClip(data);
    }

    useEffect(() => {
        fetchClip(id);
    }, []);

    function handleUseClip() {
        const { crossClipIds } = localState.getState();
        localState.setState({ crossClipIds: [...crossClipIds, clip.id] });
        history.push(`/crosses/create`);
    }

    if (!clip)
        return <Text>Loading...</Text>

    const source = {
        id: clip.id,
        url: clip.url,
        duration: clip.duration || 5
    };

    const UseButton = (
        <Button
            primary
            width='80px'
            onClick={handleUseClip}>
            Use
        </Button>
    );

    return (
        <Layout title='View Clip'>
            <Cross
                sources={[source]}
                author={clip.user ? clip.user.username : 'anonymoud'}
                title={clip.title}
                replays={clip.replays}
                header={UseButton}
            />
        </Layout>
    );
}

export default ViewClip;