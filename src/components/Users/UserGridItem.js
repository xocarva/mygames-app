import { Link } from "react-router-dom";
import { useUser } from "../../hooks";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UserGridItem = ({ user }) => {

    const loggedUser = useUser();

    const handleDelete = async () => {
        const res = await fetch( SERVER_URL + `/users/${ user.id }`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer' + loggedUser?.token,
            }
        });

        if (res.ok) console.log('deleted')
    };

    return (
        <article className="users-grid-item" key={ user.id }>
            <h4>{user.name}</h4>
            <Link to={`/admin/users/${ user.id }`} title="Details">Details</Link>
            <Link to={`/admin/users/${ user.id }/edit`} title="Edit">Edit</Link>
            <span title="Delete" onClick={ handleDelete }>Delete</span>
        </article>
    );

};

export default UserGridItem;
