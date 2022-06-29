import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSetModal, useUser } from "../../hooks";
import EditStudio from "./EditStudio";
import "./StudioGridItem.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const StudioGridItem = ({ studio, setStudios }) => {

    const setModal= useSetModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedUser = useUser();

    const [ showEdit, setShowEdit ] = useState( false );

    const handleDelete = async () => {

        if( window.confirm( 'Delete studio?' ) ) {
            try {
                const res = await fetch( SERVER_URL + `/studios/${ studio.id }`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer' + loggedUser?.token,
                    }
                });

                if ( res.ok ) {
                    window.alert( 'Genre deleted' );
                    setStudios( currentList => {
                        return currentList.filter( s => s.id !== studio.id );
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
            <article className="studios-grid-item" key={ studio.id }>
                <section className="studios-grid-item-data">
                    <h4>{ studio.name }</h4>
                    <div className="studio-options">
                        <span className="edit-studio-button" title="Edit" onClick={ () => { setShowEdit( !showEdit ) }}>✏️</span>
                        <span className="delete-studio-button" title="Delete" onClick={ handleDelete }>🗑️</span>
                    </div>
                </section>
                { showEdit &&
                    <EditStudio id={ studio.id } setStudios={ setStudios } />
                }
            </article>

        </>

    );

};

export default StudioGridItem;
