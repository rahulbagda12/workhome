export default function ParticleBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-80" />
      <div className="soft-grid absolute inset-0 opacity-[0.06]" />
      <div className="absolute left-10 top-20 h-72 w-72 animate-float rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute right-8 top-44 h-80 w-80 animate-float rounded-full bg-cyan-400/15 blur-3xl [animation-delay:1.4s]" />
      <div className="absolute bottom-10 left-1/3 h-64 w-64 animate-float rounded-full bg-violet-500/15 blur-3xl [animation-delay:2.2s]" />
    </div>
  );
}
