import { HeroVideoBackground } from '../components/common/HeroVideoBackground';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { SEOHead } from '../lib/seo';
import { JQueryAccordion, FAQItem } from '../components/common/jQueryAccordion';
import {
  validateName,
  validateEmail,
  validateStrict11Phone,
  validateSelect,
  validateTextarea
} from '../lib/validation';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const faqItems: FAQItem[] = [
    {
      question: 'How long does shipping take?',
      answer: 'Standard domestic delivery takes between 3 to 5 business days. Express 2-day delivery is available at checkout. All orders include full shipment tracking from our facility.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes! We ship to over 35 countries worldwide. International shipping typically arrives in 7 to 14 business days depending on customs clearance.'
    },
    {
      question: 'Can I return my order?',
      answer: 'We offer a 30-day "Natural Radiance" satisfaction guarantee. If a product does not suit your skin, contact our support team to arrange a full return or exchange.'
    },
    {
      question: 'Are your products vegan and cruelty free?',
      answer: '100% yes. Luméa formulas are Leaping Bunny certified cruelty-free and completely free of animal-derived ingredients, carmine, or lanolin.'
    },
    {
      question: 'How do I choose the right serum for my skin?',
      answer: 'We recommend taking our 5-step Skincare Quiz. It evaluates your skin type, primary concerns, and texture preferences to recommend your optimal botanical match.'
    }
  ];

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (fieldName: string, value: string): string => {
    switch (fieldName) {
      case 'name': {
        const res = validateName(value);
        return res.valid ? '' : res.message;
      }
      case 'email': {
        const res = validateEmail(value);
        return res.valid ? '' : res.message;
      }
      case 'phone': {
        const res = validateStrict11Phone(value);
        return res.valid ? '' : res.message;
      }
      case 'subject': {
        const res = validateSelect(value, 'Please select a reason for contacting us');
        return res.valid ? '' : res.message;
      }
      case 'message': {
        const res = validateTextarea(value, 10, 'Message');
        return res.valid ? '' : res.message;
      }
      default:
        return '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time instantaneous pattern validation: trigger error immediately on deviation
    setTouched(prev => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });

    const newErrors: Record<string, string> = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message),
    };

    // Filter out empty messages
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
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTouched({});
  };

  return (
    <div className="overflow-hidden bg-[#FFF7F7]">
      <SEOHead
        title="We'd Love to Hear From You — Contact Luméa Skincare"
        description="Have a question, feedback, or need support? Our team is here to help."
        canonicalPath="/contact"
      />

      {/* Hero Header (Full-Width Edge-to-Edge with Blurred Background Image & Exact Wording) */}
      <section className="relative w-full overflow-hidden border-b border-[#F3DDE6] bg-[#FFF7F7]">
        {/* Soft Botanical Background Image (Blurred for optimal contrast) */}
        <HeroVideoBackground />
        {/* Luméa Signature Rose-Plum Gradient Overlay for crisp text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5F8]/65 via-[#FFF8F9]/55 to-[#FDEEF3]/68 backdrop-blur-[1px]" />

        {/* Ambient botanical radial flourishes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#F7D3E2]/40 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-radial from-[#EFC6D8]/30 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 text-center space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#EFC6D8] text-[10px] sm:text-xs font-semibold text-[#6B4B6B] tracking-normal sm:tracking-wider uppercase shadow-2xs max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5D3A58] shrink-0" />
            <span className="truncate">We're Here For You</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl text-[#3E2F3F] tracking-tight leading-[1.18]">
            Get in Touch
          </h1>

          <p className="text-xs sm:text-base lg:text-lg text-[#3E2F3F]/85 leading-relaxed max-w-2xl mx-auto font-sans font-normal">
            We'd love to hear from you. Have a question, feedback, or need skincare advice? Our botanical care team is here to help.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-medium text-[#6B4B6B]">
            <span className="px-3.5 py-1.5 rounded-full bg-white/85 border border-[#F3DDE6] shadow-2xs">
              💌 Fast Reply Within 24h
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/85 border border-[#F3DDE6] shadow-2xs">
              🌿 Personalized Skin Guidance
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/85 border border-[#F3DDE6] shadow-2xs">
              ✨ Customer Delight Team
            </span>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="py-16 bg-[#FFF7F7]">
        <div className="lumea-container space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Contact Details Left */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-[24px] border border-[#F6E0E6] p-6 sm:p-8 space-y-6 shadow-xs">
                <div>
                  <h2 className="font-heading text-2xl text-[#3E2F3F]">
                    Get in Touch
                  </h2>
                  <p className="text-xs text-[#3E2F3F]/70 mt-1">
                    Our customer care specialists respond within 24 business hours.
                  </p>
                </div>

                <div className="space-y-4 text-xs text-[#3E2F3F]/85">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F6E0E6] flex items-center justify-center text-[#6B4B6B] shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#3E2F3F]">Email Us</p>
                      <a href="mailto:hello@lumea.example" className="text-[#6B4B6B] hover:underline">
                        hello@lumea.example
                      </a>
                      <p className="text-[10px] text-[#C39DB8]">(Documented placeholder)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F6E0E6] flex items-center justify-center text-[#6B4B6B] shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#3E2F3F]">Call Us</p>
                      <a href="tel:+15550192834" className="text-[#6B4B6B] hover:underline">
                        +1 (555) 019-2834
                      </a>
                      <p className="text-[10px] text-[#C39DB8]">Mon - Fri, 9am - 6pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F6E0E6] flex items-center justify-center text-[#6B4B6B] shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#3E2F3F]">Botanical Atelier</p>
                      <p className="text-[#3E2F3F]/80">
                        100 Botanical Promenade, Suite 400<br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="pt-4 border-t border-[#F6E0E6]">
                  <p className="text-xs font-semibold text-[#3E2F3F] mb-3">Follow Luméa</p>
                  <div className="flex items-center gap-2">
                    {[
                      { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                      { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                      { icon: Twitter, href: 'https://twitter.com', label: 'X' },
                      { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' }
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={idx}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit Luméa on ${item.label}`}
                          className="w-8 h-8 rounded-full bg-[#FFF7F7] border border-[#EFC6D8] hover:bg-[#F6E0E6] flex items-center justify-center text-[#6B4B6B] transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* "Send Us a Message" Form Right */}
            <div className="lg:col-span-7 bg-white rounded-[24px] border border-[#F6E0E6] p-6 sm:p-8 shadow-xs">
              <h2 className="font-heading text-2xl text-[#3E2F3F] mb-2">
                Send Us a Message
              </h2>
              <p className="text-xs text-[#3E2F3F]/70 mb-6">
                Fill in the form below and our care team will get back to you promptly.
              </p>

              {isSubmitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-[20px] text-center space-y-3 animate-in zoom-in-95">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-heading text-xl text-emerald-900">Message Received!</h3>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                    Thank you for reaching out! (Frontend demonstration: no live email server was triggered).
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 bg-[#6B4B6B] text-white rounded-full text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-[#3E2F3F] mb-1">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Elena Rostova"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className={`w-full px-4 py-2.5 bg-[#FFF7F7] border ${
                          errors.name
                            ? 'border-red-400 ring-1 ring-red-400/30'
                            : 'border-[#EFC6D8] hover:border-[#6B4B6B]/60 focus:border-[#6B4B6B] focus:ring-2 focus:ring-[#6B4B6B]/15'
                        } rounded-[14px] text-xs text-[#3E2F3F] transition-all duration-200 focus:outline-none hover:shadow-2xs`}
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="text-[11px] text-red-500 font-medium mt-1 animate-in fade-in duration-150">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-[#3E2F3F] mb-1">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className={`w-full px-4 py-2.5 bg-[#FFF7F7] border ${
                          errors.email
                            ? 'border-red-400 ring-1 ring-red-400/30'
                            : 'border-[#EFC6D8] hover:border-[#6B4B6B]/60 focus:border-[#6B4B6B] focus:ring-2 focus:ring-[#6B4B6B]/15'
                        } rounded-[14px] text-xs text-[#3E2F3F] transition-all duration-200 focus:outline-none hover:shadow-2xs`}
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="text-[11px] text-red-500 font-medium mt-1 animate-in fade-in duration-150">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#3E2F3F] mb-1">
                        Phone Number *
                      </label>
                      <input
                        id="contact-phone"
                        type="text"
                        inputMode="numeric"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="01234567890 (11 digits)"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                        className={`w-full px-4 py-2.5 bg-[#FFF7F7] border ${
                          errors.phone
                            ? 'border-red-400 ring-1 ring-red-400/30'
                            : 'border-[#EFC6D8] hover:border-[#6B4B6B]/60 focus:border-[#6B4B6B] focus:ring-2 focus:ring-[#6B4B6B]/15'
                        } rounded-[14px] text-xs text-[#3E2F3F] transition-all duration-200 focus:outline-none hover:shadow-2xs`}
                      />
                      {errors.phone && (
                        <p id="contact-phone-error" className="text-[11px] text-red-500 font-medium mt-1 animate-in fade-in duration-150">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#3E2F3F] mb-1">
                        Subject *
                      </label>
                      <select
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                        className={`w-full px-4 py-2.5 bg-[#FFF7F7] border ${
                          errors.subject
                            ? 'border-red-400 ring-1 ring-red-400/30'
                            : 'border-[#EFC6D8] hover:border-[#6B4B6B]/60 focus:border-[#6B4B6B] focus:ring-2 focus:ring-[#6B4B6B]/15'
                        } rounded-[14px] text-xs text-[#3E2F3F] transition-all duration-200 focus:outline-none hover:shadow-2xs cursor-pointer`}
                      >
                        <option value="">Select a reason</option>
                        <option value="Product Advice">Skincare & Routine Advice</option>
                        <option value="Order Status">Order Tracking & Shipping</option>
                        <option value="Returns">Returns & Refunds</option>
                        <option value="Wholesale">Wholesale & Press</option>
                      </select>
                      {errors.subject && (
                        <p id="contact-subject-error" className="text-[11px] text-red-500 font-medium mt-1 animate-in fade-in duration-150">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-[#3E2F3F] mb-1">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="How can our botanical team help you today? (Minimum 10 characters)"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={`w-full px-4 py-2.5 bg-[#FFF7F7] border ${
                        errors.message
                          ? 'border-red-400 ring-1 ring-red-400/30'
                          : 'border-[#EFC6D8] hover:border-[#6B4B6B]/60 focus:border-[#6B4B6B] focus:ring-2 focus:ring-[#6B4B6B]/15'
                      } rounded-[14px] text-xs text-[#3E2F3F] transition-all duration-200 focus:outline-none hover:shadow-2xs`}
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="text-[11px] text-red-500 font-medium mt-1 animate-in fade-in duration-150">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#6B4B6B] hover:bg-[#583c58] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#6B4B6B]/30 hover:scale-[1.02] active:scale-98 flex items-center gap-2 group cursor-pointer"
                    >
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

          {/* FAQ Accordion Section (id="faq" enhanced with selective jQuery) */}
          <div id="faq" className="space-y-6 pt-10 border-t border-[#F6E0E6]">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C39DB8]">
                Got Questions?
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-[#3E2F3F]">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-[#3E2F3F]/70">
                Quick answers regarding our formulas, delivery timelines, and return policy.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <JQueryAccordion items={faqItems} id="contact-faq-accordion" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
