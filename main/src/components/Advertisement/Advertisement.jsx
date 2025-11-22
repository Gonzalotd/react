import { useColor } from '../../context/ColorContext.jsx';
import './Advertisement.less'

export default function Advertisement() {

    const title = "¡20% de descuento para nuevos clientes!"
    const { changeColor } = useColor();

    return (
        <div className={changeColor ? 'advertisement-offers' : 'advertisement-offers-ligth'}>
            <span className={changeColor ? 'advertisement-offers__title' : 'advertisement-offers__title-ligth'}>
                {title}
            </span>
        </div>
    )
}