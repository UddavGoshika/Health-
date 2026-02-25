import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './BuyMedicines.css';

// TypeScript Interfaces
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  imageUrl: string;
  category: string;
  brand: string;
  tags: string[];
  inStock: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface HealthCondition {
  id: string;
  name: string;
  icon: string;
  color: string;
}

// Mock Data
const mockHealthConditions: HealthCondition[] = [
  { id: '1', name: 'Diabetes Care', icon: '💙', color: '#4A90E2' },
  { id: '2', name: 'Cardiac Care', icon: '❤️', color: '#FF6B6B' },
  { id: '3', name: 'Stomach Care', icon: '🤢', color: '#51B7A1' },
  { id: '4', name: 'Pain Relief', icon: '😣', color: '#FFA726' },
  { id: '5', name: 'Liver Care', icon: '🍃', color: '#66BB6A' },
  { id: '6', name: 'Oral Care', icon: '🦷', color: '#29B6F6' },
  { id: '7', name: 'Respiratory', icon: '😮‍💨', color: '#AB47BC' },
  { id: '8', name: 'Sexual Health', icon: '💝', color: '#EC407A' },
  { id: '9', name: 'Elderly Care', icon: '👵', color: '#8D6E63' },
  { id: '10', name: 'Cold & Immunity', icon: '🤧', color: '#42A5F5' },
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Apollo Pharmacy Activated Charcoal Soap, 250 gm (2x125 gm)',
    description: 'Deep cleansing charcoal soap',
    price: 124.3,
    originalPrice: 177.5,
    discount: 30,
    imageUrl: 'https://images.apollo247.in/pub/media/catalog/product/a/p/apa0097_1-sep2023.jpg',
    category: 'Personal Care',
    brand: 'Apollo',
    tags: ['Buy 1 Get 1'],
    inStock: true
  },
  {
    id: '2',
    name: 'Nivea Men Fresh Active Deodorant Spray, 150 ml',
    description: 'Long lasting freshness',
    price: 149.5,
    originalPrice: 299,
    discount: 50,
    imageUrl: 'https://images.apollo247.in/pub/media/catalog/product/n/i/niv0123_2_1.jpg',
    category: 'Personal Care',
    brand: 'Nivea',
    tags: ['Bestseller'],
    inStock: true
  },
  {
    id: '3',
    name: 'Loreal Total Repair Serum, 80 ml',
    description: 'Hair repair serum',
    price: 219,
    originalPrice: 399,
    discount: 45,
    imageUrl: 'https://images.apollo247.in/pub/media/catalog/product/l/o/lor0419_1_.jpg',
    category: 'Hair Care',
    brand: 'Loreal',
    tags: ['Buy 3, +3% OFF'],
    inStock: true
  },
  {
    id: '4',
    name: 'Dabur Red Toothpaste Family Pack 350 gm',
    description: 'Ayurvedic toothpaste',
    price: 141.6,
    originalPrice: 283,
    discount: 50,
    imageUrl: 'https://images.apollo247.in/pub/media/catalog/product/0/3/0328_dabur_rtp_350g_carton.jpg',
    category: 'Oral Care',
    brand: 'Dabur',
    tags: ['Price Drop'],
    inStock: true
  },
  {
    id: '5',
    name: 'Lacto Calamine SPF 50 PA+++ Sunscreen Lotion, 50 gm',
    description: 'Sun protection',
    price: 199.5,
    originalPrice: 399,
    discount: 50,
    imageUrl: 'https://images.apollo247.in/pub/media/catalog/product/L/A/LAC0550_1-AUG23_1.jpg',
    category: 'Skin Care',
    brand: 'Lacto Calamine',
    tags: ['Buy 2, +3% OFF'],
    inStock: true
  }
];

const quickActions = [
  { id: 1, title: 'Get 20%* off on Medicines', desc: 'Upload Now', icon: '📄', color: '#E9FAEE', textColor: '#125525' },
  { id: 2, title: 'Doctor Appointment', desc: 'Book Now', icon: '👨‍⚕️', color: '#F1EDFD', textColor: '#3F267C' },
  { id: 3, title: 'Health Insurance', desc: 'Explore Plans', icon: '🛡️', color: '#FFF3D6', textColor: '#5C3F04' },
  { id: 4, title: 'Lab Tests', desc: 'AT HOME', icon: '🧪', color: '#FCEDF2', textColor: '#832541' },
];

