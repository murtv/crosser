import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import Field from '../components/Field';
import Link from '../components/Link';
import Spacing from '../components/Spacing';
import Text from '../components/Text';
import { signUp } from '../lib/apis';
import { useUser } from '../lib/user-context';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    justify-content: center;
    width: 100%;
    align-items: center;
    margin-top: 15vh;
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

function SignupPage() {
    const [user, loading] = useUser();
    const history = useHistory();
    const [error, setError] = useState('');

    const { register, handleSubmit } = useForm();

    async function onSubmit(values) {
        const { email, username, password } = values;
        try {
            await signUp(username, email, password);
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
                fontWeight={400}
                textAlign='center'>
                Crosser.
            </Text>

            <BorderBox>
                <Text
                    fontSize='32px'
                    fontWeight={400}
                    textAlign='center'>
                    Signup
                </Text>
                <Spacing height={12} />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Field
                        ref={register}
                        label='Username:'
                        name='username'
                        placeholder='Username'
                    />
                    <Spacing height={12} />
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
                    <Spacing height={20} />
                    <span style={{ width: '100%', textAlign: 'center', color: 'red' }}>{error}</span>
                    <SignupButton primary type='submit'>
                        Signup
                    </SignupButton>
                </Form>

                <Spacing height={20} />
                <Link to='/login' underline> or login </Link>
            </BorderBox>
        </Container>
    );
}

export default SignupPage;