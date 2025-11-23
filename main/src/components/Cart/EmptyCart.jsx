import { useCart } from '../../context/CartContext';
import './Cart.less';

export const EmptyCart = () => {

    const { closeCart } = useCart();

    return (
        <div className="cart-empty">
            <button className="cart-close" onClick={closeCart}>✕</button>
            <h5>Tu carrito está vacío</h5>
            <p>Agrega algunos productos para verlos aquí</p>
            <button className="continue-shopping" onClick={closeCart}>
                Continuar comprando
            </button>
        </div>
    )
}