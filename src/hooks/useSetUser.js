import { useDispatch } from "react-redux";

const useSetUser = () => {
    const dispatch = useDispatch()
    return ( user)  => dispatch({ type: 'login', user })
};

export default useSetUser;
