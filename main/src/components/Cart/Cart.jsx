import './Cart.css';
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus, AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectIsCartOpen,
  selectTotalItems,
  selectTotalPrice,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
} from '../../redux/slices/cartSlice';

export default function Cart() {
  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h2>
            <AiOutlineShoppingCart />
            Carrito ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})
          </h2>
          <button className="cart-close-btn" onClick={() => dispatch(toggleCart())}>
            <AiOutlineClose />
          </button>
        </div>
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
                        onClick={() => dispatch(updateQuantity({ 
                          id: item.id, 
                          quantity: item.quantity - 1 
                        }))}
                        className="quantity-btn"
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ 
                          id: item.id, 
                          quantity: item.quantity + 1 
                        }))}
                        className="quantity-btn"
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => dispatch(removeFromCart(item.id))}
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

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span className="total-price">${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="cart-actions">
              <button 
                onClick={() => dispatch(clearCart())}
                className="clear-cart-btn"
              >
                Vaciar Carrito
              </button>
              
              <button 
                className="checkout-btn"
                onClick={() => {
                  alert('¡Compra realizada!');
                  dispatch(clearCart());
                  dispatch(toggleCart());
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