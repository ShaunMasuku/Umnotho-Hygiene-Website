const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
const navigation = document.getElementById('primary-navigation');
const navLinks = [...document.querySelectorAll('.nav-link')];

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 12);
};

const setMenuState = (open) => {
  if (!navigation || !menuToggle) return;
  navigation.classList.toggle('open', open);
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuToggle?.addEventListener('click', () => {
  setMenuState(!navigation?.classList.contains('open'));
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuState(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !navigation?.classList.contains('open')) return;
  setMenuState(false);
  menuToggle?.focus();
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const setActiveNavigation = (sectionId) => {
  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${sectionId}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
};

if (sections[0]) setActiveNavigation(sections[0].id);

if ('IntersectionObserver' in window && sections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) setActiveNavigation(visible.target.id);
  }, {
    rootMargin: '-30% 0px -55% 0px',
    threshold: [0.05, 0.25, 0.5]
  });

  sections.forEach((section) => sectionObserver.observe(section));
}

const revealElements = [...document.querySelectorAll('.reveal')];

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

const storeEnquirySelection = (enquiryType, service) => {
  try {
    sessionStorage.setItem('umnothoEnquiryType', enquiryType || 'Request a Quote');
    if (service) sessionStorage.setItem('umnothoService', service);
    else sessionStorage.removeItem('umnothoService');
  } catch {
    // The contact form still works if browser storage is unavailable.
  }
};

// Preserve the visitor's intended enquiry so the short contact form can
// pre-populate after the page scrolls to the Contact section.
document.querySelectorAll('.quote-link').forEach((link) => {
  link.addEventListener('click', () => {
    storeEnquirySelection(link.dataset.enquiry || 'Request a Quote', '');
  });
});

document.querySelectorAll('.service-enquiry').forEach((link) => {
  link.addEventListener('click', () => {
    storeEnquirySelection(
      link.dataset.enquiry || 'Request a Quote',
      link.dataset.service || ''
    );
  });
});
