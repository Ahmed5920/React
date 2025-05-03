import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);

    const sendRequest = useCallback(async(request,handleData) =>{
        setIsLoading(true);
        setError(null);
        try{
            const response = await fetch(request.url ,{
                method: request.method? request.method : "GET",
                body: request.body? JSON.stringify(request.body) : null,
                headers: request.headers? request.headers: {}
            })
            if(!response.ok){
                throw new Error("request failed");
            }
            const data = await response.json();
            handleData(data);
        } catch(err){
            setError(err.message || "Something Went Wrong");
        }
        setIsLoading(false);
    },[]);

    return{
        isLoading,
        error,
        sendRequest
    }
}
export default useHttp;