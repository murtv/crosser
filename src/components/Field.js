import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import Spacing from './Spacing';

const Container = styled.div`
    background-color: white;
    display: flex;
    width: 100%;
    align-items: center;
    box-shadow: ${props => props.focused ? '0px 0px 2px 2px lightgrey' : '0px 0px 1px 1px lightgrey'};
    height: 40px;
    border-radius: 4px;
    transition: 0.1s ease-in;
    :hover {
        box-shadow: ${props => props.disabled ? '0px 0px 1px 1px lightgrey' : '0px 0px 2px 2px lightgrey'};
    }
`;

const StyledInput = styled.input`
    padding: 4px 4px 4px 8px;
    color: black;
    border: none;
    width: 100%;
    background-color: white;
    font-family: OpenSans;
    :focus {
        outline: none;
    }
`;

const Label = styled.span`
    font-weight: 600;
    font-size: 18;
`;

const Field = forwardRef((props, ref) => {
    const [focused, setFocused] = useState(false);
    const { label, type, disabled, ...rest } = props;

    function handleFocus() {
        setFocused(true);
    }

    function handleBlur() {
        setFocused(false);
    }

    return (
        <div>
            <Label>{label}</Label>
            <Spacing height={4} />
            <Container focused={focused} disabled={disabled}>
                <StyledInput
                    disabled={disabled}
                    {...rest}
                    ref={ref}
                    type={type || 'text'}
                    onFocus={handleFocus}
                    onBlur={handleBlur} />
            </Container>
        </div>
    );
});

export default Field;