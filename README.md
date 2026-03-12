# Búho Producciones Artísticas · Base técnica (arquitectura v2)

Este repositorio contiene una base técnica limpia y escalable para una web estática de Búho Producciones Artísticas.

## 1) Estructura del proyecto

```text
B-ho-Web/
├── index.html
├── README.md
├── assets/
│   ├── logos/
│   │   └── .gitkeep
│   ├── videos/
│   │   └── products/
│   │       └── .gitkeep
│   ├── img/
│   │   ├── hero/
│   │   ├── gallery/
│   │   ├── products/
│   │   └── campaigns/
│   └── flyers/
├── css/
│   └── main.css
├── js/
│   └── main.js
└── docs/
    └── content-guide.md
```

## 2) Home audiovisual y orientada a ventas

### Productos con video
La sección `#productos` ya está preparada para usar 3 videos locales HTML5 con fallback visual vía `poster`.

Rutas esperadas:
- `assets/videos/products/circo-buhos.mp4`
- `assets/videos/products/experiencia-nocturna.mp4`
- `assets/videos/products/recepcion-impacto.mp4`

Si todavía no cargaste los MP4, la tarjeta mantiene una miniatura (`poster`) y el bloque queda listo para reemplazo sin tocar estructura.

### Galería Instagram curada (3 reels + 3 posts)
La galería se renderiza desde un arreglo editable en `js/main.js`:

```js
const instagramGalleryItems = [
  { type: 'video', url: '...', title: '...' },
  // ... 6 ítems totales
];
```

Para actualizarla solo editás:
1. `url` (enlace de Instagram).
2. `title` (texto comercial breve).

## 3) Preview local

```bash
python3 -m http.server 8000
```

Luego abrir: `http://localhost:8000`

## 4) Mantenimiento rápido (sin tocar mucho código)

- **Cambiar videos de productos:** reemplazar los 3 `.mp4` con el mismo nombre.
- **Cambiar links de Instagram:** editar solo `instagramGalleryItems` en `js/main.js`.


## 5) Configuración rápida de Instagram y WhatsApp

Editá `js/main.js` para cambios comerciales frecuentes:

- `instagramProfileUrl`: URL del perfil oficial.
- `instagramGalleryItems`: los 6 contenidos de galería (3 reels + 3 posts).
- `contactConfig.Miguel.phone`: número de Miguel.
- `contactConfig.Nano.phone`: número de Nano.
- `contactConfig.messages`: textos predeterminados para WhatsApp (general, bar y familiar).

> Guía ampliada: `docs/content-guide.md`.


## 6) Nueva sección comercial: “Eventos para cada ocasión”

La home incluye un carrusel de categorías de eventos para ampliar la propuesta comercial más allá del formato nocturno.

### Archivos clave
- Estructura y copy de tarjetas: `index.html` (`#eventos-ocasion`).
- Estilos y responsive del carrusel: `css/main.css` (`.event-carousel*`, `.event-card*`).
- Navegación (flechas, puntos) + fallback de imágenes: `js/main.js` (`eventCarousel`).

### Edición rápida
- **Imágenes:** cambiar `src` en cada tarjeta (`./assets/img/eventos/...`).
- **Títulos/descripciones:** editar `h3` y `p` en cada tarjeta.
- **CTA y mensaje:** editar texto del botón en `index.html` y mensaje WhatsApp en `contactConfig.messages`.
- **Agregar/quitar categorías:** duplicar o eliminar `article.event-card` (el carrusel se adapta automáticamente).

> Detalle completo de mantenimiento en `docs/content-guide.md`.

