import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice, validateEmail, validateMobile, validatePincode } from '../utils/validators';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart, cartCount } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName:'', mobileNumber:'', email:'', address:'', city:'', state:'', pincode:'' });
  const [errors, setErrors] = useState<any>({});
  const [confirmed, setConfirmed] = useState(false);
  const [success, setSuccess] = useState(false);
  const validate = () => {
    let e: any = {};
    if(!form.fullName) e.fullName = 'Required';
    if(!validateMobile(form.mobileNumber)) e.mobileNumber = 'Invalid Mobile';
    if(!validateEmail(form.email)) e.email = 'Invalid Email';
    if(!form.address) e.address = 'Required';
    if(!validatePincode(form.pincode)) e.pincode = 'Invalid Pincode';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleOrder = () => { if(validate() && confirmed) setSuccess(true); };
  if(cart.length === 0 && !success) return <div style={{textAlign:'center', padding:'100px'}}><h2>Empty Cart</h2><Link to="/">Shop Now</Link></div>;
  return (
    <div style={{background:'#f1f3f6', minHeight:'100vh'}}>
      <header className="header"><div className="header-content"><Link to="/" className="brand">FLIPKART</Link> <span style={{color:'white'}}>Checkout ({cartCount})</span></div></header>
      <main className="checkout-container">
        <div>
          <section className="checkout-section">
            <h2 className="section-title">Order Summary</h2>
            {cart.map(item => (
              <div key={item.id} style={{display:'flex', gap:'20px', padding:'15px 0', borderBottom:'1px solid #eee'}}>
                <img src={item.image} style={{width:'60px'}} />
                <div style={{flex:1}}><h4>{item.name}</h4>
                  <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
                    <button onClick={()=>updateQuantity(item.id, item.quantity-1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={()=>updateQuantity(item.id, item.quantity+1)}>+</button>
                    <button onClick={()=>removeFromCart(item.id)} style={{color:'red', marginLeft:'20px'}}>Remove</button>
                  </div>
                </div>
                <b>{formatPrice(item.currentPrice * item.quantity)}</b>
              </div>
            ))}
          </section>
          <section className="checkout-section">
            <h2 className="section-title">Delivery Details</h2>
            <div className="form-grid">
              <div className="form-group"><input placeholder="Full Name" onChange={e=>setForm({...form, fullName:e.target.value})}/>{errors.fullName && <span style={{color:'red', fontSize:'12px'}}>{errors.fullName}</span>}</div>
              <div className="form-group"><input placeholder="Mobile Number" onChange={e=>setForm({...form, mobileNumber:e.target.value})}/>{errors.mobileNumber && <span style={{color:'red', fontSize:'12px'}}>{errors.mobileNumber}</span>}</div>
              <div className="form-group"><input placeholder="Email" onChange={e=>setForm({...form, email:e.target.value})}/>{errors.email && <span style={{color:'red', fontSize:'12px'}}>{errors.email}</span>}</div>
              <div className="form-group"><input placeholder="Pincode" onChange={e=>setForm({...form, pincode:e.target.value})}/>{errors.pincode && <span style={{color:'red', fontSize:'12px'}}>{errors.pincode}</span>}</div>
              <div className="form-group" style={{gridColumn:'span 2'}}><input placeholder="Address" onChange={e=>setForm({...form, address:e.target.value})}/></div>
            </div>
          </section>
        </div>
        <aside>
          <div className="checkout-section">
            <h2 className="section-title">Price Details</h2>
            <div style={{display:'flex', justifyContent:'space-between', margin:'10px 0'}}><span>Total Amount</span><b>{formatPrice(cartTotal)}</b></div>
            <div style={{background:'#fff9e6', padding:'15px', border:'1px solid #ffeeba', color:'#856404', fontSize:'13px', margin:'15px 0'}}>
              "Please confirm your order only after completing your payment. Orders that are not properly completed may not be processed."
            </div>
            <label style={{display:'flex', gap:'10px', fontSize:'12px'}}><input type="checkbox" onChange={e=>setConfirmed(e.target.checked)}/> I confirm that I have completed the payment process.</label>
            <button className="btn-place-order" style={{marginTop:'20px'}} disabled={!confirmed} onClick={handleOrder}>PLACE ORDER</button>
          </div>
        </aside>
      </main>
      {success && <div className="modal-overlay"><div className="modal-content"><h2>Your Order Has Been Placed Successfully</h2><p>Estimated delivery within 2 days.</p><button onClick={()=>{clearCart(); navigate('/');}} style={{background:'#2874f0', color:'white', padding:'10px 20px', marginTop:'20px', border:'none'}}>Continue Shopping</button></div></div>}
    </div>
  );
};
export default CheckoutPage;
