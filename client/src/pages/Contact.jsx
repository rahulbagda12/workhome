import { useState } from 'react';
import { Mail, PhoneCall, UserRound } from 'lucide-react';
import { campaignData } from '../data/mock';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', mobile: '', city: '' });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');

  async function submitContact(event) {
    event.preventDefault();
    setSending(true);
    setStatus('');
    try {
      const recipient = campaignData.contactPhone.replace(/\D/g, '');
      const message = [
        'Hello, I am interested in the work opportunity.',
        `Name: ${form.name}`,
        `Mobile number: ${form.mobile}`,
        `City: ${form.city}`
      ].join('\n');
      const whatsappUrl = `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setStatus('Opening WhatsApp with your message.');
      setForm({ name: '', mobile: '', city: '' });
    } catch (error) {
      setStatus('Unable to open WhatsApp right now.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="text-sm uppercase tracking-[0.35em] text-cyan-300">Contact Us</div>
        <h1 className="mt-2 text-4xl font-semibold text-white">All contact details and submissions</h1>
      </div>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel rounded-[30px] p-6">
          <h2 className="text-2xl font-semibold text-white">Contact details</h2>
          <div className="mt-6 space-y-4 text-slate-300">
            <div className="rounded-3xl bg-white/5 p-4">
              <div className="flex items-center gap-2 text-white"><UserRound size={16} /> {campaignData.contactName}</div>
              <p className="mt-2 text-sm">Name</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-4">
              <div className="flex items-center gap-2 text-white"><PhoneCall size={16} /> {campaignData.contactPhone}</div>
              <p className="mt-2 text-sm">Mobile number</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-4">
              <div className="flex items-center gap-2 text-white"><Mail size={16} /> Contact for more information</div>
              <p className="mt-2 text-sm">Send a message using the form on this page.</p>
            </div>
          </div>
        </div>

        <form onSubmit={submitContact} className="glass-panel rounded-[30px] p-6">
          <h2 className="text-2xl font-semibold text-white">Send on WhatsApp</h2>
          <div className="mt-5 grid gap-4">
            <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-slate-500" placeholder="નામ" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-slate-500" placeholder="મોબાઈલ નંબર" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
            <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-slate-500" placeholder="શહેર" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-400">{status || 'Your message will open directly in WhatsApp.'}</p>
              <button className="neo-button" type="submit" disabled={sending}>
                {sending ? 'Opening...' : 'Send WhatsApp message'}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
