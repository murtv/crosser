import { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:8080';

export function get(path, options) {
    return () => fetch(baseUrl + path, options);
}

export function post(path, data, options) {
    return () => fetch(baseUrl + path, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

export function del(path, options) {
    return () => fetch(baseUrl + path, {
        ...options,
        method: 'DELETE'
    });
}

function useApi(request, deps = []) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    async function fetchData() {
        try {
            setLoading(true);
            const result = await request();
            const data = await result.json();
            setData(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(error.toString()); // set error from api
        }
    }

    useEffect(() => {
        fetchData();
    }, deps);

    return [data, error, loading];
}

export default useApi;