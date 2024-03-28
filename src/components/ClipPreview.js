import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const Box = styled.div`
    display: flex;
    height: 120px;
    border: 1px solid black;
    border-radius: 12px;
    background-color: white;
`;

const Details = styled.div`
    padding-top: 8px;
    padding-left: 12px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const Thumbnail = styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 8px;
    padding: 4px;
    border-radius: 12px;
`;

function ClipPreview(props) {
    const { thumbnailUrl, title, author, onRemove } = props;

    return (
        <Box>
            <Thumbnail src={thumbnailUrl} />
            <Details>
                <span style={{ fontWeight: 600, fontSize: 16 }}>@{author}</span>
                <span style={{ fontSize: 18 }}>{title}</span>
            </Details>
            {onRemove && (
                <div style={{ padding: 12 }}>
                    <Button onClick={onRemove}>Remove</Button>
                </div>
            )}
        </Box>
    );
}

export default ClipPreview;