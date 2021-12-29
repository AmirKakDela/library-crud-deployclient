import React from 'react';
import './header.scss'
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <div className="header__logo">
                Библиотека
            </div>
            <div className="header__nav">
                <NavLink to="/books" className="nav__link">
                    Книги
                </NavLink>
                <NavLink to="/readers" className="nav__link">
                    Читатели
                </NavLink>
                <NavLink to="/gives" className="nav__link">
                    Выдачи
                </NavLink>
            </div>
        </header>
    );
};

export default Header;