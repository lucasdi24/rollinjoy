// Rollin Joy — mockup data layer + trip generator
// Authored destinations with day templates; generateTrip() parameterizes them
// by people, budget tier, nights and interests to feel like a real product.

export type Interest =
  | "Playa"
  | "Gastronomía"
  | "Cultura"
  | "Vida nocturna"
  | "Aventura"
  | "Relax"
  | "Shopping"
  | "Instagrameable";

export type BudgetKey = "low" | "balance" | "exp";

export type ActKind =
  | "coffee"
  | "beach"
  | "food"
  | "cable"
  | "sunset"
  | "dinner"
  | "bar"
  | "taxi"
  | "hotel"
  | "walk";

export type DayMood = "beach" | "mountain" | "night" | "food";

export interface NavInfo {
  min: number;
  mode: "walk" | "taxi" | "bus";
  cost?: number; // USD, group
}

export interface StopTemplate {
  t: string; // time "09:00"
  kind: ActKind;
  place: string;
  desc: string;
  dur: string;
  baseCost: number; // USD per person, balance tier (0 = gratis)
  costNote?: string; // e.g. "sombrilla $5"
  tags: Interest[];
  pin: { x: number; y: number }; // normalized on stylized map
  nav: NavInfo | null;
}

export interface DayTemplate {
  theme: string;
  mood: DayMood;
  highlights: { ico: string; l: string }[];
  stops: StopTemplate[];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  blurb: string;
  cover: string; // css gradient
  rio?: boolean; // use the painted Rio cover scene
  perPerson: { low: number; balance: number; exp: number }; // est USD pp for 4 nights
  days: DayTemplate[];
}

// ── Budget tiers ─────────────────────────────────────────────
export const BUDGETS: { key: BudgetKey; k: string; range: string; mult: number }[] = [
  { key: "low", k: "Low-cost", range: "USD 450–700 pp", mult: 0.62 },
  { key: "balance", k: "Balance", range: "USD 800–1200 pp", mult: 1 },
  { key: "exp", k: "Experiencia", range: "USD 1400–2200 pp", mult: 1.75 },
];

export const ALL_INTERESTS: { k: Interest; e: string }[] = [
  { k: "Playa", e: "🏖️" },
  { k: "Gastronomía", e: "🍽️" },
  { k: "Cultura", e: "🎭" },
  { k: "Vida nocturna", e: "🌙" },
  { k: "Aventura", e: "🥾" },
  { k: "Relax", e: "😴" },
  { k: "Shopping", e: "🛍️" },
  { k: "Instagrameable", e: "📸" },
];

