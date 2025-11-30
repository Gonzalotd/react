import { Link } from "react-router";
import './PageError.css'

export default function PageError() {

    return (
        <div class="error-container">
            <h1 class="error-code">404</h1>
            <h2 class="error-title">Página No Encontrada</h2>
            <p class="error-message">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
                                   
            <div class="error-actions">
                <Link to="/" class="btn">Volver al Inicio</Link>
            </div>
          
        </div>
    )
}