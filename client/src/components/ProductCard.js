import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <article className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
      <div className="product-card__image-wrap">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-card__image product-card__image--main"
        />
        <img
          src={product.images[1] || product.images[0]}
          alt={product.name}
          className="product-card__image product-card__image--hover"
        />
        {product.badge && (
          <span className="product-card__badge">{product.badge}</span>
        )}
        <div className="product-card__overlay">
          <button className="product-card__cta" onClick={e => { e.stopPropagation(); navigate(`/product/${product._id}`); }}>
            Discover
          </button>
        </div>
      </div>
      <div className="product-card__info">
        <p className="product-card__brand">{product.brand}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__tagline">{product.tagline}</p>
        <div className="product-card__footer">
          <div className="product-card__rating">
            <span className="product-card__stars">
              {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
            </span>
            <span className="product-card__review-count">({product.reviewCount})</span>
          </div>
          <span className="product-card__price">from ${product.sizes[0].price}</span>
        </div>
        <p className="product-card__category">{product.category}</p>
      </div>
    </article>
  );
}
