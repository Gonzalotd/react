import { createContext, useContext, useEffect, useState } from "react";

const GeneralContext = createContext();

export function GeneralProvider({ children }) {
    const [changeColor, setChangeColor ] = useState(false);
    const [user, setUser] = useState(null);
    const [redirectPath, setRedirectPath] = useState('/');

    useEffect(() => {
        const storedUser = localStorage.getItem('usuario');
        if (storedUser) {
            try {
                const userObj = JSON.parse(storedUser);
                setUser(userObj); 
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
                localStorage.removeItem('usuario');
            }
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