// import { createContext, useContext, useEffect, useMemo, useState } from "react";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//     const [showCart, setShowCart] = useState(false);
//     const [cartItems, setCartItems] = useState([]);

//     useEffect(() => {
//         const storedCart = localStorage.getItem('cart');
//         if(storedCart) {
//             try {
//                 const parsedCart = JSON.parse(storedCart);
//                 const safeCart = parsedCart.map(item => ({
//                     ...item,
//                     quantity: item.quantity || 1
//                 }));
//                 setCartItems(safeCart);
//             } catch (error) {
//                 console.error("Error parsing cart from localStorage:", error);
//                 setCartItems([]);
//             }
//         }
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('cart', JSON.stringify(cartItems));
//     }, [cartItems]);

//     const toggleCart = () => {
//         console.log("Toggle cart - Estado actual:", showCart);
//         setShowCart(!showCart);
//     };

//     const closeCart = () => {
//         setShowCart(false);
//     };

//     const addToCart = (product) => {        
//         setCartItems(prevItems => {
//             const existItem = prevItems.find(item => item.id === product.id); 

//             if (existItem) {
//                 const updatedItems = prevItems.map(item => 
//                     item.id === product.id 
//                         ? {...item, quantity: (item.quantity || 0) + 1}
//                         : item
//                 );

//                 return updatedItems;
//             } else {
//                 const { quantity: _, ...cleanProduct } = product;
//                 return [...prevItems, { ...cleanProduct, quantity: 1 }];
//             }
//         });
//     };

//     const removeFromCart = (productId) => {
//         setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
//     };

//     const updateQuantity = (productId, newQuantity) => {
//         setCartItems(prevItems => {
//             if (newQuantity <= 0) {
//                 // Si la cantidad es 0 o menos, eliminar el producto
//                 const updatedItems = prevItems.filter(item => item.id !== productId);
//                 console.log("Eliminado por cantidad 0:", updatedItems);
//                 return updatedItems;
//             }
            
//             const updatedItems = prevItems.map(item =>
//                 item.id === productId 
//                     ? { ...item, quantity: newQuantity }
//                     : item
//             );
//             console.log("Después de actualizar cantidad:", updatedItems);
//             return updatedItems;
//         });
//     };
  

//     const clearCart = () => {
//         setCartItems([]);
//     };

//     // const cartTotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
//     // const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
//     const cartTotal = useMemo(() => 
//         cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0), 
//         [cartItems]
//     );

//     const totalItems = useMemo(() => 
//         cartItems.reduce((total, item) => total + (item.quantity || 1), 0), 
//         [cartItems]
//     );
  
//     return (
//         <CartContext.Provider value={{
//             showCart,
//             toggleCart,
//             closeCart,
//             cartItems,
//             addToCart,
//             removeFromCart,
//             updateQuantity,
//             clearCart,
//             cartTotal,
//             totalItems
//         }}>
//             {children}
//         </CartContext.Provider>
//     );
// }

// export function useCart() {
//     const context = useContext(CartContext);
//     if (!context) {
//         throw new Error('useCart debe de usarse dentro de un CartProvider');
//     }
//     return context;
// }

// context/CartContext.js
import { createContext, useState, useContext, useCallback } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Agregar al carrito
    const addToCart = useCallback((product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            
            return [...prevItems, { ...product, quantity: 1 }];
        });
    }, []);

    // Eliminar un producto del carrito
    const removeFromCart = useCallback((productId) => {
        setCartItems(prevItems => 
            prevItems.filter(item => item.id !== productId)
        );
    }, []);

    // Actualizar cantidad
    const updateQuantity = useCallback((productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    }, [removeFromCart]);

    // Vaciar carrito completamente
    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    // Toggle para mostrar/ocultar carrito
    const toggleCart = useCallback(() => {
        setIsCartOpen(prev => !prev);
    }, []);

    // Cálculos
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            isCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            toggleCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
