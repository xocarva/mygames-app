import { useEffect, useState } from "react";
import { useSetModal, useUser } from "../../hooks";
import { validateNameWithNumbers } from "../../utils/validateData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./EditStudio.css";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const EditStudio = ({ id, setStudios }) => {

    const loggedUser = useUser();
    const setModal = useSetModal();

    const [ editedStudio, setEditedStudio ] = useState('');
    const [ nameHolder, setNameHolder ] = useState('');

    const [ name, setName ] = useState('');

    const [errorType, setErrorType] = useState('');
    const [errorText, setErrorText] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        const loadData = async () => {
            try {
                const res = await fetch(SERVER_URL + `/studios/${ id }`, {
                    headers: {
                        'Authorization': 'Bearer ' + loggedUser?.token,
                    }
                });

                if( res.ok ) {
                    const { data:genre } = await res.json();

                    setEditedStudio( genre );
                    setNameHolder( genre.name );

                } else if( res.status === 401 ) {
                    dispatch({ type: 'logout' });
                    setModal( <p>Session expired</p> );
                    navigate( '/' );

                } else {
                    const { message } = await res.json();
                    setModal( <p>{ message }</p> );
                }


            } catch( error)  {
                setModal( <p>{ error.message }</p> );
            }
        }
        loadData();

    },[ id, loggedUser ]);

    const validateData = () => {
        if( name && !validateNameWithNumbers( name ) ) {
            setErrorText( 'Name must have between 2 and 50 letters' );
            setErrorType( 'name' );
            document.getElementById( 'edit-name' ).focus();
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

        if( name ) {

            try {
                const res = await fetch( SERVER_URL + `/studios/${ id }`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': 'Bearer ' + loggedUser?.token,
                        Accept:'application/json',
                            'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( body ),
                });

                if( res.ok ) {
                    const { data:studio } = await res.json();
                    setName('');
                    setNameHolder( studio.name );

                    setStudios( currentList => {
                        return currentList.map( s => {
                            return s.id === id ? studio : s;
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

    return (
        <div className="edit-studio">
            { editedStudio &&
                <form className="edit-studio-form" onSubmit={ handleSubmit }>
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
                    </div>
                    { errorType && <p className='error-text'>{ errorText }</p> }
                    <button className="save-edit">Save</button>
                </form>
            }
        </div>
    );
};

export default EditStudio;
