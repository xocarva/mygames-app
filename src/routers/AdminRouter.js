import { Route, Routes } from "react-router-dom";
import {
    AdminGenres,
    AdminMenu,
    AdminPlatforms,
    AdminStudios,
    AdminUsers,
    CreateGenre,
    CreatePlatform,
    CreateStudio,
    CreateUser
} from "../pages/Admin";

const AdminRouter = () => {

    return (
        <Routes>
            <Route path='/' element={ <AdminMenu /> } />
            <Route path="/users" element={ <AdminUsers /> } />
            <Route path="/users/create" element={ <CreateUser /> } />
            <Route path="/genres" element={ <AdminGenres /> } />
            <Route path="/genres/create" element={ <CreateGenre /> } />
            <Route path="/platforms" element={ <AdminPlatforms /> } />
            <Route path="/platforms/create" element={ <CreatePlatform /> } />
            <Route path="/studios" element={ <AdminStudios /> } />
            <Route path="/studios/create" element={ <CreateStudio /> } />
        </Routes>
    );
};

export default AdminRouter;
