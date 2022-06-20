import { Routes, Route } from "react-router-dom";
import { Games } from "../pages/Games";
import { Home } from "../pages/Home";
import { Register } from "../pages/Register";
import AdminRouter from "./AdminRouter";
import UserRouter from "./UserRouter";

const AppRouter = () => {

    return (
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='register' element={ <Register /> } />
            <Route path='user/*' element={ <UserRouter /> } />
            <Route path='admin/*' element={ <AdminRouter /> } />
            <Route path='games' element={ <Games /> } />
        </Routes>
    );
};

export default AppRouter;
