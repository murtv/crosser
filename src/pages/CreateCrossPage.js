import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import Layout from '../components/Layout';
import Link from '../components/Link';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Field from '../components/Field';
import styled from 'styled-components';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { createCross } from '../lib/apis';
import Text from '../components/Text';
import api from '../lib/api';
import { useLocalState } from '../lib/hooks';
import MSEVideoPlayer from '../components/MSEVideoPlayer';
import ClipPreview from '../components/ClipPreview';
import { localState } from '../lib/localState';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-bottom: 1px solid rgba(220, 220, 220, .2);
`;

const NoClipsText = styled.span`
    width: 100%;
    text-align: center;
    margin: 40px 0px;
`;

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const Align = styled.div`
    display: flex;
    justify-content: ${props => props.justify};
`;

const Toolbar = styled.div`
    display: flex;
    padding-left: 20px;
    width: 100%;
`;

function DraggableChild(props) {
    const { children, index } = props;

    return (
        <Draggable draggableId={index.toString()} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}>
                    {children}
                </div>)}
        </Draggable>
    );
}

function DragDropList(props) {
    const { data, onReorder, getItem } = props;

    function handleDragEnd(result) {
        if (!result.destination) return; // dropped outside the list

        const newData = reorder(
            data,
            result.source.index,
            result.destination.index
        );

        onReorder(newData);
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{ width: '100%' }}
                    >
                        {data.map((item, index) => (
                            <div key={index}>
                                <DraggableChild index={index}>
                                    {getItem(index)}
                                </DraggableChild>
                            </div>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

function CreateCrossPage() {
    const [clipIds, setClipIds] = useLocalState('crossClipIds');
    const [clips, setClips] = useState([]);
    const { register, handleSubmit } = useForm();

    const crossRef = useRef();
    const history = useHistory();

    async function fetchClips() {
        if (!clipIds) return;

        const results = await Promise.all(
            clipIds.map(
                clipId => api.get(`/clips/${clipId}`)));
        const clipsData = results.map(result => result.data);
        setClips(clipsData);
    }

    useEffect(() => {
        fetchClips();
    }, []);

    // useLayoutEffect(() => {
    //     crossRef.current.play();
    // }, []);

    async function onSubmit(values) {
        const clipIds = clips.map(clip => clip.id);

        const clipsData = clipIds.map((clipId, index) => ({ clipId, order: index }))

        const { data } = await createCross({
            ...values,
            clips: clipsData
        });

        localState.setState({ clipIds: [] });

        history.push(`/crosses/${data.id}`);
    }

    function handleRemove(id) {
        setClipIds(oldClipIds => {
            const newClipIds = [...oldClipIds];
            newClipIds.splice(oldClipIds.indexOf(id), 1);
            return newClipIds;
        });

        setClips(oldClips => {
            const newClips = [...oldClips];
            const clip = oldClips.find(clip => clip.id === id);
            newClips.splice(oldClips.indexOf(clip), 1);
            return newClips;
        })
    }

    const sources = clips.map((clip) => ({
        id: clip.id,
        url: clip.url,
        duration: clip.duration || 5
    }));

    return (
        <Layout title='Create Cross'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Field
                    name='title'
                    label='Title:'
                    placeholder='Title'
                    ref={register}
                />
                {clips.length ? (
                    <div style={{ paddingTop: 12, paddingBottom: 8 }}>
                        <MSEVideoPlayer
                            ref={video => {
                                if (!video) return;
                                video || video.play();
                            }}
                            sources={sources} />
                    </div>
                ) : (
                    <NoClipsText>No clips added.</NoClipsText>
                )}
                <Align justify='flex-end'>
                    <Link to='/clips'>
                        <Button
                            style={{ marginRight: 12, width: 90 }}>
                            Add Clip
                        </Button>
                    </Link>
                    <Button
                        primary
                        width='80px'
                        type='submit'
                        style={{ width: 90 }}>
                        Create
                    </Button>
                </Align>
            </Form>

            {clips.length > 0 && (
                <div>
                    <Toolbar>
                        <Text fontWeight={400} fontSize='24px'>Clips Used</Text>
                    </Toolbar>

                    <DragDropList
                        data={clips}
                        onReorder={(clips) => {
                            setClipIds(clips.map(clip => clip.id));
                            setClips(clips);
                        }}
                        getItem={(index) => {
                            const clip = clips[index];

                            return (
                                <div style={{ padding: 12 }}>
                                    <ClipPreview
                                        thumbnailUrl={clip.thumbnailUrl}
                                        title={clip.title}
                                        author={clip.user ? clip.user.username : 'anonymous'}
                                        onRemove={() => handleRemove(clip.id)} />
                                </div>
                            );
                        }} />
                </div>
            )}
        </Layout>
    );
}

export default CreateCrossPage;