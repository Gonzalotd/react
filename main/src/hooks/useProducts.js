import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  resetProducts,
} from '../redux/thunks/productThunks';
import { setSearchTerm, clearSearch } from '../redux/slices/productSlice';

export const useProducts = () => {
  const dispatch = useDispatch();
  
  const items = useSelector((state) => state.products.items);
  const filteredItems = useSelector((state) => state.products.filteredItems);
  const searchTerm = useSelector((state) => state.products.searchTerm);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const handleSearch = useCallback((term) => {
    dispatch(setSearchTerm(term));
  }, [dispatch]);

  const handleAddProduct = useCallback((productData) => {
    return dispatch(addProduct(productData));
  }, [dispatch]);

  const handleUpdateProduct = useCallback((id, updatedData) => {
    return dispatch(updateProduct({ id, updatedData }));
  }, [dispatch]);

  const handleDeleteProduct = useCallback((id) => {
    return dispatch(deleteProduct(id));
  }, [dispatch]);

  const handleResetProducts = useCallback(() => {
    return dispatch(resetProducts());
  }, [dispatch]);

  const handleClearSearch = useCallback(() => {
    dispatch(clearSearch());
  }, [dispatch]);

  return {
    data: items,
    filteredData: filteredItems,
    loading,
    error,
    searchTerm,
    handleSearch,
    addProduct: handleAddProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
    resetProducts: handleResetProducts,
    clearSearch: handleClearSearch,
  };
};