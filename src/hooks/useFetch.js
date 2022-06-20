import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSetModal from "./useSetModal";
import useUser from "./useUser";

const useFetch = ( url, method = 'GET', body = null, defaultValue = null ) => {

    const user = useUser();
    const dispatch = useDispatch();
    const setModal = useSetModal();
    const navigate = useNavigate();

    const [ status, setStatus ] = useState( null );
    const [ data, setData ] = useState( defaultValue );
    const [ error, setError ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ meta, setMeta ] = useState( null );
    const [ links, setLinks ] = useState( null );


    useEffect(() => {

        const loadData = async () => {

            const opts = {
                method: method,
                body: body,
            };

            if ( user?.token ) {
              opts.headers = {
                'Authorization': 'Bearer ' + user.token,
                }
            } else opts.headers = {
                Accept:'application/json',
                'Content-Type': 'application/json'
            }

            setIsLoading( true );
            const response = await fetch( url, opts );
            const json = await response.json();


            if ( response.status === 401 ) {
                dispatch({ type: 'logout' });
                setModal( <p>Session expired</p> );
                navigate( '/' );

            } else if ( response && !response.ok ) {
                    setError( json.error );
                    setIsLoading( false );
                    return;
            }

            setStatus( json.status );
            setData( json.data );
            setMeta( json.meta );
            setLinks( json.links );
            setIsLoading( false );
        };

        loadData();

    }, [ url, method, body, user?.token ] );

    return { status, data, error, isLoading, meta, links };
};

export default useFetch;
