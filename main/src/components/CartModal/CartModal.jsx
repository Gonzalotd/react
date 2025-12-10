import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectIsCartOpen,
  selectTotalItems,
  selectTotalPrice,
  toggleCart,
  removeFromCart,
  updateQuantity,
  clearCart
} from '../../redux/slices/cartSlice';
import { AiOutlineClose, AiOutlineShoppingCart } from 'react-icons/ai';
import "./CartModal.css";

export const CartModal = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);

  if (!isCartOpen) {
    return null;
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(toggleCart());
    }
  };

  const handleQuantityChange = (id, currentQuantity, delta) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  return (
    <>
      <div className="cart-overlay" onClick={handleOverlayClick} />
      
      <div className="cart-modal">
        <div className="cart-header">
          <h2>
            <AiOutlineShoppingCart />
            Carrito ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})
          </h2>
          <button className="cart-close-btn" onClick={() => dispatch(toggleCart())}>
            <AiOutlineClose />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Tu carrito está vacío</p>
              <button className="continue-shopping" onClick={() => dispatch(toggleCart())}>
                Seguir Comprando
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.quantity}`} className="cart-item">
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
                            onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                            className="quantity-btn"
                          >
                            -
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                            className="quantity-btn"
                          >
                            +
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
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Total productos:</span>
                  <span>{totalItems}</span>
                </div>
                <div className="summary-row total">
                  <span>Total a pagar:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="cart-actions">
                  <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>
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
                  
                  <button className="continue-shopping" onClick={() => dispatch(toggleCart())}>
                    Seguir Comprando
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};