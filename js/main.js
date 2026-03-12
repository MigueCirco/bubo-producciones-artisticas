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

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuState(false);
    }
  });

  document.addEventListener('click', (event) => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (!isOpen) {
      return;
    }

    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (!siteNav.contains(target) && !menuToggle.contains(target)) {
      setMenuState(false);
    }
  });

  const media = window.matchMedia('(min-width: 861px)');
  const syncDesktopState = () => {
    if (media.matches) {
      setMenuState(false);
    }
  };

  syncDesktopState();
  media.addEventListener('change', syncDesktopState);
}

const instagramProfileUrl = 'https://www.instagram.com/buho_producciones_artisticas/';

const instagramGalleryItems = [
  {
    type: 'video',
    url: 'https://www.instagram.com/reel/C1ry00DOpZF/',
    title: 'Show en acción',
    thumbnail: './assets/img/instagram/reel-1.jpg'
  },
  {
    type: 'video',
    url: 'https://www.instagram.com/reel/DCO3hVmJo4T/',
    title: 'Fuego y escena nocturna',
    thumbnail: './assets/img/instagram/reel-2.jpg'
  },
  {
    type: 'video',
    url: 'https://www.instagram.com/reel/DNULtS0pLsW/',
    title: 'Impacto visual en vivo',
    thumbnail: './assets/img/instagram/reel-3.jpg'
  },
  {
    type: 'image',
    url: 'https://www.instagram.com/p/DSaWagOieni/',
    title: 'Producción en show',
    thumbnail: './assets/img/instagram/post-1.jpg'
  },
  {
    type: 'image',
    url: 'https://www.instagram.com/p/DGQum4rRvRe/',
    title: 'Momento escénico',
    thumbnail: './assets/img/instagram/post-2.jpg'
  },
  {
    type: 'image',
    url: 'https://www.instagram.com/p/CmO4ERJu6YH/',
    title: 'Búho en evento',
    thumbnail: './assets/img/instagram/post-3.jpg'
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

const formatInstagramType = (type) => (type === 'video' ? 'REEL' : 'POST');

if (instagramGallery) {
  const fragment = document.createDocumentFragment();

  instagramGalleryItems.slice(0, 6).forEach((item) => {
    const article = document.createElement('article');
    article.className = 'instagram-item';

    const visual = document.createElement('div');
    visual.className = 'instagram-visual';

    const overlay = document.createElement('div');
    overlay.className = 'instagram-overlay';
    overlay.innerHTML = `
      <span class="instagram-type">${formatInstagramType(item.type)}</span>
      <h3>${truncateTitle(item.title)}</h3>
      <a class="button instagram-link" href="${item.url}" target="_blank" rel="noopener noreferrer">Ver en Instagram</a>
    `;

    const fallback = document.createElement('div');
    fallback.className = 'instagram-fallback';
    fallback.innerHTML = `<span class="instagram-icon" aria-hidden="true">${instagramIconSvg}</span>`;

    const applyNoThumbnailState = () => {
      article.classList.remove('instagram-item--has-thumb');
    };

    if (item.thumbnail) {
      const img = document.createElement('img');
      img.className = 'instagram-thumb';
      img.src = item.thumbnail;
      img.alt = `Miniatura de Instagram: ${item.title}`;
      img.loading = 'lazy';

      img.addEventListener('load', () => {
        article.classList.add('instagram-item--has-thumb');
      });

      img.addEventListener('error', () => {
        img.remove();
        applyNoThumbnailState();
      });

      visual.appendChild(img);
    }

    visual.appendChild(fallback);
    visual.appendChild(overlay);
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
