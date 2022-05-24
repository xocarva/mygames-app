import { useEffect, useState } from "react";
import { useSetModal, useUser } from "../../hooks";
import { Switch } from "../../components";
import { validateName, validateEmail, validatePassword } from "../../utils/validateData";
import "./EditUser.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const EditUser = ({ id, setUsers }) => {

    const loggedUser = useUser();
    const setModal = useSetModal();

    const loggedAdmin = !!loggedUser?.data?.admin;

    const [ editedUser, setEditedUser ] = useState('');
    const [ nameHolder, setNameHolder ] = useState('');
    const [ emailHolder, setEmailHolder ] = useState('');

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ admin, setAdmin ] = useState( false );

    const [errorType, setErrorType] = useState('');
    const [errorText, setErrorText] = useState('');

    useEffect( () => {
        const loadData = async () => {
            try {
                const res = await fetch(SERVER_URL + `/users/${ id }`, {
                    headers: {
                        'Authorization': 'Bearer ' + loggedUser?.token,
                    }
                });

                const { data:user } = await res.json();

                setEditedUser( user );
                setNameHolder( user.name );
                setEmailHolder( user.email );
                setAdmin( !!user.admin );

            } catch( error)  {
                setModal( <p>{ error.message }</p> );
            }
        }
        loadData();

    },[ id, loggedUser, setModal ]);

    const validateData = () => {
        if( name && !validateName( name ) ) {
            setErrorText( 'Name must have between 2 and 50 letters' );
            setErrorType( 'name' );
            document.getElementById( 'edit-name' ).focus();
            return false;
        }

        if( email && !validateEmail( email ) ) {
            setErrorText( 'Invalid email format' );
            setErrorType( 'email' );
            document.getElementById( 'edit-email' ).focus();
            return false;
        }

        if( password && !validatePassword( password ) ) {
            setErrorText( 'Password must have between 8 and 12 characters' );
            setErrorType( 'password' );
            document.getElementById( 'edit-password' ).focus();
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
                const res = await fetch( SERVER_URL + `/users/${ id }`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': 'Bearer ' + loggedUser?.token,
                        Accept:'application/json',
                            'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body),
                });

                if( res.ok ) {
                    const { data:user } = await res.json();
                    setName('');
                    setEmail('');
                    setPassword('');
                    setNameHolder( user.name );
                    setEmailHolder( user.email );
                    setAdmin( !!user.admin );

                    setUsers( currentList => {
                        return currentList.map( u => {
                            return u.id === id ? user : u;
                        });
                    });

                } else {
                    const { message } = await res.json();
                    setModal( <p>{ message }</p> );
                }
            } catch ( error ) {
                setModal( <p>{ error.message }</p> );
            }
        }

    };

    const handleAdmin = async () => {

        try {
            const res = await fetch( SERVER_URL + `/users/${ id }`, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + loggedUser?.token,
                    Accept:'application/json',
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({ admin: !admin }),
            });

            if( res.ok ) {
                const { data:user } = await res.json();
                console.log(user)
                setAdmin( !! user.admin );
                setUsers( currentList => {
                    return currentList.map( u => {
                        return u.id === id ? user : u;
                    });
                });
            } else {
                const { message } = await res.json();
                setModal( <p>{ message }</p> );
            }
        } catch ( error ) {
            setModal( <p>{ error.message }</p> );
        }

    }

    return (
        <div className="edit-user">
            { editedUser && loggedAdmin &&
                <div className="edit-admin">
                    <span>Admin</span>
                    <Switch value={ admin } onClick={ handleAdmin } />
                </div>
            }
            { editedUser &&
                <form className="edit-user-form" onSubmit={ handleSubmit }>
                    <div className="form-inputs">
                        <label htmlFor="edit-name">
                            Name
                            <input id="edit-name" type="text" placeholder={ nameHolder } value={ name }
                                onChange={ ( e ) => {
                                    setName( e.target.value );
                                    setErrorType('');
                                }}
                            />
                        </label>
                        <label htmlFor="edit-email">
                            Email
                            <input id="edit-email" type="email" placeholder={ emailHolder } value={ email } onChange={ ( e ) => setEmail( e.target.value ) }/>
                        </label>
                        <label htmlFor="edit-password">
                            Password
                            <input id="edit-password" type="password" placeholder="********" value={ password } onChange={ ( e ) => setPassword( e.target.value ) }/>
                        </label>
                    </div>
                    { errorType && <p className='error-text'>{ errorText }</p> }
                    <button className="save-edit">Save</button>
                </form>
            }
        </div>
    );
};

export default EditUser;
