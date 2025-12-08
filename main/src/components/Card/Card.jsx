
// import { useLocation, useNavigate } from 'react-router';
// import { useCart } from '../../context/CartContext';
// import { useCard } from '../../hooks/useCard';
// import './Card.less'
// import { useColor } from '../../context/GeneralContext';

// export default function Card({ searchTerm }) {

//     const { filteredData, data } = useCard(searchTerm);
//     const { addToCart } = useCart();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { user, setLoginRedirect } = useColor();



//     const handleAddToCart = (product) => {
//         if(!user) {
//             setLoginRedirect(location.pathname);
//             navigate('/login');
//             return;
//         }
//         addToCart(product);
//     };

//     const handleDetailProduct = (product) => {
//         if ( !user ) {
//             setLoginRedirect(location.pathname);
//             navigate('/login');
//             return;
//         }
//         navigate(`/product/${product.id}`);
//     }

//     if (!data || data.length === 0) {
//         return <div className='error'>No hay datos disponibles en el JSON</div>;
//     }

//     if ( filteredData.length === 0) {
//         return (
//             <div className='cards__no-results'>
//                 <h3>🔍 No se encontraron productos</h3>
//                 <p>No hay resultados para "<strong>{searchTerm}</strong>"</p>
//                 <p>Intenta con otros términos de búsqueda.</p>
//             </div>
//         );
//     }
    
//     return (
//         <div className="cards-section">          
//             {searchTerm && (
//                 <div className="cards__search-info">
//                     <p>
//                         Se encontraron <strong>{filteredData.length}</strong> 
//                         {filteredData.length === 1 ? ' producto' : ' productos'} 
//                         para "<strong>{searchTerm}</strong>"
//                     </p>
//                 </div>
//             )}
            
//             <div className="cards">
//                 {filteredData.map((dataCard) => (
//                     <div key={dataCard.id} className='cards-container' id={dataCard.id}>
//                         <figure className='cards-container__imagen'>
//                             <img 
//                                 src={dataCard.image} 
//                                 alt={dataCard.title}
//                                 loading="lazy"
//                                 className='cards-container__photos'
//                                 onError={(e) => {
//                                     e.target.src = `https://picsum.photos/300/400?random=${dataCard.id}`;
//                                 }}
//                             />
//                         </figure>
//                         <span className='cards-container__category'>{dataCard.category}</span>
//                         <h3 className='cards-container__title'>{dataCard.title}</h3>
//                         <p className='cards-container__description'>{dataCard.description}</p>
//                         <span className='cards-container__price'>${dataCard.price}</span>
//                         {user && (
//                             <>
//                             <button
//                                 className='cards-container__btn'
//                                 onClick={() => handleDetailProduct(dataCard)}>Mas Detalles</button>                    
//                             <button
//                                 className='cards-container__btn'
//                                 onClick={() => handleAddToCart(dataCard)}>Añadir al Carrito</button>
//                             </>
//                             )
//                         }
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// components/Card.jsx (VERSIÓN MODIFICADA)
import { useLocation, useNavigate } from 'react-router';
import { useCart } from '../../context/CartContext';
import { useCard } from '../../hooks/useCard';
import './Card.less'
import { useColor } from '../../context/GeneralContext';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import ProductModal from '../ProductsModal/ProductModal';

export default function Card({ searchTerm }) {
    const { filteredData, data, addProduct, updateProduct, deleteProduct } = useCard(searchTerm);
    const { addToCart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useColor();

    // Estados para el modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleAddToCart = (product) => {
        if(!user) {
            navigate('/login');
            return;
        }
        addToCart(product);
    };

    const handleDetailProduct = (product) => {
        navigate(`/product/${product.id}`);
    }

    // Funciones para admin
    const handleAddNewProduct = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            deleteProduct(id);
        }
    };

    const handleSubmitProduct = (productData) => {
        if (editingProduct) {
            // Actualizar producto existente
            updateProduct(editingProduct.id, {
                ...productData,
                price: parseFloat(productData.price),
                rating: editingProduct.rating || { rate: 0, count: 0 }
            });
        } else {
            // Crear nuevo producto
            addProduct({
                ...productData,
                price: parseFloat(productData.price),
                rating: { rate: 0, count: 0 }
            });
        }
        setIsModalOpen(false);
    };

    if (!data || data.length === 0) {
        return <div className='error'>No hay datos disponibles</div>;
    }

    if (filteredData.length === 0) {
        return (
            <div className='cards__no-results'>
                <h3>🔍 No se encontraron productos</h3>
                <p>No hay resultados para "<strong>{searchTerm}</strong>"</p>
                <p>Intenta con otros términos de búsqueda.</p>
                
                {user?.rol === 'admin' && (
                    <button 
                        className="btn-add-product"
                        onClick={handleAddNewProduct}
                    >
                        <FiPlus /> Agregar Producto
                    </button>
                )}
            </div>
        );
    }
    
    return (
        <div className="cards-section">
            {/* Botón flotante para admin */}
            {user?.rol === 'admin' && (
                <button 
                    className="floating-admin-btn"
                    onClick={handleAddNewProduct}
                    title="Agregar nuevo producto"
                >
                    <FiPlus size={24} />
                </button>
            )}
            
            {/* Modal para crear/editar productos */}
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitProduct}
                product={editingProduct}
            />
            
            {searchTerm && (
                <div className="cards__search-info">
                    <p>
                        Se encontraron <strong>{filteredData.length}</strong> 
                        {filteredData.length === 1 ? ' producto' : ' productos'} 
                        para "<strong>{searchTerm}</strong>"
                    </p>
                </div>
            )}
            
            <div className="cards">
                {filteredData.map((dataCard) => (
                    <div key={dataCard.id} className='cards-container' id={dataCard.id}>                       
                        {user?.rol === 'admin' && (
                            <div className="admin-actions">
                                <button 
                                    className="btn-edit"
                                    onClick={() => handleEditProduct(dataCard)}
                                    title="Editar producto"
                                >
                                    <FiEdit />
                                </button>
                                <button 
                                    className="btn-delete"
                                    onClick={() => handleDeleteProduct(dataCard.id)}
                                    title="Eliminar producto"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        )}
                        
                        <figure className='cards-container__imagen'>
                            <img 
                                src={dataCard.image} 
                                alt={dataCard.title}
                                loading="lazy"
                                className='cards-container__photos'
                                onError={(e) => {
                                    e.target.src = `https://picsum.photos/300/400?random=${dataCard.id}`;
                                }}
                            />
                        </figure>
                        <span className='cards-container__category'>{dataCard.category}</span>
                        <h3 className='cards-container__title'>{dataCard.title}</h3>
                        <p className='cards-container__description'>{dataCard.description}</p>
                        <span className='cards-container__price'>${dataCard.price}</span>
                        
                        <div className="cards-container__rating">
                            ⭐ {dataCard.rating?.rate || 0} ({dataCard.rating?.count || 0} reseñas)
                        </div>
                        
                        {user && (
                            <>
                            <button
                                className='cards-container__btn'
                                onClick={() => handleDetailProduct(dataCard)}>Mas Detalles</button>                    
                            <button
                                className='cards-container__btn'
                                onClick={() => handleAddToCart(dataCard)}>Añadir al Carrito</button>
                            </>
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}