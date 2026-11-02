import React, { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CartState, updateCartQuantity, removeFromCart } from '../../lib/cart-store';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartState: CartState;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cartState }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#3E2F3F]/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF7F7] border-l border-[#EFC6D8] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#F6E0E6] flex items-center justify-between bg-white/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#6B4B6B]" />
              <h2 id="cart-drawer-title" className="font-heading text-xl text-[#3E2F3F]">
                Your Cart ({cartState.itemCount})
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart drawer"
              className="p-2 text-[#6B4B6B] hover:text-[#3E2F3F] hover:bg-[#F6E0E6] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartState.items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto bg-[#F6E0E6] rounded-full flex items-center justify-center text-[#6B4B6B]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-heading text-lg text-[#3E2F3F]">Your cart is empty</h3>
                <p className="text-xs text-[#3E2F3F]/70 max-w-xs mx-auto">
                  Looks like you haven't added any radiant botanical essentials yet.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/shop');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6B4B6B] hover:bg-[#583c58] text-white rounded-full text-xs font-medium transition-colors"
                >
                  Explore Shop <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              cartState.items.map(item => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white rounded-[16px] border border-[#F6E0E6] hover:border-[#EFC6D8] transition-all shadow-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-[12px] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/shop/${item.product.slug}`}
                          onClick={onClose}
                          className="text-xs font-semibold text-[#3E2F3F] hover:text-[#6B4B6B] truncate"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          aria-label={`Remove ${item.product.name} from cart`}
                          className="text-[#C39DB8] hover:text-[#3E2F3F] transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#C39DB8] capitalize">{item.product.category}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#EFC6D8] rounded-full px-2 py-0.5 bg-[#FFF7F7]">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="text-[#6B4B6B] hover:text-[#3E2F3F] p-0.5 disabled:opacity-40"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-medium text-[#3E2F3F]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="text-[#6B4B6B] hover:text-[#3E2F3F] p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#6B4B6B]">
                        ${item.itemTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Actions */}
          {cartState.items.length > 0 && (
            <div className="p-6 bg-white/90 border-t border-[#F6E0E6] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#3E2F3F]/80">
                  <span>Subtotal</span>
                  <span>${cartState.subtotal.toFixed(2)}</span>
                </div>
                {cartState.discount > 0 && (
                  <div className="flex justify-between text-[#6B4B6B] font-medium">
                    <span>Discount ({cartState.discountPercent}%)</span>
                    <span>-${cartState.discount?.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#3E2F3F]/80">
                  <span>Shipping Estimate</span>
                  <span>{cartState.shipping === 0 ? 'FREE' : `$${cartState.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#3E2F3F] pt-2 border-t border-[#F6E0E6]">
                  <span>Estimated Total</span>
                  <span className="text-[#6B4B6B]">${cartState.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="w-full py-3 bg-[#6B4B6B] hover:bg-[#583c58] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/cart');
                  }}
                  className="w-full py-2.5 bg-[#F6E0E6] hover:bg-[#EFC6D8] text-[#3E2F3F] rounded-full text-xs font-medium transition-colors"
                >
                  View Full Cart
                </button>
              </div>

              <p className="text-[10px] text-center text-[#C39DB8]">
                Frontend demonstration — no real payment is processed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
