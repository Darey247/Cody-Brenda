// Handle form submission
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = form.querySelector('.form-message');
    message.style.display = 'block';
    form.reset();
    setTimeout(() => {
      message.style.display = 'none';
    }, 5000);
  });
}

// Intersection Observer for fade-in-on-scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
  observer.observe(el);
});

// Set current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
