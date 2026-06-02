const mongoose = require('mongoose');

function defineModel(name, schemaDefinition) {
  const schema = new mongoose.Schema(schemaDefinition, { timestamps: true });
  return mongoose.models[name] || mongoose.model(name, schema);
}

const Admin = defineModel('Admin', {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'admin' }
});

const Project = defineModel('Project', {
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  stack: [{ type: String }],
  featured: { type: Boolean, default: false },
  metrics: [{ label: String, value: String }],
  links: {
    demo: String,
    github: String
  },
  image: String
});

const Skill = defineModel('Skill', {
  name: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: Number, default: 80 },
  icon: String,
  featured: { type: Boolean, default: false }
});

const Testimonial = defineModel('Testimonial', {
  name: { type: String, required: true },
  role: { type: String, required: true },
  quote: { type: String, required: true },
  avatar: String,
  rating: { type: Number, default: 5 }
});

const Certificate = defineModel('Certificate', {
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  year: { type: String, required: true },
  url: String
});

const ContactMessage = defineModel('ContactMessage', {
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: String,
  subject: { type: String, required: true },
  message: { type: String, required: true },
  source: { type: String, default: 'portfolio-contact' },
  status: { type: String, default: 'new' }
});

const Blog = defineModel('Blog', {
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  coverImage: String,
  author: { type: String, default: 'Admin' },
  readTime: { type: String, default: '4 min read' },
  likes: { type: Number, default: 0 },
  bookmarks: { type: Number, default: 0 },
  comments: [
    {
      name: String,
      email: String,
      message: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  publishedAt: { type: Date, default: Date.now }
});

module.exports = {
  Admin,
  Project,
  Skill,
  Testimonial,
  Certificate,
  ContactMessage,
  Blog
};
