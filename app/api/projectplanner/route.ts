import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, getClientIP, RATE_LIMIT_CONFIGS } from '@/lib/rate-limit';

const projectplannerSchema = z.object({
  // Project details
  projectType: z.string().min(1, 'Project type is required'),
  clientType: z.string().min(1, 'Client type is required'),
  scope: z.string().min(1, 'Scope is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  location: z.string().min(1, 'Location is required'),
  // Contact details
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
  company: z.string().optional(),
});

// Human-readable labels for form values
const labels: Record<string, Record<string, string>> = {
  projectType: {
    nieuwbouw: 'Nieuwbouw',
    renovatie: 'Renovatie',
    erfgoed: 'Erfgoed',
    onderhoud: 'Onderhoud',
  },
  clientType: {
    particulier: 'Particulier',
    bedrijf: 'Bedrijf',
    overheid: 'Overheid',
    ontwikkelaar: 'Ontwikkelaar',
  },
  scope: {
    small: '< €100K',
    medium: '€100K – €500K',
    large: '€500K – €2M',
    enterprise: '> €2M',
    unknown: 'Nog onbekend',
  },
  timeline: {
    urgent: 'Direct',
    soon: '1-3 maanden',
    planned: '3-6 maanden',
    future: 'Later',
  },
  location: {
    'oost-vlaanderen': 'Oost-Vlaanderen',
    'west-vlaanderen': 'West-Vlaanderen',
    antwerpen: 'Antwerpen',
    'vlaams-brabant': 'Vlaams-Brabant',
    limburg: 'Limburg',
    brussel: 'Brussel',
    andere: 'Andere',
  },
};

function getLabel(field: string, value: string): string {
  return labels[field]?.[value] || value;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request.headers);
    const rateLimitKey = `projectplanner:${clientIP}`;
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMIT_CONFIGS.form);

    if (!rateLimit.allowed) {
      console.warn(`[PROJECTPLANNER] Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        { success: false, error: 'Te veel verzoeken. Probeer het later opnieuw.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(rateLimit.resetAt),
          },
        }
      );
    }

    const body = await request.json();
    const data = projectplannerSchema.parse(body);

    // Build structured message from form data
    const message = `
**Projectplanner Aanvraag**

**Project Details:**
- Type: ${getLabel('projectType', data.projectType)}
- Klant: ${getLabel('clientType', data.clientType)}
- Budget: ${getLabel('scope', data.scope)}
- Timeline: ${getLabel('timeline', data.timeline)}
- Locatie: ${getLabel('location', data.location)}

**Contact:**
- Naam: ${data.name}
- Email: ${data.email}
- Telefoon: ${data.phone}
${data.company ? `- Bedrijf: ${data.company}` : ''}
`.trim();

    // Map scope to budget_band
    const budgetBandMap: Record<string, string> = {
      small: '<100K',
      medium: '100K-500K',
      large: '500K-2M',
      enterprise: '>2M',
      unknown: 'unknown',
    };

    const supabase = await createClient();

    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        lead_type: 'project',
        contact_name: data.name,
        contact_email: data.email,
        contact_phone: data.phone,
        organisation: data.company || null,
        location: getLabel('location', data.location),
        budget_band: budgetBandMap[data.scope] || null,
        timing: getLabel('timeline', data.timeline),
        message: message,
        source: 'projectplanner',
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      console.error('[PROJECTPLANNER] Lead creation error:', error);
      // Return success anyway to not block user - log for debugging
      return NextResponse.json({
        success: true,
        message: 'Aanvraag ontvangen',
        lead: null,
      });
    }

    console.log('[PROJECTPLANNER] Lead created:', lead.id);

    return NextResponse.json({
      success: true,
      message: 'Aanvraag succesvol verzonden',
      lead: { id: lead.id },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error('[PROJECTPLANNER] API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
