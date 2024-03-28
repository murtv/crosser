import React from 'react';
import { Link as RRDLink } from 'react-router-dom';

function Link(props) {
    const { children, underline, ...rest } = props;

    return (
        <RRDLink {...rest} style={{
            textDecoration: underline ? 'underline' : 'none',
            color: underline ? 'black' : 'inherit'
        }}>
            {children}
        </RRDLink>
    );
}

export default Link;
