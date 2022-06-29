import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSetModal, useUser } from "../../hooks";
import { validateEmail, validateName, validatePassword } from "../../utils/validateData";
import "./NewUserForm.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;


const NewUserForm = () => {

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
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const validateData = () => {
        if( !validateName( name ) ) {
            setErrorText( 'Name must have between 2 and 50 letters' );
            setErrorType( 'name' );
            document.getElementById( 'register-name' ).focus();
            return false;
        }

        if( !validateEmail( email ) ) {
            setErrorText( 'Invalid email format' );
            setErrorType( 'email' );
            document.getElementById( 'register-email' ).focus();
            return false;
        }

        if( !validatePassword( password ) ) {
            setErrorText( 'Password must have between 8 and 12 characters' );
            setErrorType( 'password' );
            document.getElementById( 'register-password' ).focus();
            return false;
        }

        if( password !== confirmPassword ) {
            setErrorText( 'Passwords do not match' );
            setErrorType( 'password' );
            document.getElementById( 'register-password' ).focus();
            return false;
        }

        return true;
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        if ( !validateData() ) return;

        try {
          const res = await fetch(SERVER_URL + '/users', {
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user?.token,
              },
            body: JSON.stringify({ name, email, password }),
          });

          if( res.ok ) {
            setModal( <p>User created</p> );
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
            <form className="create-user-form" onSubmit={ handleSubmit }>
                <label htmlFor="creaute-user-name">Name</label>
                <input id="create-user-name" type="text" name="name" value={ name }
                  onChange={ ( e ) => {
                    setName( e.target.value );
                    setErrorType('');
                  }}
                />
                { errorType === 'name' && <p className='error-text'>{ errorText }</p> }
                <label htmlFor="create-user-email">Email</label>
                <input id="create-user-email" type="email" name="email" value={ email }
                  onChange={ ( e ) => {
                    setEmail( e.target.value);
                    setErrorType('');
                  }}
                />
                { errorType === 'email' && <p className='error-text'>{ errorText }</p> }
                <label htmlFor="password">Password</label>
                <input id="create-user-password" type="password" name="password" value={ password }
                  onChange={ ( e ) => {
                    setPassword( e.target.value );
                    setErrorType('');
                  }}
                />
                { errorType === 'password' && <p className='error-text'>{ errorText }</p> }
                <label htmlFor="create-user-confirm-password">
                    Confirm Password
                    <span className='check-emoji'>{ password ? ( password === confirmPassword ) ? ' ✅' : ' ❌' : '' }
                    </span>
                  </label>
                <input id="create-user-confirm-password" type="password" name="confirm-password" value={ confirmPassword }
                  onChange={ e => setConfirmPassword( e.target.value ) }
                />
                <button className="create-user-button">Create user</button>
            </form>
    );
};

export default NewUserForm;