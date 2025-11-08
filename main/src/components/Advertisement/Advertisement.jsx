import './Advertisement.less'

export default function Advertisement() {

    const title = "¡20% de descuento para nuevos clientes!"

    return (
        <>
            <div className="advertisement-offers">
                <span className="advertisement-offers__title">{title}</span>
            </div>
        </>
    )
}