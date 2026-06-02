const express = require('express');
const multer = require('multer');
const { generateAI } = require('../services/ai');

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

const systemInstruction = 'You are a premium AI portfolio assistant for a senior MERN stack developer. Keep answers concise, helpful, and tailored to a software engineering portfolio.';

router.post('/chat', async (req, res, next) => {
  try {
    const prompt = req.body.prompt || '';
    const text = await generateAI('chat', prompt, systemInstruction);
    res.json({ text, mode: process.env.GEMINI_API_KEY ? 'gemini' : 'mock' });
  } catch (error) {
    next(error);
  }
});

router.post('/resume-analyzer', upload.single('resume'), async (req, res, next) => {
  try {
    const prompt = req.body.prompt || 'Analyze this resume for gaps, strengths, and suggestions for a senior MERN stack developer portfolio.';
    const text = await generateAI('resume', prompt, systemInstruction);
    res.json({ text, mode: process.env.GEMINI_API_KEY ? 'gemini' : 'mock' });
  } catch (error) {
    next(error);
  }
});

router.post('/project-recommender', async (req, res, next) => {
  try {
    const prompt = req.body.prompt || 'Recommend three portfolio projects that improve marketability for a MERN stack developer.';
    const text = await generateAI('recommend', prompt, systemInstruction);
    res.json({ text, mode: process.env.GEMINI_API_KEY ? 'gemini' : 'mock' });
  } catch (error) {
    next(error);
  }
});

router.post('/skill-assessor', async (req, res, next) => {
  try {
    const prompt = req.body.prompt || 'Create a skill assessment with interview questions and scoring guidance for MERN stack development.';
    const text = await generateAI('assess', prompt, systemInstruction);
    res.json({ text, mode: process.env.GEMINI_API_KEY ? 'gemini' : 'mock' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
