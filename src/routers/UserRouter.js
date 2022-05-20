import { Route, Routes } from "react-router-dom";
import { UserCopies } from "../pages/User";

const UserRouter = () => {

    return (
        <Routes>
            <Route path='/copies' element={ <UserCopies /> } />
        </Routes>
    );
};

export default UserRouter;
