import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'success';

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  }

  const inputClass =
    'w-full bg-transparent border-b border-luxury-300 dark:border-luxury-700 py-2 text-sm font-light text-luxury-900 dark:text-luxury-50 placeholder:text-luxury-300 dark:placeholder:text-luxury-600 focus:outline-none focus:border-luxury-900 dark:focus:border-luxury-50 transition-colors';

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl text-center text-luxury-900 dark:text-luxury-50 mb-12">
        Get in Touch
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="name" className="block text-[10px] uppercase tracking-widest text-luxury-500 mb-2">Name</label>
          <input type="text" id="name" required placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-luxury-500 mb-2">Email</label>
          <input type="email" id="email" required placeholder="your@email.com" className={inputClass} />
        </div>
        <div>
          <label htmlFor="message" className="block text-[10px] uppercase tracking-widest text-luxury-500 mb-2">Message</label>
          <textarea
            id="message"
            rows={4}
            required
            placeholder="How can we help?"
            className={`${inputClass} resize-none`}
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 bg-luxury-900 dark:bg-luxury-50 text-luxury-50 dark:text-luxury-900 text-[11px] tracking-widest uppercase hover:opacity-90 transition-opacity"
        >
          {status === 'success' ? 'Message Sent' : 'Send Message'}
        </button>
      </form>

      <div className="mt-12 pt-8 border-t border-luxury-200 dark:border-luxury-800 space-y-5">
        {[
          { label: 'Email', value: 'hello@wandercodeware.com' },
          { label: 'Studio', value: 'London, United Kingdom' },
          { label: 'Hours', value: 'Mon–Fri, 9am–5pm GMT' },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-[10px] tracking-widest uppercase text-luxury-500 mb-1">{label}</p>
            <p className="text-sm font-light text-luxury-900 dark:text-luxury-50">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
