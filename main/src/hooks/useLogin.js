import { useState } from "react";
import { useColor } from "../context/GeneralContext";
import { useNavigate } from "react-router";

export const useLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: ''
    });
    
    const { login } = useColor();
    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const { email, name, password } = formData;
        if (!email || !password) {
            alert('Por favor completa todos los campos');
            return;
        }

        const usuario = {
            email: email,
            name: name || email.split('@')[0],
            rol: email.includes('@admin.com') ? 'admin' : 'user'
        };

        localStorage.setItem('usuario', JSON.stringify(usuario));
        login(usuario);
        navigate('/');

        setFormData({
            email: '',
            name: '',
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

    return {
        formData,
        handleLoginSubmit,
        handleInputChange
    }
}