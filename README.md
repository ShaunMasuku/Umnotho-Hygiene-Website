# Umnotho Hygiene Website (I am vibing coding this completely, not touching a single line of code)

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

Official web branding asset:

```text
public/assets/branding/umnotho-emblem.webp
```

The emblem is used alongside the Umnotho wordmark treatment across the site and as the browser icon.

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

### Milestone 4A — production polish complete

- Production metadata, canonical URL and social-sharing metadata
- Official Umnotho emblem integrated into navigation, hero, footer, favicon and Privacy Notice
- Public-facing gallery and contact copy cleaned up
- Keyboard navigation and mobile-menu behaviour hardened
- Active navigation exposed with `aria-current`
- Visible focus states for keyboard users
- Reduced-motion support and progressive fallbacks for older browsers
- Privacy Notice presentation and wording refined for launch

Remaining launch preparation is intentionally kept outside this milestone: real project photography, staging deployment, transactional-email production configuration, custom-domain DNS cut-over and final device/browser QA.

### Design review refinements

- Navigation simplified so Request a Quote is the single contact CTA in the header
- Hero and services positioning aligned to Waste Management, Pest Control & Deep Cleaning
- Facility Hygiene Support naming simplified
- COIDA added to the expandable credentials grid
- Gallery simplified to images only with filename-agnostic rendering
- Contact icons, footer brand contrast and Privacy Notice return navigation refined

## Gallery workflow

Gallery images live in:

```text
public/assets/gallery/
```

Image filenames are not shown on the website and do not need to follow a naming convention. Drop any supported image into the folder and run:

```bash
npm run build
```

The build script scans every supported image in the folder and regenerates:

```text
public/data/gallery.json
```

The Cloudflare Pages deployment will use the same `npm run build` command, so adding an image and pushing the change is enough for it to be included in the deployed gallery. Files are sorted deterministically by filename, but filenames are never rendered as gallery titles or captions.

Supported image extensions are JPG, JPEG, PNG, WebP, AVIF, GIF and SVG. Gallery images use `object-fit: contain`, so the complete image is shown while preserving its aspect ratio rather than cropping or stretching it.

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
