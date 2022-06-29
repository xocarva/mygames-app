import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../components";
import { useFetch, useSetModal, useUser } from "../../../hooks";
import { validateNameWithNumbers } from "../../../utils/validateData";
import "./NewGameAdminForm.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const NewGameAdminForm = () => {

    const user = useUser();
    const navigate = useNavigate();
    const setModal = useSetModal();
    const dispatch = useDispatch();

    const [errorType, setErrorType] = useState('');
    const [errorText, setErrorText] = useState('');

    const [ title, setTitle ] = useState('');
    const [ genre, setGenre ] = useState('');
    const [ studio, setStudio ] = useState('');

    const { data: genres } = useFetch( SERVER_URL + '/genres');
    const { data: studios, isLoading } = useFetch( SERVER_URL + '/studios');

    const validateData = () => {
        if( !validateNameWithNumbers( title ) ) {
            setErrorText( 'Title must have between 2 and 50 letters' );
            setErrorType( 'title' );
            document.getElementById( 'create-game-admin-title' ).focus();
            return false;
        }

        return true;
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        if ( !validateData() ) return;

        const body = { title, genreId : genre, studioId: studio };

        try {
          const res = await fetch(SERVER_URL + '/games', {
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user?.token,
              },
            body: JSON.stringify( body ),
          });

          if( res.ok ) {
            setModal( <p>Game created</p> );
            navigate(-1);

          } else if( res.status === 401 ) {
            dispatch({ type: 'logout' });
            setModal( <p>Session expired</p> );
            navigate( '/' );

          } else if( res.status === 512 ) {
            setModal( <p>Game already exists</p> );


          } else {
            const { message } = await res.json();
            setModal( <p>{ message }</p> );
          }

        } catch ( error ) {
          setModal( <p>{ error.message }</p> );
        }
    };

    return (
            isLoading ? <Loading />
            : <form className="create-game-admin-form" onSubmit={ handleSubmit }>
                <label htmlFor="creaute-game-admin-title">Title</label>
                <input id="create-game-admin-title" type="text" name="title" value={ title }
                  onChange={ ( e ) => {
                    setTitle( e.target.value );
                    setErrorType('');
                  }}
                />
                { errorType === 'title' && <p className='error-text'>{ errorText }</p> }
                <select value={ genre } onChange={ ( e ) => setGenre( e.target.value ) }>
                            { genres?.map( genre => {
                                return(
                                    <option key={ genre.id } value={ genre.id }>
                                        { genre.name }
                                    </option>
                                )
                            })}
                        </select>
                        <select value={ studio } onChange={ ( e ) => setStudio( e.target.value ) }>
                            { studios?.map( studio => {
                                return(
                                    <option key={ studio.id } value={ studio.id }>
                                        { studio.name }
                                    </option>
                                )
                            })}
                        </select>
                <button className="create-game-admin-button">Create game</button>
            </form>
    );
};

export default NewGameAdminForm;
