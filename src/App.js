import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import routes from './lib/routes';
import { UserContext, useUser } from './lib/user-context';
import { localState } from './lib/localState';
import firebase from 'firebase';
// import firebaseConfig from './firebase-config';
import { getProfile } from './lib/apis';
import { Helmet } from 'react-helmet';
import Loading from './components/Loading';

// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

function initLocalState() {
    const state = localState.getState();

    if (!state.crossClipIds) {
        state.crossClipIds = [];
    }

    localState.setState(state);
}

function ProtectedRoute(props) {
    const [user, loading] = useUser();
    const history = useHistory();

    if (loading) return <Loading />;

    if (!user) {
        history.replace('/login');
    }

    return (
        <Route {...props} />
    );
}

function App() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    async function fetchUser(user) {
        const token = await user.getIdToken(true);
        const { data } = await getProfile(token);
        setUser(data);
        setLoading(false);
    }

    async function onAuthStateChanged(user) {
        if (user) {
            await fetchUser(user);
        }
    }

    useEffect(() => {
        initLocalState();

        // firebase
        //    .auth()
        //    .onAuthStateChanged(onAuthStateChanged);
    }, []);

    return (
        <BrowserRouter>
            <UserContext.Provider value={[user, loading]}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        {routes.map((route) =>
                            // route.protected ? (
                            //     <ProtectedRoute key={route.path} exact path={route.path}>
                            //         <Helmet>
                            //             <title>{route.docTitle}</title>
                            //         </Helmet>
                            //         <route.component />
                            //     </ProtectedRoute>
                            // ) : (
                            //     <Route key={route.path} exact path={route.path}>
                            //         <Helmet>
                            //             <title>{route.docTitle}</title>
                            //         </Helmet>
                            //         <route.component />
                            //     </Route>
                            // )
                            <Route key={route.path} exact path={route.path}>
                                <Helmet>
                                    <title>{route.docTitle}</title>
                                </Helmet>
                                <route.component />
                            </Route>
                        )}
                    </Switch>
                </Suspense>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
