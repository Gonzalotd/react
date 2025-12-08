import { redirect, useLocation, useNavigate } from "react-router";
import { useColor } from "../../context/GeneralContext"
import { useLogin } from "../../hooks/useLogin";

import './Login.less'

export const Login = () => {

    const { changeColor, redirectPath, clearRedirect } = useColor();
    const { formData, handleLoginSubmit, handleInputChange, user } = useLogin();
    const navigate = useNavigate();
    const location = useLocation();

    if ( user ) {
        navigate('/');
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const from = location.state?.from?.pathname || redirectPath || '/';
        handleLoginSubmit(e);
        navigate(from, { replace: true });
        clearRedirect();
    }
   
    return (
        <div className="login-page">
        <div className={`login-form ${changeColor ? 'dark' : ''}`}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        className={changeColor ? 'form-input' : 'form-input-ligth'}
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Ingresa tu email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        className={changeColor ? 'form-input' : 'form-input-ligth'}
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ingresa tu nombre"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        className={changeColor ? 'form-input' : 'form-input-ligth'}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Ingresa tu contraseña"
                    />
                </div>
                <button 
                    type="submit" 
                    className={changeColor ? 'login-submit' : 'login-submit-ligth'}
                    onClick={handleLoginSubmit}
                >
                    Ingresar
                </button>
            </form>
            <div className="login-links">
                <a href="#">¿Olvidaste tu contraseña?</a>
                <a href="#">Crear cuenta</a>
            </div>
        </div>
    </div>
    )
}