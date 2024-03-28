import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

function Loading(props) {
    const { size = 'default', color = 'black' } = props;
    return (
        <Box>
            <ReactLoading type='balls' color={color} />
        </Box>
    );
}

export default Loading;