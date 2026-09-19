(() => {
  // Gallery, enquiry form and small footer helpers.

  // ---------- Footer year ----------
  const footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = String(new Date().getFullYear());

  // ---------- Safe session storage helpers ----------

  const storageGet = (key) => {
    try { return sessionStorage.getItem(key); } catch { return null; }
  };

  const storageSet = (key, value) => {
    try { sessionStorage.setItem(key, value); } catch { /* Storage is optional. */ }
  };

  const storageRemove = (key) => {
    try { sessionStorage.removeItem(key); } catch { /* Storage is optional. */ }
  };

  // ---------- Gallery carousel and lightbox ----------

  const initialiseGallery = async () => {
    const track = document.getElementById('gallery-track');
    const controls = document.getElementById('gallery-controls');
    const dots = document.getElementById('gallery-dots');
    const count = document.getElementById('gallery-count');
    const previousButton = document.getElementById('gallery-prev');
    const nextButton = document.getElementById('gallery-next');
    const dialog = document.getElementById('gallery-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
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
      if (target) track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: 'smooth' });
      updateControls();
    };

    const renderDots = () => {
      dots.innerHTML = '';
      for (let index = 0; index < pageCount(); index += 1) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `gallery-dot${index === currentPage ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Go to gallery page ${index + 1}`);
        dot.addEventListener('click', () => goToPage(index));
        dots.appendChild(dot);
      }
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
      lightboxImage.alt = item.alt || `Umnotho Hygiene gallery image ${lightboxIndex + 1}`;
    };

    const openLightbox = (index) => {
      showLightboxItem(index);
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    };

    const closeLightbox = () => {
      if (typeof dialog?.close === 'function') dialog.close();
      else dialog?.removeAttribute('open');
    };

    try {
      const response = await fetch('data/gallery.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('Gallery data could not be loaded.');

      const folderImages = await response.json();
      items = Array.isArray(folderImages)
        ? folderImages.filter((item) => item?.src)
        : [];

      if (items.length === 0) {
        track.innerHTML = '<div class="gallery-empty"><strong>Gallery coming soon.</strong></div>';
        return;
      }

      track.innerHTML = items.map((item, index) => `
        <button class="gallery-slide" type="button" data-gallery-index="${index}" aria-label="Open gallery image ${index + 1} in full screen">
          <span class="gallery-image-frame"><img src="${item.src}" alt="${item.alt || `Umnotho Hygiene gallery image ${index + 1}`}" loading="lazy" decoding="async" /></span>
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
      lightboxClose?.addEventListener('click', closeLightbox);

      dialog?.addEventListener('click', (event) => {
        if (event.target === dialog) closeLightbox();
      });

      dialog?.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') showLightboxItem(lightboxIndex - 1);
        if (event.key === 'ArrowRight') showLightboxItem(lightboxIndex + 1);
      });
    } catch (error) {
      console.error(error);
      track.innerHTML = '<div class="gallery-empty"><strong>Gallery temporarily unavailable.</strong></div>';
    }
  };

  // ---------- Contact / quote form ----------

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

    applySelection(
      storageGet('umnothoEnquiryType') || 'Request a Quote',
      storageGet('umnothoService') || ''
    );

    document.querySelectorAll('.quote-link, .service-enquiry').forEach((link) => {
      link.addEventListener('click', () => {
        const enquiry = link.dataset.enquiry || 'Request a Quote';
        const service = link.dataset.service || '';
        storageSet('umnothoEnquiryType', enquiry);
        if (service) storageSet('umnothoService', service);
        else storageRemove('umnothoService');
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

      const payload = Object.fromEntries(new FormData(form).entries());
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
        storageRemove('umnothoService');
        storageSet('umnothoEnquiryType', 'Request a Quote');
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

  // ---------- Initialise page features ----------

  initialiseGallery();
  initialiseContactForm();
})();
