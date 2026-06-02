const express = require('express');
const { create, list, findById, update } = require('../services/entityService');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    res.json(await list('blogs'));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const blog = await create('blogs', {
      ...req.body,
      likes: 0,
      bookmarks: 0,
      comments: []
    });
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const blog = await findById('blogs', req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/like', async (req, res, next) => {
  try {
    const blog = await findById('blogs', req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    const updated = await update('blogs', req.params.id, { likes: (blog.likes || 0) + 1 });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/bookmark', async (req, res, next) => {
  try {
    const blog = await findById('blogs', req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    const updated = await update('blogs', req.params.id, { bookmarks: (blog.bookmarks || 0) + 1 });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/comments', async (req, res, next) => {
  try {
    const blog = await findById('blogs', req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    const comment = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      createdAt: new Date().toISOString()
    };
    const updated = await update('blogs', req.params.id, {
      comments: [...(blog.comments || []), comment]
    });
    res.status(201).json(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
