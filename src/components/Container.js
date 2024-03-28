import styled from "styled-components";

const StyledContainer = styled.div`
    display: flex;
    justify-content: ${props => props.align};
`;

const flexPropsMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end'
};

const Container = props => (
    <StyledContainer
        align={flexPropsMap[props.align]}
        children={props.children} />
);

export default Container;