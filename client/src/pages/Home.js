import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { apiFetch } from '../api';
import './Home.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    apiFetch('/api/products')
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filtered = activeFilter === 'All' ? products : products.filter(p => p.category === activeFilter);

  return (
    <main className="home">
      {/* Hero Banner */}
      <section className="hero">
        <div className="hero__bg">
          <img src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1600" alt="" className="hero__bg-img" />
          <div className="hero__grain" />
          <div className="hero__overlay" />
        </div>
        <div className="hero__content">
          <p className="hero__eyebrow">New Collection — Spring 2025</p>
          <h1 className="hero__title">
            <span>The Art of</span>
            <em>Invisible Beauty</em>
          </h1>
          <p className="hero__subtitle">
            Rare ingredients. Singular compositions.<br />
            Fragrances that become your second skin.
          </p>
          <div className="hero__ctas">
            <a href="#collection" className="hero__btn hero__btn--primary">Explore Collection</a>
            <a href="#collection" className="hero__btn hero__btn--ghost">Our Story</a>
          </div>
        </div>
        <div className="hero__scroll">
          <span className="hero__scroll-line" />
          <span className="hero__scroll-text">Scroll</span>
        </div>
      </section>

      {/* Brand Ribbon */}
      <div className="ribbon">
        {['Free shipping over $150', 'Complimentary samples', 'Secure packaging', 'Worldwide delivery', 'Free shipping over $150', 'Complimentary samples', 'Secure packaging', 'Worldwide delivery'].map((t, i) => (
          <React.Fragment key={i}>
            <span className="ribbon__text">{t}</span>
            <span className="ribbon__dot">◆</span>
          </React.Fragment>
        ))}
      </div>

      {/* Collection */}
      <section className="collection" id="collection">
        <div className="collection__header">
          <p className="collection__eyebrow">Our Creations</p>
          <h2 className="collection__title">The Collection</h2>
          <p className="collection__desc">
            Each fragrance is a collaboration between master perfumers and rare ingredients<br />
            sourced from the world's most storied houses.
          </p>
        </div>

        <div className="collection__filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="collection__loading">
            <div className="loading-dots">
              <span /><span /><span />
            </div>
          </div>
        ) : (
          <div className="collection__grid">
            {filtered.map((product, i) => (
              <div key={product._id} style={{ animationDelay: `${i * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* About Banner */}
      <section className="about" id="about">
        <div className="about__img-col">
          <img src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800" alt="Perfume atelier" className="about__img about__img--top" />
          <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600" alt="Perfume bottles" className="about__img about__img--bottom" />
        </div>
        <div className="about__content">
          <p className="about__eyebrow">The Maison</p>
          <h2 className="about__title">Crafted with<br /><em>Obsession</em></h2>
          <p className="about__body">
            Founded in Grasse, France, Maison Éclat was born from a singular obsession: 
            that a fragrance should tell a story no words can capture. Our perfumers spend 
            years in pursuit of olfactory perfection — testing, discarding, refining — until 
            each composition achieves the luminous balance we call <em>éclat</em>.
          </p>
          <p className="about__body">
            We source exclusively from sustainable farms and ethical suppliers. Every bottle 
            contains at least 25% pure perfume concentration, ensuring a depth and longevity 
            that mass-market fragrances simply cannot match.
          </p>
          <a href="#collection" className="about__link">
            Discover our philosophy
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <p className="footer__logo">MAISON ÉCLAT</p>
            <p className="footer__tagline">Perfumerie — Since 1947</p>
            <p className="footer__copy">© 2025 Maison Éclat. All rights reserved.</p>
          </div>
          <div className="footer__links">
            <div className="footer__col">
              <h4>Discover</h4>
              <a href="#collection">Collection</a>
              <a href="#about">The Maison</a>
              <a href="#about">Ateliers</a>
              <a href="#about">Journal</a>
            </div>
            <div className="footer__col">
              <h4>Service</h4>
              <a href="#about">Shipping</a>
              <a href="#about">Returns</a>
              <a href="#about">FAQ</a>
              <a href="#about">Contact</a>
            </div>
            <div className="footer__col">
              <h4>Follow</h4>
              <a href="#about">Instagram</a>
              <a href="#about">Pinterest</a>
              <a href="#about">Newsletter</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
