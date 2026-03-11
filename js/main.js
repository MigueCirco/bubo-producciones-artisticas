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

const instagramGalleryItems = [
  {
    type: 'video',
    url: 'https://www.instagram.com/reel/URL_DEL_REEL_1/',
    title: 'Reel | El Circo de los Búhos en vivo',
    thumbnail: 'assets/img/gallery/instagram-reel-1.jpg'
  },
  {
    type: 'video',
    url: 'https://www.instagram.com/reel/URL_DEL_REEL_2/',
    title: 'Reel | Experiencia Nocturna con fuego',
    thumbnail: 'assets/img/gallery/instagram-reel-2.jpg'
  },
  {
    type: 'video',
    url: 'https://www.instagram.com/reel/URL_DEL_REEL_3/',
    title: 'Reel | Recepción e impacto visual',
    thumbnail: 'assets/img/gallery/instagram-reel-3.jpg'
  },
  {
    type: 'image',
    url: 'https://www.instagram.com/p/URL_DEL_POST_1/',
    title: 'Post | Escena de circo teatro',
    thumbnail: 'assets/img/gallery/instagram-post-1.jpg'
  },
  {
    type: 'image',
    url: 'https://www.instagram.com/p/URL_DEL_POST_2/',
    title: 'Post | Noche temática Búho',
    thumbnail: 'assets/img/gallery/instagram-post-2.jpg'
  },
  {
    type: 'image',
    url: 'https://www.instagram.com/p/URL_DEL_POST_3/',
    title: 'Post | Bienvenida con artistas',
    thumbnail: 'assets/img/gallery/instagram-post-3.jpg'
  }
];

const instagramGallery = document.querySelector('#instagram-gallery');

if (instagramGallery) {
  const galleryMarkup = instagramGalleryItems
    .map((item) => {
      const badge = item.type === 'video' ? '🎬 Reel' : '📷 Post';

      return `
        <article class="instagram-item">
          <img
            class="instagram-thumb"
            src="${item.thumbnail}"
            alt="${item.title}"
            loading="lazy"
          />
          <div class="instagram-meta">
            <span class="instagram-type">${badge}</span>
            <h3>${item.title}</h3>
            <a class="button instagram-link" href="${item.url}" target="_blank" rel="noopener noreferrer">
              Ver en Instagram
            </a>
          </div>
        </article>
      `;
    })
    .join('');

  instagramGallery.innerHTML = galleryMarkup;
}
