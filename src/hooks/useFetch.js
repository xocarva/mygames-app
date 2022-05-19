import { useEffect, useState } from "react";
import useUser from "./useUser";

const useFetch = ( url, defaultValue = null ) => {

    const user = useUser();

    const [ status, setStatus ] = useState( null );
    const [ data, setData ] = useState( defaultValue );
    const [ error, setError ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( false );

    useEffect(() => {

        const loadData = async () => {

            const opts = {
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }

            }

            if (user?.token) {
              opts.headers = {
                'Authorization': 'Bearer ' + user.token,
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                }
            }

            setIsLoading( true );
            const response = await fetch( url, opts );
            const json = await response.json();


            if ( response && !response.ok ) {
                setError( json.error );
                setIsLoading( false );
                return;
            };

            setStatus( json.status );
            setData( json.data );
            setIsLoading( false );
        };

        loadData();

    }, [ url, user?.token ] );

    return { status, data, error, isLoading };
};

export default useFetch;
