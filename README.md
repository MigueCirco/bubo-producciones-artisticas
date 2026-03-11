# Búho Producciones Artísticas · Base técnica (Fase 1 + Fase 2 inicial)

Este repositorio contiene una **base técnica limpia y escalable** para una web estática de Búho Producciones Artísticas.

> Alcance de esta entrega:
> - ✅ Fase 1: estructura de carpetas y archivos base
> - ✅ Fase 2 inicial: landing modular con HTML/CSS/JS separados y placeholders
> - ❌ No incluye aún contenido final, fotografías reales ni integración con backend

---

## 1) Estructura del proyecto

```text
B-ho-Web/
├── index.html
├── README.md
├── assets/
│   ├── logos/
│   │   └── .gitkeep
│   ├── images/
│   │   └── placeholders/
│   │       ├── .gitkeep
│   │       ├── logo-placeholder.svg
│   │       ├── hero-placeholder.svg
│   │       ├── gallery-1.svg
│   │       ├── gallery-2.svg
│   │       └── gallery-3.svg
│   ├── flyers/
│   │   └── .gitkeep
│   └── campaigns-mensuales/
│       └── .gitkeep
├── css/
│   └── main.css
├── js/
│   └── main.js
└── docs/
    └── content-guide.md
```

### ¿Para qué sirve cada carpeta?
- `assets/logos/`: logos oficiales, isotipos y variantes.
- `assets/images/`: imágenes generales del sitio (hero, fondos, etc.).
- `assets/images/placeholders/`: recursos temporales de maqueta visual.
- `assets/flyers/`: flyers de eventos.
- `assets/campaigns-mensuales/`: piezas por campaña mensual (enero, febrero, etc.).
- `css/`: estilos del proyecto.
- `js/`: scripts del proyecto.
- `docs/`: documentación operativa y guía de reemplazo de contenido.

---

## 2) Landing incluida en esta fase

La landing inicial ya tiene secciones preparadas para:
- Hero
- Productos
- Bares & Noches
- Galería
- Testimonios
- FAQ
- Contacto

Características técnicas:
- Estructura semántica y modular en `index.html`.
- Estilos centralizados en `css/main.css`.
- Comportamiento mínimo en `js/main.js` (año automático + feedback de formulario de ejemplo).
- Placeholders de imagen ya conectados.
- Comentarios en el HTML indicando exactamente dónde reemplazar logo, hero y campañas.

---

## 3) Reglas técnicas seguidas

- Sin frameworks (solo HTML, CSS y JS).
- Separación clara por capas (`index.html`, `css/main.css`, `js/main.js`).
- Organización orientada a mantenimiento y crecimiento.
- Lista para hosting estático (Netlify, Vercel estático, GitHub Pages, servidor Nginx/Apache).

---

## 4) Cómo ejecutar en local

### Opción rápida con Python

```bash
python3 -m http.server 8000
```

Luego abrir en navegador:

```text
http://localhost:8000
```

---

## 5) Próximos pasos recomendados (fuera del alcance actual)

1. Reemplazar placeholders por material final (`assets/logos`, `assets/images`, `assets/flyers`).
2. Definir estructura interna para campañas mensuales, por ejemplo:
   - `assets/campaigns-mensuales/2026-01/`
   - `assets/campaigns-mensuales/2026-02/`
3. Conectar formulario de contacto a proveedor real (Formspree, Netlify Forms, backend propio).
4. Optimizar imágenes (WebP/AVIF) y añadir metadatos SEO/social.

---

## 6) Notas de mantenimiento

- Mantener nombres consistentes y descriptivos para archivos multimedia.
- Evitar mezclar contenido final con placeholders.
- Documentar cambios estructurales en `docs/` para facilitar onboarding.
