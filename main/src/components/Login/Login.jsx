import { useColor } from "../../context/GeneralContext"
import { useLogin } from "../../hooks/useLogin";

import './Login.less'

export const Login = () => {

    const { changeColor, showLogin, closeLogin } = useColor();

    const { formData, handleLoginSubmit, handleInputChange } = useLogin();
   

    if (!showLogin) return null;
    return (
        <div className="login-overlay" onClick={closeLogin}>
        <div className="login-form" onClick={(e) => e.stopPropagation()}>
            <button 
                className="login-close" 
                onClick={closeLogin}
            >
                ✕
            </button>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        className={changeColor ? 'form-input' : 'form-input-ligth'}
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Ingresa tu email"
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