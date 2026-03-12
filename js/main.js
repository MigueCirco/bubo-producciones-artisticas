const yearElement = document.querySelector('#current-year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const form = document.querySelector('.contact-form');
const message = document.querySelector('#form-message');

if (form && message) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    message.textContent = 'Formulario de ejemplo: conecta este bloque con tu proveedor de correo.';
  });
}

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const navLinks = document.querySelectorAll('.nav-list a');

if (menuToggle && siteNav) {
  const setMenuState = (open) => {
    siteNav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú principal' : 'Abrir menú principal');
    menuToggle.innerHTML = `<span aria-hidden="true">${open ? '✕' : '☰'}</span>`;
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  const media = window.matchMedia('(min-width: 861px)');
  const syncDesktopState = () => {
    if (media.matches) {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menú principal');
      menuToggle.innerHTML = '<span aria-hidden="true">☰</span>';
    }
  };

  syncDesktopState();
  media.addEventListener('change', syncDesktopState);
}

const instagramProfileUrl = 'https://www.instagram.com/buho_producciones_artisticas/';

// Edición rápida: mantené 6 tarjetas. thumbnailManual y thumbnailExperimental son opcionales.
const instagramGalleryItems = [
  {
    contentType: 'REEL',
    url: 'https://www.instagram.com/reel/C1ry00DOpZF/',
    title: 'Show en acción',
    thumbnailManual: '',
    thumbnailExperimental: ''
  },
  {
    contentType: 'REEL',
    url: 'https://www.instagram.com/reel/DCO3hVmJo4T/',
    title: 'Fuego y escena nocturna',
    thumbnailManual: '',
    thumbnailExperimental: ''
  },
  {
    contentType: 'REEL',
    url: 'https://www.instagram.com/reel/DNULtS0pLsW/',
    title: 'Impacto visual en vivo',
    thumbnailManual: '',
    thumbnailExperimental: ''
  },
  {
    contentType: 'POST',
    url: 'https://www.instagram.com/p/DSaWagOieni/',
    title: 'Producción en show',
    thumbnailManual: '',
    thumbnailExperimental: ''
  },
  {
    contentType: 'POST',
    url: 'https://www.instagram.com/p/DGQum4rRvRe/',
    title: 'Momento escénico',
    thumbnailManual: '',
    thumbnailExperimental: ''
  },
  {
    contentType: 'POST',
    url: 'https://www.instagram.com/p/CmO4ERJu6YH/',
    title: 'Búho en evento',
    thumbnailManual: '',
    thumbnailExperimental: ''
  }
];

const instagramGallery = document.querySelector('#instagram-gallery');
const instagramProfileLinks = document.querySelectorAll('[data-instagram-profile-link]');

instagramProfileLinks.forEach((link) => {
  link.setAttribute('href', instagramProfileUrl);
});

const instagramIconSvg = `
  <svg viewBox="0 0 24 24" fill="none" role="img" aria-label="Instagram" xmlns="http://www.w3.org/2000/svg">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" stroke-width="1.7" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7" />
    <circle cx="17.25" cy="6.75" r="1.1" fill="currentColor" />
  </svg>
`;

const truncateTitle = (title) => {
  const cleanTitle = title.trim();
  return cleanTitle.length > 44 ? `${cleanTitle.slice(0, 41)}...` : cleanTitle;
};

if (instagramGallery) {
  const fragment = document.createDocumentFragment();

  instagramGalleryItems.slice(0, 6).forEach((item) => {
    const thumbnailSrc = item.thumbnailManual || item.thumbnailExperimental || '';
    const article = document.createElement('article');
    article.className = 'instagram-item';

    const visual = document.createElement('div');
    visual.className = 'instagram-visual';

    if (thumbnailSrc) {
      const img = document.createElement('img');
      img.className = 'instagram-thumb';
      img.src = thumbnailSrc;
      img.alt = `Miniatura de Instagram: ${item.title}`;
      img.loading = 'lazy';
      img.addEventListener('error', () => {
        img.remove();
      });
      visual.appendChild(img);
    }

    const fallback = document.createElement('div');
    fallback.className = 'instagram-fallback';
    fallback.innerHTML = `
      <span class="instagram-icon" aria-hidden="true">${instagramIconSvg}</span>
      <span class="instagram-type">${item.contentType}</span>
      <p class="instagram-fallback-title">${truncateTitle(item.title)}</p>
      <a class="button instagram-link" href="${item.url}" target="_blank" rel="noopener noreferrer">Ver en Instagram</a>
    `;

    visual.appendChild(fallback);

    article.appendChild(visual);
    fragment.appendChild(article);
  });

  instagramGallery.replaceChildren(fragment);
}

const contactConfig = {
  Miguel: {
    phone: '5493814012526',
    label: 'Hablar con Miguel'
  },
  Nano: {
    phone: '5493816711400',
    label: 'Hablar con Nano'
  },
  messages: {
    generalMiguel:
      'Hola Miguel, quiero consultar por un show de Búho Producciones Artísticas para un evento.',
    generalNano:
      'Hola Nano, quiero consultar por un show de Búho Producciones Artísticas para un evento.',
    bar: 'Hola, quiero consultar por la Experiencia Nocturna Búho para un bar o evento nocturno.',
    familiar: 'Hola, quiero consultar por El Circo de los Búhos para un evento.'
  }
};

const whatsappButtons = document.querySelectorAll('[data-whatsapp-contact]');

whatsappButtons.forEach((button) => {
  const person = button.getAttribute('data-whatsapp-contact');
  const messageKey = button.getAttribute('data-whatsapp-message');

  if (!person || !messageKey || !contactConfig[person] || !contactConfig.messages[messageKey]) {
    return;
  }

  const phone = contactConfig[person].phone;
  const text = encodeURIComponent(contactConfig.messages[messageKey]);
  button.setAttribute('href', `https://wa.me/${phone}?text=${text}`);
});
