import styled from 'styled-components';

const StyledErrorMessage = styled.span`
    width: 100%;
    height: 50px;
    color: red;
`;

function ErrorMessage(props) {
    const { children } = props;

    if (!children) return null;

    return <StyledErrorMessage>{children}</StyledErrorMessage>
}

export default ErrorMessage;