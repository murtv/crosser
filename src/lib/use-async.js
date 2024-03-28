import { useEffect, useRef, useState } from "react";

function useAsync(fn, deps) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const isMounted = useRef(false);

    async function fetchData() {
        try {
            setLoading(true);
            const result = await fn();
            setData(result);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (deps) {
            fetchData();
        }
    }, deps || []);

    return [data, error, loading, fetchData];
}

export default useAsync;