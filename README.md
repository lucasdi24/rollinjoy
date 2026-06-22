# Rollin Joy

Planificador de viajes con cara de app: contás a dónde vas y Joy te arma un
itinerario día a día con costos, mapa y gastos compartidos.

> _"Porque la vida no se planifica para después."_

Web app responsiva hecha en **Next.js 15 (App Router) + React 19 + Tailwind +
lucide-react**, a partir de un prototipo de Claude Design.

## Flujo

`/` → `/rollin-joy` (bienvenida) → `/rollin-joy/nuevo` (5 preguntas) →
`/rollin-joy/generando` → `/rollin-joy/viaje` (Resumen · Día a día · Mapa · Gastos)

## Qué hace

- **Generador de itinerarios** sobre un catálogo de 3 destinos mock (Río de
  Janeiro, Buenos Aires, Cartagena), parametrizado por destino, noches,
  personas, presupuesto e intereses; calcula costos por día y totales.
- **Día a día** interactivo: marcás paradas hechas/saltadas con progreso del día
  y recálculo de costo en vivo.
- **Gastos**: sumás miembros al crew, elegís entre quiénes se divide cada gasto,
  saldos recalculados solos, votaciones, compartir y guardar el itinerario.
- **Mis viajes**: los viajes guardados quedan en el inicio para reabrirlos.
- Persistencia en `localStorage` (sin backend).

## Desarrollo

```bash
npm install
npm run dev
# http://localhost:3000
```

## Estructura

- `src/app/rollin-joy/` — rutas (landing, nuevo, generando, viaje)
- `src/components/rollin-joy/` — `data.ts` (catálogo + generador), `trip-context.tsx`
  (estado + persistencia), `shell.tsx`, `trip-view.tsx`, `primitives.tsx`, `scenes.tsx`
- `public/rollin-joy/` — logo y mascota
