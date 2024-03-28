import { useMemo, useState } from 'react';
import { localState } from './localState';

export function useLocalState(key) {
    const [state, setState] =
        useState(() => localState.getState()[key]);

    function setLocalState(newState) {
        if (typeof newState === 'function') {
            setState(prevState => {
                const nextState = newState(prevState);
                localState.setState({ [key]: nextState });
                return nextState;
            });
            return;
        }

        localState.setState({ [key]: newState });
        setState(newState);
    }

    return [state, setLocalState];
}