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


const eventCarousel = document.querySelector('[data-event-carousel]');

if (eventCarousel) {
  const track = eventCarousel.querySelector('[data-carousel-track]');
  const slides = track ? Array.from(track.querySelectorAll('[data-event-slide]')) : [];
  const prevButton = eventCarousel.querySelector('[data-carousel-prev]');
  const nextButton = eventCarousel.querySelector('[data-carousel-next]');
  const dotsContainer = document.querySelector('[data-carousel-dots]');

  slides.forEach((slide) => {
    const image = slide.querySelector('img');
    if (!image) {
      return;
    }

    image.addEventListener('load', () => {
      slide.classList.add('event-card--has-image');
    });

    image.addEventListener('error', () => {
      image.remove();
      slide.classList.remove('event-card--has-image');
    });
  });

  if (track && slides.length && dotsContainer) {
    const getStep = () => slides[0].getBoundingClientRect().width + 16;

    const buildDots = () => {
      dotsContainer.replaceChildren();
      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'event-carousel-dot';
        dot.setAttribute('aria-label', `Ir a propuesta ${index + 1}`);
        dot.addEventListener('click', () => {
          track.scrollTo({ left: getStep() * index, behavior: 'smooth' });
        });
        dotsContainer.appendChild(dot);
      });
    };

    const setActiveState = () => {
      const step = getStep();
      const activeIndex = Math.round(track.scrollLeft / step);
      const dots = dotsContainer.querySelectorAll('.event-carousel-dot');

      dots.forEach((dot, index) => {
        dot.classList.toggle('is-active', index === activeIndex);
      });

      const maxScroll = track.scrollWidth - track.clientWidth;
      if (prevButton) {
        prevButton.disabled = track.scrollLeft <= 4;
      }
      if (nextButton) {
        nextButton.disabled = track.scrollLeft >= maxScroll - 4;
      }
    };

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        track.scrollBy({ left: -getStep(), behavior: 'smooth' });
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        track.scrollBy({ left: getStep(), behavior: 'smooth' });
      });
    }

    buildDots();
    setActiveState();

    track.addEventListener('scroll', () => {
      window.requestAnimationFrame(setActiveState);
    });

    window.addEventListener('resize', setActiveState);
  }
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
    familiar: 'Hola, quiero consultar por El Circo de los Búhos para un evento.',
    infantil: 'Hola, quiero consultar por una propuesta de Búho para cumpleaños y eventos infantiles.',
    municipal: 'Hola, quiero consultar por propuestas de Búho para eventos municipales y festivales.',
    escuelas: 'Hola, quiero consultar por shows de Búho para escuelas, colonias o talleres barriales.',
    recepcion: 'Hola, quiero consultar por recepciones y entradas artísticas para mi evento.'
  }
};

const productVideos = document.querySelectorAll('.product-video');

const tryAutoplayProductVideo = (video) => {
  video.muted = true;
  video.defaultMuted = true;

  const playPromise = video.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {
      // Algunos navegadores bloquean autoplay en ciertos contextos.
    });
  }
};

productVideos.forEach((video) => {
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('autoplay', '');
  tryAutoplayProductVideo(video);
});

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

const pricingGrid = document.querySelector('#pricingGrid');

