import { useMemo } from 'react';
import data from '../data/data.json';

export const useCard = (searchTerm) => {

    const filteredData = useMemo(() => {
        if (!searchTerm) return data;
        
        return data.filter(product => 
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return {
        filteredData, 
        data
    }
}
 