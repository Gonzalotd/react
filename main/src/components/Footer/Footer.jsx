import './Footer.less'


export default function Footer() {
    const contacto = [
        {'email': 'info@fashionstore.com'},
        {'telefono': '+34 123 456 789'}
    ];
    const redesSociales = ["Facebook", "Twitter", "Instagram"];
    const direccion = [
        {'calle': 'Calle Principal'},
        {'codigo': '123'},
        {'ciudad': 'Madrid'},
        {'pais': 'País'}
    ]
    const title = "2026 Fashion Store. Todos los derechos reservados";

    return (
        <div className="footer-menu">
            <div className="footer-menu__information">
                <div className="footer-menu__contact">
                    <h2>Contacto</h2>
                    <span>Email: { contacto[0].email } </span>
                    <span>Teléfono: { contacto[1].telefono } </span>
                </div>

                <div className="footer-menu__contact">
                    <h2>Redes Sociales</h2>
                    {redesSociales.map((red, index) => (
                        <span key={index}>
                            {red}
                        </span>
                    ))}
                </div>

                <div className="footer-menu__contact">
                    <h2>Dirección</h2>
                    <span>{ direccion[0].calle }, { direccion[1].codigo} </span>
                    <span>{ direccion[2].ciudad }, { direccion[3].pais} </span>
                </div>
            </div>
            <div className="footer-menu__derechos">
                <span>&copy; { title }</span>
            </div>
        </div>
    )
}