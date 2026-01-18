/**
 * Email Service - Resend Integration
 *
 * Sends transactional emails for contact form submissions and job applications.
 * Gracefully handles missing RESEND_API_KEY by logging instead of sending.
 */

import { Resend } from 'resend';

// Initialize Resend client (will be null if no API key)
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@deraedt.be';
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'info@deraedt.be';

interface ContactNotificationData {
  naam: string;
  email: string;
  telefoon?: string;
  organisatie?: string;
  onderwerp: string;
  bericht: string;
  leadId?: string;
}

interface ApplicationConfirmationData {
  fullName: string;
  email: string;
  jobTitle: string;
  jobSlug: string;
  applicationId: string;
}

/**
 * Send notification email for new contact form submission
 */
export async function sendContactNotification(data: ContactNotificationData): Promise<boolean> {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Nieuw contactformulier</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #0C0C0C; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #0C0C0C; padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 2px;">DE RAEDT</h1>
  </div>

  <div style="padding: 30px; background: #FAF7F2;">
    <h2 style="color: #0C0C0C; margin-top: 0;">Nieuw Contactformulier</h2>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E5E5; width: 120px; color: #6B6560; font-size: 14px;">Naam</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E5E5; font-weight: 500;">${data.naam}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E5E5; color: #6B6560; font-size: 14px;">Email</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E5E5;">
          <a href="mailto:${data.email}" style="color: #9A6B4C;">${data.email}</a>
        </td>
      </tr>
      ${data.telefoon ? `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E5E5; color: #6B6560; font-size: 14px;">Telefoon</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E5E5;">
          <a href="tel:${data.telefoon}" style="color: #9A6B4C;">${data.telefoon}</a>
        </td>
      </tr>
      ` : ''}
      ${data.organisatie ? `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E5E5; color: #6B6560; font-size: 14px;">Organisatie</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E5E5;">${data.organisatie}</td>
      </tr>
      ` : ''}
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E5E5; color: #6B6560; font-size: 14px;">Onderwerp</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E5E5; font-weight: 500;">${data.onderwerp}</td>
      </tr>
    </table>

    <div style="margin-top: 20px; padding: 20px; background: white; border-left: 4px solid #9A6B4C;">
      <p style="margin: 0; color: #6B6560; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Bericht</p>
      <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${data.bericht}</p>
    </div>

    ${data.leadId ? `
    <p style="margin-top: 20px; font-size: 12px; color: #6B6560;">
      Lead ID: ${data.leadId}<br>
      <a href="https://deraedt-website.vercel.app/dashboard/leads/${data.leadId}" style="color: #9A6B4C;">Bekijk in dashboard</a>
    </p>
    ` : ''}
  </div>

  <div style="padding: 20px; text-align: center; font-size: 12px; color: #6B6560;">
    <p style="margin: 0;">Bouwwerken De Raedt Ivan NV</p>
    <p style="margin: 5px 0 0 0;">Deze email is automatisch gegenereerd.</p>
  </div>
</body>
</html>
`;

  if (!resend) {
    console.log('[EMAIL] No RESEND_API_KEY configured, logging email instead:', {
      to: NOTIFICATION_EMAIL,
      subject: `Nieuw contactformulier: ${data.onderwerp}`,
      from: data.naam,
      email: data.email,
    });
    return true; // Return true to not block form submission
  }

  try {
    const { error } = await resend.emails.send({
      from: `De Raedt Website <${FROM_EMAIL}>`,
      to: NOTIFICATION_EMAIL,
      replyTo: data.email,
      subject: `Nieuw contactformulier: ${data.onderwerp}`,
      html,
    });

    if (error) {
      console.error('[EMAIL] Failed to send contact notification:', error);
      return false;
    }

    console.log('[EMAIL] Contact notification sent to', NOTIFICATION_EMAIL);
    return true;
  } catch (err) {
    console.error('[EMAIL] Error sending contact notification:', err);
    return false;
  }
}

/**
 * Send confirmation email to job applicant
 */
export async function sendApplicationConfirmation(data: ApplicationConfirmationData): Promise<boolean> {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Sollicitatie ontvangen</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #0C0C0C; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #0C0C0C; padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 2px;">DE RAEDT</h1>
  </div>

  <div style="padding: 30px; background: #FAF7F2;">
    <h2 style="color: #0C0C0C; margin-top: 0;">Bedankt voor uw sollicitatie!</h2>

    <p>Beste ${data.fullName},</p>

    <p>
      Wij hebben uw sollicitatie voor de functie <strong>${data.jobTitle}</strong> goed ontvangen.
    </p>

    <div style="background: white; border: 1px solid #E5E5E5; padding: 20px; margin: 20px 0;">
      <p style="margin: 0; color: #6B6560; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Referentie</p>
      <p style="margin: 5px 0 0 0; font-family: monospace; font-size: 14px;">${data.applicationId.slice(0, 8).toUpperCase()}</p>
    </div>

    <h3 style="color: #0C0C0C; margin-top: 30px;">Wat nu?</h3>

    <ol style="padding-left: 20px;">
      <li style="margin-bottom: 10px;">Ons HR-team bekijkt uw sollicitatie binnen <strong>5 werkdagen</strong>.</li>
      <li style="margin-bottom: 10px;">Bij een positieve match nodigen wij u uit voor een kennismakingsgesprek.</li>
      <li style="margin-bottom: 10px;">U ontvangt in elk geval een reactie van ons.</li>
    </ol>

    <p style="margin-top: 30px;">
      Heeft u vragen? Contacteer ons gerust via <a href="mailto:hr@deraedt.be" style="color: #9A6B4C;">hr@deraedt.be</a>.
    </p>

    <p style="margin-top: 30px;">
      Met vriendelijke groeten,<br>
      <strong>Het HR-team van De Raedt</strong>
    </p>
  </div>

  <div style="padding: 20px; text-align: center; font-size: 12px; color: #6B6560;">
    <p style="margin: 0;">Bouwwerken De Raedt Ivan NV</p>
    <p style="margin: 5px 0 0 0;">
      <a href="https://deraedt-website.vercel.app/werken-bij" style="color: #9A6B4C;">Bekijk alle vacatures</a>
    </p>
    <p style="margin: 10px 0 0 0; font-size: 11px;">
      Uw gegevens worden bewaard conform ons privacybeleid (max. 12 maanden).
    </p>
  </div>
</body>
</html>
`;

  if (!resend) {
    console.log('[EMAIL] No RESEND_API_KEY configured, logging email instead:', {
      to: data.email,
      subject: `Sollicitatie ontvangen - ${data.jobTitle}`,
      applicant: data.fullName,
    });
    return true; // Return true to not block form submission
  }

  try {
    const { error } = await resend.emails.send({
      from: `De Raedt HR <${FROM_EMAIL}>`,
      to: data.email,
      subject: `Sollicitatie ontvangen - ${data.jobTitle}`,
      html,
    });

    if (error) {
      console.error('[EMAIL] Failed to send application confirmation:', error);
      return false;
    }

    console.log('[EMAIL] Application confirmation sent to', data.email);
    return true;
  } catch (err) {
    console.error('[EMAIL] Error sending application confirmation:', err);
    return false;
  }
}

