import { createAsyncThunk } from '@reduxjs/toolkit';
import initialProducts from '../../data/products.json';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const savedProducts = localStorage.getItem('ecommerce_products');
      
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        return parsed; 
      } else {
        localStorage.setItem('ecommerce_products', JSON.stringify(initialProducts));
        return initialProducts;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const newProduct = {
        ...productData,
        id: Date.now(),
        rating: productData.rating || { rate: 0, count: 0 }
      };
      
      const updatedProducts = [...state.products.items, newProduct];
      localStorage.setItem('ecommerce_products', JSON.stringify(updatedProducts));
      
      return newProduct;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updatedData }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const updatedProducts = state.products.items.map(product =>
        product.id === id ? { ...product, ...updatedData } : product
      );
      
      localStorage.setItem('ecommerce_products', JSON.stringify(updatedProducts));
      return { id, updatedData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const updatedProducts = state.products.items.filter(product => product.id !== id);
      
      localStorage.setItem('ecommerce_products', JSON.stringify(updatedProducts));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetProducts = createAsyncThunk(
  'products/resetProducts',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.setItem('ecommerce_products', JSON.stringify(initialProducts));
      return initialProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);