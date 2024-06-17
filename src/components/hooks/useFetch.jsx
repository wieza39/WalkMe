import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const data = await response.json();
             //   console.log('Fetched data:', data); // Debug log
                setData(data);
                setIsPending(false);
            } catch (error) {
                setIsPending(false);
                setError(error.message);
            }
        };

        fetchData()
            .catch(error => {
                console.error('Error in fetchData:', error);
            });
    }, [url]);

    return { data, isPending, error };
};

export default useFetch;
