import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetModal, useUser } from "../../hooks";
import "./Register.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const Register = () => {

    const user = useUser();
    const navigate = useNavigate();
    const setModal = useSetModal();


    if( user ) {
        navigate('/');
    }

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
          const res = await fetch(SERVER_URL + '/register', {
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ name, email, password }),
          });

          if( res.ok ) {
            setModal( <p>User registered</p> );
            navigate('/');

          } else {
            const { message } = await res.json();
            setModal( <p>{ message }</p> );
          }

        } catch ( error ) {
          setModal( <p>{ error.message }</p> );
        }
    };

    return (
        <main className="register-main">
            <form className="register-form" onSubmit={ handleSubmit }>
                <label htmlFor="register-name">Name</label>
                <input id="register-name" type="text" name="name" value={ name } onChange={ e => setName( e.target.value ) } />
                <label htmlFor="register-email">Email</label>
                <input id="register-email" type="email" name="email" value={ email } onChange={ e => setEmail( e.target.value ) } />
                <label htmlFor="password">Password</label>
                <input id="register-password" type="password" name="password" value={ password } onChange={ e => setPassword( e.target.value ) } />
                <label htmlFor="register-confirm-password">Confirm Password</label>
                <input id="register-confirm-password" type="password" name="confirm-password" value={ confirmPassword } onChange={ e => setConfirmPassword( e.target.value ) } />
                <button className="register-button">Register</button>
            </form>
            <div className="already-registered">
                <span>Already registered?</span>
                <Link to="/" >Log in</Link>
            </div>
        </main>
    );
};

export default Register;