import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSetModal, useUser } from "../../hooks";
import EditPlatform from "./EditPlatform";
import "./PlatformGridItem.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const PlatformGridItem = ({ platform, setPlatforms }) => {

    const setModal= useSetModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedUser = useUser();

    const [ showEdit, setShowEdit ] = useState( false );

    const handleDelete = async () => {

        if( window.confirm( 'Delete platform?' ) ) {
            try {
                const res = await fetch( SERVER_URL + `/platforms/${ platform.id }`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer' + loggedUser?.token,
                    }
                });

                if ( res.ok ) {
                    window.alert( 'Platform deleted' );
                    setPlatforms( currentList => {
                        return currentList.filter( p => p.id !== platform.id );
                    });

                } else if( res.status === 401 ) {
                    dispatch({ type: 'logout' });
                    setModal( <p>Session expired</p> );
                    navigate( '/' );

                } else {
                    setModal( <p>{ res.message }</p> );
                }

            } catch (error) {
                setModal( <p>{ error.message }</p> );
            }
        }

    };

    return (
        <>
            <article className="platforms-grid-item" key={ platform.id }>
                <section className="platforms-grid-item-data">
                    <h4>{ platform.name }</h4>
                    <div className="platform-options">
                        <span className="edit-platform-button" title="Edit" onClick={ () => { setShowEdit( !showEdit ) }}>✏️</span>
                        <span className="delete-platform-button" title="Delete" onClick={ handleDelete }>🗑️</span>
                    </div>
                </section>
                { showEdit &&
                    <EditPlatform id={ platform.id } setPlatforms={ setPlatforms } />
                }
            </article>

        </>

    );

};

export default PlatformGridItem;
