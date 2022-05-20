import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Register } from "../pages/Register";
import UserRouter from "./UserRouter";

const AppRouter = () => {

    return (
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='user/*' element={ <UserRouter /> } />
        </Routes>
    );
};

export default AppRouter;
