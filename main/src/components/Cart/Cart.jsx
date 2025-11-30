import { useCart } from '../../context/CartContext';
import { EmptyCart } from "./EmptyCart"
import './Cart.less';
import { CartItem } from './CartItem';
import { useLogin } from '../../hooks/useLogin';


export const Cart = () => {

    const { showCart, closeCart, cartItems, cartTotal, clearCart } = useCart();
    const { user } = useLogin();

    const handleProcesarPago = () => {
        alert('se redirigirá a la pasarela de pago')
        clearCart();
    }
    
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
                            
                            {user && (
                                <div className="cart-actions">
                                    <button className="clear-cart" onClick={clearCart}>
                                        Vaciar Carrito
                                    </button>
                                    <button className="checkout-btn" onClick={() => handleProcesarPago()}>
                                        Proceder al Pago
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
