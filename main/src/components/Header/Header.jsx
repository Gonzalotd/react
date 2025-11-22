import './Header.less';
import logo from '../../assets/img/fashion-store.png';

import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser, AiOutlineBgColors  } from "react-icons/ai";
import { useState } from 'react';
import { useColor } from '../../context/ColorContext';


export default function Header({ onSearch }) {

    const { setChangeColor, changeColor } = useColor();
   
    const menu = [
        { id: 1, title: 'INICIO'},
        { id: 2, title: 'CATEGORÍAS'},
        { id: 3, title: 'OFERTAS'},
        { id: 4, title: 'CONTACTO'}
    ]

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
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
                    <AiOutlineShoppingCart size="2em"/>
                    <AiOutlineHeart size="2em"/>
                    <AiOutlineBgColors size="2em" onClick={() => setChangeColor(!changeColor)} />
                    <AiOutlineUser size="2em"/>
                </div>

            </nav>

        </header>
    )
}; 