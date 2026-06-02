const bcrypt = require('bcryptjs');
const { create, list, findOne } = require('./entityService');

async function ensureSeed(collection, items) {
  const existing = await list(collection);
  if (existing.length > 0) {
    return existing;
  }
  const created = [];
  for (const item of items) {
    created.push(await create(collection, item));
  }
  return created;
}

async function bootstrapData() {
  const seedEmail = process.env.ADMIN_SEED_EMAIL;
  const seedPassword = process.env.ADMIN_SEED_PASSWORD;

  if (seedEmail && seedPassword) {
    const existingAdmin = await findOne('admins', { email: seedEmail });
    if (!existingAdmin) {
      await create('admins', {
        name: 'Site Admin',
        email: seedEmail,
        passwordHash: await bcrypt.hash(seedPassword, 10),
        role: 'admin'
      });
    }
  }

  await ensureSeed('skills', [
    { name: 'React', category: 'Frontend', level: 96, featured: true },
    { name: 'Node.js', category: 'Backend', level: 94, featured: true },
    { name: 'MongoDB', category: 'Database', level: 90, featured: true },
    { name: 'Gemini AI', category: 'AI', level: 88, featured: true }
  ]);

  await ensureSeed('projects', [
    {
      title: 'SignalForge Analytics',
      slug: 'signalforge-analytics',
      description: 'A premium SaaS analytics platform with real-time dashboards, billing intelligence, and glassmorphism reporting surfaces.',
      stack: ['React', 'Node', 'MongoDB', 'Redis'],
      featured: true,
      metrics: [{ label: 'Uplift', value: '+38%' }]
    },
    {
      title: 'AI Talent Studio',
      slug: 'ai-talent-studio',
      description: 'AI-assisted hiring workflow with resume scoring, skills quizzes, and automated interview prep.',
      stack: ['MERN', 'Gemini', 'JWT'],
      featured: true,
      metrics: [{ label: 'Latency', value: '<180ms' }]
    }
  ]);

  await ensureSeed('blogs', [
    {
      title: 'Designing Developer Portfolios Like Products',
      slug: 'designing-developer-portfolios-like-products',
      excerpt: 'A portfolio should feel like a product people trust within seconds.',
      content: 'Treat your portfolio as a product surface. Lead with proof, structure the narrative, and make interactions feel deliberate.',
      tags: ['design', 'portfolio', 'frontend'],
      readTime: '4 min read',
      comments: []
    },
    {
      title: 'How I Use AI to Ship Faster Without Losing Quality',
      slug: 'how-i-use-ai-to-ship-faster-without-losing-quality',
      excerpt: 'A practical workflow for using AI as a multiplier, not a crutch.',
      content: 'AI is best used to compress repetitive work and improve exploration. Keep your review standards strict.',
      tags: ['ai', 'productivity', 'workflow'],
      readTime: '5 min read',
      comments: []
    }
  ]);

  await ensureSeed('testimonials', [
    { name: 'Ava Chen', role: 'Product Lead', quote: 'High-end execution with strong product instincts.' },
    { name: 'Marcus Lee', role: 'Engineering Manager', quote: 'Ships quickly, communicates clearly, and handles complex systems well.' }
  ]);

  await ensureSeed('certificates', [
    { title: 'Full Stack Web Development', issuer: 'Coursera', year: '2024' },
    { title: 'Cloud Architecture Foundations', issuer: 'AWS', year: '2025' }
  ]);
}

module.exports = { bootstrapData };
