// /api/contact.js
// Vercel Serverless Function (Node.js runtime, zero dependencies).
// Receives the contact form submission from contact.html / index.html
// and sends it as an email using the Resend API.
//
// Required Vercel environment variable:
//   RESEND_API_KEY        - your Resend API key (https://resend.com)
//
// Optional Vercel environment variables:
//   CONTACT_TO_EMAIL      - where leads are delivered (defaults to buyscproperties@gmail.com)
//   CONTACT_FROM_EMAIL    - the "from" address Resend sends as
//                           (defaults to onboarding@resend.dev, Resend's shared
//                           test sender - works immediately with no domain setup,
//                           but for best deliverability verify buyscproperties.com
//                           in Resend and use something like
//                           "Buy SC Properties <leads@buyscproperties.com>")

export default async function handler(req, res) {
  // Basic CORS / method guard
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const firstName = (body.firstName || '').toString().trim();
    const lastName = (body.lastName || '').toString().trim();
    const email = (body.email || '').toString().trim();
    const phone = (body.phone || '').toString().trim();
    const interest = (body.interest || '').toString().trim();
    const property = (body.property || '').toString().trim();
    const message = (body.message || '').toString().trim();

    // Server-side validation (never trust the browser alone)
    if (!email || email.indexOf('@') < 0) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Fails loudly in the Vercel function logs so it's obvious in production
      // that the environment variable was never set, instead of silently
      // pretending to succeed the way the old console.log() placeholder did.
      console.error('Contact form error: RESEND_API_KEY environment variable is not set.');
      return res.status(500).json({ error: 'Email service is not configured yet.' });
    }

    const toAddress = process.env.CONTACT_TO_EMAIL || 'buyscproperties@gmail.com';
    const fromAddress = process.env.CONTACT_FROM_EMAIL || 'Buy SC Properties Website <onboarding@resend.dev>';

    const lines = [
      `New lead from buyscproperties.com`,
      ``,
      `First Name: ${firstName}`,
      `Last Name: ${lastName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Interested in: ${interest}`,
    ];
    if (property) lines.push(`Property of interest: ${property}`);
    lines.push(`Message: ${message || '(none)'}`);
    lines.push(``, `Submitted: ${new Date().toISOString()}`);

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [toAddress],
        reply_to: email,
        subject: `New website lead: ${firstName} ${lastName}`.trim() || 'New website lead',
        text: lines.join('\n'),
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error('Resend API error:', emailRes.status, errText);
      return res.status(502).json({ error: 'Email service failed to send the message.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form unexpected error:', err);
    return res.status(500).json({ error: 'Unexpected server error.' });
  }
}
