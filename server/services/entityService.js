const { fallbackStore } = require('../config/db');
const models = require('../models');

const collectionMap = {
  admins: { model: models.Admin },
  projects: { model: models.Project },
  skills: { model: models.Skill },
  testimonials: { model: models.Testimonial },
  certificates: { model: models.Certificate },
  contacts: { model: models.ContactMessage },
  blogs: { model: models.Blog }
};

function toPlain(doc) {
  if (!doc) {
    return null;
  }
  if (typeof doc.toObject === 'function') {
    return { id: doc._id.toString(), ...doc.toObject() };
  }
  return doc;
}

function collection(name) {
  return collectionMap[name];
}

async function list(name, filter = {}) {
  if (fallbackStore.isFallback) {
    const items = fallbackStore.list(name).filter((item) => {
      return Object.entries(filter).every(([key, value]) => {
        if (Array.isArray(value)) {
          return value.includes(item[key]);
        }
        return item[key] === value;
      });
    });
    return items.map((item) => ({ id: item.id, ...item }));
  }
  const { model } = collection(name);
  const items = await model.find(filter).sort({ createdAt: -1 }).lean();
  return items.map((item) => ({ id: item._id.toString(), ...item }));
}

async function findById(name, id) {
  if (fallbackStore.isFallback) {
    const item = fallbackStore.findById(name, id);
    return item ? { id: item.id, ...item } : null;
  }
  const { model } = collection(name);
  const item = await model.findById(id);
  return toPlain(item);
}

async function findOne(name, filter) {
  if (fallbackStore.isFallback) {
    const item = fallbackStore.findOne(name, (entry) => {
      return Object.entries(filter).every(([key, value]) => entry[key] === value);
    });
    return item ? { id: item.id, ...item } : null;
  }
  const { model } = collection(name);
  const item = await model.findOne(filter);
  return toPlain(item);
}

async function create(name, data) {
  if (fallbackStore.isFallback) {
    const record = fallbackStore.insert(name, data);
    return { id: record.id, ...record };
  }
  const { model } = collection(name);
  const created = await model.create(data);
  return toPlain(created);
}

async function update(name, id, patch) {
  if (fallbackStore.isFallback) {
    const updated = fallbackStore.update(name, id, patch);
    return updated ? { id: updated.id, ...updated } : null;
  }
  const { model } = collection(name);
  const updated = await model.findByIdAndUpdate(id, patch, { new: true });
  return toPlain(updated);
}

async function remove(name, id) {
  if (fallbackStore.isFallback) {
    return fallbackStore.remove(name, id);
  }
  const { model } = collection(name);
  const result = await model.findByIdAndDelete(id);
  return Boolean(result);
}

async function upsertAdminSeed(admin) {
  if (fallbackStore.isFallback) {
    const record = fallbackStore.upsertAdminSeed(admin);
    return { id: record.id, ...record };
  }
  const { model } = collection('admins');
  const existing = await model.findOne({ email: admin.email });
  if (existing) {
    return toPlain(existing);
  }
  const created = await model.create(admin);
  return toPlain(created);
}

module.exports = {
  list,
  findById,
  findOne,
  create,
  update,
  remove,
  upsertAdminSeed
};
