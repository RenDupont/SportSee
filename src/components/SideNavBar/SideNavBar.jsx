import Classes from './SideNavBar.module.css';
import icon1 from '../../assets/icon1.svg';
import icon2 from '../../assets/icon2.svg';
import icon3 from '../../assets/icon3.svg';
import icon4 from '../../assets/icon4.svg';
import { Link } from 'react-router-dom';

function SideNavBar() {
    return (
        <div className={Classes.sideNavBar}>
            <nav className={Classes.navigation}>
                <Link to='/'> <img src={icon1} alt="icon1" /> </Link>
                <Link to='/'> <img src={icon2} alt="icon2" /> </Link>
                <Link to='/'> <img src={icon3} alt="icon3" /> </Link>
                <Link to='/'> <img src={icon4} alt="icon4" /> </Link>
            </nav>
            <p>Copiryght, SportSee 2020</p>
        </div>
    );
}

export default SideNavBar;