import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSetModal, useUser } from "../../hooks";
import EditUser from "./EditUser";
import "./UserGridItem.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UserGridItem = ({ user, setUsers }) => {

    const setModal= useSetModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedUser = useUser();

    const [ showEdit, setShowEdit ] = useState( false );

    const handleDelete = async () => {

        if( window.confirm( 'Delete user?' ) ) {
            try {
                const res = await fetch( SERVER_URL + `/users/${ user.id }`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer' + loggedUser?.token,
                    }
                });

                if ( res.ok ) {
                    window.alert( 'User deleted' );
                    setUsers( currentList => {
                        return currentList.filter( u => u.id !== user.id );
                    });

                } else if( res.status === 401 ) {
                    dispatch({ type: 'logout' });
                    setModal( <p>Session expired</p> );
                    navigate( '/' );

                } else {
                    setModal( <p>Something went wrong</p> );
                }

            } catch (error) {
                setModal( <p>{ error.message }</p> );
            }
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
