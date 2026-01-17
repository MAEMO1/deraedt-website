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
    phone: "+32 52 42 42 18",
    email: "info@nvderaedtivan.be",
    jobs: "jobs@nvderaedtivan.be",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/bouwwerken-de-raedt-ivan",
  },
  founded: 1930,
} as const;

// Geverifieerde statistieken (bronnen: Companyweb, bedrijfssite, certificaten)
export const STATS = {
  yearsExperience: new Date().getFullYear() - COMPANY.founded,
  employees: "42",
  employeesExact: 42, // VTE volgens jaarrekening 2024
  revenue: 22716681,
  revenueDisplay: "€22,7M",
  revenueYear: 2024,
  erkenningsklasse: 6,
  // Verwijderd: projectsCompleted en raamcontracten - niet publiek verifieerbaar
} as const;

// Certificeringen - GEVERIFIEERD
export const CERTIFICATIONS = [
  {
    id: "klasse6",
    name: "Klasse 6",
    fullName: "Erkenning Klasse 6",
    description: "Hoogste erkenningsklasse voor overheidsopdrachten",
    category: "D (Algemene aannemingen)",
    verified: true,
    prominent: true,
  },
  {
    id: "iso9001",
    name: "ISO 9001",
    fullName: "ISO 9001:2015",
    description: "Kwaliteitsmanagementsysteem",
    verified: true,
    prominent: true,
  },
  {
    id: "vca",
    name: "VCA**",
    fullName: "VCA** (Petrochemie)",
    description: "Veiligheid, Gezondheid en Milieu - Hoogste niveau",
    verified: true,
    prominent: true,
  },
  {
    id: "co2",
    name: "CO₂-Niveau 3",
    fullName: "CO₂-Prestatieladder 3.1 – Niveau 3",
    description: "CO₂-bewust certificaat voor duurzaam bouwen",
    scope: "Algemene bouw-, dak- en infrastructuurwerken; Onderhoud, interventies en energetische renovaties",
    certificateNumber: "25 CO2 25", // Vinçotte certificaat
    validFrom: "4 augustus 2025",
    validUntil: "14 januari 2028",
    issuer: "Vinçotte",
    verified: true,
    prominent: true,
  },
] as const;

// Prominente klanten (voor trust/social proof)
export const KEY_CLIENTS = [
  { name: "Infrabel", type: "infrastructuur" },
  { name: "NMBS", type: "infrastructuur" },
  { name: "Regie der Gebouwen", type: "overheid" },
  { name: "Stad Gent", type: "overheid" },
  { name: "Stad Brussel", type: "overheid" },
  { name: "Stad Antwerpen", type: "overheid" },
  { name: "AG Vespa", type: "overheid" },
  { name: "Provincie Oost-Vlaanderen", type: "overheid" },
  { name: "VEB", type: "onderwijs" },
  { name: "Fluvius", type: "infrastructuur" },
  { name: "KBVB", type: "sport" },
] as const;

// Raamcontracten - geverifieerd via bedrijfssite/nieuws/LinkedIn
export const RAAMCONTRACTEN = [
  {
    client: "Stad Gent",
    scope: "Herstellen van daken en dakgoten",
    type: "Onderhoud",
    verified: true, // Bron: LinkedIn posts, nvderaedtivan.be
  },
  {
    client: "Stad Brussel",
    scope: "Onderhoud en renovatiewerken",
    type: "Onderhoud & Renovatie",
    verified: true, // Bron: nvderaedtivan.be
  },
  {
    client: "VEB",
    scope: "Thermische verbetering buitenschil scholen",
    type: "Energetische Renovatie",
    verified: true, // Bron: nvderaedtivan.be/nieuws
  },
  {
    client: "KU Leuven",
    scope: "Bouwpartner 10 campussen",
    type: "Bouw & Renovatie",
    verified: true, // Bron: LinkedIn
  },
] as const;

