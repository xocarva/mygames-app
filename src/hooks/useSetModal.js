import { useDispatch } from "react-redux"

const useSetModal = () => {

    const dispatch = useDispatch();
    return ( modal ) => dispatch({ type: 'modal', modal })
};

export default useSetModal;
