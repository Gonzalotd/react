import './Header.less';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser, AiOutlineBgColors, AiOutlineLogout } from "react-icons/ai";
import { useState } from 'react';
import { useColor } from '../../context/GeneralContext';
import { Link, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, selectTotalItems } from '../../redux/slices/cartSlice';

export default function Header({ onSearch }) {
    let usuario = "";
    const { setChangeColor, changeColor, user, logout } = useColor();
    
    const dispatch = useDispatch();
    const totalItems = useSelector(selectTotalItems);
    
    const handleCartClick = () => {
        dispatch(toggleCart());
    };

    console.log("user", user);
    if (user) {
        try {
            let dataUser;
            if (typeof user === 'string') {
                dataUser = JSON.parse(user);
            } else {
                dataUser = user;
            }
            usuario = dataUser.name ? dataUser.name : dataUser.email;
        } catch (error) {
            console.log("Error de usuario", error);
        }
    }

    const menu = [
        { id: 1, title: 'INICIO', path: '/' },
        { id: 2, title: 'ABOUT', path: '/about' },
        { id: 3, title: 'OFERTAS', path: '/ofertas' },
        { id: 4, title: 'CONTACTO', path: '/contacto' }
    ];

    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        onSearch(value);
    };

    const handleClearSearch = () => {
        setInputValue('');
        onSearch('');
    };

    const handleLogout = () => {
        logout();
        localStorage.removeItem('usuario');
        navigate('/');
    };

    return (
        <header className='header-menu'>
            <nav className={changeColor ? 'header-menu__nav' : 'header-menu__nav-ligth'}>
                <Link className='header-menu__logo-container' to='/'>
                    <span className={changeColor ? 'header-menu__title' : 'header-menu__title-ligth'}>Fashion Store</span>
                </Link>
                {menu.map(item =>
                    <Link
                        key={item.id}
                        to={item.path}
                        className={changeColor ? 'header-menu__link' : 'header-menu__link-ligth'}>
                        {item.title}
                    </Link>
                )}
                <form className="header-menu__search" role="search">
                    <div className="header-menu__search-wrapper">
                        <input
                            className={changeColor ? 'header-menu__search-input' : 'header-menu__search-input-ligth'}
                            type="search"
                            placeholder="Buscar productos..."
                            aria-label="Buscar"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        {inputValue && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="header-menu__search-clear"
                                aria-label="Limpiar búsqueda"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </form>

                <div className="header-menu__icons">
                    <div className="cart-icon-container">
                        <AiOutlineShoppingCart
                            size="2em"
                            className='show-cart'
                            onClick={handleCartClick}
                        />
                        {totalItems > 0 && (
                            <span className="cart-badge">{totalItems}</span>
                        )}
                    </div>
                    <AiOutlineHeart size="2em" />
                    <AiOutlineBgColors size="2em" onClick={() => setChangeColor(!changeColor)} />
                    {user ? (
                        <div className='header-menu__info'>
                            <span className='header-menu__name'>
                                Hola, {usuario}
                            </span>
                            <AiOutlineLogout
                                size="2em"
                                onClick={handleLogout}
                                title='Cerrar sesión'
                            />
                        </div>
                    ) : (
                        <Link to="/login" className={changeColor ? 'user-link-ligth' : 'user-link'}>
                            <AiOutlineUser
                                size="2em"
                                title='Inicie Sessión'
                            />
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}