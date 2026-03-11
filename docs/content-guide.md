# Guía de contenido y reemplazos

## 1) Videos principales de productos

La home usa video en las 3 tarjetas comerciales principales:

- El Circo de los Búhos
- Experiencia Nocturna Búho
- Recepción e Impacto Visual

### Rutas de video esperadas

```text
assets/videos/products/circo-buhos.mp4
assets/videos/products/experiencia-nocturna.mp4
assets/videos/products/recepcion-impacto.mp4
```

### Cómo reemplazar sin tocar HTML

1. Exportá cada video en MP4 (ideal: H.264 + audio AAC).
2. Copialo con el nombre exacto en `assets/videos/products/`.
3. Recargá la web.

> Si todavía no hay video final, la tarjeta usa `poster` para mantener una vista prolija.

---

## 2) Galería Instagram (3 reels + 3 posts)

La sección `#galeria` se genera dinámicamente desde `js/main.js` usando este arreglo:

```js
const instagramGalleryItems = [
  { type: 'video', url: 'URL_DEL_REEL_1', title: '...', thumbnail: 'assets/img/gallery/instagram-reel-1.jpg' },
  { type: 'video', url: 'URL_DEL_REEL_2', title: '...', thumbnail: 'assets/img/gallery/instagram-reel-2.jpg' },
  { type: 'video', url: 'URL_DEL_REEL_3', title: '...', thumbnail: 'assets/img/gallery/instagram-reel-3.jpg' },
  { type: 'image', url: 'URL_DEL_POST_1', title: '...', thumbnail: 'assets/img/gallery/instagram-post-1.jpg' },
  { type: 'image', url: 'URL_DEL_POST_2', title: '...', thumbnail: 'assets/img/gallery/instagram-post-2.jpg' },
  { type: 'image', url: 'URL_DEL_POST_3', title: '...', thumbnail: 'assets/img/gallery/instagram-post-3.jpg' }
];
```

### Qué editar para mantener la galería al día

- `type`: `video` para reel, `image` para post/foto.
- `url`: link público de Instagram.
- `title`: texto visible en tarjeta.
- `thumbnail`: miniatura local para carga rápida.

---

## 3) Mantenimiento visual recomendado

- Mantener miniaturas verticales con proporción cercana a 4:5.
- Comprimir videos e imágenes antes de publicar.
- Evitar cambiar IDs de secciones (`#productos`, `#galeria`) para no romper navegación.
