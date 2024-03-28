import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const ViewClip = lazy(() => import('../pages/ViewClip'));
const ViewCross = lazy(() => import('../pages/ViewCross'));
const Incubation = lazy(() => import('../pages/Incubation'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const UploadClipPage = lazy(() => import('../pages/UploadClip'));
const CreateCrossPage = lazy(() => import('../pages/CreateCrossPage'));
const ClipsPage = lazy(() => import('../pages/ClipsPage'));
const MyClipsPage = lazy(() => import('../pages/MyClipsPage'));
const MyCrossesPage = lazy(() => import('../pages/MyCrossesPage'));
const VerifyPage = lazy(() => import('../pages/VerifyPage'));

const routes = [
    // { path: '/verify', component: VerifyPage, docTitle: 'Verify' },
    { path: '/login', component: Login, docTitle: 'Login' },
    { path: '/signup', component: Signup, docTitle: 'Sign Up' },
    { path: '/clips', component: ClipsPage, docTitle: 'Clips' },
    { path: '/clips/upload', component: UploadClipPage, docTitle: 'Upload Clip' },
    { path: '/clips/:id', component: ViewClip, docTitle: 'Clip' },
    { path: '/crosses/create', component: CreateCrossPage, docTitle: 'Create Cross' },
    { path: '/crosses/:id', component: ViewCross, docTitle: 'Cross' },
    { path: '/incubation', component: Incubation },
    { path: '/profile', component: ProfilePage, docTitle: 'Profile', protected: true },
    { path: '/profile/crosses', component: MyCrossesPage, docTitle: 'My Crosses', protected: true },
    { path: '/profile/clips', component: MyClipsPage, docTitle: 'My Clips', protected: true },
    { path: '/', component: Home, docTitle: 'Home' },
];

export default routes;