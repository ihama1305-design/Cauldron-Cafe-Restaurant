const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const menuLinks = mobileMenu.querySelectorAll('a');

const setMenu = (open) => {
  document.body.classList.toggle('menu-open', open);
  mobileMenu.classList.toggle('is-open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
};

menuButton.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
menuLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal, .reveal-image').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min((index % 3) * 80, 160)}ms`;
  revealObserver.observe(element);
});

const tabs = document.querySelectorAll('.menu-tabs button');
const menuItems = document.querySelectorAll('.menu-item');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');
    const category = tab.dataset.category;
    menuItems.forEach((item) => {
      item.classList.toggle('is-hidden', category !== 'all' && item.dataset.type !== category);
    });
  });
});

const heroMedia = document.querySelector('.hero-media img');
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth > 900) {
  window.addEventListener('scroll', () => {
    const y = Math.min(window.scrollY * 0.09, 70);
    heroMedia.style.translate = `0 ${y}px`;
  }, { passive: true });
}

document.getElementById('year').textContent = new Date().getFullYear();
