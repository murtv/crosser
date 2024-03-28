import styled from 'styled-components';

const Text = styled.span`
    font-family: Open Sans;
    font-size: ${props => props.fontSize};
    font-weight: ${props => props.fontWeight};
    text-align: ${props => props.textAlign};
`;

export default Text;