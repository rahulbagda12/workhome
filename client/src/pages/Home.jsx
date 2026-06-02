import { motion } from 'framer-motion';
import { Mail, PhoneCall, Layers, Users, Award, BookOpen, Sparkles, Shield } from 'lucide-react';
import { campaignData, networkMarketing } from '../data/mock';

const stats = [
  { label: 'કાર્યનો પ્રકાર', value: 'પાર્ટ-ટાઇમ' },
  { label: 'સ્થળ', value: 'વર્ક ફ્રોમ હોમ' },
  { label: 'ઉંમર મર્યાદા', value: 'નથી' },
  { label: 'સંપર્ક', value: 'કોલ કરો' }
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="mb-8 overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/60 shadow-glow">
        <div className="grid gap-0 lg:grid-cols-[0.80fr_0.30fr]">
          <div className="flex items-center p-8 sm:p-10 lg:p-12">
            <div>
              <div className="text-sm uppercase tracking-[0.35em] text-cyan-300">Work</div>
              <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                {networkMarketing.title}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                {networkMarketing.overview}
              </p>
            </div>
          </div>
          <div className="relative min-h-[320px] bg-black/20">
            <img
              src="/d.jpeg"
              alt="Professional portrait for the work page"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="glass-panel rounded-[24px] p-6">
          <div className="flex items-center gap-3 text-cyan-300"><Layers size={18} /> <div className="text-sm uppercase tracking-[0.35em]">Overview</div></div>
          <h3 className="mt-3 text-2xl font-semibold text-white">{networkMarketing.title}</h3>
          <p className="mt-3 text-sm text-slate-300">{networkMarketing.subtitle}</p>
          <p className="mt-4 text-sm text-slate-300">{networkMarketing.overview}</p>
        </div>

        <div className="glass-panel rounded-[24px] p-6">
          <div className="flex items-center gap-3 text-cyan-300"><Users size={18} /> <div className="text-sm uppercase tracking-[0.35em]">How it works</div></div>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {networkMarketing.steps.map((s) => (
              <li key={s} className="flex items-start gap-3">● <span>{s}</span></li>
            ))}
          </ul>
        </div>

        <div className="glass-panel rounded-[24px] p-6">
          <div className="flex items-center gap-3 text-cyan-300"><Award size={18} /> <div className="text-sm uppercase tracking-[0.35em]">Income streams</div></div>
          <div className="mt-3 grid gap-3">
            {networkMarketing.incomeSources.map((inc) => (
              <div key={inc.title} className="rounded-2xl bg-white/5 p-3">
                <div className="font-semibold text-white">{inc.title}</div>
                <div className="text-sm text-slate-300">{inc.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass-panel rounded-[24px] p-6">
          <div className="flex items-center gap-3 text-cyan-300"><BookOpen size={18} /> <div className="text-sm uppercase tracking-[0.35em]">Benefits & Skills</div></div>
          <div className="mt-3 grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              {networkMarketing.benefits.map((b) => (
                <div key={b} className="rounded-2xl bg-white/5 p-3 text-sm text-slate-300">{b}</div>
              ))}
            </div>
            <div className="mt-4">
              <div className="text-sm text-slate-400">Key skills</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {networkMarketing.skills.map((s) => (
                  <div key={s} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">{s}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-[24px] p-6">
          <div className="flex items-center gap-3 text-cyan-300"><Users size={18} /> <div className="text-sm uppercase tracking-[0.35em]">Responsibilities & Ethics</div></div>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {networkMarketing.responsibilities.map((r) => (
              <li key={r}>• {r}</li>
            ))}
          </ul>
          <div className="mt-6 text-sm text-slate-400">{networkMarketing.portfolioDescription}</div>
          <div className="mt-6 flex gap-3">
            <a href={`tel:${campaignData.contactPhone.replace(/\s+/g, '')}`} className="neo-button">Call to join</a>
            <a href="Contact.jsx" className="glass-button">Contact page</a>
          </div>
        </div>
      </section>
    </div>
  );
}
