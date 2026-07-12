'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [topic, setTopic] = useState('General query');
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [currentPlan, setCurrentPlan] = useState('Not a customer yet');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Name, email, and message are required.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          name,
          business_name: businessName,
          phone,
          email,
          current_plan: currentPlan,
          message
        })
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      setSuccess(true);
      // Reset form
      setName('');
      setBusinessName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError('Something went wrong. Please try again or use the email option.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-[var(--bg-glass)] p-8 md:p-10 rounded-3xl border border-[var(--border-default)] shadow-sm backdrop-blur-sm text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Message Received</h3>
        <p className="text-[var(--text-secondary)] mb-8">We've got your message and will get back to you shortly.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="px-6 py-2 bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-xs font-bold uppercase tracking-widest rounded-full border border-[var(--border-default)] hover:bg-[var(--border-default)] transition-colors"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-glass)] p-8 md:p-10 rounded-3xl border border-[var(--border-default)] shadow-sm backdrop-blur-sm">
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">What can we help with?</h3>
      <p className="text-sm text-[var(--text-secondary)] mb-8">Pick a topic below so we route your message to the right person.</p>
      
      <div className="mb-8">
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-tertiary)] mb-3">Topic</p>
        <div className="flex flex-wrap gap-2">
          {['General query', 'Upgrade / payment', 'Technical issue', 'Demo request', 'Partnership'].map(t => (
            <button 
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${topic === t ? 'bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border-[var(--brand-primary)]/20' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-default)] hover:border-[var(--text-tertiary)]'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-tertiary)] block mb-2">Your Name *</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Rahul Sharma" className="w-full bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm focus:border-[var(--brand-primary)] outline-none transition-all text-[var(--text-primary)]" />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-tertiary)] block mb-2">Business Name</label>
            <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="The Velvet Lounge" className="w-full bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm focus:border-[var(--brand-primary)] outline-none transition-all text-[var(--text-primary)]" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-tertiary)] block mb-2">Phone / WhatsApp</label>
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm focus:border-[var(--brand-primary)] outline-none transition-all text-[var(--text-primary)]" />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-tertiary)] block mb-2">Email *</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@yourbusiness.com" className="w-full bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm focus:border-[var(--brand-primary)] outline-none transition-all text-[var(--text-primary)]" />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-tertiary)] block mb-2">Current Plan</label>
          <select value={currentPlan} onChange={e => setCurrentPlan(e.target.value)} className="w-full bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm focus:border-[var(--brand-primary)] outline-none transition-all appearance-none text-[var(--text-primary)]">
            <option>Not a customer yet</option>
            <option>Free Trial</option>
            <option>Basic Plan</option>
            <option>Premium Plan</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-tertiary)] block mb-2">Your Message *</label>
          <textarea required value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us what's going on. The more detail, the faster we can help." className="w-full bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm focus:border-[var(--brand-primary)] outline-none transition-all h-32 text-[var(--text-primary)]"></textarea>
        </div>
        
        {error && (
          <div className="text-red-500 text-sm mt-2 font-medium">{error}</div>
        )}

        <div className="flex items-center justify-between pt-4">
          <p className="text-[10px] text-[var(--text-tertiary)] italic">We never share your data.</p>
          <button type="submit" disabled={loading} className="px-6 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity shadow-md flex items-center gap-2 disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
}
