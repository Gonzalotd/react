import { createContext, useContext, useEffect, useState } from "react";

const GeneralContext = createContext();

export function GeneralProvider({ children }) {
    const [changeColor, setChangeColor ] = useState(false);
    const [user, setUser] = useState(null);
    const [redirectPath, setRedirectPath] = useState('/');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if ( storedUser ) {
            setUser(storedUser)
        }
    }, []);
   
    const login = (userData, redirectTo = '/') => {
        setUser(userData);
        setRedirectPath(redirectTo)
    }

    const logout = () => {
        setUser(null);
        setRedirectPath('/');
    }

    const setLoginRedirect = (path) => {
        setRedirectPath(path);
    }

    const clearRedirect = () => {
        setRedirectPath('/');
    }


    return (
        <GeneralContext.Provider value={{ 
            changeColor, 
            setChangeColor,
            user,
            login,
            logout,
            redirectPath,
            setLoginRedirect,
            clearRedirect      
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