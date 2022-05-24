const { useSelector } = require("react-redux");

const useModal = () => useSelector( s => s.modal );

export default useModal;
