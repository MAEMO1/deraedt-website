import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { handleApiError, handleDatabaseError } from '@/lib/api';

const createJobSchema = z.object({
  title: z.string().min(1, 'Titel is verplicht'),
  department: z.string().min(1, 'Afdeling is verplicht'),
  location: z.string().min(1, 'Locatie is verplicht'),
  description: z.string().min(1, 'Beschrijving is verplicht'),
  employment_type: z.enum(['full_time', 'part_time', 'contract', 'internship']).default('full_time'),
  requirements: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  salary_min: z.number().nullable().optional(),
  salary_max: z.number().nullable().optional(),
  status: z.enum(['draft', 'published', 'closed']).default('draft'),
});

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createJobSchema.parse(body);

    const supabase = await createClient();

    // Generate slug from title
    const slug = generateSlug(data.title);

    // Check if slug exists (add suffix if needed)
    const { data: existingJobs } = await supabase
      .from('jobs')
      .select('slug')
      .like('slug', `${slug}%`);

    let finalSlug = slug;
    if (existingJobs && existingJobs.length > 0) {
      finalSlug = `${slug}-${existingJobs.length + 1}`;
    }

    const { data: job, error } = await supabase
      .from('jobs')
      .insert({
        title: data.title,
        slug: finalSlug,
        department: data.department,
        location: data.location,
        description: data.description,
        employment_type: data.employment_type,
        requirements: data.requirements,
        benefits: data.benefits,
        salary_min: data.salary_min ?? null,
        salary_max: data.salary_max ?? null,
        status: data.status,
        published_at: data.status === 'published' ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) {
      return handleDatabaseError(error, 'JOBS', 'create job');
    }

    return NextResponse.json({ success: true, job });
  } catch (error) {
    return handleApiError(error, 'JOBS');
  }
}
