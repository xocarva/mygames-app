import { useSelector } from "react-redux";

const useUser = () => useSelector( s => s.user );

export default useUser;