// Geverifieerde referentieprojecten
export const FEATURED_PROJECTS = [
  {
    slug: "koning-boudewijnstadion",
    title: "Koning Boudewijnstadion",
    category: "infrastructuur",
    client: "KBVB",
    year: 2024,
    description: "Dakrenovatie en stabilisatie verlichtingspilonen",
    image: "/images/original-site/Koning-Boudewijn-Stadion.webp",
    scope: "Kritische infrastructuur",
    verified: true,
  },
  {
    slug: "justitiepaleis-dendermonde",
    title: "Justitiepaleis van Dendermonde",
    category: "erfgoed",
    client: "Regie Der Gebouwen",
    year: 2023,
    description: "Plaatsen van valbeveiliging op hellende daken",
    image: "/images/original-site/Justitiepaleis-Dendermonde.jpg",
    scope: "Beschermd erfgoed",
    verified: true,
  },
  {
    slug: "infrabel-onderhoudscentrum",
    title: "Onderhoudscentrum Bovenleidingen",
    category: "infrastructuur",
    client: "Infrabel",
    year: 2023,
    description: "Verbouwen onderhoudscentrum bovenleidingen",
    image: "/images/original-site/Foto-Infrabel.jpg",
    scope: "Kritische infrastructuur",
    verified: true,
  },
  {
    slug: "stadhuis-gent",
    title: "Stadhuis Gent",
    category: "erfgoed",
    client: "Stad Gent",
    year: 2023,
    description: "Raamcontract voor het herstellen van daken",
    image: "/images/original-site/Foto-Stadhuis-Gent.jpeg",
    scope: "Raamcontract",
    verified: true,
  },
  {
    slug: "stadhuis-brussel",
    title: "Stadhuis Brussel",
    category: "erfgoed",
    client: "Stad Brussel",
    year: 2023,
    description: "Onderhoud en renovatiewerken",
    image: "/images/original-site/Foto-Stadhuis-Brussel.png",
    scope: "Beschermd erfgoed",
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

// Diensten - gebaseerd op geverifieerde activiteiten
export const SERVICES = [
  {
    id: "bouwwerken",
    title: "Algemene Bouwwerken",
    description: "Bouwprojecten van A tot Z voor overheden en bedrijven. Klasse 6 erkend.",
    icon: "Building2",
  },
  {
    id: "dakwerken",
    title: "Dakwerken",
    description: "Specialisten in hellende en platte daken, isolatie en waterdichting.",
    icon: "Hammer",
  },
  {
    id: "erfgoed",
    title: "Erfgoedrenovatie",
    description: "Restauratie van beschermd bouwkundig erfgoed met authentieke technieken.",
    icon: "Landmark",
  },
  {
    id: "facility",
    title: "Onderhoud & Interventies",
    description: "Raamcontracten voor dakonderhoud, herstellingen en renovatiewerken.",
    icon: "Wrench",
  },
] as const;

// Navigatie items
export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/over-ons", label: "Over Ons" },
  { href: "/diensten", label: "Diensten" },
  { href: "/projecten", label: "Projecten" },
  { href: "/procurement", label: "Voor Overheden" },
  { href: "/werken-bij", label: "Werken Bij" },
  { href: "/contact", label: "Contact" },
] as const;

// CTA voor navigatie
export const NAV_CTA = {
  href: "/projectplanner",
  label: "Start Project",
} as const;

// Contact form onderwerpen
export const CONTACT_SUBJECTS = [
  { value: "raamcontract", label: "Raamcontract / Aanbesteding" },
  { value: "offerte", label: "Offerte aanvragen" },
  { value: "interventie", label: "Interventie / Herstelling" },
  { value: "facility", label: "Facility Management" },
  { value: "sollicitatie", label: "Sollicitatie" },
  { value: "anders", label: "Anders" },
] as const;

// Metadata
export const SITE_CONFIG = {
  name: "Bouwwerken De Raedt Ivan NV",
  description: "Al 96 jaar uw betrouwbare partner voor nieuwbouw, renovatie en erfgoedrenovatie in België. Klasse 6 erkend aannemer met ISO 9001, VCA** en CO₂-Prestatieladder niveau 3 certificering.",
  url: "https://nvderaedtivan.be",
  ogImage: "/images/og-image.jpg",
  locale: "nl_BE",
} as const;

// USP's voor procurement - alleen verifieerbare claims
export const PROCUREMENT_USPS = [
  {
    title: "Klasse 6 Erkend",
    description: "Hoogste erkenningsklasse voor overheidsopdrachten zonder aanbestedingsgrens",
  },
  {
    title: "Triple Gecertificeerd",
    description: "ISO 9001 + VCA** + CO₂-Prestatieladder niveau 3",
  },
  {
    title: "Actief Sinds 1930",
    description: "Familiale continuïteit met bewezen trackrecord in de bouwsector",
  },
  {
    title: "Raamcontract Ervaring",
    description: "Ervaring met raamcontracten voor publieke opdrachtgevers (o.a. VEB)",
  },
] as const;
