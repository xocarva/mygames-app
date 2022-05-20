import { Link } from "react-router-dom";

const UserGridItem = ({ user }) => {

    return (
        <article className="users-grid-item" key={ user.id }>
            <h4>{user.name}</h4>
            <Link to={`/admin/users/${ user.id }`}>Detalle</Link>
        </article>
    );

};

export default UserGridItem;
