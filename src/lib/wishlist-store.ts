/**
 * LocalStorage-backed Shared Wishlist Store for Luméa Skincare
 */

import { PRODUCTS, Product, getProductById } from '../data/products';

const WISHLIST_STORAGE_KEY = 'lumea_wishlist_v1';
export const WISHLIST_UPDATED_EVENT = 'lumea_wishlist_updated';

function safeGetStoredIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(id => typeof id === 'string' && getProductById(id) !== undefined);
  } catch (err) {
    console.warn('Could not read wishlist from localStorage', err);
    return [];
  }
}

function safeSaveStoredIds(ids: string[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent(WISHLIST_UPDATED_EVENT));
  } catch (err) {
    console.warn('Could not save wishlist to localStorage', err);
  }
}

export function getWishlist(): Product[] {
  const ids = safeGetStoredIds();
  return ids.map(id => getProductById(id)!).filter(Boolean);
}

export function isInWishlist(productId: string): boolean {
  const ids = safeGetStoredIds();
  return ids.includes(productId);
}

export function toggleWishlist(productId: string): { added: boolean; wishlist: Product[] } {
  const ids = safeGetStoredIds();
  const exists = ids.includes(productId);
  let updatedIds: string[];

  if (exists) {
    updatedIds = ids.filter(id => id !== productId);
  } else {
    updatedIds = [...ids, productId];
  }

  safeSaveStoredIds(updatedIds);
  return {
    added: !exists,
    wishlist: updatedIds.map(id => getProductById(id)!).filter(Boolean)
  };
}
