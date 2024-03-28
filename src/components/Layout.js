import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Link from './Link';
import { FaBars as BarsIcon } from 'react-icons/fa';
import Spacing from './Spacing';
import { useClickAway } from 'use-click-away';
import ReactLoading from 'react-loading';

const RootBox = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
`;

const StyledSidebar = styled.div`
    background-color: white;
    z-index: 999;
    position: fixed;
    height: 100%;
    width: 264px;
    min-width: 264px;
    flex-grow: 1;
    box-shadow: 0px 0px 1px 1px lightgrey;
    transition: 0.3s ease-in-out;
    transform: ${props => props.mobileOpen && 'translateX(0px)'};
    @media (max-width: 620px) {
        transform: ${props => props.mobileOpen || 'translateX(-264px)'};
    }   
`;

const SidebarContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SidebarMenu = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const SidebarItem = styled.span`
    font-size: 21px;
    margin-top: 1em;
    transition: 0.1s linear;
    :hover {
        color: grey;
    }
`;

const Logo = styled.span`
    font-size: 32px;
    margin-top: 2em;
`;

const PageHeaderLeftBox = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
`;

const Page = styled.div`
    width: 640px;
    min-height: 100vh;
    height: fit-content;
    background-color: white;
    box-shadow: 0px 0px 2px 1px lightgrey;
`;

const StyledAppbar = styled.div`
    height: 64px;
`;

const AppbarBox = styled.div`
    display: flex;
    align-items: center;
    margin: 1em;
`;

const AppbarTitle = styled.span`
    font-size: 32px;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    overflow-y: auto;
    background-color: #F8F8FF;
    width: 100%;
    min-height: 100vh;
    margin-left: 264px;
    transition: 0.3s ease-in-out;
    @media (max-width: 620px) {
        margin-left: 0px;
    }
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    width: 100%;
`;

function Loading() {
    return (
        <LoadingContainer>
            <ReactLoading type='balls' color='black' />
        </LoadingContainer>
    );
}

const sidebarMenuItems = [
    { title: 'Crosses', route: '/' },
    { title: 'Clips', route: '/clips' },
    { title: 'Profile', route: '/profile' },
];

function Sidebar(props) {
    const { mobileOpen, onClickAway } = props;
    const clickRef = useRef();

    useClickAway(clickRef, onClickAway);

    return (
        <StyledSidebar mobileOpen={mobileOpen} ref={clickRef}>
            <SidebarContent>
                <Logo>
                    <Link to='/'>
                        Crosser
                    </Link>
                </Logo>

                <SidebarMenu>
                    {sidebarMenuItems.map((item) => (
                        <SidebarItem key={item.route}>
                            <Link to={item.route}>
                                {item.title}
                            </Link>
                        </SidebarItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </StyledSidebar>
    );
}

function PageHeader(props) {
    const { title, isMobile, onMobileMenuClick, actions } = props;

    return (
        <StyledAppbar>
            <AppbarBox>
                <PageHeaderLeftBox>
                    {isMobile && (
                        <BarsIcon onClick={onMobileMenuClick} />
                    )}
                    <Spacing width={12} />
                    <AppbarTitle>{title}</AppbarTitle>
                </PageHeaderLeftBox>
                {actions}
            </AppbarBox>
        </StyledAppbar>
    );
}

function Layout(props) {
    const { title, actions, loading, children } = props;
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [isMobile, setMobile] = useState(false);

    function setupMediaQuery() {
        const mql = window.matchMedia('(max-width: 620px)');

        mql.addEventListener('change', (e) => {
            setMobile(e.matches);
            setMobileSidebarOpen(!e.matches);
        });

        setMobile(mql.matches);
        setMobileSidebarOpen(!mql.matches);
    }

    useEffect(() => {
        setupMediaQuery();
    }, []);

    function openMobileSidebar() {
        setMobileSidebarOpen(true);
    }

    function closeMobileSidebar() {
        setMobileSidebarOpen(false);
    }

    return (
        <RootBox>
            <Sidebar
                mobileOpen={isMobileSidebarOpen}
                onClickAway={closeMobileSidebar} />

            <Container id='scroll'>
                <Page>
                    <PageHeader
                        title={title}
                        isMobile={isMobile}
                        onMobileMenuClick={openMobileSidebar}
                        actions={actions}
                    />
                    {loading ? <Loading /> : children}
                </Page>
            </Container>
        </RootBox>
    );
}

export default Layout;