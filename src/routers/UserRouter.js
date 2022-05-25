import { Route, Routes } from "react-router-dom";
import { EditProfile, UserCopies } from "../pages/User";

const UserRouter = () => {

    return (
        <Routes>
            <Route path='/copies' element={ <UserCopies /> } />
            <Route path='/edit-profile' element={ <EditProfile /> } />
        </Routes>
    );
};

export default UserRouter;
