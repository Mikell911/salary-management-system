import Logo from "../../Components/Logo/Logo";
import './header.scss'
import {Link} from "react-router-dom";
import React, {useState} from "react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenMenu = () => {
        setIsOpen(prevState => !prevState)
    }
    return (
        <header className={'header container'}>
            <Logo/>

            <nav className={'nav header__nav'}>
                <div
                    onClick={handleOpenMenu}
                    className={`hamburger-menu ${isOpen ? 'active' : ''}`
                }>
                    <div className={'hamburger-menu__line hamburger-menu__line-top'}></div>
                    <div className={'hamburger-menu__line hamburger-menu__line-middle'}></div>
                    <div className={'hamburger-menu__line hamburger-menu__line-bottom'}></div>
                </div>
                <ul className={'nav__container'}>
                    <li className={'nav__item'}>
                        <Link to={'/'} className={'nav__link'} onClick={handleOpenMenu}>
                            Home
                        </Link>
                    </li>

                    <li className={'nav__item'} onClick={handleOpenMenu}>
                        <Link to={'/contact'} className={'nav__link'}>
                            Contact
                        </Link>
                    </li>

                    <li className={'nav__item'} onClick={handleOpenMenu}>
                        <Link to={'/about-us'} className={'nav__link'}>
                            About Us
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
