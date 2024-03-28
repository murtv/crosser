import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Field from '../components/Field';
import Spacing from '../components/Spacing';
import Cross from '../components/Cross';
import Layout from '../components/Layout';
import api from '../lib/api';
import { useHistory } from 'react-router';
import { localState } from '../lib/localState';
import { FiUpload as UploadIcon } from 'react-icons/fi';
import Link from '../components/Link';

function ClipsPage() {
    const [clips, setClips] = useState();
    const history = useHistory();

    async function fetchClips() {
//        const { data } = await api.get('/clips');
//        setClips(data);
			setClips([
			{url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', duration: 5, id: 1, replays: 1, title: 'Test'}
		]);
    }

    useEffect(() => {
        fetchClips();
    }, []);

    function handleUseClip(id) {
        localState.setState({
            crossClipIds: [...localState.getState().crossClipIds, id]
        });

        history.push('/crosses/create');
    }

    // if (!clips)
      //  return <span>Loading...</span>

    return (
        <Layout title='Popular Clips' actions={(
            <Link to='/clips/upload'>
                <UploadIcon style={{ fontSize: 24, color: 'black' }} />
            </Link>
        )}>
            <div style={{ padding: 12 }}>
                <Field label='Search:' placeholder='Search...' />
            </div>

            <Spacing height={40} />
            {clips.map(clip => (
                <div key={clip.id}>
                    <Cross
                        author={clip.user ? clip.user.username : 'anonymous'}
                        title={clip.title}
                        sources={[{ url: clip.url, duration: clip.duration || 5, id: clip.id }]}
                        replays={clip.replays}
                        header={(
                            <Button
                                primary
                                width='80px'
                                onClick={() => handleUseClip(clip.id)}
                            >
                                Use
                            </Button>
                        )}
                    />
                </div>
            ))}
        </Layout>
    );
}

export default ClipsPage;
