import { COMPANY, STATS, CERTIFICATIONS, SERVICES, SITE_CONFIG, FEATURED_PROJECTS } from "@/lib/constants";

// Organization & LocalBusiness Schema
function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "GeneralContractor"],
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: COMPANY.name,
    alternateName: COMPANY.shortName,
    legalName: COMPANY.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    image: `${SITE_CONFIG.url}/images/og-image.jpg`,
    description: SITE_CONFIG.description,
    foundingDate: COMPANY.founded.toString(),
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: STATS.employeesExact,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      postalCode: COMPANY.address.postal,
      addressCountry: "BE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.0667,
      longitude: 4.0333,
    },
    telephone: COMPANY.contact.phone,
    email: COMPANY.contact.email,
    sameAs: [COMPANY.social.linkedin],
    taxID: COMPANY.btw,
    naics: "236220", // Commercial and Institutional Building Construction
    isicV4: "4120", // Construction of residential and non-residential buildings
    areaServed: {
      "@type": "Country",
      name: "Belgium",
    },
    knowsAbout: [
      "Nieuwbouw",
      "Renovatie",
      "Erfgoedrenovatie",
      "Monument restauratie",
      "Facility Management",
      "Overheidsopdrachten",
      "CO2-bewust bouwen",
    ],
    hasCredential: CERTIFICATIONS.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.fullName,
      description: cert.description,
    })),
    makesOffer: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@type": "Organization",
          "@id": `${SITE_CONFIG.url}/#organization`,
        },
      },
    })),
  };
}

// Service Schema
function getServicesSchema() {
  return SERVICES.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_CONFIG.url}/diensten/${service.id}`,
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      "@id": `${SITE_CONFIG.url}/#organization`,
      name: COMPANY.name,
    },
    areaServed: {
      "@type": "Country",
      name: "Belgium",
    },
    serviceType: service.title,
  }));
}

// FAQ Schema for procurement-focused questions
function getFAQSchema() {
  const faqs = [
    {
      question: "Wat is de erkenningsklasse van De Raedt?",
      answer: `Bouwwerken De Raedt Ivan NV heeft een Klasse 6 erkenning in categorie D (Algemene Aannemingen). Dit is de hoogste erkenningsklasse, waarmee wij overheidsopdrachten van onbeperkte waarde mogen uitvoeren.`,
    },
    {
      question: "Welke certificeringen heeft De Raedt?",
      answer: `Wij beschikken over ISO 9001:2015 (kwaliteitsmanagement), VCA** (veiligheid - hoogste niveau) en CO₂-Prestatieladder niveau 3 (duurzaamheid). Deze triple-certificering garandeert kwaliteit, veiligheid en milieubewust werken.`,
    },
    {
      question: "Werkt De Raedt voor overheden en publieke instellingen?",
      answer: `Ja, overheids- en publieke opdrachten vormen onze kernactiviteit. Wij hebben actieve raamcontracten met onder andere Stad Gent, Stad Antwerpen, VEB en Regie der Gebouwen. Referenties zijn beschikbaar op aanvraag.`,
    },
    {
      question: "Heeft De Raedt ervaring met erfgoed en monumenten?",
      answer: `Absoluut. Erfgoedrenovatie is een van onze specialisaties. Wij hebben gewerkt aan projecten zoals het Justitiepaleis van Dendermonde, Stadhuis Gent en Stadhuis Brussel - allen beschermde monumenten.`,
    },
    {
      question: "Is De Raedt CO₂-gecertificeerd?",
      answer: `Ja, wij zijn gecertificeerd op niveau 3 van de CO₂-Prestatieladder (schema 3.1). Dit certificaat is geldig tot 14 januari 2028 en kan gunningsvoordeel opleveren bij aanbestedingen.`,
    },
    {
      question: "Hoe lang bestaat De Raedt?",
      answer: `Bouwwerken De Raedt Ivan NV is opgericht in 1930 en heeft dus meer dan ${STATS.yearsExperience} jaar ervaring. Het is een familiaal bedrijf met intergenerationele kennisoverdracht.`,
    },
    {
      question: "Waar is De Raedt gevestigd?",
      answer: `Ons hoofdkantoor is gevestigd aan de ${COMPANY.address.street} in ${COMPANY.address.postal} ${COMPANY.address.city}, België. Van hieruit opereren wij in heel België.`,
    },
    {
      question: "Biedt De Raedt facility management en onderhoudscontracten aan?",
      answer: `Ja, wij bieden raamcontracten voor preventief onderhoud, interventies en facility management. Dit omvat dakonderhoud, gevelonderhoud en algemene gebouwtechniek.`,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Projects Schema (Portfolio)
function getProjectsSchema() {
  return FEATURED_PROJECTS.map((project) => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE_CONFIG.url}/projecten/${project.slug}`,
    name: project.title,
    description: project.description,
    dateCreated: project.year.toString(),
    creator: {
      "@type": "Organization",
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    client: {
      "@type": "Organization",
      name: project.client,
    },
    genre: project.category,
    image: `${SITE_CONFIG.url}${project.image}`,
  }));
}

// WebSite Schema for sitelinks search
function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    inLanguage: "nl-BE",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/projecten?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// BreadcrumbList helper (for page-specific use)
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

// Main component that outputs all structured data
export function StructuredData() {
  const organizationSchema = getOrganizationSchema();
  const servicesSchema = getServicesSchema();
  const faqSchema = getFAQSchema();
  const projectsSchema = getProjectsSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      {servicesSchema.map((schema, index) => (
        <script
          key={`service-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
      {projectsSchema.map((schema, index) => (
        <script
          key={`project-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}

// Page-specific structured data component
export function PageStructuredData({
  breadcrumbs,
  additionalSchema,
}: {
  breadcrumbs?: { name: string; url: string }[];
  additionalSchema?: object;
}) {
  return (
    <>
      {breadcrumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)),
          }}
        />
      )}
      {additionalSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(additionalSchema),
          }}
        />
      )}
    </>
  );
}
