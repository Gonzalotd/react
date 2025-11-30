import { Link } from "react-router";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import PageError from "../components/PageError/PageError";

export default function NotFound() {
    return (
        <>
            <Header />
            <main>
                <PageError />
            </main>
            <Footer/>
        </>
    )
}