// ── Destinations catalog ─────────────────────────────────────
export const DESTINATIONS: Destination[] = [
  {
    id: "rio",
    name: "Río de Janeiro",
    country: "Brasil",
    blurb: "Playa, samba y atardeceres que se aplauden.",
    cover: "linear-gradient(180deg, #FFB26B 0%, #FF8C6B 35%, #E9627A 70%, #5B4A78 100%)",
    rio: true,
    perPerson: { low: 620, balance: 1100, exp: 1900 },
    days: [
      {
        theme: "Zona Sur y atardecer en Ipanema",
        mood: "beach",
        highlights: [
          { ico: "umbrella", l: "Playa Ipanema" },
          { ico: "utensils", l: "Quiosques carioca" },
          { ico: "sunset", l: "Atardecer Arpoador" },
        ],
        stops: [
          { t: "09:00", kind: "coffee", place: "Confeitaria Colombo", desc: "Desayuno estilo Copacabana, pan de queso y café.", dur: "1h", baseCost: 8, tags: ["Gastronomía"], pin: { x: 0.3, y: 0.22 }, nav: { min: 12, mode: "taxi", cost: 5 } },
          { t: "10:30", kind: "beach", place: "Playa de Ipanema · Posto 9", desc: "El spot más carioca. Alquilá sombrilla, quedate el día.", dur: "2.5h", baseCost: 0, costNote: "sombrilla $5", tags: ["Playa", "Relax"], pin: { x: 0.25, y: 0.55 }, nav: { min: 8, mode: "walk" } },
          { t: "13:00", kind: "food", place: "Quiosque Posto 9", desc: "Feijão na playa + caipirinha. No hay mejor almuerzo.", dur: "1h", baseCost: 15, tags: ["Gastronomía", "Playa"], pin: { x: 0.3, y: 0.64 }, nav: { min: 18, mode: "taxi", cost: 8 } },
          { t: "15:30", kind: "cable", place: "Pan de Azúcar · teleférico", desc: "Dos tramos, vistas de la bahía. Llegá 30 min antes.", dur: "2h", baseCost: 25, tags: ["Instagrameable", "Aventura"], pin: { x: 0.68, y: 0.4 }, nav: { min: 22, mode: "taxi", cost: 10 } },
          { t: "19:00", kind: "sunset", place: "Pedra do Arpoador", desc: "Llevá una cerveza. Se aplaude cuando baja el sol.", dur: "45m", baseCost: 0, tags: ["Instagrameable", "Relax"], pin: { x: 0.35, y: 0.68 }, nav: { min: 10, mode: "walk" } },
          { t: "21:00", kind: "dinner", place: "Aconchego Carioca", desc: "Bolinho de feijoada + cerveza artesanal. Reservá.", dur: "1.5h", baseCost: 30, tags: ["Gastronomía"], pin: { x: 0.45, y: 0.52 }, nav: { min: 15, mode: "taxi", cost: 8 } },
          { t: "23:00", kind: "bar", place: "Lapa · bar hopping", desc: "Caipirinha en la calle, samba donde te lleve el oído.", dur: "2h+", baseCost: 20, tags: ["Vida nocturna"], pin: { x: 0.55, y: 0.3 }, nav: null },
        ],
      },
      {
        theme: "Centro histórico y samba en Lapa",
        mood: "night",
        highlights: [
          { ico: "building", l: "Santa Teresa" },
          { ico: "landmark", l: "Escadaria Selarón" },
          { ico: "music", l: "Noche de samba" },
        ],
        stops: [
          { t: "09:30", kind: "coffee", place: "Café do Bom Cachaço", desc: "Café de especialidad antes de subir a Santa Teresa.", dur: "45m", baseCost: 7, tags: ["Gastronomía"], pin: { x: 0.28, y: 0.28 }, nav: { min: 14, mode: "taxi", cost: 6 } },
          { t: "10:30", kind: "walk", place: "Bondinho de Santa Teresa", desc: "El tranvía amarillo por las calles empedradas del barrio.", dur: "1h", baseCost: 5, tags: ["Cultura", "Instagrameable"], pin: { x: 0.42, y: 0.34 }, nav: { min: 8, mode: "walk" } },
          { t: "12:00", kind: "walk", place: "Escadaria Selarón", desc: "215 escalones de azulejos. Foto obligada de Río.", dur: "45m", baseCost: 0, tags: ["Instagrameable", "Cultura"], pin: { x: 0.5, y: 0.48 }, nav: { min: 10, mode: "walk" } },
          { t: "13:30", kind: "food", place: "Bar do Mineiro", desc: "Feijoada de los sábados en Santa Teresa. Mítico.", dur: "1.5h", baseCost: 18, tags: ["Gastronomía"], pin: { x: 0.46, y: 0.4 }, nav: { min: 16, mode: "taxi", cost: 7 } },
          { t: "17:00", kind: "walk", place: "Real Gabinete Português", desc: "La biblioteca más linda del mundo. Entrada libre.", dur: "1h", baseCost: 0, tags: ["Cultura", "Instagrameable"], pin: { x: 0.58, y: 0.3 }, nav: { min: 18, mode: "taxi", cost: 8 } },
          { t: "22:00", kind: "bar", place: "Rio Scenarium · Lapa", desc: "Casa de samba en tres pisos. Llegá temprano.", dur: "3h+", baseCost: 28, tags: ["Vida nocturna"], pin: { x: 0.55, y: 0.36 }, nav: { min: 12, mode: "taxi", cost: 6 } },
        ],
      },
      {
        theme: "Cristo Redentor y favela tour",
        mood: "mountain",
        highlights: [
          { ico: "mountain", l: "Cristo Redentor" },
          { ico: "users", l: "Tour Rocinha" },
          { ico: "utensils", l: "Cena Santa Teresa" },
        ],
        stops: [
          { t: "08:00", kind: "coffee", place: "Café da manhã no hotel", desc: "Cargá pilas, el día arranca temprano y en altura.", dur: "45m", baseCost: 0, tags: ["Relax"], pin: { x: 0.32, y: 0.3 }, nav: { min: 25, mode: "taxi", cost: 12 } },
          { t: "09:00", kind: "cable", place: "Trem do Corcovado", desc: "El tren cremallera entre la selva hasta el Cristo.", dur: "2h", baseCost: 32, tags: ["Aventura", "Instagrameable"], pin: { x: 0.6, y: 0.2 }, nav: { min: 20, mode: "taxi", cost: 10 } },
          { t: "12:00", kind: "walk", place: "Cristo Redentor", desc: "Brazos abiertos sobre toda la ciudad. Vení con tiempo.", dur: "1h", baseCost: 0, tags: ["Instagrameable", "Cultura"], pin: { x: 0.62, y: 0.16 }, nav: { min: 30, mode: "taxi", cost: 14 } },
          { t: "14:30", kind: "walk", place: "Tour comunitario Rocinha", desc: "Guía local, mirador y economía de barrio. Con respeto.", dur: "2.5h", baseCost: 22, tags: ["Cultura", "Aventura"], pin: { x: 0.4, y: 0.6 }, nav: { min: 28, mode: "taxi", cost: 12 } },
          { t: "20:00", kind: "dinner", place: "Aprazível · Santa Teresa", desc: "Cocina brasileña con vista a la bahía. Reservá sí o sí.", dur: "2h", baseCost: 45, tags: ["Gastronomía", "Instagrameable"], pin: { x: 0.48, y: 0.42 }, nav: { min: 22, mode: "taxi", cost: 9 } },
        ],
      },
      {
        theme: "Copacabana relax y despedida",
        mood: "beach",
        highlights: [
          { ico: "umbrella", l: "Playa Copacabana" },
          { ico: "shopping-bag", l: "Ipanema shopping" },
          { ico: "wine", l: "Cena de cierre" },
        ],
        stops: [
          { t: "10:00", kind: "beach", place: "Playa de Copacabana", desc: "Última playa: agua de coco, fútbol y olas suaves.", dur: "2.5h", baseCost: 0, costNote: "reposera $4", tags: ["Playa", "Relax"], pin: { x: 0.34, y: 0.58 }, nav: { min: 10, mode: "walk" } },
          { t: "13:00", kind: "food", place: "Confeitaria do Forte", desc: "Almuerzo dentro del Fuerte de Copacabana, vista 180°.", dur: "1.5h", baseCost: 20, tags: ["Gastronomía", "Instagrameable"], pin: { x: 0.4, y: 0.66 }, nav: { min: 14, mode: "taxi", cost: 7 } },
          { t: "16:00", kind: "walk", place: "Feria Hippie de Ipanema", desc: "Artesanías, havaianas y regalos de último momento.", dur: "1.5h", baseCost: 25, costNote: "compras", tags: ["Shopping"], pin: { x: 0.28, y: 0.5 }, nav: { min: 12, mode: "taxi", cost: 6 } },
          { t: "19:30", kind: "sunset", place: "Mirante do Leblon", desc: "Brindis al atardecer mirando los Dois Irmãos.", dur: "45m", baseCost: 0, tags: ["Relax", "Instagrameable"], pin: { x: 0.22, y: 0.6 }, nav: { min: 9, mode: "walk" } },
          { t: "21:00", kind: "dinner", place: "Cena de cierre · Garota de Ipanema", desc: "Donde se compuso la canción. Picanha y un último chopp.", dur: "2h", baseCost: 35, tags: ["Gastronomía", "Vida nocturna"], pin: { x: 0.3, y: 0.46 }, nav: { min: 8, mode: "walk" } },
        ],
      },
    ],
  },
  {
    id: "bsas",
    name: "Buenos Aires",
    country: "Argentina",
    blurb: "Parrilla, milonga y librerías eternas.",
    cover: "linear-gradient(180deg, #6E8BB0 0%, #8E7BA6 45%, #C97A8E 80%, #E0A45C 100%)",
    perPerson: { low: 480, balance: 820, exp: 1500 },
    days: [
      {
        theme: "San Telmo, Centro y una milonga",
        mood: "night",
        highlights: [
          { ico: "landmark", l: "Plaza de Mayo" },
          { ico: "utensils", l: "Mercado San Telmo" },
          { ico: "music", l: "Milonga" },
        ],
        stops: [
          { t: "09:30", kind: "coffee", place: "Café de los Angelitos", desc: "Café notable, medialunas y mármol de otra época.", dur: "1h", baseCost: 9, tags: ["Gastronomía", "Cultura"], pin: { x: 0.3, y: 0.3 }, nav: { min: 12, mode: "taxi", cost: 5 } },
          { t: "11:00", kind: "walk", place: "Plaza de Mayo y Catedral", desc: "Casa Rosada, Cabildo y el corazón político del país.", dur: "1h", baseCost: 0, tags: ["Cultura", "Instagrameable"], pin: { x: 0.42, y: 0.4 }, nav: { min: 10, mode: "walk" } },
          { t: "13:00", kind: "food", place: "Mercado de San Telmo", desc: "Choripán, empanadas y anticuario en el mismo techo.", dur: "1.5h", baseCost: 14, tags: ["Gastronomía"], pin: { x: 0.5, y: 0.52 }, nav: { min: 8, mode: "walk" } },
          { t: "18:00", kind: "walk", place: "Librería El Ateneo", desc: "Un teatro convertido en la librería más linda del mundo.", dur: "45m", baseCost: 0, tags: ["Cultura", "Instagrameable"], pin: { x: 0.6, y: 0.34 }, nav: { min: 16, mode: "taxi", cost: 7 } },
          { t: "22:00", kind: "bar", place: "Milonga en La Catedral", desc: "Tango de verdad, sin show para turistas. Clase a las 21h.", dur: "3h+", baseCost: 16, tags: ["Vida nocturna", "Cultura"], pin: { x: 0.55, y: 0.6 }, nav: { min: 14, mode: "taxi", cost: 6 } },
        ],
      },
      {
        theme: "Palermo, parrilla y bares de autor",
        mood: "food",
        highlights: [
          { ico: "utensils", l: "Asado" },
          { ico: "shopping-bag", l: "Diseño palermo" },
          { ico: "wine", l: "Coctelería" },
        ],
        stops: [
          { t: "10:30", kind: "coffee", place: "Felix · café de especialidad", desc: "Flat white y tostado de campo en Palermo Soho.", dur: "1h", baseCost: 10, tags: ["Gastronomía"], pin: { x: 0.3, y: 0.34 }, nav: { min: 10, mode: "taxi", cost: 5 } },
          { t: "12:00", kind: "walk", place: "Plaza Serrano y diseño local", desc: "Marcas independientes, cuero y vinilos.", dur: "2h", baseCost: 30, costNote: "compras", tags: ["Shopping"], pin: { x: 0.4, y: 0.46 }, nav: { min: 8, mode: "walk" } },
          { t: "14:30", kind: "food", place: "Don Julio", desc: "La parrilla más famosa de la ciudad. Reservá con semanas.", dur: "2h", baseCost: 42, tags: ["Gastronomía"], pin: { x: 0.52, y: 0.4 }, nav: { min: 12, mode: "taxi", cost: 6 } },
          { t: "19:00", kind: "walk", place: "Bosques de Palermo", desc: "Bici o caminata entre lagos antes de la noche.", dur: "1.5h", baseCost: 6, tags: ["Relax", "Aventura"], pin: { x: 0.62, y: 0.56 }, nav: { min: 14, mode: "taxi", cost: 6 } },
          { t: "22:30", kind: "bar", place: "Florería Atlántico", desc: "Bar de autor escondido bajo una florería. Top 50 mundial.", dur: "2h+", baseCost: 24, tags: ["Vida nocturna"], pin: { x: 0.46, y: 0.62 }, nav: { min: 16, mode: "taxi", cost: 7 } },
        ],
      },
      {
        theme: "La Boca, Recoleta y despedida",
        mood: "beach",
        highlights: [
          { ico: "landmark", l: "Caminito" },
          { ico: "building", l: "Recoleta" },
          { ico: "wine", l: "Cena de cierre" },
        ],
        stops: [
          { t: "10:00", kind: "walk", place: "Caminito · La Boca", desc: "Conventillos de colores y tango en la calle.", dur: "1.5h", baseCost: 0, tags: ["Cultura", "Instagrameable"], pin: { x: 0.3, y: 0.5 }, nav: { min: 18, mode: "taxi", cost: 8 } },
          { t: "13:00", kind: "food", place: "El Obrero", desc: "Bodegón histórico de La Boca. Milanesa imposible de terminar.", dur: "1.5h", baseCost: 18, tags: ["Gastronomía"], pin: { x: 0.38, y: 0.58 }, nav: { min: 15, mode: "taxi", cost: 7 } },
          { t: "16:00", kind: "walk", place: "Cementerio de la Recoleta", desc: "Mausoleos, gatos y la tumba de Evita.", dur: "1.5h", baseCost: 0, tags: ["Cultura", "Instagrameable"], pin: { x: 0.56, y: 0.32 }, nav: { min: 20, mode: "taxi", cost: 9 } },
          { t: "21:00", kind: "dinner", place: "Cena de cierre · Anchoíta", desc: "Cocina de producto y vinos argentinos. Brindis final.", dur: "2h", baseCost: 38, tags: ["Gastronomía", "Vida nocturna"], pin: { x: 0.5, y: 0.42 }, nav: { min: 12, mode: "taxi", cost: 6 } },
        ],
      },
    ],
  },
  {
    id: "cartagena",
    name: "Cartagena",
    country: "Colombia",
    blurb: "Murallas, Caribe y noches de salsa.",
    cover: "linear-gradient(180deg, #34C6C9 0%, #3E9FC0 40%, #7B6FB0 75%, #E0668A 100%)",
    perPerson: { low: 560, balance: 980, exp: 1700 },
    days: [
      {
        theme: "Ciudad amurallada y atardecer en la muralla",
        mood: "night",
        highlights: [
          { ico: "building", l: "Ciudad vieja" },
          { ico: "landmark", l: "Murallas" },
          { ico: "music", l: "Café del Mar" },
        ],
        stops: [
          { t: "09:30", kind: "coffee", place: "Época Espresso Bar", desc: "Café colombiano de origen dentro de las murallas.", dur: "45m", baseCost: 6, tags: ["Gastronomía"], pin: { x: 0.3, y: 0.3 }, nav: { min: 10, mode: "walk" } },
          { t: "10:30", kind: "walk", place: "Centro histórico amurallado", desc: "Balcones floridos, plazas y el reloj de la Puerta.", dur: "2h", baseCost: 0, tags: ["Cultura", "Instagrameable"], pin: { x: 0.44, y: 0.4 }, nav: { min: 8, mode: "walk" } },
          { t: "13:00", kind: "food", place: "La Cevichería", desc: "El ceviche que hizo famoso a Bourdain. Cola pero vale.", dur: "1.5h", baseCost: 22, tags: ["Gastronomía", "Playa"], pin: { x: 0.52, y: 0.5 }, nav: { min: 9, mode: "walk" } },
          { t: "18:00", kind: "sunset", place: "Café del Mar · muralla", desc: "Atardecer Caribe con cóctel sobre la muralla.", dur: "1h", baseCost: 14, tags: ["Relax", "Instagrameable"], pin: { x: 0.6, y: 0.32 }, nav: { min: 12, mode: "walk" } },
          { t: "22:00", kind: "bar", place: "Donde Fidel · salsa", desc: "Salsa clásica y cerveza fría frente a la plaza.", dur: "2h+", baseCost: 16, tags: ["Vida nocturna"], pin: { x: 0.48, y: 0.6 }, nav: { min: 6, mode: "walk" } },
        ],
      },
      {
        theme: "Islas del Rosario y playa",
        mood: "beach",
        highlights: [
          { ico: "umbrella", l: "Playa Blanca" },
          { ico: "utensils", l: "Pescado fresco" },
          { ico: "sunset", l: "Lancha al atardecer" },
        ],
        stops: [
          { t: "08:00", kind: "taxi", place: "Lancha a Islas del Rosario", desc: "45 min de mar abierto hasta el archipiélago.", dur: "45m", baseCost: 35, tags: ["Aventura", "Playa"], pin: { x: 0.3, y: 0.55 }, nav: { min: 15, mode: "taxi", cost: 8 } },
          { t: "10:00", kind: "beach", place: "Playa Blanca · Barú", desc: "Arena blanca y agua turquesa. Llegá temprano.", dur: "3h", baseCost: 0, costNote: "carpa $6", tags: ["Playa", "Relax", "Instagrameable"], pin: { x: 0.45, y: 0.66 }, nav: { min: 5, mode: "walk" } },
          { t: "13:30", kind: "food", place: "Almuerzo isleño", desc: "Pargo frito, patacón y coco. En la orilla.", dur: "1.5h", baseCost: 18, tags: ["Gastronomía", "Playa"], pin: { x: 0.5, y: 0.6 }, nav: { min: 6, mode: "walk" } },
          { t: "17:30", kind: "sunset", place: "Regreso al atardecer", desc: "Vuelta en lancha con el sol cayendo sobre Cartagena.", dur: "1h", baseCost: 0, tags: ["Relax", "Instagrameable"], pin: { x: 0.4, y: 0.4 }, nav: null },
        ],
      },
      {
        theme: "Getsemaní, arte callejero y despedida",
        mood: "food",
        highlights: [
          { ico: "landmark", l: "Getsemaní" },
          { ico: "building", l: "Castillo San Felipe" },
          { ico: "wine", l: "Cena rooftop" },
        ],
        stops: [
          { t: "10:00", kind: "walk", place: "Murales de Getsemaní", desc: "El barrio más vivo: arte callejero y sombrillas.", dur: "1.5h", baseCost: 0, tags: ["Cultura", "Instagrameable"], pin: { x: 0.32, y: 0.36 }, nav: { min: 10, mode: "walk" } },
          { t: "12:30", kind: "cable", place: "Castillo San Felipe", desc: "Fortaleza colonial con túneles y vistas de la bahía.", dur: "1.5h", baseCost: 9, tags: ["Cultura", "Aventura"], pin: { x: 0.5, y: 0.44 }, nav: { min: 12, mode: "taxi", cost: 6 } },
          { t: "15:00", kind: "walk", place: "Las Bóvedas", desc: "Artesanías y mochilas wayúu en las antiguas bóvedas.", dur: "1h", baseCost: 28, costNote: "compras", tags: ["Shopping"], pin: { x: 0.6, y: 0.34 }, nav: { min: 8, mode: "walk" } },
          { t: "20:30", kind: "dinner", place: "Cena de cierre · Alma rooftop", desc: "Cocina caribeña de autor sobre los techos coloniales.", dur: "2h", baseCost: 40, tags: ["Gastronomía", "Vida nocturna", "Instagrameable"], pin: { x: 0.46, y: 0.5 }, nav: { min: 10, mode: "walk" } },
        ],
      },
    ],
  },
];

