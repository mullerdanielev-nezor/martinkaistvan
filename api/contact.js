module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method-not-allowed' });
    return;
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const clean = (v) => (typeof v === 'string' ? v.trim() : '');

  const name = clean(body.name);
  const phone = clean(body.phone);
  const email = clean(body.email);
  const service = clean(body.service);
  const date = clean(body.date);
  const address = clean(body.address);
  const message = clean(body.message);
  const honeypot = clean(body.website);

  if (honeypot) {
    res.status(200).json({ ok: true });
    return;
  }

  if (!name || !phone || !email) {
    res.status(400).json({ ok: false, error: 'missing-required-fields' });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    res.status(500).json({ ok: false, error: 'server-not-configured' });
    return;
  }

  const subject = `Ajánlatkérés: ${service || 'Egyéb'} (${name})`;
  const textContent = `Név: ${name}
Telefon: ${phone}
Email: ${email}
Szolgáltatás: ${service}
Kívánt időpont: ${date}
Helyszín/cím: ${address}

Üzenet:
${message}`;

  try {
    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Martinka István Arnold - Weboldal', email: 'miklosjelencsity@gmail.com' },
        to: [{ email: 'martinkaistvan178@gmail.com', name: 'Martinka István Arnold' }],
        cc: [{ email: 'miklosjelencsity@gmail.com', name: 'Miklós' }],
        replyTo: { email, name },
        subject,
        textContent,
      }),
    });

    if (!brevoRes.ok) {
      const errText = await brevoRes.text();
      console.error('Brevo error', brevoRes.status, errText);
      res.status(502).json({ ok: false, error: 'send-failed' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form send error', err);
    res.status(500).json({ ok: false, error: 'send-failed' });
  }
};
