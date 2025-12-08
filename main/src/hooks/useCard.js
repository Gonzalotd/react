import { useEffect, useState } from 'react';
import initialProducts from '../../public/data/data.json';

export const useCard = (searchTerm) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = () => {
            setLoading(true);
            try {
                const savedProducts = localStorage.getItem('ecommerce_products');
                
                if (savedProducts) {
                    const parsedProducts = JSON.parse(savedProducts);
                    setData(parsedProducts);
                    setFilteredData(parsedProducts);
                } else {
                    
                    setData(initialProducts);
                    setFilteredData(initialProducts);
                    localStorage.setItem('ecommerce_products', JSON.stringify(initialProducts));
                }
            } catch(error) {               
                setData(initialProducts);
                setFilteredData(initialProducts);
            } finally {
                setLoading(false);
            }
        };
        
        loadProducts();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = data.filter(item => 
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    }, [searchTerm, data]);

    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: data.length > 0 ? Math.max(...data.map(p => p.id)) + 1 : 1
        };
        
        const updatedProducts = [...data, newProduct];
        setData(updatedProducts);
        setFilteredData(updatedProducts);
        localStorage.setItem('ecommerce_products', JSON.stringify(updatedProducts));
        return newProduct;
    };

    const updateProduct = (id, updatedData) => {
        const updatedProducts = data.map(product =>
            product.id === id ? { ...product, ...updatedData } : product
        );
        setData(updatedProducts);
        setFilteredData(updatedProducts);
        localStorage.setItem('ecommerce_products', JSON.stringify(updatedProducts));
    };

    const deleteProduct = (id) => {
        const updatedProducts = data.filter(product => product.id !== id);
        setData(updatedProducts);
        setFilteredData(updatedProducts);
        localStorage.setItem('ecommerce_products', JSON.stringify(updatedProducts));
    };

    const resetProducts = () => {
        setData(initialProducts);
        setFilteredData(initialProducts);
        localStorage.setItem('ecommerce_products', JSON.stringify(initialProducts));
    };

    return {
        data,
        filteredData,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts
    };
};