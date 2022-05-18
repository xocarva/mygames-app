import { useState } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL


const Register = () => {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    // const [ passwordConfirm, setPasswordConfirm ] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(SERVER_URL + '/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
              'Content-Type': 'application/json'
            }
          })

          if(res.ok) {
            const data = await res.json();
            console.log(data)
          } else {
              console.log('error');
          }
    };

    return (
        <main>
            <form className="register" onSubmit={ handleSubmit }>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={ name } onChange={ e => setName( e.target.value ) } />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={ email } onChange={ e => setEmail( e.target.value ) } />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={ password } onChange={ e => setPassword( e.target.value ) } />
                <button className="register-button">Login</button>
            </form>
        </main>
    );
};

export default Register;