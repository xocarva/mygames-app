import { Route, Routes } from "react-router-dom";
import { AdminMenu, AdminUsers, UserFile } from "../pages/Admin";

const AdminRouter = () => {

    return (
        <Routes>
            <Route path='/' element={ <AdminMenu /> } />
            <Route path="/users" element={ <AdminUsers /> } />
            <Route path="/users/:id" element={ <UserFile /> } />
        </Routes>
    );
};

export default AdminRouter;