const BuyMedicines: React.FC = () => {
  const location = useLocation();
  // State Management
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('cat');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [location.search]);

  // Cart Functions
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.product.price * item.quantity),
    0
  );

  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  // Filter products based on search and category
  useEffect(() => {
    let filtered = mockProducts;

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, activeCategory]);

  // Product Card Component
  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
      <div className="product-card">
        <div className="product-image-container">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x150?text=Product';
            }}
          />
          {product.tags.length > 0 && (
            <div className="product-tags">
              {product.tags.map((tag, index) => (
                <span key={index} className="product-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-pricing">
            <div className="current-price">₹{product.price.toFixed(2)}</div>
            <div className="original-price">MRP ₹{product.originalPrice.toFixed(2)}</div>
            <div className="discount">{product.discount}% off</div>
          </div>
          <div className="product-brand">{product.brand}</div>
        </div>

        <button
          className={`add-to-cart-btn ${!product.inStock ? 'out-of-stock' : ''}`}
          onClick={() => product.inStock && addToCart(product)}
          disabled={!product.inStock}
        >
          {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
        </button>
      </div>
    );
  };

  // Cart Component
  const Cart = () => {
    if (!isCartOpen) return null;

    return (
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
        <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <h2>🛒 Your Cart ({cartItemCount} items)</h2>
            <button className="close-cart" onClick={() => setIsCartOpen(false)}>×</button>
          </div>

          <div className="cart-items">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty</p>
                <p className="empty-cart-sub">Add some medicines to get started!</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.product.id} className="cart-item">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h4>{item.product.name}</h4>
                    <p className="cart-item-price">₹{item.product.price.toFixed(2)}</p>
                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-item-btn"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="cart-footer">
              <div className="cart-summary">
                <div className="cart-total-row">
                  <span>Subtotal:</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="cart-total-row">
                  <span>Delivery:</span>
                  <span>FREE</span>
                </div>
                <div className="cart-total-row grand-total">
                  <span>Total:</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="cart-actions">
                <button className="clear-cart-btn" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="checkout-btn">
                  Proceed to Checkout (₹{cartTotal.toFixed(2)})
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="buy-medicines-container">
      {/* Header */}
      <header className="main-header">
        <div className="header-top">
          <div className="logo">
            <span className="logo-icon">🏥</span>
            <span className="logo-text">Apollo Pharmacy</span>
          </div>

          <div className="search-container">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search Medicines, Health Products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="header-actions">
            <button
              className="cart-button"
              onClick={() => setIsCartOpen(true)}
            >
              <span className="cart-icon">🛒</span>
              <span className="cart-count">{cartItemCount}</span>
            </button>
            <button className="login-button">
              <span className="user-icon">👤</span>
              <span>Login</span>
            </button>
          </div>
        </div>

        <nav className="main-nav">
          <button className={`nav-item ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>
            All Products
          </button>
          <button className={`nav-item ${activeCategory === 'Personal Care' ? 'active' : ''}`} onClick={() => setActiveCategory('Personal Care')}>
            Personal Care
          </button>
          <button className={`nav-item ${activeCategory === 'Health Care' ? 'active' : ''}`} onClick={() => setActiveCategory('Health Care')}>
            Health Care
          </button>
          <button className={`nav-item ${activeCategory === 'Baby Care' ? 'active' : ''}`} onClick={() => setActiveCategory('Baby Care')}>
            Baby Care
          </button>
          <button className={`nav-item ${activeCategory === 'Oral Care' ? 'active' : ''}`} onClick={() => setActiveCategory('Oral Care')}>
            Oral Care
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">Buy Medicines and Essentials</h1>
          <p className="hero-subtitle">India's Largest Pharmacy Chain | Fastest Home Delivery</p>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions-section">
          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <div
                key={action.id}
                className="action-card"
                style={{ backgroundColor: action.color }}
              >
                <div className="action-icon">{action.icon}</div>
                <h3 className="action-title">{action.title}</h3>
                <p className="action-desc" style={{ color: action.textColor }}>{action.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Health Conditions */}
        <section className="health-conditions-section">
          <h2 className="section-title">Browse by Health Conditions</h2>
          <div className="health-conditions-grid">
            {mockHealthConditions.map((condition) => (
              <div
                key={condition.id}
                className="condition-card"
                style={{ borderColor: condition.color }}
              >
                <div
                  className="condition-icon"
                  style={{ backgroundColor: condition.color }}
                >
                  {condition.icon}
                </div>
                <h3 className="condition-name">{condition.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="products-section">
          <div className="section-header">
            <h2 className="section-title">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Products'}
            </h2>
            {filteredProducts.length > 0 && (
              <span className="product-count">{filteredProducts.length} products</span>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No products found for "{searchQuery}"</p>
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </button>
            </div>
          )}
        </section>

        {/* Banner */}
        <section className="banner-section">
          <div className="promo-banner">
            <div className="banner-content">
              <h2>Get 20% OFF on your first order!</h2>
              <p>Use code: APOLLO20</p>
              <button className="shop-now-btn">Shop Now</button>
            </div>
          </div>
        </section>
      </main>

      {/* Cart Component */}
      <Cart />

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Apollo Pharmacy</h3>
            <p>India's most trusted pharmacy</p>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>📞 1860-500-0101</p>
            <p>✉️ support@apollopharmacy.in</p>
          </div>
          <div className="footer-section">
            <h3>Download App</h3>
            <button className="app-download-btn">📱 Get it on Google Play</button>
            <button className="app-download-btn">📱 Download on App Store</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Apollo Pharmacy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BuyMedicines;