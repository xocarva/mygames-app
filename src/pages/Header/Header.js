import { useUser } from '../../hooks';
import './Header.css';

const Header = () => {

    const user = useUser();

    return (
        <header>{user ? user.data.name : 'Sin usuario'}</header>

    );
};

export default Header;
