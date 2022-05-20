import { useEffect, useState } from "react";
import useUser from "./useUser";

const useFetch = ( url, defaultValue = null ) => {

    const user = useUser();

    const [ status, setStatus ] = useState( null );
    const [ data, setData ] = useState( defaultValue );
    const [ error, setError ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ meta, setMeta ] = useState( null );
    const [ links, setLinks ] = useState( null );


    useEffect(() => {

        const loadData = async () => {

            const opts = {}

            if ( user?.token ) {
              opts.headers = {
                'Authorization': 'Bearer ' + user.token,
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
            setMeta( json.meta );
            setLinks( json.links );
            setIsLoading( false );
        };

        loadData();

    }, [ url, user?.token ] );

    return { status, data, error, isLoading, meta, links };
};

export default useFetch;
