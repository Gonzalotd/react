import { createContext, useContext, useState } from "react";

const ColorContext = createContext();

export function ColorProvider({ children }) {
    const [changeColor, setChangeColor ] = useState(false);

    return (
        <ColorContext.Provider value={{ changeColor, setChangeColor }}>
            {children}
        </ColorContext.Provider>
    );
}

export function useColor() {
    const context = useContext(ColorContext);
    if (!context ) {
        throw new Error('useColor debe usarse dentro de un ColorProvider');
    }

    return context;
}