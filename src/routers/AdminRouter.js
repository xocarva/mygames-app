import { Route, Routes } from "react-router-dom";
import { AdminGenres, AdminMenu, AdminUsers, UserFile } from "../pages/Admin";
import { CreateGenre } from "../pages/Admin/AdminGenres";
import { CreateUser } from "../pages/Admin/AdminUsers";

const AdminRouter = () => {

    return (
        <Routes>
            <Route path='/' element={ <AdminMenu /> } />
            <Route path="/users" element={ <AdminUsers /> } />
            <Route path="/users/create" element={ <CreateUser /> } />
            <Route path="/users/:id" element={ <UserFile /> } />
            <Route path="/genres" element={ <AdminGenres /> } />
            <Route path="/genres/create" element={ <CreateGenre /> } />
        </Routes>
    );
};

export default AdminRouter;
