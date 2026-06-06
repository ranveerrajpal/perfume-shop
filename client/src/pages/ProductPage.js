import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { apiFetch } from '../api';
import './ProductPage.css';

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="star-input">
      {[1,2,3,4,5].map(n => (
        <button
          key={n}
          type="button"
          className={`star-input__star ${n <= (hovered || value) ? 'star-input__star--filled' : ''}`}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
        >★</button>
      ))}
    </div>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  // Review form
  const [form, setForm] = useState({ author: '', rating: 5, title: '', body: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    Promise.all([
      apiFetch(`/api/products/${id}`).then(r => r.json()),
      apiFetch(`/api/products/${id}/reviews`).then(r => r.json())
    ]).then(([prod, revs]) => {
      setProduct(prod);
      setSelectedSize(prod.sizes?.[prod.sizes.length - 1]);
      setReviews(revs);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Discover ${product.name} by ${product.brand}`);
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await apiFetch(`/api/products/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const newReview = await res.json();
      setReviews(prev => [newReview, ...prev]);
      setSubmitted(true);
      setForm({ author: '', rating: 5, title: '', body: '' });
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  if (loading) return (
    <div className="pp-loading">
      <div className="loading-dots"><span/><span/><span/></div>
    </div>
  );

  if (!product) return (
    <div className="pp-error">
      <h2>Product not found</h2>
      <button onClick={() => navigate('/')}>Back to collection</button>
    </div>
  );

  const avgRating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : product.rating;

  return (
    <div className="pp">
      {/* Breadcrumb */}
      <div className="pp__breadcrumb">
        <button onClick={() => navigate('/')}>Collection</button>
        <span>›</span>
        <span>{product.name}</span>
      </div>

      {/* Main product section */}
      <section className="pp__main">
        {/* Gallery */}
        <div className="pp__gallery">
          <div className="pp__thumbnails">
            {product.images.map((img, i) => (
              <button
                key={i}
                className={`pp__thumb ${i === activeImg ? 'pp__thumb--active' : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={img} alt={`${product.name} ${i+1}`} />
              </button>
            ))}
          </div>
          <div className="pp__main-img-wrap">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className="pp__main-img"
              key={activeImg}
            />
            {product.badge && <span className="pp__badge">{product.badge}</span>}
          </div>
        </div>

        {/* Info */}
        <div className="pp__info">
          <p className="pp__brand">{product.brand}</p>
          <h1 className="pp__name">{product.name}</h1>
          <p className="pp__tagline">{product.tagline}</p>

          <div className="pp__rating-row">
            <span className="pp__stars">{'★'.repeat(Math.round(avgRating))}{'☆'.repeat(5 - Math.round(avgRating))}</span>
            <span className="pp__rating-num">{avgRating.toFixed(1)}</span>
            <a href="#reviews" className="pp__review-link">{reviews.length} reviews</a>
          </div>

          <p className="pp__price">${selectedSize?.price || product.price}</p>

          <p className="pp__desc">{product.description}</p>

          {/* Notes */}
          <div className="pp__notes">
            <h3 className="pp__notes-title">Fragrance Notes</h3>
            <div className="pp__notes-grid">
              {[['Top', product.notes?.top], ['Heart', product.notes?.middle], ['Base', product.notes?.base]].map(([label, notes]) => (
                notes?.length > 0 && (
                  <div key={label} className="pp__notes-group">
                    <p className="pp__notes-label">{label}</p>
                    <div className="pp__notes-tags">
                      {notes.map(n => <span key={n} className="pp__note-tag">{n}</span>)}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="pp__sizes">
            <p className="pp__sizes-label">Select Size</p>
            <div className="pp__sizes-options">
              {product.sizes?.map(size => (
                <button
                  key={size.ml}
                  className={`pp__size-btn ${selectedSize?.ml === size.ml ? 'pp__size-btn--active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  <span className="pp__size-ml">{size.ml} ml</span>
                  <span className="pp__size-price">${size.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pp__actions">
            <button className={`pp__add-btn ${added ? 'pp__add-btn--added' : ''}`} onClick={handleAddToCart}>
              {added ? '✓ Added to Bag' : 'Add to Bag'}
            </button>
            <button className="pp__wishlist-btn" aria-label="Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </button>
          </div>

          {/* Share */}
          <div className="pp__share">
            <p className="pp__share-label">Share this fragrance</p>
            <div className="pp__share-btns">
              {[
                { id: 'twitter', label: 'X / Twitter', icon: '𝕏' },
                { id: 'facebook', label: 'Facebook', icon: 'f' },
                { id: 'pinterest', label: 'Pinterest', icon: '𝐏' },
                { id: 'whatsapp', label: 'WhatsApp', icon: '●' }
              ].map(s => (
                <button key={s.id} className="pp__share-btn" onClick={() => handleShare(s.id)} title={s.label}>
                  {s.icon}
                </button>
              ))}
              <button className="pp__share-btn pp__share-copy" onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }} title="Copy link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="pp__reviews" id="reviews">
        <div className="pp__reviews-inner">
          <div className="pp__reviews-header">
            <h2 className="pp__reviews-title">Customer Reviews</h2>
            <div className="pp__reviews-summary">
              <span className="pp__reviews-avg">{avgRating.toFixed(1)}</span>
              <div>
                <div className="pp__reviews-stars">
                  {'★'.repeat(Math.round(avgRating))}{'☆'.repeat(5 - Math.round(avgRating))}
                </div>
                <p className="pp__reviews-count">Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>

          <div className="pp__reviews-body">
            {/* Review list */}
            <div className="pp__review-list">
              {reviews.length === 0 ? (
                <p className="pp__no-reviews">Be the first to share your experience.</p>
              ) : reviews.map((r, i) => (
                <div key={r._id || i} className="pp__review-item">
                  <div className="pp__review-header">
                    <div className="pp__review-avatar">{r.author[0]}</div>
                    <div>
                      <p className="pp__review-author">{r.author}</p>
                      <p className="pp__review-date">{new Date(r.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="pp__review-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                  </div>
                  <h4 className="pp__review-title">{r.title}</h4>
                  <p className="pp__review-body">{r.body}</p>
                </div>
              ))}
            </div>

            {/* Write review form */}
            <div className="pp__review-form-wrap">
              <h3 className="pp__form-title">Write a Review</h3>
              {submitted ? (
                <div className="pp__form-success">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <p>Thank you for your review.</p>
                  <button onClick={() => setSubmitted(false)} className="pp__form-another">Write another</button>
                </div>
              ) : (
                <form className="pp__review-form" onSubmit={handleReviewSubmit}>
                  <div className="pp__form-row">
                    <label>Your Name</label>
                    <input
                      value={form.author}
                      onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                      placeholder="e.g. Sophie L."
                      required
                    />
                  </div>
                  <div className="pp__form-row">
                    <label>Rating</label>
                    <StarRating value={form.rating} onChange={r => setForm(f => ({ ...f, rating: r }))} />
                  </div>
                  <div className="pp__form-row">
                    <label>Review Title</label>
                    <input
                      value={form.title}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      placeholder="Summarize your experience"
                      required
                    />
                  </div>
                  <div className="pp__form-row">
                    <label>Your Review</label>
                    <textarea
                      value={form.body}
                      onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                      placeholder="What did you love? How does it wear?"
                      rows={5}
                      required
                    />
                  </div>
                  <button type="submit" className="pp__form-submit" disabled={submitting}>
                    {submitting ? 'Submitting…' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
