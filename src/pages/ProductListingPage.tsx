import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/validators';
import { Link, useNavigate } from 'react-router-dom';

const ProductListingPage: React.FC = () => {
  const { addToCart, cartCount } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
    const categories = ['All', ...new Set(products.map(p => p.category))];
  const filtered = useMemo(() => products.filter(p => (cat === 'All' || p.category === cat) && p.name.toLowerCase().includes(search.toLowerCase())), [search, cat]);

  return (
    <div className="plp-wrapper">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="brand">FLIPKART<span>Explore Plus</span></Link>
          <input type="text" className="search-input" placeholder="Search for products..." value={search} onChange={(e)=>setSearch(e.target.value)} />
          <Link to="/checkout" className="brand" style={{fontSize:'16px'}}>🛒 Cart <span style={{display:'inline', background:'orange', padding:'2px 6px', borderRadius:'50%'}}>{cartCount}</span></Link>
        </div>
      </header>
            <main className="container" style={{maxWidth:'1240px', margin:'0 auto', padding:'0 16px'}}>
        <div style={{display:'flex', gap:'10px', overflowX:'auto', padding:'20px 0'}}>
          {categories.map(c => (
            <button key={c} onClick={()=>setCat(c)} style={{padding:'8px 20px', background:cat===c?'#2874f0':'white', color:cat===c?'white':'black', borderRadius:'20px', border:'1px solid #ddd', whiteSpace:'nowrap'}}>{c}</button>
          ))}
        </div>
        <div className="product-grid">
          {filtered.map(p => (
            <div key={p.id} className="product-card">
              <div className="product-image-wrapper"><img src={p.image} alt={p.name} className="product-image" /></div>
                            <div style={{flexGrow:1, marginTop:'15px'}}>
                <h3 style={{fontSize:'14px', fontWeight:500, height:'40px', overflow:'hidden'}}>{p.name}</h3>
                <div style={{margin:'8px 0'}}><span style={{background:'green', color:'white', padding:'2px 6px', borderRadius:'4px', fontSize:'12px'}}>{p.rating} ★</span> <span style={{color:'#878787', fontSize:'12px'}}>({p.reviews.toLocaleString()})</span></div>
                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <span style={{fontSize:'18px', fontWeight:700}}>{formatPrice(p.currentPrice)}</span>
                  <span style={{textDecoration:'line-through', color:'#878787', fontSize:'14px'}}>{formatPrice(p.originalPrice)}</span>
                  <span style={{color:'green', fontWeight:600, fontSize:'13px'}}>{p.discount}% off</span>
                </div>
              </div>
                            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginTop:'15px'}}>
                <button onClick={()=>addToCart(p)} style={{background:'#ff9f00', color:'white', padding:'10px', fontWeight:600, borderRadius:'2px'}}>ADD TO CART</button>
                <button onClick={()=>{addToCart(p); navigate('/checkout')}} style={{background:'#fb641b', color:'white', padding:'10px', fontWeight:600, borderRadius:'2px'}}>BUY NOW</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer style={{background:'#212121', color:'white', padding:'40px 20px', marginTop:'60px', textAlign:'center'}}>
        <p>© 2026 FLIPKART CLONE - PRODUCTION QUALITY REACT APP</p>
      </footer>
    </div>
  );
};
export default ProductListingPage;
