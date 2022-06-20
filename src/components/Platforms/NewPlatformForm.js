import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetModal, useUser } from "../../hooks";
import { validateName } from "../../utils/validateData";
import "./NewPlatformForm.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;


const NewPlatformForm = () => {

    const user = useUser();
    const navigate = useNavigate();
    const setModal = useSetModal();

    const [errorType, setErrorType] = useState('');
    const [errorText, setErrorText] = useState('');

    if( !user ) {
        navigate('/');
    }

    const [ name, setName ] = useState('');

    const validateData = () => {
        if( !validateName( name ) ) {
            setErrorText( 'Name must have between 2 and 50 letters' );
            setErrorType( 'name' );
            document.getElementById( 'create-genre-name' ).focus();
            return false;
        }

        return true;
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        if ( !validateData() ) return;

        try {
          const res = await fetch(SERVER_URL + '/platforms', {
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user?.token,
              },
            body: JSON.stringify({ name }),
          });

          if( res.ok ) {
            setModal( <p>Platform created</p> );
            navigate(-1);

          } else {
            const { message } = await res.json();
            setModal( <p>{ message }</p> );
          }

        } catch ( error ) {
          setModal( <p>{ error.message }</p> );
        }
    };

    return (
            <form className="create-platform-form" onSubmit={ handleSubmit }>
                <label htmlFor="creaute-platform-name">Name</label>
                <input id="create-genre-name" type="text" name="name" value={ name }
                  onChange={ ( e ) => {
                    setName( e.target.value );
                    setErrorType('');
                  }}
                />
                { errorType === 'name' && <p className='error-text'>{ errorText }</p> }
                <button className="create-platform-button">Create genre</button>
            </form>
    );
};

export default NewPlatformForm;