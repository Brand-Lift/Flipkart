export const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validateMobile = (mobile: string) => /^[0-9]{10}$/.test(mobile);
export const validatePincode = (pincode: string) => /^[0-9]{6}$/.test(pincode);
export const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(price);
