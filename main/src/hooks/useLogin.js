import { useState } from "react";
import { useColor } from "../context/GeneralContext";
import { useNavigate } from "react-router";

export const useLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const { login } = useColor();
    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const { email, password } = formData;
        if (!email || !password) {
            alert('Por favor completa todos los campos');
            return;
        }


        localStorage.setItem('user', email);
        login(email);
        navigate('/');

        setFormData({
            email: '',
            password: ''
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // const handleLogout = () => {
    //     localStorage.removeItem('user');
    //     logout();
    // }

    return {
        formData,
        handleLoginSubmit,
        handleInputChange
    }
}