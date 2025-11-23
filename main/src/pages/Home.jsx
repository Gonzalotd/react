import { useState } from "react"

import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Card from "../components/card/Card"
import Advertisement from "../components/Advertisement/Advertisement";
import { GeneralProvider } from "../context/GeneralContext";
import { Login } from "../components/Login/Login";
import { CartProvider } from "../context/CartContext";
import { Cart } from "../components/Cart/Cart";

export default function Home() {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    }

    return (
        <GeneralProvider>
            <CartProvider>
                <Header onSearch={handleSearch}/>
                <Advertisement />
                <Card searchTerm={searchTerm}/>
                <Login />
                <Cart />
                <Footer />
            </CartProvider>
        </GeneralProvider>
    )
} 