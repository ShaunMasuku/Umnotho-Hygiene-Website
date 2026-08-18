const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
const navigation = document.getElementById('primary-navigation');
const navLinks = [...document.querySelectorAll('.nav-link')];

const setHeaderState = () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuToggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
  });
}, {
  rootMargin: '-30% 0px -55% 0px',
  threshold: [0.05, 0.25, 0.5]
});

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// Preserve the visitor's intended enquiry so Milestone 3 can pre-populate the
// short contact form after the page scrolls to the Contact section.
document.querySelectorAll('.quote-link').forEach((link) => {
  link.addEventListener('click', () => {
    sessionStorage.setItem('umnothoEnquiryType', link.dataset.enquiry || 'Request a Quote');
    sessionStorage.removeItem('umnothoService');
  });
});

document.querySelectorAll('.service-enquiry').forEach((link) => {
  link.addEventListener('click', () => {
    sessionStorage.setItem('umnothoEnquiryType', link.dataset.enquiry || 'Request a Quote');
    sessionStorage.setItem('umnothoService', link.dataset.service || '');
  });
});
