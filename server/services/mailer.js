const nodemailer = require('nodemailer');

function buildTransport() {
  const { EMAIL_USER, EMAIL_PASS, SMTP_HOST, SMTP_PORT, SMTP_SECURE } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS || !SMTP_HOST) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: String(SMTP_SECURE || 'false') === 'true',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });
}

async function sendContactNotification(payload) {
  const transport = buildTransport();
  const from = process.env.SMTP_FROM || process.env.EMAIL_USER || 'no-reply@example.com';
  const to = process.env.EMAIL_USER || from;

  if (!transport) {
    console.log('[simulated-mailer] contact submission', payload);
    return { simulated: true };
  }

  await transport.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject: `Portfolio contact: ${payload.subject}`,
    text: `${payload.name} <${payload.email}>\n\n${payload.message}`
  });

  return { simulated: false };
}

module.exports = { sendContactNotification };
