import { useState } from "react"

import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Card from "../components/card/Card"
import Advertisement from "../components/Advertisement/Advertisement";
import { ColorProvider } from "../context/ColorContext";

export default function Home() {

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <ColorProvider>
            <Header onSearch={setSearchTerm}/>
            <Advertisement />
            <Card searchTerm={searchTerm}/>
            <Footer />
        </ColorProvider>
    )
} 