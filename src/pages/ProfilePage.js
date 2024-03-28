import React, { useEffect } from 'react';
import styled from 'styled-components';
import Field from '../components/Field';
import Spacing from '../components/Spacing';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { useHistory } from 'react-router';
import { useUser } from '../lib/user-context';
import firebase from 'firebase';
import Text from '../components/Text';

const Box = styled.form`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-bottom: 1px solid rgba(220, 220, 220, .2);
`;

const twitterProfileUrl = 'https://twitter.com/MurtazaVohra8';

function TwitterLink() {
    return (
        <Text>
            Don't like something?
            {' '}
            <a
                target='_blank'
                href={twitterProfileUrl}>
                Let me know
            </a>.
        </Text>
    );
}

function ProfilePage() {
    const [user] = useUser();
    const history = useHistory();

    async function handleSignOut() {
        try {
            await firebase.auth().signOut();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!user) {
            history.replace('/login');
        }
    }, [user]);

    if (!user) return null;

    return (
        <Layout title='Profile'>
            <Box>
                <Field
                    label='Username:'
                    value={user.username}
                    disabled />

                <Spacing height={12} />

                <Field
                    label='Email:'
                    value={user.email}
                    disabled />

                <Spacing height={20} />

                <Button
                    primary
                    onClick={handleSignOut}>
                    Sign out
                </Button>

                <Spacing height={40} />

                <TwitterLink />
            </Box>
        </Layout>
    );
}

export default ProfilePage;