import React from 'react';
import styled from 'styled-components';
import Loading from './Loading';

const StyledButton = styled.button`
    border: 2px solid black;
    width: ${props => props.width || '100%'};
    text-decoration: none;
    font-family: OpenSans;
    font-size: 16px;
    font-weight: 600;
    height: 40px;
    cursor: pointer;
    background-color: ${props => props.primary ? 'black' : 'white'};
    color: ${props => props.primary ? 'white' : 'black'};
    transition-duration: 0.1s;
    border-radius: 4px;
    :hover {
        background-color: white;
        color: black;
        border: 2px solid black
    }
`;

function Button(props) {
    const { loading, ...rest } = props;
    return (
        <div>
            {/* <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', width: '80%' }}>
                <div style={{ position: 'absolute', height: 40, }}>
                    <Loading color='white' size='small' />
                </div>
            </div> */}
            <StyledButton loading={loading} {...rest} />
        </div>
    );
}

export default Button;