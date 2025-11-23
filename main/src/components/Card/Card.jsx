
import { useCart } from '../../context/CartContext';
import { useCard } from '../../hooks/useCard';
import './Card.less'

export default function Card({ searchTerm }) {

    const { filteredData, data } = useCard(searchTerm);
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    if (!data || data.length === 0) {
        return <div className='error'>No hay datos disponibles en el JSON</div>;
    }

    if ( filteredData.length === 0) {
        return (
            <div className='cards__no-results'>
                <h3>🔍 No se encontraron productos</h3>
                <p>No hay resultados para "<strong>{searchTerm}</strong>"</p>
                <p>Intenta con otros términos de búsqueda.</p>
            </div>
        );
    }
    
    return (
        <div className="cards-section">          
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
                    <div key={dataCard.id} className='cards-container'>
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
                        <button
                            className='cards-container__btn'
                            onClick={() => handleAddToCart(dataCard)}>Añadir al Carrito</button>
                    </div>
                ))}
            </div>
        </div>
    );
}