if (pricingGrid) {
  const pricingIcons = {
    artist: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="8" cy="7" r="2.6" stroke="currentColor" stroke-width="1.9"/><circle cx="16" cy="8" r="2.2" stroke="currentColor" stroke-width="1.9"/><path d="M3.8 19.8a5 5 0 0 1 8.4-3.7m.4 3.7a4.4 4.4 0 0 1 7.6-3.1" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M7.5 12.7h1.4m5.6.7h1.4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,
    clock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.8" stroke="currentColor" stroke-width="1.9"/><path d="M12 7.2v5.2l3.4 2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 3.6v1.4m0 14v1.4m8.4-8.4H19m-14 0H3.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    fire: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21c4.3 0 7-3.2 7-7 0-4.2-2.6-6.6-4.8-8.7-.2 1.9-1 3.4-2.2 4.8-.9-1.4-1.3-2.9-1.2-5.1C7.4 7.1 5 10.3 5 14c0 3.8 2.7 7 7 7Z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M12 17.9c2 0 3.3-1.4 3.3-3.1 0-1.4-.9-2.4-2-3.1-.1.9-.6 1.6-1.3 2.1-.6-.7-.8-1.4-.8-2.4-1.6 1-2.5 2.2-2.5 3.7 0 1.7 1.3 2.8 3.3 2.8Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.6"/></svg>`,
    lights: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.4v3.2m0 8.8v3.2M4.4 12h3.2m8.8 0h3.2M6.6 6.6l2.3 2.3m6.2 6.2 2.3 2.3m0-10.8-2.3 2.3m-6.2 6.2-2.3 2.3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="1.9"/><path d="M9.8 12h4.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    bubbles: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="8" cy="9.3" r="3.3" stroke="currentColor" stroke-width="1.9"/><circle cx="16.4" cy="15.7" r="3.6" stroke="currentColor" stroke-width="1.9"/><circle cx="17.4" cy="7" r="2" stroke="currentColor" stroke-width="1.8"/><path d="M7 8.1c.3-.5.8-.9 1.5-1.1m7.1 7.2c.4-.6 1-.9 1.8-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,
    stilts: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="4.4" r="2" stroke="currentColor" stroke-width="1.9"/><path d="M12 6.4v4.9m0 0-3.7 2.6m3.7-2.6 4 2.1" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.3 14.4V21m7.7-5.3V21M6.2 21h4.2m3.4 0h4.2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M8.3 17h-2m9.7-.9h2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    magic: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 16.6h14l-2.4-4.7H7.4L5 16.6Z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M9.1 11.9 12 8.5l2.9 3.4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="m14.7 5.2 4.1 4.1m-3.5-4.1.9.9m-2.6 0 .9.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M19.2 13.1l.8 1.8 1.8.8-1.8.8-.8 1.8-.8-1.8-1.8-.8 1.8-.8.8-1.8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
    games: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4.8" y="4.8" width="14.4" height="14.4" rx="2.4" stroke="currentColor" stroke-width="1.9"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/><circle cx="9" cy="15" r="1" fill="currentColor"/><path d="M14.2 14.2h2.1m-1.1-1.1v2.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    acro: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="5" r="2" stroke="currentColor" stroke-width="1.9"/><path d="M8.2 11.4h7.6M12 7v4.4m-3.8 0L6 15.8m9.8-4.4 2.2 4.4M7.1 19.8h9.8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.2 9.1 12 7l2.8 2.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    photo: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.4" y="6.2" width="13.8" height="11.8" rx="2.2" stroke="currentColor" stroke-width="1.9"/><path d="m7.1 6.2 1.4-2h3.6l1.3 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10.3" cy="12.2" r="2.5" stroke="currentColor" stroke-width="1.8"/><path d="m15.6 10.6 5 2.7-5 2.7v-5.4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
    juggling: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8.1 6.4v11.2m7.8-11.2v11.2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M6.6 8.3h3m-3 7.4h3m4.8-7.4h3m-3 7.4h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="5" r="1.8" stroke="currentColor" stroke-width="1.8"/><path d="M9.4 19.6c.8-1.6 1.6-2.4 2.6-2.4s1.8.8 2.6 2.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    unicycle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="17" r="4" stroke="currentColor" stroke-width="1.9"/><path d="M12 13v-4.8m0 0h4.2m-4.2 0 1.8-2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.2 8.2h2.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M12 17v-2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    dance: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="13" cy="4.3" r="2" stroke="currentColor" stroke-width="1.9"/><path d="M12 6.3 9.6 9.8l2.9 2.1 2-1.8 3.2 2.2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.8 12 6.8 14m7.9-1.2 2.2 3.8M9.7 20.2l1.7-3.8m3.8 3.8-1.7-3.8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.3 9.6l1.4 1.4m9.9-1.4 1.4 1.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`
  };

  const money = (value) => `$ ${Math.round(value).toLocaleString('es-AR')}`;
  const icon = (svgStr, on, title = '', toggle = false, id = '') => `<span class="ico ${on ? 'on' : ''} ${toggle ? 'toggle' : ''}" ${id ? `data-tid="${id}"` : ''} title="${title}" data-tip="${title}" aria-label="${title}" tabindex="0"><span>${svgStr}</span></span>`;

  const wireIconTooltips = () => {
    const icons = pricingGrid.querySelectorAll('.ico');

    icons.forEach((box) => {
      let hideTimer;

      const showTip = () => {
        box.classList.add('tip-visible');
        window.clearTimeout(hideTimer);
        hideTimer = window.setTimeout(() => {
          box.classList.remove('tip-visible');
        }, 1400);
      };

      box.addEventListener('touchstart', showTip, { passive: true });
      box.addEventListener('focus', () => {
        box.classList.add('tip-visible');
      });
      box.addEventListener('blur', () => {
        box.classList.remove('tip-visible');
      });
      box.addEventListener('mouseleave', () => {
        box.classList.remove('tip-visible');
      });
    });
  };

  const fixedPackages = [
    {
      name: 'SHOW 1 ARTISTA',
      sub: 'Momento wow rápido, ideal para no cortar la dinámica.',
      list: 75000,
      promo: 74900,
      badge: '',
      artists: 1,
      dur: '20 a 30 min',
      impact: { fire: true, lights: false, bubbles: false, stilts: false },
      inter: { magic: false, games: true, acro: false, photo: true },
      skills: { juggling: true, acro: false, magic: false, unicycle: false, dance: false },
      why: 'Sorpresa fuerte + fotos y reels sin extender el cronograma.'
    },
    {
      name: 'RECEPCIÓN + SHOW',
      sub: 'Bienvenida con presencia escénica + show final para cerrar arriba.',
      list: 130000,
      promo: 129900,
      badge: 'Más vendido',
      artists: 1,
      dur: '45 min + 20 min',
      impact: { fire: true, lights: true, bubbles: false, stilts: false },
      inter: { magic: true, games: true, acro: false, photo: true },
      skills: { juggling: true, acro: false, magic: true, unicycle: false, dance: false },
      why: 'Levanta el evento desde que llegan y asegura un cierre épico.'
    },
    {
      name: 'SHOW 2 ARTISTAS',
      sub: 'Dúo con más ritmo, variedad y presencia de escenario.',
      list: 200000,
      promo: 199900,
      badge: '',
      artists: 2,
      dur: '1 hora',
      impact: { fire: true, lights: true, bubbles: true, stilts: true },
      inter: { magic: false, games: true, acro: true, photo: true },
      skills: { juggling: true, acro: true, magic: false, unicycle: false, dance: false },
      why: 'Más impacto y sensación de “producción grande” en el público.'
    },
    {
      name: 'FULL EVENTO',
      sub: 'Recepción completa + show central en dúo. Evento resuelto.',
      list: 360000,
      promo: 349900,
      badge: 'Mejor valor',
      artists: 2,
      dur: '1 h + 1 h',
      impact: { fire: true, lights: true, bubbles: true, stilts: true },
      inter: { magic: true, games: true, acro: true, photo: true },
      skills: { juggling: true, acro: true, magic: true, unicycle: false, dance: false },
      why: 'La premium: máxima recordación + más tiempo en escena.'
    }
  ];

  const artistIcons = (count) => icon(pricingIcons.artist, count >= 1, '1 artista') + icon(pricingIcons.artist, count >= 2, '2 artistas');

  const fixedCard = (pkg) => {
    const save = pkg.list - pkg.promo;
    return `
      <article class="p-card">
        ${pkg.badge ? `<div class="p-badge">${pkg.badge}</div>` : ''}
        <div class="p-title">${pkg.name}</div>
        <p class="p-sub">${pkg.sub}</p>
        <div class="p-price">
          <div class="now">${money(pkg.promo)}</div>
          <div class="list">${money(pkg.list)}</div>
        </div>
        <div class="p-save">Ahorrás ${money(save)}</div>
        <div class="p-feats">
          <div class="p-feat"><div class="left">Artistas</div><div class="p-icons">${artistIcons(pkg.artists)}</div></div>
          <div class="p-feat"><div class="left">Duración</div><div class="p-icons">${icon(pricingIcons.clock, true, 'Duración')} <span style="font-weight:800">${pkg.dur}</span></div></div>
          <div class="p-feat"><div class="left">Impacto visual</div><div class="p-icons">${icon(pricingIcons.fire, pkg.impact.fire, 'Fuego')}${icon(pricingIcons.lights, pkg.impact.lights, 'Luces')}${icon(pricingIcons.bubbles, pkg.impact.bubbles, 'Burbujas')}${icon(pricingIcons.stilts, pkg.impact.stilts, 'Zancos')}</div></div>
          <div class="p-feat"><div class="left">Interacción</div><div class="p-icons">${icon(pricingIcons.magic, pkg.inter.magic, 'Magia interactiva')}${icon(pricingIcons.games, pkg.inter.games, 'Juegos')}${icon(pricingIcons.acro, pkg.inter.acro, 'Acro con público')}${icon(pricingIcons.photo, pkg.inter.photo, 'Foto / reels')}</div></div>
          <div class="p-feat"><div class="left">Habilidades</div><div class="p-icons">${icon(pricingIcons.juggling, pkg.skills.juggling, 'Malabares')}${icon(pricingIcons.acro, pkg.skills.acro, 'Acrobacias')}${icon(pricingIcons.magic, pkg.skills.magic, 'Magia')}${icon(pricingIcons.unicycle, pkg.skills.unicycle, 'Monociclo')}${icon(pricingIcons.dance, pkg.skills.dance, 'Baile')}</div></div>
        </div>
        <div class="p-why"><b>Por qué te conviene:</b> ${pkg.why}</div>
        <div class="p-actions">
          <a class="primary" href="#contacto">Reservar</a>
          <a class="secondary" href="#precios">Ver promos</a>
        </div>
      </article>
    `;
  };

  const builderState = {
    artists: 1,
    receptionMin: 0,
    showMin: 25,
    uberOneWay: 0,
    impact: { fire: false, lights: false, bubbles: false, stilts: false },
    inter: { magic: false, games: false, acro: false, photo: true },
    skills: { juggling: true, acro: false, magic: false, unicycle: false, dance: false }
  };

  const baseFixed = 42000;
  const perArtistHour = 80000;
  const costs = {
    impact: { fire: 15000, lights: 12000, bubbles: 12000, stilts: 14000 },
    inter: { magic: 14000, games: 9000, acro: 16000, photo: 7000 },
    skills: { juggling: 8000, acro: 14000, magic: 14000, unicycle: 16000, dance: 12000 }
  };

  const sumToggles = (group, values) => Object.keys(values).reduce((acc, key) => acc + (values[key] ? group[key] : 0), 0);

  const calcBuilder = () => {
    const totalMin = builderState.receptionMin + builderState.showMin;
    const artistHours = (totalMin / 60) * builderState.artists;
    const base = baseFixed + perArtistHour * artistHours;
    const extras = sumToggles(costs.impact, builderState.impact) + sumToggles(costs.inter, builderState.inter) + sumToggles(costs.skills, builderState.skills);
    const travel = builderState.uberOneWay * 2;
    const total = base + extras + travel;
    return { base, extras, travel, total, totalMin };
  };

  const builderCard = () => {
    const { base, extras, travel, total, totalMin } = calcBuilder();

    const toggleRow = (label, items) => {
      const parts = items.map((item) => icon(item.icon, builderState[item.group][item.key], item.title, true, `${item.group}:${item.key}`)).join('');
      return `<div class="p-feat"><div class="left">${label}</div><div class="p-icons">${parts}</div></div>`;
    };

    return `
      <article class="p-card builder" id="builderCard">
        <div class="p-badge">Armá tu show</div>
        <div class="p-title">Personalizado (máx. 6 artistas)</div>
        <p class="p-sub">Prendé/apagá ítems y ajustá duración. Te da un estimado para cotizar rápido.</p>
        <div class="p-feats">
          <div class="p-feat"><div class="left">Artistas</div><div class="ctrl"><button class="btn-step" data-step="artists:-1">−</button><div class="ctrl-val"><span id="bArtistsVal">${builderState.artists}</span> artista(s)</div><button class="btn-step" data-step="artists:+1">+</button></div></div>
          <div class="p-feat"><div class="left">Recepción</div><div class="ctrl"><button class="btn-step" data-step="reception:-5">−</button><div class="ctrl-val"><span id="bRecVal">${builderState.receptionMin}</span> min</div><button class="btn-step" data-step="reception:+5">+</button></div></div>
          <div class="p-feat"><div class="left">Show</div><div class="ctrl"><button class="btn-step" data-step="show:-5">−</button><div class="ctrl-val"><span id="bShowVal">${builderState.showMin}</span> min</div><button class="btn-step" data-step="show:+5">+</button></div></div>
          ${toggleRow('Impacto visual', [
            { key: 'fire', icon: pricingIcons.fire, title: 'Fuego', group: 'impact' },
            { key: 'lights', icon: pricingIcons.lights, title: 'Luces', group: 'impact' },
            { key: 'bubbles', icon: pricingIcons.bubbles, title: 'Burbujas', group: 'impact' },
            { key: 'stilts', icon: pricingIcons.stilts, title: 'Zancos', group: 'impact' }
          ])}
          ${toggleRow('Interacción', [
            { key: 'magic', icon: pricingIcons.magic, title: 'Magia interactiva', group: 'inter' },
            { key: 'games', icon: pricingIcons.games, title: 'Juegos / desafíos', group: 'inter' },
            { key: 'acro', icon: pricingIcons.acro, title: 'Acro con público (según condiciones)', group: 'inter' },
            { key: 'photo', icon: pricingIcons.photo, title: 'Momento foto / reels', group: 'inter' }
          ])}
          ${toggleRow('Habilidades', [
            { key: 'juggling', icon: pricingIcons.juggling, title: 'Malabares', group: 'skills' },
            { key: 'acro', icon: pricingIcons.acro, title: 'Acrobacias', group: 'skills' },
            { key: 'magic', icon: pricingIcons.magic, title: 'Magia', group: 'skills' },
            { key: 'unicycle', icon: pricingIcons.unicycle, title: 'Monociclo', group: 'skills' },
            { key: 'dance', icon: pricingIcons.dance, title: 'Baile', group: 'skills' }
          ])}
          <div class="p-feat"><div class="left">Traslado (Uber ida)</div><div style="width: 180px;"><input class="mini-input" id="bUber" type="number" min="0" step="100" value="${builderState.uberOneWay}"/><div class="small">Se duplica ida y vuelta.</div></div></div>
        </div>
        <div class="total-box">
          <div class="row"><span>Base (según artistas y minutos)</span><b id="tBase">${money(base)}</b></div>
          <div class="row"><span>Extras seleccionados</span><b id="tExtras">${money(extras)}</b></div>
          <div class="row"><span>Traslado (ida y vuelta)</span><b id="tTravel">${money(travel)}</b></div>
          <div class="row"><span>Total estimado</span><b id="tTotal">${money(total)}</b></div>
        </div>
        <div class="p-why" id="tNote"><b>Resumen:</b> ${builderState.artists} artista(s) · ${totalMin} min (recepción ${builderState.receptionMin} + show ${builderState.showMin}).<br/>* Estimado sin traslado: ${money(base + extras)}.</div>
        <div class="p-actions"><a class="primary" href="#contacto">Quiero cotizar mi fecha</a><a class="secondary" href="#precios">Ver paquetes</a></div>
      </article>
    `;
  };

  const renderPricing = () => {
    pricingGrid.innerHTML = fixedPackages.map(fixedCard).join('') + builderCard();
    wireBuilder();
    wireIconTooltips();
  };

  const updateBuilder = () => {
    const { base, extras, travel, total, totalMin } = calcBuilder();

    document.querySelector('#bArtistsVal').textContent = String(builderState.artists);
    document.querySelector('#bRecVal').textContent = String(builderState.receptionMin);
    document.querySelector('#bShowVal').textContent = String(builderState.showMin);
    document.querySelector('#tBase').textContent = money(base);
    document.querySelector('#tExtras').textContent = money(extras);
    document.querySelector('#tTravel').textContent = money(travel);
    document.querySelector('#tTotal').textContent = money(total);
    document.querySelector('#tNote').innerHTML = `<b>Resumen:</b> ${builderState.artists} artista(s) · ${totalMin} min (recepción ${builderState.receptionMin} + show ${builderState.showMin}).<br/>* Estimado sin traslado: ${money(base + extras)}.`;

    const root = document.querySelector('#builderCard');
    root.querySelectorAll('.ico.toggle').forEach((box) => {
      const [group, key] = box.getAttribute('data-tid').split(':');
      box.classList.toggle('on', Boolean(builderState[group][key]));
    });
  };

  const wireBuilder = () => {
    const root = document.querySelector('#builderCard');
    if (!root) {
      return;
    }

    root.querySelectorAll('[data-step]').forEach((button) => {
      button.addEventListener('click', () => {
        const [field, deltaRaw] = button.getAttribute('data-step').split(':');
        const delta = Number.parseInt(deltaRaw.replace('+', ''), 10);

        if (field === 'artists') {
          builderState.artists = Math.max(1, Math.min(6, builderState.artists + delta));
        }

        if (field === 'reception') {
          builderState.receptionMin = Math.max(0, Math.min(180, builderState.receptionMin + delta));
        }

        if (field === 'show') {
          builderState.showMin = Math.max(10, Math.min(180, builderState.showMin + delta));
        }

        updateBuilder();
      });
    });

    root.querySelectorAll('.ico.toggle').forEach((box) => {
      box.addEventListener('click', () => {
        const [group, key] = box.getAttribute('data-tid').split(':');
        builderState[group][key] = !builderState[group][key];
        updateBuilder();
      });
    });

    const uberInput = root.querySelector('#bUber');
    uberInput.addEventListener('input', () => {
      builderState.uberOneWay = Math.max(0, Number.parseFloat(uberInput.value || '0'));
      updateBuilder();
    });
  };

  renderPricing();
}
