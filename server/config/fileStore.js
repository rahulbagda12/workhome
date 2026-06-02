const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const seedData = {
  admins: [],
  projects: [],
  blogs: [],
  skills: [],
  testimonials: [],
  certificates: [],
  contacts: []
};

class JsonStore {
  constructor(baseDir) {
    this.baseDir = baseDir;
    this.isFallback = true;
    this.reason = 'JSON fallback active';
    this.ensureBaseDir();
  }

  ensureBaseDir() {
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
    }
    for (const key of Object.keys(seedData)) {
      const filePath = this.filePath(key);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(seedData[key], null, 2));
      }
    }
  }

  filePath(collection) {
    return path.join(this.baseDir, `${collection}.json`);
  }

  useFallback(reason) {
    this.isFallback = true;
    this.reason = reason;
  }

  disableFallback() {
    this.isFallback = false;
    this.reason = 'MongoDB connected';
  }

  readCollection(collection) {
    this.ensureBaseDir();
    const raw = fs.readFileSync(this.filePath(collection), 'utf8');
    return JSON.parse(raw || '[]');
  }

  writeCollection(collection, records) {
    fs.writeFileSync(this.filePath(collection), JSON.stringify(records, null, 2));
  }

  list(collection) {
    return this.readCollection(collection);
  }

  findById(collection, id) {
    return this.readCollection(collection).find((record) => record.id === id) || null;
  }

  findOne(collection, matcher) {
    return this.readCollection(collection).find(matcher) || null;
  }

  insert(collection, data) {
    const records = this.readCollection(collection);
    const record = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    };
    records.unshift(record);
    this.writeCollection(collection, records);
    return record;
  }

  update(collection, id, patch) {
    const records = this.readCollection(collection);
    const index = records.findIndex((record) => record.id === id);
    if (index === -1) {
      return null;
    }
    const updated = {
      ...records[index],
      ...patch,
      updatedAt: new Date().toISOString()
    };
    records[index] = updated;
    this.writeCollection(collection, records);
    return updated;
  }

  remove(collection, id) {
    const records = this.readCollection(collection);
    const filtered = records.filter((record) => record.id !== id);
    this.writeCollection(collection, filtered);
    return filtered.length !== records.length;
  }

  upsertAdminSeed(admin) {
    const admins = this.readCollection('admins');
    if (admins.length > 0) {
      return admins[0];
    }
    const record = this.insert('admins', admin);
    return record;
  }
}

module.exports = { JsonStore };
