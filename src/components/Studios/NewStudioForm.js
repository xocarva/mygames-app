import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSetModal, useUser } from "../../hooks";
import { validateNameWithNumbers } from "../../utils/validateData";
import "./NewStudioForm.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const NewStudioForm = () => {

    const user = useUser();
    const navigate = useNavigate();
    const setModal = useSetModal();
    const dispatch = useDispatch();

    const [errorType, setErrorType] = useState('');
    const [errorText, setErrorText] = useState('');

    if( !user ) {
        navigate('/');
    }

    const [ name, setName ] = useState('');

    const validateData = () => {
        if( !validateNameWithNumbers( name ) ) {
            setErrorText( 'Name must have between 2 and 50 letters' );
            setErrorType( 'name' );
            document.getElementById( 'create-studio-name' ).focus();
            return false;
        }

        return true;
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        if ( !validateData() ) return;

        try {
          const res = await fetch(SERVER_URL + '/studios', {
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user?.token,
              },
            body: JSON.stringify({ name }),
          });

          if( res.ok ) {
            setModal( <p>Studio created</p> );
            navigate(-1);

          } else if( res.status === 401 ) {

            dispatch({ type: 'logout' });
            setModal( <p>Session expired</p> );
            navigate( '/' );

          } else {
            const { message } = await res.json();
            setModal( <p>{ message }</p> );
          }

        } catch ( error ) {
          setModal( <p>{ error.message }</p> );
        }
    };

    return (
            <form className="create-studio-form" onSubmit={ handleSubmit }>
                <label htmlFor="create-studio-name">Name</label>
                <input id="create-studio-name" type="text" name="name" value={ name }
                  onChange={ ( e ) => {
                    setName( e.target.value );
                    setErrorType('');
                  }}
                />
                { errorType === 'name' && <p className='error-text'>{ errorText }</p> }
                <button className="create-studio-button">Create studio</button>
            </form>
    );
};

export default NewStudioForm;
