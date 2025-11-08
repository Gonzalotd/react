import { useState } from "react"

import Advertisement from "../components/Advertisement/advertisement"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Card from "../components/card/Card"

export default function Home() {

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
            <Header onSearch={setSearchTerm}/>
            <Advertisement />
            <Card searchTerm={searchTerm}/>
            <Footer />
        </>
    )
} 