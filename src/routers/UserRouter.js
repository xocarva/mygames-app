import { Route, Routes } from "react-router-dom";
import { Profile, UserCopies } from "../pages/User";

const UserRouter = () => {

    return (
        <Routes>
            <Route path='/copies' element={ <UserCopies /> } />
            <Route path='/profile' element={ <Profile /> } />
        </Routes>
    );
};

export default UserRouter;