// ── Generated trip types ─────────────────────────────────────
export interface GenStop {
  t: string;
  kind: ActKind;
  place: string;
  desc: string;
  dur: string;
  cost: string; // formatted, e.g. "$15 pp" or "gratis"
  costNum: number; // group USD incl. nav, for live recompute
  matched: boolean; // matches a chosen interest
  pin: { x: number; y: number; label: string; t: string };
  nav: NavInfo | null;
}

export interface GenDay {
  n: number;
  date: string; // "15 abr"
  theme: string;
  mood: DayMood;
  highlights: { ico: string; l: string }[];
  cost: number; // group USD for the day
  budgetPct: number; // 0..100 vs daily budget
  stops: GenStop[];
}

export interface TripInput {
  destId: string;
  dateLabel: string;
  startDay: number; // day-of-month for first date
  month: string; // "abr"
  nights: number;
  people: number;
  budget: BudgetKey;
  interests: Interest[];
}

export interface Trip {
  dest: string;
  country: string;
  cover: string;
  rio: boolean;
  nights: number;
  people: number;
  budgetLabel: string;
  budget: BudgetKey;
  interests: Interest[];
  matchedInterests: Interest[];
  totalGroup: number;
  perPerson: number;
  days: GenDay[];
  generatedAt: number;
}

