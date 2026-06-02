import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturedCard({ project }) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group glass-panel relative overflow-hidden rounded-[28px] p-6"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-cyan-400/10 opacity-0 transition group-hover:opacity-100" />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Featured project</div>
          <h3 className="mt-3 text-2xl font-semibold text-white">{project.title}</h3>
        </div>
        <ArrowUpRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
      <p className="relative z-10 mt-4 text-sm leading-6 text-slate-300">{project.description}</p>
      <div className="relative z-10 mt-6 flex flex-wrap gap-2">
        {project.stack?.map((item) => (
          <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            {item}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
