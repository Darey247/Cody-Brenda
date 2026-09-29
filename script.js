const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.17,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const yearTarget = document.getElementById('year');
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const form = document.getElementById('contactForm');
const successMessage = document.querySelector('.success-message');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');

    successMessage.textContent = `Thanks, ${name}! Your message is ready to send. I’ll be in touch soon.`;
    form.reset();
  });
}



































