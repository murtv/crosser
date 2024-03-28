import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import Field from '../components/Field';
import Link from '../components/Link';
import Spacing from '../components/Spacing';
import Text from '../components/Text';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    justify-content: center;
    width: 100%;
    align-items: center;
    height: 80vh;
`;

const BorderBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    box-shadow: 0px 0px 1px 1px lightgrey;
    width: 400px;
    border-radius: 8px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(220, 220, 220, .2);
    width: 100%;
`;

const SignupButton = styled(Button)`
    margin-top: 20px;
    width: 100%;
`;


function useSearch() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const obj = {};
    Array.from(params.keys()).forEach(key => {
        obj[key] = params.get(key);
    });
    return obj;
}

function VerifyPage() {
    const [error, setError] = useState('');
    const history = useHistory();
    const { username } = useSearch();

    const { register, handleSubmit } = useForm();

    async function onSubmit(values) {
        const { code } = values;
        try {
            history.push('/profile');
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }

    return (
        <Container>
            <Text
                fontSize='48px'
                fontWeight={400}
                textAlign='center'>
                Crosser.
            </Text>

            <BorderBox>
                <Text
                    fontSize='32px'
                    fontWeight={400}
                    textAlign='center'>
                    Verify
                </Text>
                <Spacing height={12} />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Field
                        ref={register}
                        label='Code:'
                        name='code'
                        placeholder='Code'
                        type='number'
                    />
                    <span style={{ width: '100%', textAlign: 'center', color: 'red' }}>{error}</span>
                    <Spacing height={20} />
                    <SignupButton primary type='submit'>
                        Signup
                    </SignupButton>
                </Form>

                <Spacing height={20} />
                <Link to='/signup' style={{ textDecoration: 'underline black' }}> or go back </Link>
            </BorderBox>
        </Container>
    );
}

export default VerifyPage;