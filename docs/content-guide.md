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
  {
    type: 'video',
    url: 'https://www.instagram.com/reel/.../',
    title: '...',
    thumbnail: './assets/img/instagram/reel-1.jpg'
  },
  // ... 5 tarjetas más
];
```

### Qué editar para mantener la galería al día

- `type`: `video` (reel) o `image` (post).
- `url`: link público de Instagram.
- `title`: texto visible en tarjeta.
- `thumbnail` (opcional): miniatura manual local.

### Carpeta y nombres recomendados para miniaturas manuales

Usar esta carpeta:

```text
assets/img/instagram/
```

Nombres sugeridos (si existen, ya están listos para usarse):

```text
assets/img/instagram/reel-1.jpg
assets/img/instagram/reel-2.jpg
assets/img/instagram/reel-3.jpg
assets/img/instagram/post-1.jpg
assets/img/instagram/post-2.jpg
assets/img/instagram/post-3.jpg
```

### Cómo funciona el fallback si falta una miniatura

Prioridad de render por tarjeta:

1. `thumbnail` manual local.
2. fallback visual elegante (fondo escénico oscuro + acento naranja + ícono de Instagram).
3. botón **“Ver en Instagram”** siempre visible.

Si el archivo no existe o falla al cargar, la tarjeta elimina la imagen y se mantiene funcional con fallback y CTA.

---

## 3) Mantenimiento visual recomendado

- Mantener tarjetas visuales claras y livianas para no sobrecargar la carga inicial.
- Comprimir videos e imágenes antes de publicar.
- Evitar cambiar IDs de secciones (`#productos`, `#galeria`) para no romper navegación.

---

## 4) Instagram oficial, navbar mobile y links editables

Toda la configuración comercial está en `js/main.js`:

- **Perfil oficial de Instagram:** cambiar `instagramProfileUrl`.
- **Los 6 links de galería (3 reels + 3 posts):** cambiar `url` dentro de `instagramGalleryItems`.
- **Tipo de tarjeta:** cambiar `type` (`video`/`image`) en cada item.
- **Título visible de cada tarjeta:** cambiar `title` en cada item.
- **Miniatura manual por tarjeta:** `thumbnail`.

En `index.html` se controla la marca para mobile:

- `.brand-label-default`: texto completo (ej. “Búho Producciones”).
- `.brand-label-compact`: texto corto (ej. “Búho”).

Ejemplo:

```js
const instagramProfileUrl = 'https://www.instagram.com/buho_producciones_artisticas/';

const instagramGalleryItems = [
  {
    type: 'video',
    url: 'https://www.instagram.com/reel/C1ry00DOpZF/',
    title: 'Show en acción',
    thumbnail: './assets/img/instagram/reel-1.jpg'
  }
];
```

## 5) WhatsApp (Miguel y Nano) y mensajes predeterminados

También se edita en `js/main.js`, dentro de `contactConfig`:

- **Número de Miguel:** `contactConfig.Miguel.phone`
- **Número de Nano:** `contactConfig.Nano.phone`
- **Mensajes predeterminados:** `contactConfig.messages`
  - `generalMiguel`
  - `generalNano`
  - `bar`
  - `familiar`

Ejemplo:

```js
const contactConfig = {
  Miguel: { phone: '5493814012526', label: 'Hablar con Miguel' },
  Nano: { phone: '5493816711400', label: 'Hablar con Nano' },
  messages: {
    generalMiguel: 'Hola Miguel, ...',
    generalNano: 'Hola Nano, ...',
    bar: 'Hola, quiero consultar por la Experiencia Nocturna Búho para un bar o evento nocturno.',
    familiar: 'Hola, quiero consultar por El Circo de los Búhos para un evento.'
  }
};
```


---

## 6) Sección “Eventos para cada ocasión” (nuevo carrusel)

La sección está en `index.html` con el id:

```html
<section id="eventos-ocasion" class="section">
```

Cada categoría es una tarjeta `<article class="event-card" data-event-slide>` dentro de:

```html
<div class="event-carousel-track" data-carousel-track>
```

### Dónde cambiar imágenes

En cada tarjeta, editar el `src` del `<img>`.

Rutas preparadas:

- `./assets/img/eventos/eventos-infantiles.jpg`
- `./assets/img/eventos/eventos-familiares.jpg`
- `./assets/img/eventos/eventos-nocturnos.jpg`
- `./assets/img/eventos/eventos-municipales.jpg`
- `./assets/img/eventos/eventos-talleres.jpg`
- `./assets/img/eventos/eventos-recepcion.jpg`

Si una imagen no existe, el JS muestra un fallback visual elegante sin romper diseño.

### Dónde cambiar títulos

Editar el texto del `<h3>` dentro de cada `article.event-card` en `index.html`.

### Dónde cambiar descripciones

Editar el texto del `<p>` dentro de cada `article.event-card` en `index.html`.

### Dónde cambiar CTA

El botón CTA de cada tarjeta es este enlace:

```html
<a class="button" data-whatsapp-contact="..." data-whatsapp-message="..." href="#">Consultar este formato</a>
```

- El texto visible (`Consultar este formato`) se cambia directo en `index.html`.
- El mensaje de WhatsApp se cambia en `js/main.js`, dentro de `contactConfig.messages`.

### Cómo agregar o quitar categorías

1. Duplicar o eliminar un bloque `<article class="event-card" data-event-slide>` en `index.html`.
2. Ajustar imagen, título, descripción y atributos `data-whatsapp-*`.
3. No hace falta tocar lógica del carrusel: los puntos, flechas y estado activo se recalculan solos desde `js/main.js`.
4. Si agregás un nuevo `data-whatsapp-message`, crear también su texto en `contactConfig.messages`.

### Estilos y comportamiento

- Estilos del carrusel: `css/main.css` (bloques `.event-carousel*` y `.event-card*`).
- Lógica del slider y fallback de imágenes: `js/main.js` (bloque `eventCarousel`).
