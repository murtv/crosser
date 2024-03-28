import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import Field from '../components/Field';
import Link from '../components/Link';
import Spacing from '../components/Spacing';
import Text from '../components/Text';
import { signIn } from '../lib/apis';
import { useUser } from '../lib/user-context';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    align-items: center;
    max-width: 400px;
    width: auto;
    margin-top: 2em;
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2em;
    box-shadow: 0px 0px 1px 1px lightgrey;
    border-radius: 8px;
    margin-top: 1em;
    width: 100%;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const LoginButton = styled(Button)`
    margin-top: 1em;
    width: 100%;
`;

function Login() {
    const history = useHistory();

    const [user] = useUser();

    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    async function onSubmit(values) {
        const { email, password } = values;
        try {
            await signIn(email, password);
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }

    useEffect(() => {
        if (user) {
            history.replace('/profile');
        }
    }, [user]);

    return (
        <Container>
            <Text
                fontSize='48px'
                textAlign='center'>
                Crosser.
            </Text>

            <Box>
                <Text
                    fontSize='32px'
                    textAlign='center'>
                    Login
                </Text>
                <Spacing height={12} />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Field
                        ref={register}
                        label='Email:'
                        name='email'
                        placeholder='Email'
                    />
                    <Spacing height={12} />
                    <Field
                        ref={register}
                        label='Password:'
                        name='password'
                        placeholder='Password'
                        type='password'
                    />
                    <Spacing height={10} />

                    <ErrorMessage>{error}</ErrorMessage>

                    <LoginButton primary type='submit'>
                        Login
                    </LoginButton>
                </Form>

                <Spacing height={20} />
                <Link to='/signup' underline> or signup </Link>
            </Box>
        </Container>
    );
}

export default Login;