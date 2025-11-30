import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { Login } from "../components/Login/Login";
import '../assets/css/LoginUser.less';

export default function LoginUser() {
    return (
        <div className="login-page-container">
            <Header />
            <main className="login-main-content">
                <Login />
            </main>
            <Footer />
        </div>
    )
}