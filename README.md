# Umnotho Hygiene Website

Official one-page website for Umnotho Hygiene (Pty) Ltd.

## Tech

- HTML
- CSS
- Vanilla JavaScript
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

## Deployment

Recommended Cloudflare Pages settings:

```text
Build command: npm run build
Build output directory: public
Root directory: /
```
