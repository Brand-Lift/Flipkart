export interface Product {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  stockStatus: 'In Stock' | 'Out of Stock' | 'Limited Stock';
  currentPrice: number;
  originalPrice: number;
  discount: number;
  description: string;
  image: string;
}
export interface CartItem extends Product { quantity: number; }
export interface CustomerDetails {
  fullName: string; mobileNumber: string; email: string;
  address: string; city: string; state: string; pincode: string;
}
export interface CartContextType {
  cart: CartItem[]; addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void; updateQuantity: (id: string, q: number) => void;
  clearCart: () => void; cartCount: number; cartTotal: number;
}
