import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Sparkles, 
  MessageSquare, 
  CheckCircle2, 
  ChevronDown 
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      showToast(`Thank you, ${formData.name}! Your message has been sent to our pastry team.`, 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 800);
  };

  const faqs = [
    {
      q: 'How far in advance should I order celebration cakes?',
      a: 'We recommend placing orders for standard celebration cakes at least 24-48 hours in advance. For bespoke multi-tiered wedding cakes, we recommend booking 2-4 weeks ahead.',
    },
    {
      q: 'Do you offer gluten-free, eggless, or vegan options?',
      a: 'Yes! We have dedicated gluten-free fudge brownies and chocolate truffle cakes, as well as eggless options for selected cakes and panna cotta.',
    },
    {
      q: 'What is your delivery coverage area?',
      a: 'We deliver throughout Bloomfield and surrounding metropolitan areas within a 25-mile radius in temperature-regulated courier vehicles.',
    },
    {
      q: 'Can I pick up my order in person at the boutique?',
      a: 'Absolutely! Select "In-Store Bakery Pickup" at checkout and your order will be boxed and waiting at our 42 Blossom Blvd boutique.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-bakery-peach/70 border border-bakery-pink text-espresso-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-bakery-caramel" />
          <span>We Would Love To Hear From You</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-espresso-900">
          Get In Touch
        </h1>
        <p className="text-sm sm:text-base text-espresso-600">
          Have a question regarding an order, wedding consultation, or custom flavor request? Reach out to our bakers and we will gladly assist.
        </p>
      </div>

      {/* Main Grid: Info Cards + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Contact Details & Store Hours */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-soft space-y-6">
            <h2 className="font-serif text-xl font-bold text-espresso-900 pb-3 border-b border-cream-200">
              Bakery Boutique Details
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-espresso-700">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-bakery-peach text-bakery-carameldark flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-espresso-900 text-sm">Bakery Address</h3>
                  <p className="text-espresso-600 mt-0.5">42 Blossom Boulevard, Gourmet Quarter, Bloomfield, CA 90210</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-bakery-peach text-bakery-carameldark flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-espresso-900 text-sm">Phone Line</h3>
                  <p className="text-espresso-600 mt-0.5">+1 (555) 234-CAKE (2253)</p>
                  <p className="text-[11px] text-espresso-400">Lines open 8:00 AM – 7:00 PM Daily</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-bakery-peach text-bakery-carameldark flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-espresso-900 text-sm">Email Inquiries</h3>
                  <p className="text-espresso-600 mt-0.5">hello@bakedbloom.com</p>
                  <p className="text-[11px] text-espresso-400">For events: events@bakedbloom.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-cream-200">
                <div className="w-9 h-9 rounded-xl bg-bakery-peach text-bakery-carameldark flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-espresso-900 text-sm">Oven & Boutique Hours</h3>
                  <div className="mt-1 space-y-0.5 text-xs">
                    <p className="flex justify-between gap-4 font-semibold text-espresso-900">
                      <span>Monday – Saturday:</span> <span>8:00 AM – 8:00 PM</span>
                    </p>
                    <p className="flex justify-between gap-4 text-espresso-600">
                      <span>Sunday:</span> <span>9:00 AM – 6:00 PM</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Preview Card */}
          <div className="bg-cream-200/70 rounded-3xl border border-cream-300 p-6 overflow-hidden relative shadow-soft">
            <div className="flex items-center gap-2 mb-2 font-serif font-bold text-espresso-900">
              <MapPin className="w-4 h-4 text-bakery-caramel" />
              <span>Visit Our Boutique</span>
            </div>
            <p className="text-xs text-espresso-600 mb-4">
              Step inside for complimentary espresso with any pastry order over $15!
            </p>
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-inner border border-cream-300 relative bg-cream-100 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80"
                alt="Bakery location storefront"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-espresso-950/30 flex items-center justify-center">
                <span className="px-4 py-2 rounded-full bg-white/95 text-espresso-900 text-xs font-bold shadow-lg">
                  📍 42 Blossom Boulevard, Bloomfield
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-cream-200 p-6 sm:p-10 shadow-soft">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-xl bg-bakery-peach text-bakery-carameldark">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-espresso-900">Send Us A Message</h2>
              <p className="text-xs text-espresso-500">We usually reply within 2 to 4 hours during boutique hours.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sophia Vance"
                  className="w-full px-4 py-2.5 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. sophia@example.com"
                  className="w-full px-4 py-2.5 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Custom 3-Tier Anniversary Cake Inquiry"
                className="w-full px-4 py-2.5 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
                Your Message *
              </label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your event, date, expected guest count, or any special dietary requirements..."
                className="w-full px-4 py-2.5 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-6 rounded-full bg-espresso-800 hover:bg-espresso-900 text-cream-50 font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </form>
        </div>

      </div>

      {/* FAQ ACCORDION SECTION */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-10 shadow-soft">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-bakery-carameldark">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900 mt-1">
            Common Inquiries
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-cream-200 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 bg-cream-50 hover:bg-cream-100 transition"
                >
                  <span className="font-serif text-sm font-bold text-espresso-900">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-espresso-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-xs text-espresso-700 leading-relaxed border-t border-cream-200 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
