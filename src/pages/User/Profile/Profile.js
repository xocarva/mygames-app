import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSetModal, useSetUser, useUser } from "../../../hooks";
import { validateEmail, validateName, validatePassword } from "../../../utils/validateData";
import { Loading } from "../../../components";
import "./Profile.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Profile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useUser();
    const setUser = useSetUser();
    const setModal = useSetModal();

    const [ nameHolder, setNameHolder ] = useState('');
    const [ emailHolder, setEmailHolder ] = useState('');

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');


    const [errorType, setErrorType] = useState('');
    const [errorText, setErrorText] = useState('');


    useEffect( () => {
        const loadData = async () => {
            try {
                const res = await fetch(SERVER_URL + `/profile`, {
                    headers: {
                        'Authorization': 'Bearer ' + user?.token,
                    }
                });

                if( !user ){
                    dispatch({ type: 'logout' });
                    setModal( <p>Session expired</p> );
                    navigate( '/' );

                } else if( res.ok ) {
                    const { data:user } = await res.json();

                    setNameHolder( user.name );
                    setEmailHolder( user.email );

                } else if( res.status === 401 ) {
                    dispatch({ type: 'logout' });
                    setModal( <p>Session expired</p> );
                    navigate( '/' );

                } else {
                    const { error } = await res.json();
                    setModal( <p>{ error.message }</p> );
                }


            } catch( error)  {
                setModal( <p>{ error.message }</p> );
            }
        }
        loadData();

    },[ user ]);

    const validateData = () => {
        if( name && !validateName( name ) ) {
            setErrorText( 'Name must have between 2 and 50 letters' );
            setErrorType( 'name' );
            document.getElementById( 'profile-name' ).focus();
            return false;
        }

        if( email && !validateEmail( email ) ) {
            setErrorText( 'Invalid email format' );
            setErrorType( 'email' );
            document.getElementById( 'profile-email' ).focus();
            return false;
        }

        if( password && !validatePassword( password ) ) {
            setErrorText( 'Password must have between 8 and 12 characters' );
            setErrorType( 'password' );
            document.getElementById( 'profile-password' ).focus();
            return false;
        }

        if( password !== confirmPassword ) {
            setErrorText( 'Passwords do not match' );
            setErrorType( 'password' );
            document.getElementById( 'profile-confirm-password' ).focus();
            return false;
        }

        setErrorType( '' );
        return true;
    };

    const handleSubmit = async ( e ) => {

        e.preventDefault();

        if( !validateData() ) return;

        let body = {};
        if( name ) body.name = name;
        if( email ) body.email = email;
        if( password ) body.password = password;

        if( name || email || password ) {

            try {
                const res = await fetch( SERVER_URL + '/profile', {
                    method: 'PATCH',
                    headers: {
                        'Authorization': 'Bearer ' + user.token,
                        Accept:'application/json',
                            'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body),
                });

                if( res.ok ) {
                    const { data:newUser } = await res.json();
                    setName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');

                    setNameHolder( newUser.name );
                    setEmailHolder( newUser.email );

                    setUser({
                        data: {
                            id: user.data.id,
                            name: newUser.name,
                            email: newUser.email,
                            admin: user.data.admin,
                        },
                        token: user.token,
                    });

                } else if ( res.status === 401 ) {
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
        }

    };


    return (
        <main className="profile-main">
            { nameHolder && <h1>My Profile</h1> }
            { !nameHolder && <Loading />}
            { nameHolder &&
                <form className="profile-form" onSubmit={ handleSubmit } >
                <label htmlFor="profile-name">Name</label>
                <input id="profile-name" type="text" placeholder={ nameHolder } value={ name }
                    onChange={ ( e ) => {
                        setName( e.target.value );
                        setErrorType('');
                        setErrorText('');
                    }}
                />
                <label htmlFor="profile-email">Email</label>
                <input id="profile-email" type="email" placeholder={ emailHolder } value={ email }
                    onChange={ ( e ) => {
                        setEmail( e.target.value );
                        setErrorType('');
                        setErrorText('');
                    }}
                />
                <label htmlFor="profile-password">Password</label>
                <input id="profile-password" type="password" placeholder="********" value={ password }
                        onChange={ ( e ) => {
                            setPassword( e.target.value );
                            setErrorType('');
                            setErrorText('');
                        }}
                />
                <label htmlFor="profile-confirm-password">
                    Confirm Password
                    <span className='check-emoji'>{ password ? ( password === confirmPassword ) ? ' ✅' : ' ❌' : '' }
                    </span>
                </label>
                <input id="profile-confirm-password" type="password" placeholder="********" value={ confirmPassword }
                    onChange={ ( e ) => {
                        setConfirmPassword( e.target.value );
                        setErrorType('');
                        setErrorText('');
                    }}
                />
                { errorType && <p className='profile-error-text'>{ errorText }</p> }
                <button className="save-profile">Save</button>
            </form>
            }
        </main>
    );
};

export default Profile;
