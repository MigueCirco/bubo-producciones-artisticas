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
    artist: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="7" r="2.5" stroke="currentColor" stroke-width="2"/><circle cx="16" cy="8" r="2" stroke="currentColor" stroke-width="2"/><path d="M4 20a5 5 0 0 1 10 0M13 20a4 4 0 0 1 7 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    clock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    fire: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 21c4.4 0 7-3.1 7-7 0-4.3-2.9-6.7-4.8-8.6-.1 2.2-.8 3.3-2.2 4.7-.8-1.4-1.4-3-1.1-5.1C7.4 7.2 5 10.3 5 14c0 3.9 2.6 7 7 7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 18c1.9 0 3.1-1.3 3.1-3 0-1.3-.8-2.2-1.8-3-.1.9-.6 1.5-1.3 2-.5-.7-.9-1.4-.8-2.5-1.5 1-2.3 2.1-2.3 3.5 0 1.7 1.2 3 3.1 3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
    lights: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3l1.8 4.5L18 9.3l-4.2 1.8L12 16l-1.8-4.9L6 9.3l4.2-1.8L12 3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M5 15l.7 1.9L7.6 18l-1.9.7L5 20.6l-.7-1.9L2.4 18l1.9-.9L5 15Zm14-1l.9 2.2L22 17l-2.1.8L19 20l-.9-2.2L16 17l2.1-.8L19 14Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
    bubbles: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="8" cy="9" r="3.5" stroke="currentColor" stroke-width="2"/><circle cx="16.5" cy="16.5" r="3" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="7" r="2" stroke="currentColor" stroke-width="2"/></svg>`,
    stilts: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="4" r="2" stroke="currentColor" stroke-width="2"/><path d="M12 6v6m0 0-4 3m4-3 4 2M8 15v6m8-4v4M6 21h4m6 0h3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    magic: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 17h13l-2.4-5H6.4L4 17Zm4-5 2.2-3h.8l2.2 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 4l6 6m-1-6 1 1m-4 0 1 1m-1 4 1 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M19 13l.8 1.8L22 15.6l-2.2.8L19 18l-.8-1.6-2.2-.8 2.2-.8.8-1.8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
    games: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="5" y="5" width="14" height="14" rx="2.5" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/><circle cx="9" cy="15" r="1" fill="currentColor"/><circle cx="15" cy="15" r="1" fill="currentColor"/></svg>`,
    acro: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="2" stroke="currentColor" stroke-width="2"/><path d="M12 7v4m0 0-4 2m4-2 4 2M8 14l-3 4m11-4 3 4M7 21h10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    photo: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="2"/><path d="M8 6 9.5 4h5L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="11" cy="13" r="3" stroke="currentColor" stroke-width="2"/><path d="m14.5 11.6 2.5 1.4-2.5 1.4v-2.8Z" fill="currentColor"/></svg>`,
    juggling: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="7" cy="7" r="1.8" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="7" r="1.8" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="4" r="1.8" stroke="currentColor" stroke-width="2"/><path d="M6 18c1.3-3.5 4.2-4.8 6-4.8s4.7 1.3 6 4.8M7 11c1.5 1.8 3 2.7 5 2.7S15.5 12.8 17 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    unicycle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="17" r="4" stroke="currentColor" stroke-width="2"/><path d="M12 13V6m0 0h4m-4 0 2-2m0 2-2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 9h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    dance: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="13" cy="4" r="2" stroke="currentColor" stroke-width="2"/><path d="M12 6 9 10l3 2 2-2 3 2m-7 0-3 2m8-2 2 4m-7 5 1.5-4m3.5 4-1.5-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  };

  const money = (value) => `$ ${Math.round(value).toLocaleString('es-AR')}`;
  const icon = (svgStr, on, title = '', toggle = false, id = '') => `<span class="ico ${on ? 'on' : ''} ${toggle ? 'toggle' : ''}" ${id ? `data-tid="${id}"` : ''} title="${title}"><span>${svgStr}</span></span>`;

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
