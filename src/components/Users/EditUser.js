import { useEffect, useState } from "react";
import { useUser } from "../../hooks";
import Switch from "../Switch/Switch";
import "./EditUser.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const EditUser = ({ id }) => {

    const loggedUser = useUser();

    const loggedAdmin = !!loggedUser?.data?.admin;

    const [ editedUser, setEditedUser ] = useState('');
    const [ nameHolder, setNameHolder ] = useState('');
    const [ emailHolder, setEmailHolder ] = useState('');

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ admin, setAdmin ] = useState( false );

    useEffect( () => {
        const loadData = async () => {
            try {
                const res = await fetch(SERVER_URL + `/users/${ id }`, {
                    headers: {
                        'Authorization': 'Bearer ' + loggedUser?.token
                    }
                })
                const { data:user } = await res.json()

                setEditedUser( user );
                setNameHolder( user.name );
                setEmailHolder( user.email );
                setAdmin( !!user.admin );

            } catch(error) {
                console.log(error);
            }

        }
        loadData();

    },[ id, loggedUser ]);


    const handleSubmit = async ( e ) => {

        e.preventDefault();

        let body = {};
        if( name ) body.name = name;
        if( email ) body.email = email;
        if( password ) body.password = password;

        if( name || email || password ) {

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

            } else {
                const { error } = await res.json();
                console.log(error)
            }
        }

    };

    const handleAdmin = async () => {
        const res = await fetch( SERVER_URL + `/users/${ id }`, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + loggedUser?.token,
                Accept:'application/json',
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({ admin: !admin }),
        });

        if(res.ok) {
            const { data:user } = await res.json();
            console.log(user)
            setAdmin( !! user.admin );
        } else {
            const { error } = await res.json();
            console.log(error)
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
                            <input id="edit-name" type="text" placeholder={ nameHolder } value={ name } onChange={ ( e ) => setName( e.target.value ) }/>
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
                    <button className="save-edit">Save</button>
                </form>
            }
        </div>
    );
};

export default EditUser;
