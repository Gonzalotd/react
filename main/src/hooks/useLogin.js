import { useState } from "react";
import { useColor } from "../context/GeneralContext";

export const useLogin = () => {

    const { login, logout, toggleLogin, user: contextUser } = useColor();

    const [formData, setFormData ] = useState({
        email: '',
        password: ''
    })

    const user = contextUser;

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const { email, password } = formData;
        console.log('Inicie Sessión',email, password);
        localStorage.setItem('user', email);
        login(email);

        setFormData({
            email: '',
            password: ''
        })
    }

    const handleInputChange = (e) => {
        const { name, value} = e.target;
        setFormData( prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        logout();
    }

    return {
        formData,
        setFormData,
        handleLoginSubmit,
        handleInputChange,
        user,
        handleLogout
    }
}