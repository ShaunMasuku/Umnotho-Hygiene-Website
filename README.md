# Umnotho Hygiene Website

Official one-page website for Umnotho Hygiene (Pty) Ltd.

## Tech

- HTML
- CSS
- Vanilla JavaScript
- Font Awesome Free for interface icons
- Cloudflare Pages Functions for the contact form

## Main sections

- Home
- About Us
- Our Services
- Compliance & Credentials
- Gallery
- Contact Us
- Privacy Notice

## Gallery

Gallery images live in:

```text
public/assets/gallery/
```

Add any supported image file to that folder, then run:

```bash
npm run build
```

The build script regenerates `public/data/gallery.json`. Filenames are not displayed on the website.

Supported formats: JPG, JPEG, PNG, WebP, AVIF, GIF and SVG.

## Contact form

The contact form posts to:

```text
POST /api/contact
```

The Cloudflare Pages Function is located at:

```text
functions/api/contact.js
```

Required production secret:

```text
BREVO_API_KEY
```

Optional environment variables:

```text
CONTACT_TO_EMAIL=info@umnothohygiene.co.za
CONTACT_FROM_EMAIL=info@umnothohygiene.co.za
```

## Training guide

Share **https://umnothohygiene.co.za/training** with training attendees. Both
`/training` and `/training/` redirect directly to the healthcare risk waste PDF,
without a landing page or login.

The original guide is stored at:

```text
public/training/umnotho-hygiene-hcrw-training-guide.pdf
```

`public/_redirects` keeps the short URL stable for printed QR codes.
`public/_headers` serves the guide as an inline PDF and requires caches to
revalidate it, so a replacement guide can use the same URL. Browsers with a PDF
viewer open it directly; devices configured to download PDFs use their normal
PDF app instead.

To update the guide, replace that PDF with the approved file and deploy through
the existing Cloudflare Pages Git integration. Keep the short URL unchanged.

## Deployment

Recommended Cloudflare Pages settings:

```text
Build command: npm run build
Build output directory: public
Root directory: /
```
