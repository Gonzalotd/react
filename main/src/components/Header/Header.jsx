import './Header.less';
import '../Cart/Cart.css'
import logo from '../../assets/img/fashion-store.png';

import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser, AiOutlineBgColors, AiOutlineLogout  } from "react-icons/ai";
import { useState } from 'react';
import { useColor } from '../../context/GeneralContext';
import { useCart } from '../../context/CartContext';


export default function Header({ onSearch }) {

    const { setChangeColor, changeColor, toggleLogin, user, logout } = useColor();
    const { toggleCart, totalItems } = useCart();
   
    const menu = [
        { id: 1, title: 'INICIO'},
        { id: 2, title: 'CATEGORÍAS'},
        { id: 3, title: 'OFERTAS'},
        { id: 4, title: 'CONTACTO'}
    ]

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        console.log("value", value);
        setInputValue(value);
        onSearch(value);
    }

    const handleClearSearch = () => {
        setInputValue('');
        onSearch('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleLogout = () => {
        logout();
        localStorage.removeItem('user');
    };

    return (
        <header className='header-menu'>
            <nav className={changeColor ? 'header-menu__nav' : 'header-menu__nav-ligth'} >
                <a className='header-menu__logo-container' href='#'>
                    {/* <img 
                        src={logo} 
                        alt="Logo Fashion - Store"
                        className='header-menu__logo-img' /> */}
                    <span className={changeColor ? 'header-menu__title' : 'header-menu__title-ligth'}>Fashion Store</span>
                </a>
                { menu.map( item => 
                    <a 
                        key={item.id}
                        href='#'
                        className={changeColor ? 'header-menu__link' : 'header-menu__link-ligth'}>
                        {item.title}
                    </a>
                )}
                <form class="header-menu__search" role="search">
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
                            onClick={toggleCart}
                        />
                        {totalItems > 0 && (
                            <span className="cart-badge">{totalItems}</span>
                        )}
                    </div>
                    <AiOutlineHeart size="2em"/>
                    <AiOutlineBgColors size="2em" onClick={() => setChangeColor(!changeColor)} />
                    {user ? (
                        <div className='header-menu__info'>
                            <span className='header-menu__name'>
                                Hola, {user}
                            </span>
                            <AiOutlineLogout 
                                size="2em"
                                onClick={handleLogout}
                                title='Cerrar sesión'
                            />
                        </div>
                    ) : (
                        <AiOutlineUser 
                            size="2em"
                            onClick={toggleLogin}
                            title='Inicie Sessión'/>
                    )}
                </div>

            </nav>

        </header>
    )
}; 