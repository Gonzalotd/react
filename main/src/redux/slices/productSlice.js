import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  resetProducts,
} from '../thunks/productThunks';


const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filteredItems: [],
    searchTerm: '',
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      if (action.payload) {
        state.filteredItems = state.items.filter(item =>
          item.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.description.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.category.toLowerCase().includes(action.payload.toLowerCase())
        );
      } else {
        state.filteredItems = state.items;
      }
    },
    clearSearch: (state) => {
      state.searchTerm = '';
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        if (!state.searchTerm || 
            action.payload.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            action.payload.description.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            action.payload.category.toLowerCase().includes(state.searchTerm.toLowerCase())) {
          state.filteredItems.push(action.payload);
        }
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const { id, updatedData } = action.payload;
        const index = state.items.findIndex(item => item.id === id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...updatedData };
          
          const filteredIndex = state.filteredItems.findIndex(item => item.id === id);
          if (filteredIndex !== -1) {
            state.filteredItems[filteredIndex] = { ...state.filteredItems[filteredIndex], ...updatedData };
          }
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.items = state.items.filter(item => item.id !== id);
        state.filteredItems = state.filteredItems.filter(item => item.id !== id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.filteredItems = action.payload;
        state.searchTerm = '';
      });
  },
});


export const { setSearchTerm, clearSearch } = productsSlice.actions;
export default productsSlice.reducer;