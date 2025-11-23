import { useColor } from '../../context/GeneralContext.jsx';
import { useLogin } from '../../hooks/useLogin.js';
import './Advertisement.less'

export default function Advertisement() {

    const { changeColor } = useColor();

    const { user } = useLogin();
        
    const message = `Bienvenido ${user} tienes un `
    const title = "¡20% de descuento para nuevos clientes!"
    
    return (
        <div className={changeColor ? 'advertisement-offers' : 'advertisement-offers-ligth'}>
            <span className={changeColor ? 'advertisement-offers__title' : 'advertisement-offers__title-ligth'}>
                {user ? message + title : title}
            </span>
        </div>
    )
}