(() => {
  const addMilestoneStyles = () => {
    if (document.querySelector('link[href="css/milestone3.css"]')) return;
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'css/milestone3.css';
    document.head.appendChild(stylesheet);
  };

  const socialIcon = (platform) => {
    if (platform === 'instagram') {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm0 2A3.2 3.2 0 0 0 4 7.2v9.6A3.2 3.2 0 0 0 7.2 20h9.6a3.2 3.2 0 0 0 3.2-3.2V7.2A3.2 3.2 0 0 0 16.8 4H7.2Zm10.2 1.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>';
    }
    if (platform === 'facebook') {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 22v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.4v2H8V14h2.8v8h3.4Z"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.3 3c.5 2.7 2 4.3 4.7 4.5v3.1a9.1 9.1 0 0 1-4.6-1.4v6.3a6.5 6.5 0 1 1-5.6-6.4v3.2a3.3 3.3 0 1 0 2.4 3.2V3h3.1Z"/></svg>';
  };

  const galleryMarkup = `
    <div class="container">
      <header class="gallery-heading reveal">
        <div>
          <span class="section-label">Gallery</span>
          <h2 id="gallery-title">See Umnotho Hygiene in action.</h2>
        </div>
        <p>Our gallery is built to grow with the business. Images are displayed in full without cropping, stretching or forced zoom, regardless of their aspect ratio.</p>
      </header>

      <div class="gallery-shell reveal">
        <div class="gallery-viewport">
          <div class="gallery-track" id="gallery-track" aria-live="polite"></div>
        </div>
        <div class="gallery-controls" id="gallery-controls" hidden>
          <div class="gallery-arrows">
            <button class="gallery-arrow" id="gallery-prev" type="button" aria-label="Previous gallery images">←</button>
            <button class="gallery-arrow" id="gallery-next" type="button" aria-label="Next gallery images">→</button>
          </div>
          <div class="gallery-dots" id="gallery-dots" aria-label="Gallery pages"></div>
          <div class="gallery-count" id="gallery-count" aria-live="polite"></div>
        </div>
        <p class="gallery-note">Real project photos can replace these launch placeholders simply by adding numbered image files to <code>public/assets/gallery/</code>.</p>
      </div>
    </div>`;

  const contactMarkup = `
    <div class="container">
      <header class="contact-heading reveal">
        <div>
          <span class="section-label">Contact Us</span>
          <h2 id="contact-title">Ready to discuss your facility?</h2>
        </div>
        <p>Request a quote, ask a question or tell us what support your organisation needs. The form is deliberately short so we can start the conversation quickly.</p>
      </header>

      <div class="contact-grid">
        <aside class="contact-card reveal" aria-labelledby="contact-details-title">
          <h3 id="contact-details-title">Get in touch</h3>
          <p>Speak to Umnotho Hygiene directly or connect with us through our social channels.</p>

          <div class="contact-list">
            <div class="contact-item">
              <span class="contact-item-icon" aria-hidden="true">☎</span>
              <a href="tel:+27816468948"><strong>Phone</strong><span>081 646 8948</span></a>
            </div>
            <div class="contact-item">
              <span class="contact-item-icon" aria-hidden="true">WA</span>
              <a href="https://wa.me/27816468948?text=Hello%20Umnotho%20Hygiene%2C%20I%20would%20like%20to%20enquire%20about%20your%20services." target="_blank" rel="noopener noreferrer"><strong>WhatsApp</strong><span>081 646 8948</span></a>
            </div>
            <div class="contact-item">
              <span class="contact-item-icon" aria-hidden="true">✉</span>
              <a href="mailto:info@umnothohygiene.co.za"><strong>Email</strong><span>info@umnothohygiene.co.za</span></a>
            </div>
            <div class="contact-item">
              <span class="contact-item-icon" aria-hidden="true">⌖</span>
              <div><strong>Address</strong><span>Camelia Street, Ebony Park<br>Midrand, Gauteng, 1685<br>South Africa</span></div>
            </div>
          </div>

          <div class="social-links" aria-label="Umnotho Hygiene social media">
            <a class="social-link" href="https://www.instagram.com/umnothohygiene/" target="_blank" rel="noopener noreferrer">${socialIcon('instagram')} Instagram</a>
            <a class="social-link" href="https://www.facebook.com/people/Umnotho-Hygiene/100092292177291/" target="_blank" rel="noopener noreferrer">${socialIcon('facebook')} Facebook</a>
            <a class="social-link" href="https://vm.tiktok.com/ZS9k99EWqCNU6-jZ9VD/" target="_blank" rel="noopener noreferrer">${socialIcon('tiktok')} TikTok</a>
          </div>
        </aside>

        <div class="enquiry-card reveal">
          <h3>Send us an enquiry</h3>
          <p>Your message will be emailed directly to <strong>info@umnothohygiene.co.za</strong>. We do not need a website database for enquiries.</p>

          <form class="contact-form" id="contact-form" novalidate>
            <div class="form-grid">
              <div class="form-field">
                <label for="enquiry-type">Enquiry type <span>*</span></label>
                <select id="enquiry-type" name="enquiryType" required>
                  <option value="Request a Quote">Request a Quote</option>
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Ask a Question">Ask a Question</option>
                </select>
              </div>

              <div class="form-field">
                <label for="service">Service <span>*</span></label>
                <select id="service" name="service" required>
                  <option value="">Select a service</option>
                  <option value="Medical Waste Removal">Medical Waste Removal</option>
                  <option value="Sanitary Bin Services">Sanitary Bin Services</option>
                  <option value="Pest Control">Pest Control</option>
                  <option value="Deep Cleaning">Deep Cleaning</option>
                  <option value="PPE & Hygiene Consumables">PPE &amp; Hygiene Consumables</option>
                  <option value="School & Facility Hygiene Support">School &amp; Facility Hygiene Support</option>
                  <option value="Multiple / Not Sure">Multiple / Not Sure</option>
                </select>
              </div>

              <div class="form-field">
                <label for="full-name">Full name <span>*</span></label>
                <input id="full-name" name="name" type="text" maxlength="100" autocomplete="name" required placeholder="Your full name" />
              </div>

              <div class="form-field">
                <label for="organisation">Company / organisation</label>
                <input id="organisation" name="organisation" type="text" maxlength="120" autocomplete="organization" placeholder="Organisation name" />
              </div>

              <div class="form-field">
                <label for="email">Email <span>*</span></label>
                <input id="email" name="email" type="email" maxlength="160" autocomplete="email" required placeholder="you@company.co.za" />
              </div>

              <div class="form-field">
                <label for="phone">Phone / WhatsApp</label>
                <input id="phone" name="phone" type="tel" maxlength="40" autocomplete="tel" placeholder="e.g. 082 000 0000" />
              </div>

              <div class="form-field full">
                <label for="location">Location</label>
                <input id="location" name="location" type="text" maxlength="140" autocomplete="address-level2" placeholder="City, suburb or province" />
              </div>

              <div class="form-field full">
                <label for="message">Message <span>*</span></label>
                <textarea id="message" name="message" maxlength="3000" required placeholder="Tell us briefly what service or support you need."></textarea>
              </div>
            </div>

            <div class="honeypot-field" aria-hidden="true">
              <label for="company-website">Website</label>
              <input id="company-website" name="companyWebsite" type="text" tabindex="-1" autocomplete="off" />
            </div>

            <label class="form-consent">
              <input type="checkbox" name="consent" value="yes" required />
              <span>I agree that Umnotho Hygiene may use the information I provide to respond to this enquiry. See our <a href="privacy.html">Privacy Notice</a>.</span>
            </label>

            <div class="form-actions">
              <button class="btn btn-primary submit-button" id="contact-submit" type="submit">Send Enquiry</button>
              <p class="form-status" id="form-status" role="status" aria-live="polite"></p>
              <a class="email-fallback" id="email-fallback" href="mailto:info@umnothohygiene.co.za">Email us directly instead</a>
            </div>
          </form>
        </div>
      </div>
    </div>`;

  const footerMarkup = `
    <footer class="site-footer" id="site-footer">
      <div class="container footer-main">
        <div class="footer-brand-column">
          <a href="#home" aria-label="Umnotho Hygiene home">
            <span class="footer-brand-name">UMNOTHO</span>
            <span class="footer-brand-subname">HYGIENE</span>
          </a>
          <p class="footer-intro">Professional hygiene, waste management and facility support solutions for healthcare, education, commercial and industrial environments.</p>
        </div>

        <div>
          <h2 class="footer-heading">Quick links</h2>
          <nav class="footer-links" aria-label="Footer navigation">
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#services">Our Services</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact Us</a>
          </nav>
        </div>

        <div>
          <h2 class="footer-heading">Get in touch</h2>
          <div class="footer-contact">
            <a href="tel:+27816468948">081 646 8948</a>
            <a href="mailto:info@umnothohygiene.co.za">info@umnothohygiene.co.za</a>
            <span>Camelia Street, Ebony Park<br>Midrand, Gauteng, 1685</span>
          </div>
          <div class="footer-socials" aria-label="Social media links">
            <a href="https://www.instagram.com/umnothohygiene/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${socialIcon('instagram')}</a>
            <a href="https://www.facebook.com/people/Umnotho-Hygiene/100092292177291/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">${socialIcon('facebook')}</a>
            <a href="https://vm.tiktok.com/ZS9k99EWqCNU6-jZ9VD/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">${socialIcon('tiktok')}</a>
          </div>
        </div>
      </div>

      <div class="container footer-bottom">
        <span>© <span id="footer-year"></span> Umnotho Hygiene (Pty) Ltd. All rights reserved.</span>
        <a href="privacy.html">Privacy Notice</a>
      </div>
    </footer>`;

  const lightboxMarkup = `
    <dialog class="gallery-lightbox" id="gallery-lightbox" aria-labelledby="lightbox-caption">
      <div class="lightbox-content">
        <button class="lightbox-close" id="lightbox-close" type="button" aria-label="Close gallery image">×</button>
        <button class="lightbox-arrow lightbox-prev" id="lightbox-prev" type="button" aria-label="Previous image">←</button>
        <div class="lightbox-image-frame"><img id="lightbox-image" alt="" /></div>
        <button class="lightbox-arrow lightbox-next" id="lightbox-next" type="button" aria-label="Next image">→</button>
        <div class="lightbox-caption" id="lightbox-caption"></div>
      </div>
    </dialog>`;

  const prepareSections = () => {
    const gallery = document.getElementById('gallery');
    const contact = document.getElementById('contact');

    if (gallery) {
      gallery.className = 'content-section gallery-section';
      gallery.setAttribute('aria-labelledby', 'gallery-title');
      gallery.innerHTML = galleryMarkup;
    }

    if (contact) {
      contact.className = 'content-section contact-section';
      contact.setAttribute('aria-labelledby', 'contact-title');
      contact.innerHTML = contactMarkup;
    }

    if (!document.getElementById('site-footer')) {
      document.querySelector('main')?.insertAdjacentHTML('afterend', footerMarkup);
    }

    if (!document.getElementById('gallery-lightbox')) {
      document.body.insertAdjacentHTML('beforeend', lightboxMarkup);
    }

    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = String(new Date().getFullYear());
  };

  const makeNavbarQuoteFirst = () => {
    const navButton = document.querySelector('.nav-whatsapp');
    if (!navButton) return;
    navButton.textContent = 'Request a Quote';
    navButton.href = '#contact';
    navButton.classList.remove('nav-whatsapp');
    navButton.classList.add('quote-link');
    navButton.dataset.enquiry = 'Request a Quote';
    navButton.removeAttribute('target');
    navButton.removeAttribute('rel');
    navButton.setAttribute('aria-label', 'Request a quote from Umnotho Hygiene');
  };

  const observeNewReveals = () => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('#gallery .reveal, #contact .reveal, .site-footer .reveal').forEach((element) => element.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('#gallery .reveal, #contact .reveal').forEach((element) => observer.observe(element));
  };

  const initialiseGallery = async () => {
    const track = document.getElementById('gallery-track');
    const controls = document.getElementById('gallery-controls');
    const dots = document.getElementById('gallery-dots');
    const count = document.getElementById('gallery-count');
    const previousButton = document.getElementById('gallery-prev');
    const nextButton = document.getElementById('gallery-next');
    const dialog = document.getElementById('gallery-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxPrevious = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxClose = document.getElementById('lightbox-close');

    if (!track) return;

    let items = [];
    let currentPage = 0;
    let lightboxIndex = 0;
    let scrollFrame;

    const visibleCount = () => {
      if (window.innerWidth <= 680) return 1;
      if (window.innerWidth <= 1020) return 2;
      return 3;
    };

    const pageCount = () => Math.max(1, Math.ceil(items.length / visibleCount()));

    const renderDots = () => {
      dots.innerHTML = '';
      const pages = pageCount();
      for (let index = 0; index < pages; index += 1) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `gallery-dot${index === currentPage ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Go to gallery page ${index + 1}`);
        dot.addEventListener('click', () => goToPage(index));
        dots.appendChild(dot);
      }
    };

    const updateControls = () => {
      const pages = pageCount();
      currentPage = Math.min(Math.max(currentPage, 0), pages - 1);
      previousButton.disabled = currentPage === 0;
      nextButton.disabled = currentPage >= pages - 1;
      count.textContent = `${currentPage + 1} / ${pages}`;
      [...dots.children].forEach((dot, index) => dot.classList.toggle('active', index === currentPage));
    };

    const goToPage = (page) => {
      if (!items.length) return;
      currentPage = Math.min(Math.max(page, 0), pageCount() - 1);
      const targetIndex = currentPage * visibleCount();
      const target = track.children[targetIndex];
      if (target) {
        track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: 'smooth' });
      }
      updateControls();
    };

    const updatePageFromScroll = () => {
      if (!track.children.length) return;
      const firstCard = track.children[0];
      const styles = getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
      const pageWidth = (firstCard.offsetWidth + gap) * visibleCount();
      if (pageWidth <= 0) return;
      currentPage = Math.round(track.scrollLeft / pageWidth);
      updateControls();
    };

    const showLightboxItem = (index) => {
      if (!items.length) return;
      lightboxIndex = (index + items.length) % items.length;
      const item = items[lightboxIndex];
      lightboxImage.src = item.src;
      lightboxImage.alt = item.alt || item.caption || 'Umnotho Hygiene gallery image';
      lightboxCaption.textContent = `${item.caption || item.alt || 'Umnotho Hygiene'} — ${lightboxIndex + 1} of ${items.length}`;
    };

    const openLightbox = (index) => {
      showLightboxItem(index);
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    };

    try {
      const response = await fetch('data/gallery.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('Gallery data could not be loaded.');
      items = await response.json();

      if (!Array.isArray(items) || items.length === 0) {
        track.innerHTML = '<div class="gallery-empty"><strong>Gallery coming soon.</strong><span>Add numbered image files to the gallery folder and run the gallery build script.</span></div>';
        return;
      }

      track.innerHTML = items.map((item, index) => `
        <button class="gallery-slide" type="button" data-gallery-index="${index}" aria-label="Open ${item.alt || item.caption || `gallery image ${index + 1}`} in full screen">
          <span class="gallery-image-frame"><img src="${item.src}" alt="${item.alt || ''}" loading="lazy" decoding="async" /></span>
          <span class="gallery-caption">${item.caption || item.alt || `Gallery image ${index + 1}`}</span>
        </button>`).join('');

      track.querySelectorAll('.gallery-slide').forEach((slide) => {
        slide.addEventListener('click', () => openLightbox(Number(slide.dataset.galleryIndex)));
      });

      controls.hidden = items.length <= 1;
      renderDots();
      updateControls();

      previousButton.addEventListener('click', () => goToPage(currentPage - 1));
      nextButton.addEventListener('click', () => goToPage(currentPage + 1));

      track.addEventListener('scroll', () => {
        cancelAnimationFrame(scrollFrame);
        scrollFrame = requestAnimationFrame(updatePageFromScroll);
      }, { passive: true });

      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          currentPage = Math.min(currentPage, pageCount() - 1);
          renderDots();
          goToPage(currentPage);
        }, 120);
      }, { passive: true });

      lightboxPrevious?.addEventListener('click', () => showLightboxItem(lightboxIndex - 1));
      lightboxNext?.addEventListener('click', () => showLightboxItem(lightboxIndex + 1));
      lightboxClose?.addEventListener('click', () => dialog.close());

      dialog?.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
      });

      dialog?.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') showLightboxItem(lightboxIndex - 1);
        if (event.key === 'ArrowRight') showLightboxItem(lightboxIndex + 1);
      });
    } catch (error) {
      console.error(error);
      track.innerHTML = '<div class="gallery-empty"><strong>Gallery unavailable.</strong><span>Please check the generated gallery manifest and try again.</span></div>';
    }
  };

  const initialiseContactForm = () => {
    const form = document.getElementById('contact-form');
    const enquirySelect = document.getElementById('enquiry-type');
    const serviceSelect = document.getElementById('service');
    const submitButton = document.getElementById('contact-submit');
    const status = document.getElementById('form-status');
    const fallback = document.getElementById('email-fallback');

    if (!form) return;

    const applySelection = (enquiryType, service) => {
      if (enquiryType && [...enquirySelect.options].some((option) => option.value === enquiryType)) enquirySelect.value = enquiryType;
      if (service && [...serviceSelect.options].some((option) => option.value === service)) serviceSelect.value = service;
    };

    const storedEnquiry = sessionStorage.getItem('umnothoEnquiryType');
    const storedService = sessionStorage.getItem('umnothoService');
    applySelection(storedEnquiry || 'Request a Quote', storedService || '');

    document.querySelectorAll('.quote-link, .service-enquiry').forEach((link) => {
      link.addEventListener('click', () => {
        const enquiry = link.dataset.enquiry || 'Request a Quote';
        const service = link.dataset.service || '';
        sessionStorage.setItem('umnothoEnquiryType', enquiry);
        if (service) sessionStorage.setItem('umnothoService', service);
        applySelection(enquiry, service);
      });
    });

    const buildFallbackLink = (payload) => {
      const subject = `${payload.enquiryType}: ${payload.service || 'Umnotho Hygiene enquiry'}`;
      const body = [
        `Name: ${payload.name}`,
        `Organisation: ${payload.organisation || '-'}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone || '-'}`,
        `Service: ${payload.service || '-'}`,
        `Location: ${payload.location || '-'}`,
        '',
        payload.message
      ].join('\n');
      fallback.href = `mailto:info@umnothohygiene.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      status.className = 'form-status';
      status.textContent = '';
      fallback.classList.remove('visible');

      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const payload = Object.fromEntries(data.entries());
      buildFallbackLink(payload);

      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
      status.textContent = 'Sending your enquiry…';

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || 'The enquiry could not be sent.');

        status.className = 'form-status success';
        status.textContent = 'Thank you. Your enquiry has been sent to Umnotho Hygiene.';
        form.reset();
        enquirySelect.value = 'Request a Quote';
        sessionStorage.removeItem('umnothoService');
        sessionStorage.setItem('umnothoEnquiryType', 'Request a Quote');
      } catch (error) {
        console.error(error);
        status.className = 'form-status error';
        status.textContent = 'We could not send your enquiry right now.';
        fallback.classList.add('visible');
      } finally {
        clearTimeout(timeout);
        submitButton.disabled = false;
        submitButton.textContent = 'Send Enquiry';
      }
    });
  };

  addMilestoneStyles();
  prepareSections();
  makeNavbarQuoteFirst();
  observeNewReveals();
  initialiseGallery();
  initialiseContactForm();
})();
