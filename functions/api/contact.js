const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  }
});

const clean = (value, maxLength) => String(value ?? '').trim().slice(0, maxLength);
const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 160;
const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;'
}[character]));

const allowedEnquiryTypes = new Set(['Request a Quote', 'General Enquiry', 'Ask a Question']);
const allowedServices = new Set([
  'Medical Waste Removal',
  'Sanitary Bin Services',
  'Pest Control',
  'Deep Cleaning',
  'PPE & Hygiene Consumables',
  'School & Facility Hygiene Support',
  'Multiple / Not Sure'
]);

export async function onRequestPost(context) {
  const { request, env } = context;

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 16000) return json({ error: 'Request is too large.' }, 413);

  const origin = request.headers.get('origin');
  if (origin) {
    try {
      const originHost = new URL(origin).host;
      const requestHost = new URL(request.url).host;
      if (originHost !== requestHost) return json({ error: 'Origin not allowed.' }, 403);
    } catch {
      return json({ error: 'Invalid origin.' }, 403);
    }
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  // Honeypot: bots often fill this hidden field. Return a normal success response
  // without sending anything so they receive no useful feedback.
  if (clean(input.companyWebsite, 200)) {
    return json({ ok: true });
  }

  const enquiryType = clean(input.enquiryType, 40);
  const service = clean(input.service, 80);
  const name = clean(input.name, 100);
  const organisation = clean(input.organisation, 120);
  const email = clean(input.email, 160).toLowerCase();
  const phone = clean(input.phone, 40);
  const location = clean(input.location, 140);
  const message = clean(input.message, 3000);
  const consent = clean(input.consent, 10);

  if (!allowedEnquiryTypes.has(enquiryType)) return json({ error: 'Please select a valid enquiry type.' }, 400);
  if (!allowedServices.has(service)) return json({ error: 'Please select a valid service.' }, 400);
  if (!name) return json({ error: 'Please provide your name.' }, 400);
  if (!validEmail(email)) return json({ error: 'Please provide a valid email address.' }, 400);
  if (!message) return json({ error: 'Please enter a message.' }, 400);
  if (consent !== 'yes') return json({ error: 'Consent is required to submit the enquiry.' }, 400);

  if (!env.BREVO_API_KEY) {
    console.error('BREVO_API_KEY is not configured.');
    return json({ error: 'Email delivery is not configured yet.' }, 503);
  }

  const toEmail = env.CONTACT_TO_EMAIL || 'info@umnothohygiene.co.za';
  const fromEmail = env.CONTACT_FROM_EMAIL || 'info@umnothohygiene.co.za';
  const subject = `Website ${enquiryType} — ${service}`;

  const textContent = [
    `New ${enquiryType} from the Umnotho Hygiene website`,
    '',
    `Name: ${name}`,
    `Organisation: ${organisation || '-'}`,
    `Email: ${email}`,
    `Phone / WhatsApp: ${phone || '-'}`,
    `Service: ${service}`,
    `Location: ${location || '-'}`,
    '',
    'Message:',
    message
  ].join('\n');

  const htmlContent = `
    <div style="font-family:Arial,sans-serif;color:#17283a;line-height:1.6;max-width:680px;margin:0 auto">
      <div style="padding:20px 24px;background:#0e2742;color:#fff;border-radius:12px 12px 0 0">
        <strong style="font-size:18px">Umnotho Hygiene Website</strong>
        <div style="font-size:13px;color:#b8d6c8;margin-top:4px">${escapeHtml(enquiryType)}</div>
      </div>
      <div style="padding:24px;border:1px solid #dce7e4;border-top:0;border-radius:0 0 12px 12px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:7px 0;font-weight:bold;width:160px">Name</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding:7px 0;font-weight:bold">Organisation</td><td>${escapeHtml(organisation || '-')}</td></tr>
          <tr><td style="padding:7px 0;font-weight:bold">Email</td><td>${escapeHtml(email)}</td></tr>
          <tr><td style="padding:7px 0;font-weight:bold">Phone / WhatsApp</td><td>${escapeHtml(phone || '-')}</td></tr>
          <tr><td style="padding:7px 0;font-weight:bold">Service</td><td>${escapeHtml(service)}</td></tr>
          <tr><td style="padding:7px 0;font-weight:bold">Location</td><td>${escapeHtml(location || '-')}</td></tr>
        </table>
        <div style="margin-top:20px;padding-top:18px;border-top:1px solid #dce7e4">
          <strong>Message</strong>
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
      </div>
    </div>`;

  const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': env.BREVO_API_KEY,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      sender: { name: 'Umnotho Hygiene Website', email: fromEmail },
      to: [{ email: toEmail, name: 'Umnotho Hygiene' }],
      replyTo: { email, name },
      subject,
      htmlContent,
      textContent
    })
  });

  if (!brevoResponse.ok) {
    const providerError = await brevoResponse.text().catch(() => '');
    console.error('Brevo email send failed:', brevoResponse.status, providerError);
    return json({ error: 'The enquiry could not be emailed right now.' }, 502);
  }

  return json({ ok: true });
}

export function onRequestGet() {
  return json({ error: 'Method not allowed.' }, 405);
}
