import { useDispatch } from "react-redux"; 
import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import { useLogin } from "../../hooks/useLogin";

export const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const { user } = useLogin();

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    };

    const incrementQuantity = () => {
        dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
    };

    const decrementQuantity = () => {
        console.log("item.id", item.id, item.quantity - 1);
        dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    };

    const handleRemove = () => {
        dispatch(removeFromCart(item.id));
    };

    const itemSubtotal = (item.price * item.quantity).toFixed(2);

    return (
        <div className="cart-item">
            <img 
                src={item.image} 
                alt={item.title}
                className="cart-item-image"
                onError={(e) => {
                    e.target.src = `https://picsum.photos/80/80?random=${item.id}`;
                }}
            />
            
            <div className="cart-item-details">
                <h4 className="cart-item-title">{item.title}</h4>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                
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
                            onClick={handleRemove}
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