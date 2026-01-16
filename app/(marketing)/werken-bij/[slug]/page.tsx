import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { COMPANY, SITE_CONFIG } from '@/lib/constants';
import jobsData from '@/scripts/seed/jobs.json';
import { JobDetailClient } from './client';

interface Job {
  id: string;
  title: string;
  slug: string;
  department: string;
  employment_type: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
  status: string;
  published_at: string;
}

const jobs: Job[] = jobsData as Job[];

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getJob(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug && job.status === 'published');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);

  if (!job) {
    return {
      title: 'Vacature niet gevonden',
    };
  }

  return {
    title: `${job.title} | Werken bij ${COMPANY.shortName}`,
    description: `Solliciteer voor ${job.title} bij ${COMPANY.name}. ${job.description}`,
    openGraph: {
      title: `${job.title} | ${SITE_CONFIG.name}`,
      description: job.description,
      url: `${SITE_CONFIG.url}/werken-bij/${job.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/werken-bij/${job.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return jobs
    .filter((job) => job.status === 'published')
    .map((job) => ({
      slug: job.slug,
    }));
}

function getEmploymentTypeLabel(type: string): string {
  const types: Record<string, string> = {
    full_time: 'Voltijds',
    part_time: 'Deeltijds',
    contract: 'Contract',
    internship: 'Stage',
  };
  return types[type] || type;
}

function getEmploymentTypeSchema(type: string): string {
  const types: Record<string, string> = {
    full_time: 'FULL_TIME',
    part_time: 'PART_TIME',
    contract: 'CONTRACTOR',
    internship: 'INTERN',
  };
  return types[type] || 'FULL_TIME';
}

function getJobPostingSchema(job: Job) {
  const validThrough = new Date();
  validThrough.setMonth(validThrough.getMonth() + 3); // Valid for 3 months

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: `${job.description}\n\nVereisten:\n${job.requirements.join('\n')}\n\nVoordelen:\n${job.benefits.join('\n')}`,
    datePosted: job.published_at,
    validThrough: validThrough.toISOString(),
    employmentType: getEmploymentTypeSchema(job.employment_type),
    hiringOrganization: {
      '@type': 'Organization',
      name: COMPANY.name,
      sameAs: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/logo.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY.address.street,
        addressLocality: COMPANY.address.city,
        postalCode: COMPANY.address.postal,
        addressCountry: 'BE',
      },
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'BE',
      },
    },
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'Belgium',
    },
    industry: 'Bouwsector',
    occupationalCategory: job.department,
    qualifications: job.requirements.join('. '),
    responsibilities: job.description,
    jobBenefits: job.benefits.join('. '),
    directApply: true,
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = getJob(slug);

  if (!job) {
    notFound();
  }

  const jobPostingSchema = getJobPostingSchema(job);
  const employmentTypeLabel = getEmploymentTypeLabel(job.employment_type);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPostingSchema),
        }}
      />
      <JobDetailClient
        job={job}
        employmentTypeLabel={employmentTypeLabel}
      />
    </>
  );
}
