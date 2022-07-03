import { useState } from "react";
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

    const [ rating, setRating ] = useState( copy?.attributes.rating );
    const [ completed, setCompleted ] = useState( copy?.attributes.completed );

    const handleRate = async ( rating ) => {

        let body = {};
        if ( rating ) body.rating = rating;

        try {
            const res = await fetch( SERVER_URL + `/copies/${ copy.id }`, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + user?.token,
                    Accept:'application/json',
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            });

            if( res.ok ) {
                const { data:copy } = await res.json();

                setRating( copy.attributes.rating );

                setCopies( currentList => {
                    return currentList.map( c => {
                        return c.id === copy.id ? copy : c;
                    });
                });

            } else if( res.status === 401 ) {

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
    };

    const handleCompleted = async () => {

        let body = { completed: !completed };

        try {
            const res = await fetch( SERVER_URL + `/copies/${ copy.id }`, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + user?.token,
                    Accept:'application/json',
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify( body ),
            });

            if( res.ok ) {
                const { data:copy } = await res.json();

                setCompleted( copy.attributes.completed );

                setCopies( currentList => {
                    return currentList.map( c => {
                        return c.id === copy.id ? copy : c;
                    });
                });

            } else if( res.status === 401 ) {

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
                    <span title="Genre" className="genre">{ copy.relationships.game.relationships.genre.name }</span>
                    <span title="Platform" className="platform">{ copy.relationships.platform.name }</span>
                    <span title="Studio" className="studio">{ copy.relationships.game.relationships.studio.name }</span>
                </section>
                <section className="copy-status">
                    <div className='rating'>
                        <span>Rating: </span>
                        <span title="Rate" className='rating-stars' onClick={ () => handleRate( 1 ) }>{ rating >= 1 ? '★' : '☆' }</span>
                        <span title="Rate" className='rating-stars' onClick={ () => handleRate( 2 ) }>{ rating >= 2 ? '★' : '☆' }</span>
                        <span title="Rate" className='rating-stars' onClick={ () => handleRate( 3 ) }>{ rating >= 3 ? '★' : '☆' }</span>
                        <span title="Rate" className='rating-stars' onClick={ () => handleRate( 4 ) }>{ rating >= 4 ? '★' : '☆' }</span>
                        <span title="Rate" className='rating-stars' onClick={ () => handleRate( 5 ) }>{ rating >= 5 ? '★' : '☆' }</span>
                    </div>
                    <span title="Check / Uncheck" className="copy-completed" onClick={ handleCompleted }>Completed: { copy.attributes.completed ? '✅' : '❌' }</span>
                </section>
                <section className="copy-management">
                    <span title="Delete" onClick={ handleDelete }>🗑️</span>
                </section>
            </article>
    );
};

export default CopiesGridItem;
