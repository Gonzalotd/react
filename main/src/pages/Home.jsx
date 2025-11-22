import { useState } from "react"

import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Card from "../components/card/Card"
import Advertisement from "../components/Advertisement/Advertisement";
import { GeneralProvider } from "../context/GeneralContext";
import { Login } from "../components/Login/Login";

export default function Home() {

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <GeneralProvider>
            <Header onSearch={setSearchTerm}/>
            <Advertisement />
            <Card searchTerm={searchTerm}/>
            <Login />
            <Footer />
        </GeneralProvider>
    )
} 