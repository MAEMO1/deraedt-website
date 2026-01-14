// Bedrijfsgegevens - GEVERIFIEERD
export const COMPANY = {
  name: "Bouwwerken De Raedt Ivan NV",
  shortName: "De Raedt",
  kbo: "0474.288.230",
  btw: "BE 0474.288.230",
  address: {
    street: "Textielstraat 5",
    postal: "9240",
    city: "Zele",
    country: "België",
  },
  contact: {
    phone: "+32 52 44 50 44",
    email: "info@deraedt.be",
    jobs: "jobs@deraedt.be",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/bouwwerken-de-raedt-ivan",
  },
  founded: 1930,
} as const;

// Geverifieerde statistieken
export const STATS = {
  yearsExperience: new Date().getFullYear() - COMPANY.founded,
  employees: "40+",
  employeesExact: 40.1,
  revenue: 22716680,
  revenueDisplay: "€22,7M",
  erkenningsklasse: 6,
} as const;

// Certificeringen - ALLEEN GEVERIFIEERDE
export const CERTIFICATIONS = [
  {
    id: "iso9001",
    name: "ISO 9001",
    description: "Kwaliteitsmanagementsysteem",
    verified: true,
  },
  {
    id: "vca",
    name: "VCA*",
    description: "Veiligheid, Gezondheid en Milieu",
    verified: true,
  },
  {
    id: "klasse6",
    name: "Klasse 6",
    description: "Erkenning voor overheidsopdrachten",
    verified: true,
  },
] as const;

// NIET GEBRUIKEN - Niet geverifieerd
// CO2-Prestatieladder is NIET in het SKAO-register gevonden

// Geverifieerde referentieprojecten
export const FEATURED_PROJECTS = [
  {
    slug: "stadhuis-gent",
    title: "Stadhuis Gent",
    category: "erfgoed",
    client: "Stad Gent",
    year: 2023,
    description: "Restauratie van het historische stadhuis - koper en leien werken",
    image: "/images/original-site/Foto-Stadhuis-Gent.jpeg",
    verified: true,
  },
  {
    slug: "atlas-college-genk",
    title: "Atlas College Genk",
    category: "onderwijs",
    client: "GO! Onderwijs",
    year: 2025,
    description: "Energetische renovatie van onderwijsgebouw",
    image: "/images/original-site/Atlas-College-Genk-10-scaled.jpg",
    verified: true,
  },
  {
    slug: "koning-boudewijnstadion",
    title: "Koning Boudewijnstadion",
    category: "infrastructuur",
    client: "KBVB",
    year: 2024,
    description: "Dakrenovatie van het nationale stadion",
    image: "/images/original-site/Koning-Boudewijn-Stadion.webp",
    verified: true,
  },
  {
    slug: "infrabel-project",
    title: "Infrabel Infrastructuur",
    category: "infrastructuur",
    client: "Infrabel",
    year: 2023,
    description: "Spoorweginfrastructuur renovatie en onderhoud",
    image: "/images/original-site/Foto-Infrabel.jpg",
    verified: true,
  },
  {
    slug: "stadhuis-brussel",
    title: "Stadhuis Brussel",
    category: "erfgoed",
    client: "Stad Brussel",
    year: 2023,
    description: "Restauratie van het Brusselse stadhuis",
    image: "/images/original-site/Foto-Stadhuis-Brussel.png",
    verified: true,
  },
] as const;

// Project categorieën
export const PROJECT_CATEGORIES = [
  { value: "alle", label: "Alle Projecten" },
  { value: "erfgoed", label: "Erfgoed & Monumenten" },
  { value: "onderwijs", label: "Onderwijs" },
  { value: "zorg", label: "Zorg" },
  { value: "residentieel", label: "Residentieel" },
  { value: "infrastructuur", label: "Infrastructuur" },
  { value: "overheid", label: "Overheid" },
] as const;

// Diensten
export const SERVICES = [
  {
    id: "nieuwbouw",
    title: "Nieuwbouw",
    description: "Van fundament tot sleutel-op-de-deur projecten voor particulieren en overheden.",
    icon: "Building2",
  },
  {
    id: "renovatie",
    title: "Renovatie",
    description: "Grondige renovatie met respect voor de bestaande structuur en moderne technieken.",
    icon: "Hammer",
  },
  {
    id: "erfgoed",
    title: "Erfgoedrenovatie",
    description: "Gespecialiseerde restauratie van historische gebouwen en monumenten.",
    icon: "Landmark",
  },
] as const;

// Navigatie items
export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/over-ons", label: "Over Ons" },
  { href: "/projecten", label: "Projecten" },
  { href: "/duurzaamheid", label: "Duurzaamheid" },
  { href: "/werken-bij", label: "Werken Bij" },
  { href: "/contact", label: "Contact" },
] as const;

// Contact form onderwerpen
export const CONTACT_SUBJECTS = [
  { value: "offerte", label: "Offerte aanvragen" },
  { value: "vraag", label: "Algemene vraag" },
  { value: "sollicitatie", label: "Sollicitatie" },
  { value: "anders", label: "Anders" },
] as const;

// Metadata
export const SITE_CONFIG = {
  name: "Bouwwerken De Raedt Ivan NV",
  description: "Al 96 jaar uw betrouwbare partner voor nieuwbouw, renovatie en erfgoedrenovatie in België. Klasse 6 erkend aannemer met ISO 9001 en VCA* certificering.",
  url: "https://deraedt.be",
  ogImage: "/images/og-image.jpg",
  locale: "nl_BE",
} as const;
