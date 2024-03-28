import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import api, { toFormData } from '../lib/api';
import Button from '../components/Button';
import Field from '../components/Field';
import Spacing from '../components/Spacing';
import Layout from '../components/Layout';
import { uploadClip } from '../lib/apis';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-bottom: 1px solid rgba(220, 220, 220, .2);
`;

function UploadClipPage() {
    const { register, handleSubmit } = useForm();
    const history = useHistory();

    async function onSubmit(values) {
        const { title, files } = values;
        const file = files[0];

        const { data: clip } =
            await uploadClip({ title, file });

        history.push(`/clips/${clip.id}`);
    }

    return (
        <Layout title='Upload Clip'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Field
                    name='title'
                    label='Title:'
                    placeholder='Title'
                    ref={register} />
                <Spacing height={20} />
                <Field
                    name='files'
                    type='file'
                    label='Video File:'
                    ref={register} />

                <Spacing height={35} />
                <Button primary type='submit'>Upload</Button>
            </Form>
        </Layout >
    );
}

export default UploadClipPage;