import { useState } from "react";
import { Link } from "react-router-dom";
import { useSetUser } from "../../hooks";

const SERVER_URL = process.env.REACT_APP_SERVER_URL


const Login = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const setUser = useSetUser();

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        const res = await fetch(SERVER_URL + '/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
          })

          if( res.ok ) {
            const data = await res.json();
            setUser({ data: data.user, token: data.authorisation.token });
          } else if( res.status === 422) {
              console.log('Invalid format');
          } else {
              console.log('Unauthorized');
          }
    };

    return (
        <>
            <form onSubmit={ handleSubmit }>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={ email } onChange={ e => setEmail( e.target.value ) } />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={ password } onChange={ e => setPassword( e.target.value ) } />
                <button className="login-button">Login</button>
            </form>
            <span>Not registered?</span>
            <Link to="/register" >Register now</Link>
        </>
    );
};

export default Login;