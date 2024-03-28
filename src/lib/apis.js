import firebase from 'firebase';

const baseURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://api.projectone.uk';

export function toFormData(obj) {
    const formData = new FormData();
    Object.keys(obj)
        .forEach(key => {
            formData.append(key, obj[key])
        });
    return formData;
}

async function convertResult(result) {
    if (result.headers['Content-Type'] = 'application/json') {
        const json = await result.json();
        return { code: result.status, data: json };
    }
    return { code: result.status, data: result.body };
}

export async function get(path, options) {
    const result = await fetch(baseURL + path, options);
    return convertResult(result);
}

export async function post(path, obj, options = {}) {
    options['method'] = 'POST';
    if (obj) {
        if (obj instanceof FormData) {
            options['body'] = obj;
        } else {
            options['headers'] = { 'Content-Type': 'application/json' };
            options['body'] = JSON.stringify(obj);
        }
    }

    const result = await fetch(baseURL + path, options);
    return convertResult(result);
}

export async function signUp(username, email, password) {
    const result = await post('/users', {
        username,
        email,
        password
    });

    const token = result.data.token;

    return firebase.auth()
        .signInWithCustomToken(token);
}

export function signIn(email, password) {
    return firebase.auth()
        .signInWithEmailAndPassword(email, password);
}

export async function getProfile(token) {
    return get('/users/me', {
        headers: {
            'Authorization': token
        }
    });
}

export async function uploadClip(values) {
    return post('/clips', toFormData(values));
}

export async function createCross(cross) {
    return post('/crosses', cross);
}