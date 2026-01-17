'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle,
  Upload,
  Loader2,
  AlertCircle,
  Send,
  Gift,
  Target,
} from 'lucide-react';
import { COMPANY } from '@/lib/constants';

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
}

interface JobDetailClientProps {
  job: Job;
  employmentTypeLabel: string;
}

const applicationSchema = z.object({
  full_name: z.string().min(2, 'Naam moet minimaal 2 karakters bevatten'),
  email: z.string().email('Ongeldig emailadres'),
  phone: z.string().optional(),
  cover_letter: z.string().optional(),
  gdpr_consent: z.boolean().refine((val) => val === true, {
    message: 'U moet akkoord gaan met de privacyverklaring',
  }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export function JobDetailClient({ job, employmentTypeLabel }: JobDetailClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(file.type)) {
        setSubmitError('Alleen PDF en Word documenten zijn toegestaan');
        return;
      }

      if (file.size > maxSize) {
        setSubmitError('Bestand mag maximaal 10MB zijn');
        return;
      }

      setCvFile(file);
      setSubmitError(null);
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let cvUrl: string | undefined;

      // Upload CV if provided
      if (cvFile) {
        const formData = new FormData();
        formData.append('file', cvFile);
        formData.append('bucket', 'applications');

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          cvUrl = uploadResult.url;
        } else {
          // Continue without CV URL if upload fails in demo mode
          console.warn('CV upload failed, continuing without CV URL');
        }
      }

      // Submit application
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job_id: job.id,
          job_slug: job.slug,
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          cover_letter: data.cover_letter,
          cv_url: cvUrl,
          gdpr_consent: data.gdpr_consent,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
      } else {
        setSubmitError(result.error || 'Er ging iets mis. Probeer het opnieuw.');
      }
    } catch {
      setSubmitError('Er ging iets mis. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] bg-[#112337] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/original-site/team-collage.jpg"
            alt="Team De Raedt"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#112337] via-[#112337]/70 to-[#112337]/40" />
        </div>

        <div className="container-wide relative pb-16 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/werken-bij"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Alle vacatures</span>
            </Link>

            <div className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              {job.department}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {job.title}
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-white/50">
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {job.department}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {employmentTypeLabel}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-spacing bg-[#F5F5F5]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-[#112337] mb-6">
                  Over deze functie
                </h2>
                <p className="text-[#686E77] leading-relaxed text-lg">
                  {job.description}
                </p>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-5 h-5 text-[#204CE5]" />
                  <h2 className="text-2xl font-bold text-[#112337]">
                    Wat wij verwachten
                  </h2>
                </div>
                <ul className="space-y-3">
                  {job.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3 text-[#686E77]">
                      <CheckCircle className="w-5 h-5 text-[#204CE5] flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Gift className="w-5 h-5 text-[#204CE5]" />
                  <h2 className="text-2xl font-bold text-[#112337]">
                    Wat wij bieden
                  </h2>
                </div>
                <ul className="space-y-3">
                  {job.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-[#686E77]">
                      <CheckCircle className="w-5 h-5 text-[#204CE5] flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Application Form Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:sticky lg:top-8 h-fit"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-[#112337] mb-6">
                  Solliciteer nu
                </h3>

                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-[#112337] mb-2">
                      Bedankt voor uw sollicitatie!
                    </h4>
                    <p className="text-[#686E77] text-sm">
                      U ontvangt binnenkort een bevestiging per email. Wij nemen zo snel mogelijk contact met u op.
                    </p>
                    <Link
                      href="/werken-bij"
                      className="inline-flex items-center gap-2 text-[#204CE5] hover:underline mt-6"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Terug naar vacatures
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="full_name" className="block text-sm font-medium text-[#112337] mb-2">
                        Naam *
                      </label>
                      <input
                        id="full_name"
                        type="text"
                        {...register('full_name')}
                        className="w-full px-4 py-3 border border-[#112337]/10 rounded-xl focus:border-[#204CE5] focus:outline-none transition-colors"
                        placeholder="Uw volledige naam"
                      />
                      {errors.full_name && (
                        <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#112337] mb-2">
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className="w-full px-4 py-3 border border-[#112337]/10 rounded-xl focus:border-[#204CE5] focus:outline-none transition-colors"
                        placeholder="uw.email@voorbeeld.be"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#112337] mb-2">
                        Telefoon
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        className="w-full px-4 py-3 border border-[#112337]/10 rounded-xl focus:border-[#204CE5] focus:outline-none transition-colors"
                        placeholder="+32 xxx xx xx xx"
                      />
                    </div>

                    {/* CV Upload */}
                    <div>
                      <label className="block text-sm font-medium text-[#112337] mb-2">
                        CV (PDF of Word)
                      </label>
                      <label className="flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed border-[#112337]/10 rounded-xl hover:border-[#204CE5] cursor-pointer transition-colors">
                        <Upload className="w-5 h-5 text-[#686E77]" />
                        <span className="text-sm text-[#686E77]">
                          {cvFile ? cvFile.name : 'Klik om te uploaden'}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      <p className="mt-1 text-xs text-[#686E77]">Max 10MB</p>
                    </div>

                    {/* Motivation */}
                    <div>
                      <label htmlFor="cover_letter" className="block text-sm font-medium text-[#112337] mb-2">
                        Motivatie
                      </label>
                      <textarea
                        id="cover_letter"
                        {...register('cover_letter')}
                        rows={4}
                        className="w-full px-4 py-3 border border-[#112337]/10 rounded-xl focus:border-[#204CE5] focus:outline-none transition-colors resize-none"
                        placeholder="Vertel ons waarom u geïnteresseerd bent..."
                      />
                    </div>

                    {/* GDPR Consent */}
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register('gdpr_consent')}
                          className="mt-1 w-4 h-4 rounded border-[#112337]/20 text-[#204CE5] focus:ring-[#204CE5]"
                        />
                        <span className="text-xs text-[#686E77]">
                          Ik ga akkoord met de{' '}
                          <Link href="/privacy" className="text-[#204CE5] hover:underline">
                            privacyverklaring
                          </Link>
                          . Mijn gegevens worden 12 maanden bewaard conform GDPR. *
                        </span>
                      </label>
                      {errors.gdpr_consent && (
                        <p className="mt-1 text-sm text-red-600">{errors.gdpr_consent.message}</p>
                      )}
                    </div>

                    {/* Error message */}
                    {submitError && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {submitError}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Verzenden...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Solliciteer
                        </>
                      )}
                    </button>

                    {/* Alternative contact */}
                    <p className="text-center text-xs text-[#686E77]">
                      Of mail uw sollicitatie naar{' '}
                      <a
                        href={`mailto:${COMPANY.contact.jobs}`}
                        className="text-[#204CE5] hover:underline"
                      >
                        {COMPANY.contact.jobs}
                      </a>
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
