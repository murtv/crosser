import React, { forwardRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import MSEVideoPlayer from './MSEVideoPlayer';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top: 1px solid rgba(220, 220, 220, .2);
    border-bottom: 1px solid rgba(220, 220, 220, .2);
    margin-bottom: 30px;
`;

const Header = styled.div`
    display: flex;
    padding: 12px;
    justify-content: space-between;
`;

const HeaderDetails = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 6px;
    padding-right: 6px;
`;

const AuthorText = styled.span`
    font-weight: 600;
    font-size: 16px;
`;

const TitleText = styled.span`
    font-weight: 200;
    font-size: 18px;
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

const FooterText = styled.span`
    padding-left: 20px;
    font-weight: 600;
    font-size: 16px;
`;

const Cross = forwardRef((props, ref) => {
    const {
        sources,
        author,
        title,
        replays,
        header,
        footer,
        containerRef
    } = props;

    return (
        <Root>
            <Header>
                <HeaderDetails>
                    <AuthorText> @{author} </AuthorText>
                    <TitleText> {title} </TitleText>
                </HeaderDetails>

                {header}
            </Header>

            <MSEVideoPlayer
                ref={ref}
                containerRef={containerRef}
                sources={sources} />

            <Footer>
                <FooterText>
                    {`${replays || 0} replays`}
                </FooterText>

                {footer}
            </Footer>
        </Root>
    );
});

export default Cross;