import { useState } from "react";
import { Link } from "react-router-dom";
import { useSetModal, useSetUser } from "../../hooks";
import { validateEmail, validatePassword } from "../../utils/validateData";
import "./Login.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const Login = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [errorType, setErrorType] = useState('');
    const [errorText, setErrorText] = useState('');

    const setUser = useSetUser();
    const setModal = useSetModal();

    const validateData = () => {

        if( !validateEmail( email ) ) {
            setErrorText( 'Invalid email format' );
            setErrorType( 'email' );
            document.getElementById( 'login-email' ).focus();
            return false;
        }

        if( !validatePassword( password ) ) {
            setErrorText( 'Password must have between 8 and 12 characters' );
            setErrorType( 'password' );
            document.getElementById( 'login-password' ).focus();
            return false;
        }

        return true;
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        if( !validateData() ) return;

        try {
            const res = await fetch(SERVER_URL + '/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            if( res.ok ) {
                const data = await res.json();
                setUser({ data: data.user, token: data.authorisation.token });
            } else if( res.status === 401 ){
                setModal( <p>Wrong email and / or password</p> );
            } else {
                const { message } = await res.json();
                setModal( <p>{ message }</p> );
            }
        } catch( error ){
            setModal( <p>{ error.message }</p> );
        }
    };

    return (
        <>
            <form className="login-form" onSubmit={ handleSubmit }>
                <label htmlFor="email">Email</label>
                <input id="login-email" type="email" name="email" value={ email }
                  onChange={ ( e ) => {
                    setEmail( e.target.value);
                    setErrorType('');
                  }}
                />
                { errorType === 'email' && <p className='error-text'>{ errorText }</p> }
                <label htmlFor="password">Password</label>
                <input id="login-password" type="password" name="password" value={ password }
                  onChange={ ( e ) => {
                    setPassword( e.target.value);
                    setErrorType('');
                  }}
                />
                { errorType === 'password' && <p className='error-text'>{ errorText }</p> }
                <button className="login-button">Login</button>
            </form>
            <div className="not-registered">
                <span>Not registered?</span>
                <Link to="/register" >Register now</Link>
            </div>
        </>
    );
};

export default Login;