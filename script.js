const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = form.querySelector('.form-message');
    if (message) message.style.display = 'block';
    form.reset();
    setTimeout(() => {
      if (message) message.style.display = 'none';
    }, 5000);
  });
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-on-scroll').forEach((el) => observer.observe(el));

const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Mobile navigation: injected here so the desktop markup stays clean and semantic.
const headerInner = document.querySelector('.header-inner');
const navMenu = document.querySelector('.nav-menu');

if (headerInner && navMenu) {
  const menuButton = document.createElement('button');
  menuButton.className = 'menu-toggle';
  menuButton.type = 'button';
  menuButton.setAttribute('aria-label', 'Open navigation menu');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.innerHTML = `
    <span class="menu-icon" aria-hidden="true">
      <span></span><span></span><span></span>
    </span>
  `;
  headerInner.insertBefore(menuButton, navMenu);

  const closeMenu = () => {
    navMenu.classList.remove('is-open');
    menuButton.classList.remove('is-active');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    document.body.classList.remove('menu-open');
  };

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('is-open');
    menuButton.classList.toggle('is-active', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    document.body.classList.toggle('menu-open', isOpen);
  };

  menuButton.addEventListener('click', toggleMenu);
  navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  // Add the responsive menu styles without requiring a framework or icon library.
  const mobileStyles = document.createElement('style');
  mobileStyles.textContent = `
    .menu-toggle { display: none; }
    @media (max-width: 768px) {
      body.menu-open { overflow: hidden; }
      .header-inner { position: relative; min-height: 44px; }
      .menu-toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        margin-left: auto;
        padding: 0;
        border: 1px solid var(--border);
        border-radius: 50%;
        background: #fff;
        color: var(--text-dark);
        cursor: pointer;
        z-index: 102;
        -webkit-tap-highlight-color: transparent;
      }
      .menu-icon { display: grid; gap: 4px; width: 18px; }
      .menu-icon span {
        display: block;
        width: 18px;
        height: 2px;
        background: currentColor;
        transition: transform .25s ease, opacity .25s ease;
      }
      .menu-toggle.is-active .menu-icon span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
      .menu-toggle.is-active .menu-icon span:nth-child(2) { opacity: 0; }
      .menu-toggle.is-active .menu-icon span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
      .nav-menu {
        position: fixed;
        inset: 78px 16px auto 16px;
        display: grid;
        gap: 0;
        padding: 12px;
        background: rgba(255,255,255,.98);
        border: 1px solid var(--border);
        border-radius: 14px;
        box-shadow: 0 22px 55px rgba(0,0,0,.14);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: opacity .25s ease, transform .25s ease, visibility .25s ease;
        z-index: 101;
      }
      .nav-menu.is-open { opacity: 1; visibility: visible; transform: translateY(0); }
      .nav-menu .nav-link {
        display: flex;
        align-items: center;
        min-height: 50px;
        padding: 0 14px;
        border-radius: 8px;
        font-size: 1rem;
      }
      .nav-menu .nav-link:hover,
      .nav-menu .nav-link:focus-visible { background: var(--bg-light); }
      .nav-menu .nav-link::after { display: none; }
      .logo { font-size: 1.15rem; }
      .hero-grid { gap: 34px; }
      .hero-image { order: -1; }
      .portrait-wrapper { max-height: 520px; }
      .portrait { width: 100%; height: 520px; object-fit: cover; object-position: center top; }
      .hero-ctas .btn { width: 100%; }
      .trust-indicators { gap: 8px; }
      .trust-item { padding: 8px 11px; font-size: .75rem; }
      .case-study, .process-step, .service-card, .testimonial-card, .insight-card { min-width: 0; }
      .case-image { min-height: 280px; }
      .case-content { padding: 28px 22px; }
      .contact-form { padding: 24px 18px; }
    }
    @media (min-width: 769px) {
      .menu-toggle { display: none !important; }
    }
    @media (prefers-reduced-motion: reduce) {
      .nav-menu, .menu-icon span { transition: none; }
    }
  `;
  document.head.appendChild(mobileStyles);
}
