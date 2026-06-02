const express = require('express');
const { create, list } = require('../services/entityService');
const { sendContactNotification } = require('../services/mailer');

const router = express.Router();

router.get('/projects', async (_req, res, next) => {
  try {
    res.json(await list('projects'));
  } catch (error) {
    next(error);
  }
});

router.post('/projects', async (req, res, next) => {
  try {
    const project = await create('projects', req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

router.get('/skills', async (_req, res, next) => {
  try {
    res.json(await list('skills'));
  } catch (error) {
    next(error);
  }
});

router.get('/testimonials', async (_req, res, next) => {
  try {
    res.json(await list('testimonials'));
  } catch (error) {
    next(error);
  }
});

router.get('/certificates', async (_req, res, next) => {
  try {
    res.json(await list('certificates'));
  } catch (error) {
    next(error);
  }
});

router.get('/contacts', async (_req, res, next) => {
  try {
    res.json(await list('contacts'));
  } catch (error) {
    next(error);
  }
});

router.post('/contact', async (req, res, next) => {
  try {
    const { name, email, company, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'name, email, subject, and message are required' });
    }

    const saved = await create('contacts', {
      name,
      email,
      company: company || '',
      subject,
      message,
      source: 'portfolio-contact'
    });

    await sendContactNotification(saved);
    res.status(201).json({ message: 'Contact message received', contact: saved });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
