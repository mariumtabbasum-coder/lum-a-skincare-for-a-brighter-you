/**
 * Reusable Strict Validation Module for Luméa Skincare
 * Strictly adheres to international Unicode name patterns, robust email parsing,
 * phone formatting, demo password requirements, and input sanitation.
 */

export interface ValidationResult {
  valid: boolean;
  message: string;
}

export interface CouponValidationResult extends ValidationResult {
  discountPercent?: number;
  discountType?: 'percent' | 'free_shipping';
}

/**
 * Validates a person's name using Unicode property escapes.
 * Rejects digits, whitespace-only, and special punctuation.
 * Accepts international names: "Jean-Luc", "O'Brien", "María José", "Zoë", "محمد علي", etc.
 */
export function validateName(name: string): ValidationResult {
  const trimmed = name?.trim() || '';
  if (!trimmed) {
    return { valid: false, message: 'Name is required.' };
  }
  if (trimmed.length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters.' };
  }
  if (/\d/.test(trimmed)) {
    return { valid: false, message: 'Name must not contain numbers.' };
  }
  // Unicode letter and mark pattern with allowed inner separators (space, hyphen, apostrophe)
  const unicodeNamePattern = /^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u;
  if (!unicodeNamePattern.test(trimmed)) {
    return { valid: false, message: 'Please enter a valid name (letters, spaces, hyphens, and apostrophes only).' };
  }
  return { valid: true, message: '' };
}

/**
 * Validates email address format rigorously.
 * Disallows whitespace, consecutive dots, missing domain, or missing TLD.
 */
export function validateEmail(email: string): ValidationResult {
  const trimmed = email?.trim() || '';
  if (!trimmed) {
    return { valid: false, message: 'Email address is required.' };
  }
  if (/\s/.test(trimmed)) {
    return { valid: false, message: 'Email must not contain spaces.' };
  }
  if (trimmed.includes('..') || trimmed.startsWith('.') || trimmed.endsWith('.')) {
    return { valid: false, message: 'Email cannot contain consecutive or boundary dots.' };
  }
  // Standard RFC 5322 compatible regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, message: 'Please enter a valid email address (e.g. name@example.com).' };
  }
  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return { valid: false, message: 'Invalid email format.' };
  }
  const domainParts = parts[1].split('.');
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) {
    return { valid: false, message: 'Email domain extension must be at least 2 letters.' };
  }
  return { valid: true, message: '' };
}

/**
 * Validates demo password strength: minimum 8 characters, at least 1 letter and 1 number.
 */
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { valid: false, message: 'Password is required.' };
  }
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long.' };
  }
  if (!/[A-Za-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one letter.' };
  }
  if (!/\d/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number.' };
  }
  return { valid: true, message: '' };
}

/**
 * Validates password match for registration.
 */
export function validatePasswordMatch(p1: string, p2: string): ValidationResult {
  if (!p2) {
    return { valid: false, message: 'Please confirm your password.' };
  }
  if (p1 !== p2) {
    return { valid: false, message: 'Passwords do not match.' };
  }
  return { valid: true, message: '' };
}

/**
 * Strict 11-digit Phone Validator for Contact Us form
 * Accepts exactly 11 digits with pattern /^\d{11}$/
 * Rejects fewer, more, letters, spaces, hyphens, or punctuation.
 */
export function validateStrict11Phone(phone: string): ValidationResult {
  const trimmed = phone?.trim() || '';
  if (!trimmed) {
    return { valid: false, message: 'Phone number is required.' };
  }
  // Disallow any characters other than digits
  if (/\D/.test(trimmed)) {
    return { valid: false, message: 'Please enter exactly 11 digits.' };
  }
  const strict11Pattern = /^\d{11}$/;
  if (!strict11Pattern.test(trimmed)) {
    return { valid: false, message: 'Please enter exactly 11 digits.' };
  }
  return { valid: true, message: '' };
}

/**
 * Validates phone numbers internationally: + () - . spaces allowed, 7-15 digits.
 */
