import { useCart } from "../../context/CartContext"
import { useLogin } from "../../hooks/useLogin";

export const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCart();
    const { user } = useLogin();

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        updateQuantity(item.id, newQuantity);
    };

    const incrementQuantity = () => {
        updateQuantity(item.id, item.quantity + 1);
    };

    const decrementQuantity = () => {
        console.log("item.id", item.id, item.quantity - 1)
        updateQuantity(item.id, item.quantity - 1);
    };

    const itemSubtotal = (item.price * item.quantity).toFixed(2);

    return (
        <div className="cart-item">
            <img 
                src={item.image} 
                alt={item.title}
                className="cart-item-image"
            />
            
            <div className="cart-item-details">
                <h4 className="cart-item-title">{item.title}</h4>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">${item.price}</p>
                
                {user && (
                    <div className="cart-item-actions">
                        <button 
                            className="quantity-btn"
                            onClick={decrementQuantity}
                            disabled={item.quantity <= 1}
                        >
                            -
                        </button>
                        
                        <input 
                            type="number" 
                            value={item.quantity}
                            onChange={handleQuantityChange}
                            min="1"
                            className="quantity-input"
                        />
                        
                        <button 
                            className="quantity-btn"
                            onClick={incrementQuantity}
                        >
                            +
                        </button>
                        
                        <button 
                            className="remove-btn"
                            onClick={() => removeFromCart(item.id)}
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </div>
            
            <div className="cart-item-subtotal">
            ${itemSubtotal}
            </div>
        </div>
    );
};
