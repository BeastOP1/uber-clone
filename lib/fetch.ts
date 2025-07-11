import { useCallback, useEffect, useState } from "react"


export async function fetchApi(url:string, options?: RequestInit) {
    try {
        console.log('Fetch Api Start');

        const response = await fetch(url, options);

        console.log('Fetch Api Response', response.status);

        if(!response.ok){
            new Error( `HTTP  error! status : ${response.status} `);
        }
        console.log('Fetch Api Lat end ');
        
        return await response.json();
    }catch(error){
        console.error("Fetch error", error);
        throw error;
    }
}

export const useFetch = <T>(url:string, options?: RequestInit)=>{
    const [data, setData] = useState<T |null>(null);

    const [loading , setLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);


    const  fetchData = useCallback(async ()=> {
        setLoading(true);
        setError(null);
        try {

            const result = await fetchApi(url, options);
            setData(result.data);
        }catch(error){
                setError((error as Error).message);

        }finally{
            setLoading(false);
        }
    }, [url, options]);


    useEffect(()=>{
        fetchData(); 
    }, [fetchData]);

    return {data, loading, error, refetch: fetchData};

};