export function validatePhone(phone: string, required: boolean = false): ValidationResult {
  const trimmed = phone?.trim() || '';
  if (!trimmed) {
    if (required) {
      return { valid: false, message: 'Phone number is required.' };
    }
    return { valid: true, message: '' };
  }
  // Check for disallowed letters
  if (/[a-zA-Z]/.test(trimmed)) {
    return { valid: false, message: 'Phone number cannot contain letters.' };
  }
  // Strip allowed non-digits to verify digit count
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return { valid: false, message: 'Phone number must contain between 7 and 15 digits.' };
  }
  // Ensure valid format
  const phonePattern = /^\+?[0-9\s().-]{7,25}$/;
  if (!phonePattern.test(trimmed)) {
    return { valid: false, message: 'Invalid phone number format.' };
  }
  return { valid: true, message: '' };
}

/**
 * Validates generic required fields (street address, city, etc.)
 */
export function validateRequired(value: string, fieldLabel: string = 'This field'): ValidationResult {
  const trimmed = value?.trim() || '';
  if (!trimmed) {
    return { valid: false, message: `${fieldLabel} is required.` };
  }
  return { valid: true, message: '' };
}

/**
 * Validates postal code / ZIP code
 */
export function validatePostalCode(value: string, required: boolean = false): ValidationResult {
  const trimmed = value?.trim() || '';
  if (!trimmed) {
    if (required) {
      return { valid: false, message: 'Postal / ZIP code is required.' };
    }
    return { valid: true, message: '' };
  }
  if (trimmed.length < 3 || trimmed.length > 10) {
    return { valid: false, message: 'Please enter a valid postal code (3-10 characters).' };
  }
  return { valid: true, message: '' };
}

/**
 * Validates product quantity
 */
export function validateQuantity(qty: number, min: number = 1, max: number = 99): ValidationResult {
  if (isNaN(qty) || !Number.isInteger(qty)) {
    return { valid: false, message: 'Quantity must be a whole number.' };
  }
  if (qty < min) {
    return { valid: false, message: `Minimum quantity is ${min}.` };
  }
  if (qty > max) {
    return { valid: false, message: `Maximum quantity is ${max}.` };
  }
  return { valid: true, message: '' };
}

/**
 * Validates demo coupon codes
 */
export function validateCoupon(code: string): CouponValidationResult {
  const trimmed = code?.trim().toUpperCase() || '';
  if (!trimmed) {
    return { valid: false, message: 'Please enter a promotional code.' };
  }
  if (trimmed === 'GLOW10') {
    return { valid: true, message: 'Coupon applied! 10% off your order.', discountPercent: 10, discountType: 'percent' };
  }
  if (trimmed === 'LUMEA20') {
    return { valid: true, message: 'Coupon applied! 20% off your order.', discountPercent: 20, discountType: 'percent' };
  }
  if (trimmed === 'FREESHIP') {
    return { valid: true, message: 'Coupon applied! Free shipping added.', discountPercent: 0, discountType: 'free_shipping' };
  }
  return { valid: false, message: 'Invalid coupon code. Try "GLOW10" or "LUMEA20".' };
}

/**
 * Validates dropdown / select fields
 */
export function validateSelect(value: string, fieldLabel: string = 'Please make a selection'): ValidationResult {
  const trimmed = value?.trim() || '';
  if (!trimmed || trimmed === 'default' || trimmed === '') {
    return { valid: false, message: `${fieldLabel}.` };
  }
  return { valid: true, message: '' };
}

/**
 * Validates textarea / message fields
 */
export function validateTextarea(value: string, minLength: number = 10, fieldLabel: string = 'Message'): ValidationResult {
  const trimmed = value?.trim() || '';
  if (!trimmed) {
    return { valid: false, message: `${fieldLabel} is required.` };
  }
  if (trimmed.length < minLength) {
    return { valid: false, message: `${fieldLabel} must be at least ${minLength} characters.` };
  }
  return { valid: true, message: '' };
}
