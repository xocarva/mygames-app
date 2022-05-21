import { useParams } from "react-router-dom";
import { EditUser } from "../../../components";

const AdminEditUser = () => {

    const { id } = useParams();

    return (
        <EditUser id={ id }/>
    );

};

export default AdminEditUser;
