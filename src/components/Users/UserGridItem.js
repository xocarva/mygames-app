import { useState } from "react";
import { useSetModal, useUser } from "../../hooks";
import EditUser from "./EditUser";
import "./UserGridItem.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UserGridItem = ({ user, setUsers }) => {

    const setModal= useSetModal();

    const loggedUser = useUser();

    const [ showEdit, setShowEdit ] = useState( false );

    const handleDelete = async () => {
        try {
            const res = await fetch( SERVER_URL + `/users/${ user.id }`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer' + loggedUser?.token,
                }
            });

            if ( res.ok ) {
                setModal( <p>User deleted</p> );
                setUsers( currentList => {
                    return currentList.filter( u => u.id !== user.id );
                });
            };

        } catch (error) {
            setModal( <p>{ error.message }</p> );
        }

    };

    return (
        <>
            <article className="users-grid-item" key={ user.id }>
                <section className="users-grid-item-data">
                    <h4>{user.name}</h4>
                    <span>Email: { user.email }</span>
                    <span>Admin: { user.admin ? 'Yes' : 'No' }</span>
                    <div className="user-options">
                        <span className="edit-user-button" title="Edit" onClick={ () => { setShowEdit( !showEdit ) }}>✏️</span>
                        <span className="delete-user-button" title="Delete" onClick={ handleDelete }>🗑️</span>
                    </div>
                </section>
                { showEdit &&
                    <EditUser id={ user.id } setUsers={ setUsers } />
                }
            </article>

        </>

    );

};

export default UserGridItem;
