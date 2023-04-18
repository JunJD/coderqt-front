import React from 'react';

// Axios的hooks封装
export default function useAxios<T>(url: string) {
    const [data, setData] = React.useState<T>();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 100);
            });
    }, [url]);

    return { data, loading, error };
}
