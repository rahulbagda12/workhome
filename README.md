# MERN Portfolio Suite

Premium AI-powered MERN portfolio scaffold with a React + Vite client and an Express + MongoDB backend.

## Local Development

1. Install dependencies in `server` and `client`.
2. Start the backend on port `5000`.
3. Start the client on port `5173`.
4. If MongoDB is unavailable, the server automatically falls back to JSON file storage under `server/data`.

## Environment

- Backend env example: `server/.env.example`
- Frontend API URL: `VITE_API_URL`

## Notes

- Gemini-powered modules use `GEMINI_API_KEY` when available.
- If the key is missing, the backend uses mock AI responses so the UI remains usable.
- Contact mail can run in simulated mode locally or with SMTP env vars.
