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
    contentType: 'REEL',
    url: 'https://www.instagram.com/reel/.../',
    title: '...',
    thumbnailManual: '',
    thumbnailExperimental: ''
  },
  // ... 5 tarjetas más
];
```

### Qué editar para mantener la galería al día

- `contentType`: `REEL` o `POST` para la etiqueta visual.
- `url`: link público de Instagram.
- `title`: texto visible en tarjeta.
- `thumbnailManual` (opcional): miniatura definida manualmente (prioridad 1).
- `thumbnailExperimental` (opcional): soporte secundario de miniatura automática/externa. Si falla, la tarjeta sigue mostrando fallback visual elegante.

### Prioridad de render de miniaturas

1. `thumbnailManual`
2. `thumbnailExperimental`
3. fallback visual con ícono Instagram + etiqueta + título + botón.

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
- **Etiqueta REEL/POST:** cambiar `contentType` en cada item.
- **Título visible de cada tarjeta:** cambiar `title` en cada item.
- **Miniatura manual/experimental por tarjeta:** `thumbnailManual` y `thumbnailExperimental`.
- **Nombre mobile del navbar:** editar los textos en `index.html` (`.brand-label-default` y `.brand-label-compact`).

Ejemplo:

```js
const instagramProfileUrl = 'https://www.instagram.com/buho_producciones_artisticas/';

const instagramGalleryItems = [
  {
    contentType: 'REEL',
    url: 'https://www.instagram.com/reel/C1ry00DOpZF/',
    title: '...',
    thumbnailManual: '',
    thumbnailExperimental: ''
  },
  // ...
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
