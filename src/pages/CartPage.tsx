import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { SEOHead } from '../lib/seo';
import {
  getCartState,
  updateCartQuantity,
  removeFromCart,
  applyCartCoupon,
  removeCartCoupon,
  CART_UPDATED_EVENT,
  CartState
} from '../lib/cart-store';
import { showToast } from '../components/common/Toast';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartState, setCartState] = useState<CartState>(getCartState());
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    const handleUpdate = () => setCartState(getCartState());
    window.addEventListener(CART_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyCartCoupon(couponInput);
    setCouponFeedback({ success: res.success, message: res.message });
    if (res.success) {
      showToast({ type: 'info', title: 'Coupon Applied', description: res.message });
      setCouponInput('');
    }
  };

  const handleRemoveCoupon = () => {
    removeCartCoupon();
    setCouponFeedback(null);
  };

  return (
    <div className="overflow-hidden">
      <SEOHead
        title="Your Cart"
        description="Review your selected Luméa botanical products and proceed to checkout."
        canonicalPath="/cart"
        noIndex
      />

      <section className="py-12 lg:py-16 bg-[#FFF7F7]">
        <div className="lumea-container">
          
          <div className="mb-8">
            <h1 className="font-heading text-3xl sm:text-4xl text-[#3E2F3F]">
              Your Cart {cartState.itemCount > 0 && `(${cartState.itemCount} items)`}
            </h1>
            <p className="text-xs text-[#3E2F3F]/70 mt-1">
              Review your botanical essentials before proceeding to checkout.
            </p>
          </div>

          {cartState.items.length === 0 ? (
            /* Empty Cart View */
            <div className="bg-white rounded-[28px] border border-[#F6E0E6] p-12 text-center max-w-xl mx-auto space-y-4 shadow-xs">
              <div className="w-16 h-16 mx-auto bg-[#F6E0E6] rounded-full flex items-center justify-center text-[#6B4B6B]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h2 className="font-heading text-2xl text-[#3E2F3F]">Your cart is currently empty</h2>
              <p className="text-xs text-[#3E2F3F]/70 max-w-sm mx-auto leading-relaxed">
                Discover our bestselling botanical serums, velvety creams, and gentle cleansers to cultivate your natural glow.
              </p>
              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#6B4B6B] hover:bg-[#583c58] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Explore Skincare Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            /* Active Cart Items & Summary */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left: Cart Items List */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white rounded-[24px] border border-[#F6E0E6] overflow-hidden shadow-xs">
                  <div className="divide-y divide-[#F6E0E6]">
                    {cartState.items.map(item => (
                      <div
                        key={item.product.id}
                        className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        {/* Image + Info */}
                        <div className="flex items-center gap-4">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-[16px] bg-[#FDF6F8] border border-[#F6E0E6] shrink-0"
                          />
                          <div className="space-y-1">
                            <span className="text-[10px] text-[#79566E] uppercase font-semibold">
                              {item.product.category}
                            </span>
                            <Link
                              to={`/shop/${item.product.slug}`}
                              className="font-heading text-base text-[#3E2F3F] hover:text-[#6B4B6B] transition-colors block"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-xs font-semibold text-[#6B4B6B]">
                              ${item.product.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls + Item Total + Remove */}
                        <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-2 sm:pt-0">
                          {/* Stepper */}
                          <div className="flex items-center border border-[#EFC6D8] rounded-full px-3 py-1 bg-[#FFF7F7]">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              disabled={item.quantity <= 1}
                              className="text-[#6B4B6B] hover:text-[#3E2F3F] p-0.5 disabled:opacity-40"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold text-[#3E2F3F]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="text-[#6B4B6B] hover:text-[#3E2F3F] p-0.5"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Line Total */}
                          <span className="text-sm font-semibold text-[#3E2F3F] min-w-[70px] text-right">
                            ${item.itemTotal.toFixed(2)}
                          </span>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            aria-label={`Remove ${item.product.name} from cart`}
                            className="p-2 text-[#79566E] hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center px-2">
                  <Link
                    to="/shop"
                    className="text-xs font-semibold text-[#6B4B6B] hover:text-[#3E2F3F] transition-colors flex items-center gap-1.5"
                  >
                    <span>← Continue Shopping</span>
                  </Link>
                </div>
              </div>

              {/* Right: Order Summary Panel */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-[24px] border border-[#F6E0E6] p-6 sm:p-8 space-y-6 shadow-xs">
                  <h2 className="font-heading text-xl text-[#3E2F3F] pb-4 border-b border-[#F6E0E6]">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-xs text-[#3E2F3F]/80">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold">${cartState.subtotal.toFixed(2)}</span>
                    </div>

                    {cartState.discount > 0 && (
                      <div className="flex justify-between text-[#6B4B6B] font-semibold">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5" />
                          Discount ({cartState.couponCode})
                        </span>
                        <span>-${cartState.discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span>
                        {cartState.shipping === 0 ? (
                          <strong className="text-emerald-700">FREE</strong>
                        ) : (
                          `$${cartState.shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-[#F6E0E6] flex justify-between text-base font-semibold text-[#3E2F3F]">
                      <span>Total</span>
                      <span className="text-[#6B4B6B] text-lg">${cartState.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Coupon Code Section */}
                  <div className="pt-2 border-t border-[#F6E0E6] space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#3E2F3F] block">
                      Promotional Code
                    </span>

                    {cartState.couponCode ? (
                      <div className="flex items-center justify-between p-2.5 bg-[#FFF7F7] border border-[#EFC6D8] rounded-[14px] text-xs">
                        <span className="font-semibold text-[#6B4B6B]">
                          {cartState.couponCode} applied ({cartState.discountPercent}% off)
                        </span>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} noValidate className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponInput}
                            onChange={e => setCouponInput(e.target.value)}
                            placeholder="e.g. GLOW10"
                            className="flex-1 px-3 py-2 bg-[#FFF7F7] border border-[#EFC6D8] rounded-full text-xs text-[#3E2F3F] uppercase tracking-wider focus:outline-none focus:border-[#6B4B6B]"
                          />
                          <button
                            type="submit"
                            className="px-5 py-2 bg-[#F6E0E6] hover:bg-[#EFC6D8] text-[#6B4B6B] rounded-full text-xs font-semibold transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        <p className="text-[10px] text-[#79566E]">
                          Demo coupon codes: <strong className="text-[#6B4B6B]">GLOW10</strong> (10% off), <strong className="text-[#6B4B6B]">LUMEA20</strong> (20% off)
                        </p>
                      </form>
                    )}

                    {couponFeedback && !couponFeedback.success && (
                      <p className="text-xs text-red-500">{couponFeedback.message}</p>
                    )}
                  </div>

                  {/* Checkout Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => navigate('/checkout')}
                      className="w-full py-4 bg-[#6B4B6B] hover:bg-[#583c58] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Reassurance Notice */}
                  <div className="p-3.5 bg-[#FFF7F7] border border-[#F6E0E6] rounded-[16px] text-center space-y-1">
                    <ShieldCheck className="w-4 h-4 text-[#6B4B6B] mx-auto" />
                    <p className="text-xs font-semibold text-[#3E2F3F]">Secure Frontend Demonstration</p>
                    <p className="text-[10px] text-[#3E2F3F]/70">
                      Demo mode: No real payment or credit card details are collected or processed.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Decorative Bottom Banner (from Mockup 7) */}
          <div className="mt-16 bg-[#FDF6F8] border border-[#EFC6D8] rounded-[24px] p-8 text-center relative overflow-hidden">
            <span className="font-script text-3xl sm:text-4xl text-[#6B4B6B] select-none block">
              Good skin is always a good idea.
            </span>
            <p className="text-xs text-[#3E2F3F]/70 mt-1">
              Thank you for trusting Luméa with your daily radiance.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};
