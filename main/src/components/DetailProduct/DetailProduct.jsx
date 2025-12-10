import { useNavigate, useParams } from "react-router"
import { useDispatch } from "react-redux";
import { addToCart } from '../../redux/slices/cartSlice';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './DetailProduct.less'; 
import { useProducts } from "../../hooks/useProducts";
import { useColor } from "../../context/GeneralContext";

export default function DetailProduct() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { data } = useProducts('');
    const dispatch = useDispatch();
    const { user } = useColor();
    const product = data.find(item => parseInt(item.id) === parseInt(productId));

    console.log("Detalle producto ID:", productId);

    if (!user) {
        navigate('/');
        return null;
    }

    if (!product) {
        return (
            <>
                <Header />
                <div className="product-not-found">
                    <h2>No tenemos detalle para el producto</h2>
                    <button onClick={() => navigate('/')}>Volver al Inicio</button>
                </div>
                <Footer />
            </>
        );
    }

    const handleAddToCart = () => {
        console.log('➕ Agregando al carrito desde detalle:', product);
        dispatch(addToCart(product));
    };

    return (
        <>
            <Header />
            <div className="detail-product">
                <div className="detail-product__container">
                    <div className="detail-product__image">
                        <img 
                            src={product.image} 
                            alt={product.title}
                            onError={(e) => {
                                e.target.src = `https://picsum.photos/500/600?random=${product.id}`;
                            }}
                        />
                    </div>
                    
                    <div className="detail-product__info">
                        <span className="detail-product__category">{product.category}</span>
                        <h1 className="detail-product__title">{product.title}</h1>
                        <p className="detail-product__description">{product.description}</p>
                        
                        <div className="detail-product__price">
                            ${product.price.toFixed(2)}
                        </div>
                        
                        <div className="detail-product__actions">
                            <button 
                                className="detail-product__btn detail-product__btn--primary"
                                onClick={handleAddToCart}
                            >
                                Añadir al Carrito
                            </button>
                            <button 
                                className="detail-product__btn detail-product__btn--secondary"
                                onClick={() => navigate(-1)}
                            >
                                Volver Atrás
                            </button>
                        </div>
                        
                        <div className="detail-product__features">
                            <h3>Características</h3>
                            <ul>
                                <li>Categoría: {product.category}</li>
                                <li>Producto ID: {product.id}</li>
                                {product.rating && (
                                    <>
                                        <li>Valoración: {product.rating.rate} / 5</li>
                                        <li>Reseñas: {product.rating.count}</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}