// import { useCart } from '../../context/CartContext';
// import { EmptyCart } from "./EmptyCart"
// import './Cart.less';
// import { CartItem } from './CartItem';
// import { useLogin } from '../../hooks/useLogin';


// export const Cart = () => {

//     const { showCart, closeCart, cartItems, cartTotal, clearCart } = useCart();
//     const { usuario } = useLogin();

//     const handleProcesarPago = () => {
//         alert('se redirigirá a la pasarela de pago')
//         clearCart();
//     }
    
//     if ( !showCart ) return null;
//     return ( 
//         <div className="cart-overlay" onClick={closeCart}>
//             <div className="cart-container" onClick={(e) => e.stopPropagation()}>
//                 <button className="cart-close" onClick={closeCart}>✕</button>
//                 <h2>Tu carrito</h2>
//                 {cartItems.length === 0 ? (
//                     <EmptyCart />
//                 ) : (
//                     <>
//                         <div className='cart-items'>
//                             {cartItems.map(item => (
//                                 <CartItem key={item.id} item={item} />
//                             ))}
//                         </div>

//                         <div className='cart-sumary'>
//                             <div className="cart-total">
//                                 <span>Total:</span>
//                                 <span>${cartTotal.toFixed(2)}</span>
//                             </div>
                            
//                             {usuario && (
//                                 <div className="cart-actions">
//                                     <button className="clear-cart" onClick={clearCart}>
//                                         Vaciar Carrito
//                                     </button>
//                                     <button className="checkout-btn" onClick={() => handleProcesarPago()}>
//                                         Proceder al Pago
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     )
// }

// components/Cart/Cart.jsx
import './Cart.css';
import { useCart } from '../../context/CartContext';
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus, AiOutlineShoppingCart } from 'react-icons/ai';

export default function Cart() {
    const {
        cartItems,
        isCartOpen,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        totalItems,
        totalPrice
    } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="cart-overlay">
            <div className="cart-container">
                {/* Header del carrito */}
                <div className="cart-header">
                    <h2>
                        <AiOutlineShoppingCart />
                        Carrito ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})
                    </h2>
                    <button className="cart-close-btn" onClick={toggleCart}>
                        <AiOutlineClose />
                    </button>
                </div>

                {/* Lista de productos */}
                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <p>Tu carrito está vacío</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image">
                                    <img 
                                        src={item.image} 
                                        alt={item.title}
                                        onError={(e) => {
                                            e.target.src = `https://picsum.photos/80/80?random=${item.id}`;
                                        }}
                                    />
                                </div>
                                
                                <div className="cart-item-details">
                                    <h3 className="cart-item-title">{item.title}</h3>
                                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                                    
                                    <div className="cart-item-controls">
                                        <div className="quantity-controls">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="quantity-btn"
                                            >
                                                <AiOutlineMinus />
                                            </button>
                                            <span className="quantity">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="quantity-btn"
                                            >
                                                <AiOutlinePlus />
                                            </button>
                                        </div>
                                        
                                        <button 
                                            onClick={() => removeFromCart(item.id)}
                                            className="remove-btn"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                    
                                    <p className="cart-item-subtotal">
                                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer del carrito */}
                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Total:</span>
                            <span className="total-price">${totalPrice.toFixed(2)}</span>
                        </div>
                        
                        <div className="cart-actions">
                            <button 
                                onClick={clearCart}
                                className="clear-cart-btn"
                            >
                                Vaciar Carrito
                            </button>
                            
                            <button 
                                className="checkout-btn"
                                onClick={() => {
                                    alert('¡Compra realizada!');
                                    clearCart();
                                    toggleCart();
                                }}
                            >
                                Finalizar Compra
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}