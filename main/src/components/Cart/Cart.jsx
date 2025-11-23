import { useCart } from '../../context/CartContext';
import { EmptyCart } from "./EmptyCart"
import './Cart.less';
import { CartItem } from './CartItem';


export const Cart = () => {

    const { showCart, closeCart, cartItems, cartTotal, clearCart } = useCart();

    console.log("en cart", cartTotal);
    if ( !showCart ) return null;
    return ( 
        <div className="cart-overlay" onClick={closeCart}>
            <div className="cart-container" onClick={(e) => e.stopPropagation()}>
                <button className="cart-close" onClick={closeCart}>✕</button>
                <h2>Tu carrito</h2>
                {cartItems.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <>
                        <div className='cart-items'>
                            {cartItems.map(item => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>

                        <div className='cart-sumary'>
                            <div className="cart-total">
                                <span>Total:</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            
                            <div className="cart-actions">
                                <button className="clear-cart" onClick={clearCart}>
                                    Vaciar Carrito
                                </button>
                                <button className="checkout-btn">
                                    Proceder al Pago
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
