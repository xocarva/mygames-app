import { useFetch } from "../../hooks";
import { Loading } from "../../components";
import UserGridItem from "./UserGridItem";

const UsersGrid = ({ url }) => {

    const { isLoading, data: users } = useFetch( url );

    return (
        <section className="users">
            <h2 className="users-title">Users</h2>
            { isLoading && < Loading /> }
            { !isLoading && users && users.length > 0 &&
                <section className="users-grid">
                    { users?.map( user =>
                        <UserGridItem key={ user.id}  user={ user } />
                    )}
                </section>
            }
        </section>
    );

};

export default UsersGrid;
