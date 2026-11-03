import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ArrowRight, ShoppingBag, AlertCircle, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SEOHead } from '../lib/seo';
import { getCartState, clearCart, CartState } from '../lib/cart-store';
import {
  validateName,
  validateEmail,
  validateStrict11Phone,
  validateRequired,
  validatePostalCode,
  validateSelect
} from '../lib/validation';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartState] = useState<CartState>(getCartState());

  // Form Fields (State field removed, postal code optional)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States'
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  const validateField = (fieldName: string, value: string): string => {
    switch (fieldName) {
      case 'fullName': {
        const res = validateName(value);
        return res.valid ? '' : res.message;
      }
      case 'email': {
        const res = validateEmail(value);
        return res.valid ? '' : res.message;
      }
      case 'phone': {
        // If phone is entered, enforce exact 11-digit validation matching contact form
        if (!value.trim()) return '';
        const res = validateStrict11Phone(value);
        return res.valid ? '' : res.message;
      }
      case 'address': {
        const res = validateRequired(value, 'Street address');
        return res.valid ? '' : res.message;
      }
      case 'city': {
        const res = validateRequired(value, 'City');
        return res.valid ? '' : res.message;
      }
      case 'postalCode': {
        const res = validatePostalCode(value, false);
        return res.valid ? '' : res.message;
      }
      case 'country': {
        const res = validateSelect(value, 'Please select a country');
        return res.valid ? '' : res.message;
      }
      default:
        return '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      fullName: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      postalCode: true,
      country: true
    });

    const newErrors: Record<string, string> = {
      fullName: validateField('fullName', formData.fullName),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      address: validateField('address', formData.address),
      city: validateField('city', formData.city),
      postalCode: validateField('postalCode', formData.postalCode),
      country: validateField('country', formData.country)
    };

    const activeErrors: Record<string, string> = {};
    Object.entries(newErrors).forEach(([k, v]) => {
      if (v) activeErrors[k] = v;
    });

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      const firstKey = Object.keys(activeErrors)[0];
      const el = document.getElementsByName(firstKey)[0];
      if (el) el.focus();
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate demo order processing
    setTimeout(() => {
      const demoId = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrderId(demoId);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      clearCart();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EFC6D8', '#6B4B6B', '#F6E0E6']
      });
    }, 800);
  };

  if (cartState.items.length === 0 && !orderConfirmed) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center space-y-4">
        <SEOHead title="Checkout" noIndex />
        <h1 className="font-heading text-3xl text-[#3E2F3F]">Your cart is empty</h1>
        <p className="text-xs text-[#3E2F3F]/70">Add items to your cart before proceeding to checkout.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#6B4B6B] text-white rounded-full text-xs font-semibold uppercase tracking-wider"
        >
          Explore Shop <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <SEOHead title="Checkout" description="Complete your Luméa order." noIndex />

      <section className="py-12 lg:py-16 bg-[#FFF7F7]">
        <div className="lumea-container">
          
          {!orderConfirmed ? (
            <div className="space-y-8">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#F6E0E6]">
                <div>
                  <h1 className="font-heading text-3xl text-[#3E2F3F]">
                    Checkout
                  </h1>
                  <p className="text-xs text-[#3E2F3F]/70 mt-1">
                    Complete your shipping details below.
                  </p>
                </div>
                <Link
                  to="/cart"
                  className="text-xs text-[#6B4B6B] hover:text-[#3E2F3F] flex items-center gap-1 font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Cart</span>
                </Link>
              </div>

              {/* 2-Column Checkout Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Form Left */}
                <div className="lg:col-span-7 bg-white rounded-[24px] border border-[#F6E0E6] p-6 sm:p-8 shadow-xs">
                  <form onSubmit={handlePlaceOrder} noValidate className="space-y-6">
                    
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h2 className="font-heading text-lg text-[#3E2F3F] pb-2 border-b border-[#F6E0E6]">
                        1. Contact Information
                      </h2>

                      <div>
                        <label className="block text-xs font-semibold text-[#3E2F3F] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="e.g. Maria Dupont"
                          aria-invalid={!!errors.fullName}
                          className={`w-full px-4 py-2.5 bg-[#FFF7F7] border ${
                            errors.fullName
                              ? 'border-red-400 ring-1 ring-red-400/30'
                              : 'border-[#EFC6D8] hover:border-[#6B4B6B]/60 focus:border-[#6B4B6B] focus:ring-2 focus:ring-[#6B4B6B]/15'
                          } rounded-[14px] text-xs text-[#3E2F3F] transition-all duration-200 focus:outline-none`}
                        />
                        {errors.fullName && (
                          <p className="text-[11px] text-red-500 font-medium mt-1 animate-in fade-in duration-150">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#3E2F3F] mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="you@example.com"
                            aria-invalid={!!errors.email}
                            className={`w-full px-4 py-2.5 bg-[#FFF7F7] border ${
                              errors.email
                                ? 'border-red-400 ring-1 ring-red-400/30'
                                : 'border-[#EFC6D8] hover:border-[#6B4B6B]/60 focus:border-[#6B4B6B] focus:ring-2 focus:ring-[#6B4B6B]/15'
                            } rounded-[14px] text-xs text-[#3E2F3F] transition-all duration-200 focus:outline-none`}
                          />
                          {errors.email && (
                            <p className="text-[11px] text-red-500 font-medium mt-1 animate-in fade-in duration-150">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#3E2F3F] mb-1">
                            Phone Number (Optional - 11 digits)
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="03001234567"
                            aria-invalid={!!errors.phone}
                            className={`w-full px-4 py-2.5 bg-[#FFF7F7] border ${
                              errors.phone
                                ? 'border-red-400 ring-1 ring-red-400/30'
                                : 'border-[#EFC6D8] hover:border-[#6B4B6B]/60 focus:border-[#6B4B6B] focus:ring-2 focus:ring-[#6B4B6B]/15'
                            } rounded-[14px] text-xs text-[#3E2F3F] transition-all duration-200 focus:outline-none`}
                          />
                          {errors.phone && (
                            <p className="text-[11px] text-red-500 font-medium mt-1 animate-in fade-in duration-150">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-4 pt-4 border-t border-[#F6E0E6]">
                      <h2 className="font-heading text-lg text-[#3E2F3F] pb-2 border-b border-[#F6E0E6]">
                        2. Shipping Address
                      </h2>

                      <div>
                        <label className="block text-xs font-semibold text-[#3E2F3F] mb-1">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="123 Radiant Botanical Way"
                          aria-invalid={!!errors.address}
                          className={`w-full px-4 py-2.5 bg-[#FFF7F7] border ${
                            errors.address
                              ? 'border-red-400 ring-1 ring-red-400/30'
                              : 'border-[#EFC6D8] hover:border-[#6B4B6B]/60 focus:border-[#6B4B6B] focus:ring-2 focus:ring-[#6B4B6B]/15'
                          } rounded-[14px] text-xs text-[#3E2F3F] transition-all duration-200 focus:outline-none`}
                        />
                        {errors.address && (
                          <p className="text-[11px] text-red-500 font-medium mt-1 animate-in fade-in duration-150">
                            {errors.address}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#3E2F3F] mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="San Francisco"
                            aria-invalid={!!errors.city}
                            className={`w-full px-4 py-2.5 bg-[#FFF7F7] border ${
                              errors.city
                                ? 'border-red-400 ring-1 ring-red-400/30'
                                : 'border-[#EFC6D8] hover:border-[#6B4B6B]/60 focus:border-[#6B4B6B] focus:ring-2 focus:ring-[#6B4B6B]/15'
                            } rounded-[14px] text-xs text-[#3E2F3F] transition-all duration-200 focus:outline-none`}
                          />
                          {errors.city && (
                            <p className="text-[11px] text-red-500 font-medium mt-1 animate-in fade-in duration-150">
                              {errors.city}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#3E2F3F] mb-1">
                            Postal / ZIP (Optional)
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="94107"
                            aria-invalid={!!errors.postalCode}
                            className={`w-full px-4 py-2.5 bg-[#FFF7F7] border ${
                              errors.postalCode
                                ? 'border-red-400 ring-1 ring-red-400/30'
                                : 'border-[#EFC6D8] hover:border-[#6B4B6B]/60 focus:border-[#6B4B6B] focus:ring-2 focus:ring-[#6B4B6B]/15'
                            } rounded-[14px] text-xs text-[#3E2F3F] transition-all duration-200 focus:outline-none`}
                          />
                          {errors.postalCode && (
                            <p className="text-[11px] text-red-500 font-medium mt-1 animate-in fade-in duration-150">
                              {errors.postalCode}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#3E2F3F] mb-1">
                          Country *
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-2.5 bg-[#FFF7F7] border ${
                            errors.country
                              ? 'border-red-400 ring-1 ring-red-400/30'
                              : 'border-[#EFC6D8] hover:border-[#6B4B6B]/60 focus:border-[#6B4B6B] focus:ring-2 focus:ring-[#6B4B6B]/15'
                          } rounded-[14px] text-xs text-[#3E2F3F] transition-all duration-200 focus:outline-none`}
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="France">France</option>
                          <option value="Germany">Germany</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-[#6B4B6B] hover:bg-[#583c58] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <span>Processing Demo Order...</span>
                        ) : (
                          <span>Complete Demo Order — ${cartState.total.toFixed(2)}</span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right: Order Summary Review */}
                <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#F6E0E6] p-6 sm:p-8 space-y-6 shadow-xs">
                  <h2 className="font-heading text-lg text-[#3E2F3F] pb-3 border-b border-[#F6E0E6]">
                    Order Summary ({cartState.itemCount} items)
                  </h2>

                  <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                    {cartState.items.map(item => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-[10px] object-cover bg-[#FDF6F8] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#3E2F3F] truncate">{item.product.name}</p>
                          <p className="text-[11px] text-[#79566E]">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-xs font-semibold text-[#3E2F3F]">
                          ${item.itemTotal.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-4 border-t border-[#F6E0E6] text-xs text-[#3E2F3F]/80">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${cartState.subtotal.toFixed(2)}</span>
                    </div>
                    {cartState.discount > 0 && (
                      <div className="flex justify-between text-[#6B4B6B] font-medium">
                        <span>Discount ({cartState.discountPercent}%)</span>
                        <span>-${cartState.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{cartState.shipping === 0 ? 'FREE' : `$${cartState.shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-[#3E2F3F] pt-2 border-t border-[#F6E0E6]">
                      <span>Total Due</span>
                      <span className="text-[#6B4B6B] text-base">${cartState.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* Order Confirmation Success Screen */
            <div className="bg-white rounded-[28px] border border-[#EFC6D8] p-8 sm:p-14 text-center max-w-xl mx-auto space-y-6 shadow-sm animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#F6E0E6] flex items-center justify-center text-[#6B4B6B] mx-auto">
                <CheckCircle2 className="w-10 h-10 text-[#6B4B6B]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#6B4B6B] font-bold">
                  Order Successfully Simulated
                </span>
                <h2 className="font-heading text-3xl text-[#3E2F3F]">
                  Thank You, {formData.fullName}!
                </h2>
                <p className="text-xs text-[#3E2F3F]/70">
                  Demo Confirmation Number: <strong className="text-[#6B4B6B]">{confirmedOrderId}</strong>
                </p>
              </div>

              <div className="p-4 bg-[#FFF7F7] border border-[#F6E0E6] rounded-[18px] text-left text-xs space-y-2">
                <p className="text-[#3E2F3F]">
                  <strong>Shipping To:</strong> {formData.address}, {formData.city}{formData.postalCode ? ` ${formData.postalCode}` : ''}, {formData.country}
                </p>
                <p className="text-[#3E2F3F]">
                  <strong>Confirmation sent to:</strong> {formData.email}
                </p>
                <p className="text-[#79566E] pt-1 text-[11px]">
                  (Note: This is a frontend demonstration. No email was sent and no order was dispatched.)
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate('/shop')}
                  className="px-8 py-3.5 bg-[#6B4B6B] hover:bg-[#583c58] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Continue Browsing Shop
                </button>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};
