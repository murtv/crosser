import React from 'react';
import styled from 'styled-components';
import Text from './Text';

const StyledSection = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 600px;
    border: 1px solid lightgrey;
    border-radius: 4px;
    min-width: 400px;
    padding: 1em 2em 2em 2em;
`;

const Title = styled(Text)`
    font-size: 32px;
    flex-shrink: 1;
`;

const SpaceBetween = styled.div`
    display: flex;
    justify-content: space-between;
`;

function Section(props) {
    const { title, actions, children } = props;

    return (
        <StyledSection>
            <SpaceBetween>
                {title && <Title>{title}</Title>}
                {actions}
            </SpaceBetween>
            <div>{children}</div>
        </StyledSection>
    );
}

export default Section;