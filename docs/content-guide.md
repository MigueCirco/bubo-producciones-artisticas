# Guía de contenido y reemplazos

## Estructura objetivo de assets

```text
assets/
  logos/
  img/
    placeholders/
    hero/
    gallery/
    products/
    campaigns/
  flyers/
    familia/
    bares/
    recepcion/
    mensuales/
```

## Reemplazos inmediatos sugeridos

1. **Logo**
   - Actual: `assets/img/placeholders/logo-placeholder.svg`
   - Destino recomendado: `assets/logos/logo-principal.png`
   - Acción: actualizar `src` en `index.html`.

2. **Hero principal**
   - Actual: `assets/img/placeholders/hero-placeholder.svg`
   - Destino recomendado: `assets/img/hero/hero-principal.jpg`
   - Acción: crear archivo final y actualizar `src`.

3. **Galería**
   - Actual: `assets/img/placeholders/gallery-1.svg` a `gallery-3.svg`
   - Destino recomendado: imágenes reales en `assets/img/gallery/`.

4. **Campañas**
   - Carpeta preparada: `assets/img/campaigns/`
   - Recomendación: subcarpetas por periodo (ej. `2026-03/`) o por tipo de campaña.

5. **Flyers**
   - Estructura preparada:
     - `assets/flyers/familia/`
     - `assets/flyers/bares/`
     - `assets/flyers/recepcion/`
     - `assets/flyers/mensuales/`
   - Recomendación: mantener naming consistente por fecha + evento.

## Buenas prácticas

- Usar nombres en minúsculas con guiones (`noche-retro-marzo.jpg`).
- Añadir `alt` descriptivo al reemplazar imágenes.
- Comprimir imágenes antes de publicar.
- Evitar guardar material temporal fuera de `assets/img/placeholders/`.
