import './Header.less';
import logo from '../../assets/img/fashion-store.png';

import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser  } from "react-icons/ai";
import { useState } from 'react';


export default function Header({ onSearch }) {
   
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
            <nav className='header-menu__nav'>
                <a className='header-menu__logo-container' href='#'>
                    <img 
                        src={logo} 
                        alt="Logo Fashion - Store"
                        className='header-menu__logo-img' />
                </a>
                { menu.map( item => 
                    <a 
                        key={item.id}
                        href='#'
                        className='header-menu__link'>
                        {item.title}
                    </a>
                )}
                <form class="header-menu__search" role="search">
                    <div className="header-menu__search-wrapper">
                        <input 
                            className="header-menu__search-input" 
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
                    <AiOutlineUser size="2em"/>
                </div>

            </nav>

        </header>
    )
}; 