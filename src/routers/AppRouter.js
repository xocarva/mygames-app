import { Routes, Route } from "react-router-dom";
import Copies from "../pages/Copies/Copies";
import { Home } from "../pages/Home";
import { Register } from "../pages/Register";

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/copies' element={ <Copies /> } />
        </Routes>
    );
};

export default AppRouter;