/**
 * Send internal notification for new job application
 */
export async function sendApplicationNotification(data: ApplicationConfirmationData & { phone?: string; cvUrl?: string }): Promise<boolean> {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Nieuwe sollicitatie</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #0C0C0C; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #0C0C0C; padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 2px;">DE RAEDT</h1>
  </div>

  <div style="padding: 30px; background: #FAF7F2;">
    <h2 style="color: #0C0C0C; margin-top: 0;">Nieuwe Sollicitatie</h2>

    <div style="background: #9A6B4C; color: white; padding: 15px 20px; margin-bottom: 20px;">
      <p style="margin: 0; font-size: 14px;">Functie</p>
      <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: 600;">${data.jobTitle}</p>
    </div>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E5E5; width: 120px; color: #6B6560; font-size: 14px;">Naam</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E5E5; font-weight: 500;">${data.fullName}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E5E5; color: #6B6560; font-size: 14px;">Email</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E5E5;">
          <a href="mailto:${data.email}" style="color: #9A6B4C;">${data.email}</a>
        </td>
      </tr>
      ${data.phone ? `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E5E5; color: #6B6560; font-size: 14px;">Telefoon</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E5E5;">
          <a href="tel:${data.phone}" style="color: #9A6B4C;">${data.phone}</a>
        </td>
      </tr>
      ` : ''}
    </table>

    ${data.cvUrl ? `
    <div style="margin-top: 20px;">
      <a href="${data.cvUrl}" style="display: inline-block; background: #0C0C0C; color: white; padding: 12px 24px; text-decoration: none; font-size: 14px;">
        Download CV
      </a>
    </div>
    ` : ''}

    <p style="margin-top: 20px; font-size: 12px; color: #6B6560;">
      Application ID: ${data.applicationId}<br>
      <a href="https://deraedt-website.vercel.app/dashboard/recruitment" style="color: #9A6B4C;">Bekijk in dashboard</a>
    </p>
  </div>

  <div style="padding: 20px; text-align: center; font-size: 12px; color: #6B6560;">
    <p style="margin: 0;">Deze email is automatisch gegenereerd.</p>
  </div>
</body>
</html>
`;

  const HR_EMAIL = process.env.HR_EMAIL || 'hr@deraedt.be';

  if (!resend) {
    console.log('[EMAIL] No RESEND_API_KEY configured, logging email instead:', {
      to: HR_EMAIL,
      subject: `Nieuwe sollicitatie: ${data.jobTitle} - ${data.fullName}`,
    });
    return true;
  }

  try {
    const { error } = await resend.emails.send({
      from: `De Raedt Website <${FROM_EMAIL}>`,
      to: HR_EMAIL,
      replyTo: data.email,
      subject: `Nieuwe sollicitatie: ${data.jobTitle} - ${data.fullName}`,
      html,
    });

    if (error) {
      console.error('[EMAIL] Failed to send application notification:', error);
      return false;
    }

    console.log('[EMAIL] Application notification sent to', HR_EMAIL);
    return true;
  } catch (err) {
    console.error('[EMAIL] Error sending application notification:', err);
    return false;
  }
}
