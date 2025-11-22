import { createContext, useContext, useEffect, useState } from "react";

const GeneralContext = createContext();

export function GeneralProvider({ children }) {
    const [changeColor, setChangeColor ] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if ( storedUser ) {
            setUser(storedUser)
        }
    }, [])

    const toggleLogin = () => {
        setShowLogin(!showLogin);
    }

    const closeLogin = () => {
        setShowLogin(false);
    }

    const login = (userData) => {
        setUser(userData);
        closeLogin();
    }

    const logout = () => {
        setUser(null);
    }


    return (
        <GeneralContext.Provider value={{ 
            changeColor, 
            setChangeColor,
            showLogin,
            toggleLogin,
            closeLogin,
            user,
            login,
            logout            
        }}>
            {children}
        </GeneralContext.Provider>
    );
}

export function useColor() {
    const context = useContext(GeneralContext);
    if (!context ) {
        throw new Error('useColor debe usarse dentro de un GeneralProvider');
    }

    return context;
}