import { useColor } from '../../context/ColorContext';
import { useFooter } from '../../hooks/useFooter'
import './Footer.less'


export default function Footer() {
   
    const { contacto, redesSociales, direccion, title } = useFooter(); 
    const { changeColor } = useColor();
    return (
        <div className={changeColor ? 'footer-menu' : 'footer-menu-ligth'}>
            <div className="footer-menu__information">
                <div className={changeColor ? 'footer-menu__contact' : 'footer-menu__contact-ligth'}>
                    <h2>Contacto</h2>
                    <span>Email: { contacto[0].email } </span>
                    <span>Teléfono: { contacto[1].telefono } </span>
                </div>

                <div className={changeColor ? 'footer-menu__contact' : 'footer-menu__contact-ligth'}>
                    <h2>Redes Sociales</h2>
                    {redesSociales.map((red, index) => (
                        <span key={index}>
                            {red}
                        </span>
                    ))}
                </div>

                <div className={changeColor ? 'footer-menu__contact' : 'footer-menu__contact-ligth'}>
                    <h2>Dirección</h2>
                    <span>{ direccion[0].calle }, { direccion[1].codigo} </span>
                    <span>{ direccion[2].ciudad }, { direccion[3].pais} </span>
                </div>
            </div>
            <div className={changeColor ? 'footer-menu__derechos' : 'footer-menu__derechos-ligth'}>
                <span>&copy; { title }</span>
            </div>
        </div>
    )
}