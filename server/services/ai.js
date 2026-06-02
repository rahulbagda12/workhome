let GoogleGenAI;
try {
  ({ GoogleGenAI } = require('@google/genai'));
} catch (error) {
  GoogleGenAI = null;
}

function getMockResponse(kind, input) {
  const base = {
    chat: 'I am in mock mode because GEMINI_API_KEY is not set. I can still answer using the portfolio context, but responses are simulated locally.',
    resume: 'Mock resume analysis: strong full-stack delivery, good React and Node fundamentals, and a clear opportunity to add measurable impact metrics.',
    recommend: 'Mock project recommendation: build an analytics-heavy dashboard, a content-driven case-study engine, and a client intake workflow.',
    assess: 'Mock skill assessment: focus on system design, API security, and data modeling to raise the score band.'
  };

  return `${base[kind]}\n\nInput summary: ${typeof input === 'string' ? input.slice(0, 220) : JSON.stringify(input).slice(0, 220)}`;
}

async function generateAI(kind, prompt, systemInstruction) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !GoogleGenAI) {
    return getMockResponse(kind, prompt);
  }

  const client = new GoogleGenAI({ apiKey });
  const result = await client.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
    config: {
      systemInstruction
    }
  });

  return result.text || getMockResponse(kind, prompt);
}

module.exports = {
  generateAI
};
