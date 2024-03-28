import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import api from '../lib/api';
import Text from '../components/Text';
import Layout from '../components/Layout';
import Cross from '../components/Cross';
import Spacing from '../components/Spacing';
import ClipPreview from '../components/ClipPreview';

function ViewCross() {
    const { id } = useParams();
    const [cross, setCross] = useState();

    async function fetchCross() {
        const { data } = await api.get(`/crosses/${id}`);
        setCross(data);
    }

    useEffect(() => {
        fetchCross();
    }, []);

    if (!cross) {
        return <Text>Loading...</Text>
    }

    const sources = cross.clips.map((clip) => ({
        id: clip.id,
        url: clip.url,
        duration: clip.duration || 5
    }));

    return (
        <Layout title='View Cross'>
            <Cross
                sources={sources}
                author={cross.user ? cross.user.username : 'anonymous'}
                title={cross.title}
                replays={cross.replays} />

            <Spacing height={40} />
            <span style={{ fontWeight: 600, fontSize: 21, marginLeft: 12, }}>Clips Used</span>
            <Spacing height={10} />
            {cross.clips.map(clip => (
                <div key={clip.id} style={{ padding: 12 }}>
                    <ClipPreview
                        title={clip.title}
                        author={clip.user ? clip.user.username : 'anonymous'}
                        thumbnailUrl={clip.thumbnailUrl} />
                </div>
            ))}
        </Layout>
    );
}

export default ViewCross;