const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export function defaultInput(destId = "rio"): TripInput {
  return {
    destId,
    dateLabel: "15 al 19 de abril",
    startDay: 15,
    month: "abr",
    nights: 4,
    people: 2,
    budget: "balance",
    interests: ["Playa", "Gastronomía", "Vida nocturna"],
  };
}

function fmtCost(perPersonUSD: number, mult: number, note?: string): string {
  const c = Math.round(perPersonUSD * mult);
  if (c <= 0) return note ? `gratis · ${note}` : "gratis";
  return note ? `$${c} pp · ${note}` : `$${c} pp`;
}

// Build a real itinerary from the inputs.
export function generateTrip(input: TripInput): Trip {
  const dest = DESTINATIONS.find((d) => d.id === input.destId) ?? DESTINATIONS[0];
  const tier = BUDGETS.find((b) => b.key === input.budget) ?? BUDGETS[1];
  const mult = tier.mult;
  const people = input.people;

  const nights = Math.max(1, Math.min(input.nights, dest.days.length));
  const dayTemplates = dest.days.slice(0, nights);

  const matchedSet = new Set(input.interests);
  const seenInterest = new Set<Interest>();

  const days: GenDay[] = dayTemplates.map((dt, i) => {
    const dayNum = i + 1;
    const dom = input.startDay + i;
    const date = `${dom} ${input.month}`;

    let groupCost = 0;
    const stops: GenStop[] = dt.stops.map((s) => {
      const matched = s.tags.some((t) => matchedSet.has(t));
      s.tags.forEach((t) => {
        if (matchedSet.has(t)) seenInterest.add(t);
      });
      const perPersonCost = Math.round(s.baseCost * mult);
      const stopGroup = perPersonCost * people + (s.nav?.cost ?? 0);
      groupCost += stopGroup;
      return {
        t: s.t,
        kind: s.kind,
        place: s.place,
        desc: s.desc,
        dur: s.dur,
        cost: fmtCost(s.baseCost, mult, s.costNote),
        costNum: stopGroup,
        matched,
        pin: { x: s.pin.x, y: s.pin.y, label: s.place, t: s.t },
        nav: s.nav,
      };
    });

    const dailyBudget = (tier.key === "low" ? 90 : tier.key === "exp" ? 320 : 160) * (people / 2);
    const budgetPct = Math.max(8, Math.min(100, Math.round((groupCost / dailyBudget) * 100)));

    return {
      n: dayNum,
      date,
      theme: dt.theme,
      mood: dt.mood,
      highlights: dt.highlights,
      cost: groupCost,
      budgetPct,
      stops,
    };
  });

  const totalGroup = days.reduce((a, d) => a + d.cost, 0);
  const perPerson = Math.round(totalGroup / people);

  return {
    dest: dest.name,
    country: dest.country,
    cover: dest.cover,
    rio: !!dest.rio,
    nights,
    people,
    budgetLabel: tier.k,
    budget: input.budget,
    interests: input.interests,
    matchedInterests: input.interests.filter((i) => seenInterest.has(i)),
    totalGroup,
    perPerson,
    days,
    generatedAt: 0,
  };
}

// silence unused warning for MONTHS helper consumers
export const MONTH_LIST = MONTHS;
