import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import type { TicketUrgency } from '@/lib/supabase/types';
import { handleApiError, handleDatabaseError } from '@/lib/api';

const URGENCY_LEVELS: TicketUrgency[] = ['low', 'medium', 'high', 'critical'];

// SLA deadlines in hours based on urgency
const SLA_HOURS: Record<TicketUrgency, number> = {
  low: 72,      // 3 days
  medium: 24,   // 1 day
  high: 8,      // 8 hours
  critical: 4,  // 4 hours
};

const createTicketSchema = z.object({
  // Client info used for title generation
  client_name: z.string().min(1, 'Klantnaam is verplicht'),
  location: z.string().min(1, 'Locatie is verplicht'),
  description: z.string().min(1, 'Beschrijving is verplicht'),
  urgency: z.enum(URGENCY_LEVELS as [TicketUrgency, ...TicketUrgency[]]),
  // Reporter info (maps to reporter_* columns in DB)
  contact_name: z.string().min(1, 'Contactpersoon is verplicht'),
  contact_phone: z.string().optional(),
  contact_email: z.string().email('Ongeldig e-mailadres'),
});

// Generate ticket reference: FT-YYYY-XXXX
async function generateTicketReference(): Promise<string> {
  const year = new Date().getFullYear();
  const supabase = await createClient();

  // Get the count of tickets this year
  const { count } = await supabase
    .from('facility_tickets')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', `${year}-01-01`);

  const nextNumber = (count || 0) + 1;
  return `FT-${year}-${nextNumber.toString().padStart(4, '0')}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createTicketSchema.parse(body);

    const supabase = await createClient();

    // Generate reference
    const reference = await generateTicketReference();

    // Calculate SLA deadline
    const slaDeadline = new Date();
    slaDeadline.setHours(slaDeadline.getHours() + SLA_HOURS[data.urgency]);

    // Generate title from client name and location
    const title = `${data.client_name} - ${data.location}`;

    const { data: ticket, error } = await supabase
      .from('facility_tickets')
      .insert({
        reference,
        title,
        location: data.location,
        description: data.description,
        urgency: data.urgency,
        status: 'open',
        sla_due_at: slaDeadline.toISOString(),
        reporter_name: data.contact_name,
        reporter_email: data.contact_email,
        reporter_phone: data.contact_phone || null,
      })
      .select()
      .single();

    if (error) {
      return handleDatabaseError(error, 'FACILITY_TICKETS', 'create ticket');
    }

    console.log('[POST /api/facility-tickets] Ticket created:', ticket.reference);
    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    return handleApiError(error, 'FACILITY_TICKETS');
  }
}

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: tickets, error } = await supabase
      .from('facility_tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return handleDatabaseError(error, 'FACILITY_TICKETS', 'fetch tickets');
    }

    return NextResponse.json({ success: true, tickets });
  } catch (error) {
    return handleApiError(error, 'FACILITY_TICKETS');
  }
}
