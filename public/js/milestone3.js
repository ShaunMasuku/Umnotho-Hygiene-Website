(() => {
  const footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = String(new Date().getFullYear());

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

    applySelection(
      sessionStorage.getItem('umnothoEnquiryType') || 'Request a Quote',
      sessionStorage.getItem('umnothoService') || ''
    );

    document.querySelectorAll('.quote-link, .service-enquiry').forEach((link) => {
      link.addEventListener('click', () => {
        const enquiry = link.dataset.enquiry || 'Request a Quote';
        const service = link.dataset.service || '';
        sessionStorage.setItem('umnothoEnquiryType', enquiry);
        if (service) sessionStorage.setItem('umnothoService', service);
        else sessionStorage.removeItem('umnothoService');
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

  initialiseGallery();
  initialiseContactForm();
})();
