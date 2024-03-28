import React from 'react';
import styled from 'styled-components';
import Field from '../components/Field';
import Section from '../components/Section';
import Button from '../components/Button';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import api from '../lib/api';
import { useHistory } from 'react-router-dom';

const Centered = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const FieldsBox = styled.div`
    display: flex;
    margin-top: 2em;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    gap: 10px;
`;

const SaveButton = styled(Button)`
    width: 100%;
    margin-top: 1em;
`;

function CreateClip() {
    const { register, handleSubmit } = useForm();
    const history = useHistory();

    async function onSubmit(data) {
        const { tags, files } = data;
        const file = files[0];

        const formData = new FormData();
        formData.append('tags', tags);
        formData.append('file', file);

        const { data: clip } = await api.post('/clips', formData);

        history.push(`/clips/${clip.id}`);
    }

    return (
        <Layout>
            <Centered>
                <Section title='Upload Clip'>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <FieldsBox>
                            <Field register={register} name='tags' placeholder='Search Tags' />
                            <Field register={register} name='files' placeholder='Clip' type='file' />
                        </FieldsBox>

                        <SaveButton primary type='submit'>Upload</SaveButton>
                    </form>
                </Section>
            </Centered>
        </Layout>
    );
}

export default CreateClip;