# Búho Producciones Artísticas · Base técnica (arquitectura v2)

Este repositorio contiene una base técnica limpia y escalable para una web estática de Búho Producciones Artísticas.

> Alcance de esta pasada:
> - ✅ Corrección de rutas para que la preview sirva `index.html` correctamente
> - ✅ Reorganización de assets para crecimiento por dominios de contenido
> - ✅ Documentación actualizada de estructura y reemplazos
> - ❌ Sin versión visual final todavía

## 1) Estructura del proyecto

```text
B-ho-Web/
├── index.html
├── README.md
├── assets/
│   ├── logos/
│   │   └── .gitkeep
│   ├── img/
│   │   ├── placeholders/
│   │   │   ├── .gitkeep
│   │   │   ├── logo-placeholder.svg
│   │   │   ├── hero-placeholder.svg
│   │   │   ├── gallery-1.svg
│   │   │   ├── gallery-2.svg
│   │   │   └── gallery-3.svg
│   │   ├── hero/
│   │   │   └── .gitkeep
│   │   ├── gallery/
│   │   │   └── .gitkeep
│   │   ├── products/
│   │   │   └── .gitkeep
│   │   └── campaigns/
│   │       └── .gitkeep
│   └── flyers/
│       ├── .gitkeep
│       ├── familia/
│       │   └── .gitkeep
│       ├── bares/
│       │   └── .gitkeep
│       ├── recepcion/
│       │   └── .gitkeep
│       └── mensuales/
│           └── .gitkeep
├── css/
│   └── main.css
├── js/
│   └── main.js
└── docs/
    └── content-guide.md
```

## 2) Criterio de organización

- `assets/logos/`: identidad de marca.
- `assets/img/placeholders/`: material temporal de maqueta.
- `assets/img/hero/`: imágenes de portada.
- `assets/img/gallery/`: galería editorial/fotográfica.
- `assets/img/products/`: recursos visuales por producto/servicio.
- `assets/img/campaigns/`: piezas gráficas para campañas.
- `assets/flyers/{familia,bares,recepcion,mensuales}/`: flyers segmentados por tipo de uso.

Esto permite escalar sin mezclar contenido final con temporales ni mezclar campañas con catálogos visuales.

## 3) Preview local

Para evitar errores de resolución de rutas, `index.html` usa rutas relativas explícitas (`./css/main.css`, `./js/main.js`) y assets bajo `assets/img/...`.

```bash
python3 -m http.server 8000
```

Luego abrir:

```text
http://localhost:8000
```

## 4) Próximos pasos sugeridos

1. Sustituir placeholders por imágenes finales en las carpetas de dominio (`hero`, `gallery`, `products`, `campaigns`).
2. Definir convención para campañas (por ejemplo, `assets/img/campaigns/2026-03/`).
3. Conectar el formulario a proveedor real (Formspree, Netlify Forms o backend propio).
4. Optimizar imágenes (WebP/AVIF) antes de publicación.
