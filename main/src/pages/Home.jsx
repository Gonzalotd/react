import { useState } from "react"

import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Advertisement from "../components/Advertisement/Advertisement";
import Card from "../components/Card/Card";


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
            <Card />
            <Footer />
        </>
    )
} 