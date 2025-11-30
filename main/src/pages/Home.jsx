import { useState } from "react"

import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Card from "../components/card/Card"
import Advertisement from "../components/Advertisement/Advertisement";
import { Login } from "../components/Login/Login";
import { Cart } from "../components/Cart/Cart";
import LoginUser from "./LoginUser";

export default function Home() {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    }

    return (
        <>
            <Header onSearch={handleSearch}/>
            <Advertisement />
            <main>
                <h1>Bienvenido a Nuestra Tienda</h1>
                <Card searchTerm={searchTerm}/>
            </main>
            <Cart />
            <Footer />
        </>
)
} 