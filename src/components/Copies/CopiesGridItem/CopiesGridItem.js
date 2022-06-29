import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSetModal, useUser } from "../../../hooks";
import "./CopiesGridItem.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const CopiesGridItem = ({ copy, setCopies }) => {

    const user = useUser();
    const dispatch = useDispatch();
    const setModal = useSetModal();
    const navigate = useNavigate();

    const handleEdit = () => {

    };

    const handleDelete = async () => {

        if( window.confirm( 'Delete from  your collection?' ) ) {
            try {
                const res = await fetch( SERVER_URL + `/copies/${ copy.id }`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer' + user?.token,
                    }
                });

                if ( res.ok ) {
                    window.alert( 'Copy deleted from your collection' );
                    setCopies( currentList => {
                        return currentList.filter( c => c.id !== copy.id );
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
            <article className="copies-grid-item" key={ copy.id }>
                <header className="copy-header">
                    <h3 className="copy-title">{ copy.relationships.game.attributes.title }</h3>
                </header>
                <section className="copy-data">
                    <span className="genre">{ copy.relationships.game.relationships.genre.name }</span>
                    <span className="platform">{ copy.relationships.platform.name }</span>
                    <span className="studio">{ copy.relationships.game.relationships.studio.name }</span>
                </section>
                <section className="copy-status">
                    <span className="copy-rating">{ copy.attributes.rating }</span>
                    <span className="copy-completed">{ copy.attributes.completed ? '✅' : '' }</span>
                </section>
                <section className="copy-management">
                    <span onClick={ handleEdit }>✏️</span>
                    <span onClick={ handleDelete }>🗑️</span>
                </section>
            </article>
    );
};

export default CopiesGridItem;
