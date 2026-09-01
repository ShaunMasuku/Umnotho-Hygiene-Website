# Umnotho Hygiene Website

Official one-page website for Umnotho Hygiene (Pty) Ltd.

The site is intentionally built with semantic HTML, CSS and vanilla JavaScript to keep it fast, maintainable and inexpensive to host.

## Sections

- Home
- About Us
- Our Services
- Gallery
- Contact Us
- Privacy Notice

## Brand

Primary brand colours:

- Navy: `#0e2742`
- Green: `#137344`
- Bright green: `#3a9f34`
- Blue: `#0c4987`
- Light mint: `#e9f5f1`
- Medical red: `#d1291d`

## Development status

### Milestone 1 — complete

- Project foundation
- Responsive navigation
- Hero section
- National service-area messaging
- Floating WhatsApp action

### Milestone 2 — complete

- About Us section
- Vision, mission and core values
- Industries / facility types served
- Six-service portfolio
- Service-specific enquiry actions
- Compliance & Credentials strip

### Milestone 3 — complete

- Dynamic gallery manifest
- Responsive 1 / 2 / 3-image carousel
- Full-image display using `object-fit: contain`
- Gallery lightbox with keyboard and button navigation
- Contact details and social links
- Short quote / enquiry form
- Service and enquiry pre-selection
- Server-side validation and spam honeypot
- Transactional email endpoint
- Footer
- Privacy Notice

## Gallery workflow

Gallery images live in:

```text
public/assets/gallery/
```

Use a numeric filename prefix to control display order:

```text
001-medical-waste.jpg
002-deep-cleaning.jpg
003-pest-control.png
```

Then run:

```bash
npm run build
```

The build script scans the folder and regenerates:

```text
public/data/gallery.json
```

Supported image extensions are JPG, JPEG, PNG, WebP, AVIF, GIF and SVG. The gallery displays the complete image without cropping, stretching or zoom-to-fill.

## Contact form

The public form submits JSON to:

```text
POST /api/contact
```

The Cloudflare Pages Function is located at:

```text
functions/api/contact.js
```

No enquiry database is required. The Function validates the submission and sends the message to `info@umnothohygiene.co.za` through a transactional email provider.

### Required production secret

Configure this secret in the hosting environment:

```text
BREVO_API_KEY
```

Optional variables:

```text
CONTACT_TO_EMAIL=info@umnothohygiene.co.za
CONTACT_FROM_EMAIL=info@umnothohygiene.co.za
```

The sending address must be verified with the email provider. The implementation uses the provider's free transactional-email tier; provider limits can change and should be checked during deployment.

## Cloudflare Pages deployment target

Recommended configuration:

```text
Build command: npm run build
Build output directory: public
Root directory: /
```

The `/functions` directory must stay at repository root because Cloudflare Pages uses its file path to create the `/api/contact` route.

## Cost target

The project is designed to use free static hosting, free serverless-function usage and a free transactional-email allowance at normal small-business enquiry volumes. The domain remains the intended recurring paid item.
