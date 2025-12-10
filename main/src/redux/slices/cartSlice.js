
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isCartOpen: false,
  },
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const selectCartItems = (state) => state.cart.items;
export const selectIsCartOpen = (state) => state.cart.isCartOpen;
export const selectTotalItems = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectTotalPrice = (state) =>
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export const { 
  toggleCart, 
  closeCart, 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
} = cartSlice.actions;


export const saveCartToLocalStorage = store => next => action => {
    const result = next(action);
    
    if (action.type.startsWith('cart/')) {
      const state = store.getState();
      localStorage.setItem('redux_cart', JSON.stringify(state.cart.items));
    }
    
    return result;
  };  
  

  export default cartSlice.reducer;