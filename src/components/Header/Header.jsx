import Classes from './Header.module.css';
import groupLogo from '../../assets/GroupLogo.svg';
import groupName from '../../assets/GroupName.svg';
import { Link } from 'react-router-dom';

function BGbar() {
    return (
        <header className={Classes.header}>
            <div className={Classes.logo}>
                <img src={groupLogo} alt="SportSee logo" />
                <img src={groupName} alt="SportSee" />
            </div>
            <nav className={Classes.navigation}>
                <Link to='/'>Accueil</Link>
                <Link to='/'>Profil</Link>
                <Link to='/'>Réglage</Link>
                <Link to='/'>Communauté</Link>
            </nav>
        </header>
    );
}

export default BGbar;