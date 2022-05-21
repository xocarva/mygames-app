import { useEffect, useState } from "react";
import { useUser } from "../../hooks";
import Loading from "../Loading/Loading";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;


const EditUser = ({ id }) => {

    const loggedUser = useUser();

    const [ editedUser, setEditedUser ] = useState('');
    const [ newData, setNewData ] = useState('');

    useEffect( () => {
        const loadData = async () => {
            try {
                const res = await fetch(SERVER_URL + `/users/${ id }`, {
                    headers: {
                        'Authorization': 'Bearer ' + loggedUser?.token
                    }
                })
                const { data } = await res.json()
                setEditedUser(data)
            } catch(error) {
                console.log(error);
            }

        }
        loadData();

    },[ loggedUser, newData, id ]);

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');


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
                setNewData(user)

                console.log(user)

            } else {
                const { error } = await res.json();
                console.log(error)
            }
        }

    };

    return (
        <main>
            { !editedUser && <Loading /> }
            { editedUser &&
                <>
                    <h4>edit user {id}</h4>
                    <form className="edit-user" onSubmit={ handleSubmit }>
                        <label htmlFor="edit-name">Name</label>
                        <input id="edit-name" type="text" placeholder={ editedUser.name } value={ name } onChange={ ( e ) => setName( e.target.value ) }/>
                        <label htmlFor="edit-email">Email</label>
                        <input id="edit-email" type="email" placeholder={ editedUser.email } value={ email } onChange={ ( e ) => setEmail( e.target.value ) }/>
                        <label htmlFor="edit-password">Password</label>
                        <input id="edit-password" type="password" placeholder="********" value={ password } onChange={ ( e ) => setPassword( e.target.value ) }/>
                        <button className="save-edit">Save</button>
                    </form>
                </>
            }
        </main>
    );
};

export default EditUser;
