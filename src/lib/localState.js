function setState(obj) {
    try {
        const prevState = getState();
        const newState = { ...prevState, ...obj };
        const string = JSON.stringify(newState);
        localStorage.setItem('local-state', string);
    } catch (error) {
        console.log(error);
    }
}

function getState() {
    try {
        const string = localStorage.getItem('local-state');
        if (!string) return {}
        return JSON.parse(string);
    } catch (error) {
        console.log(error);
    }
}

export const localState = { getState, setState };