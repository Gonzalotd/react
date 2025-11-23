

export const useFooter = () => {
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

    return {
        contacto,
        redesSociales,
        direccion, 
        title
    }
}