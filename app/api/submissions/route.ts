import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { stegaClean } from 'next-sanity';

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'z7hlx5cz';
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-04-20';

async function createSubmissionInSanity(doc: Record<string, unknown>) {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    throw new Error('SANITY_API_WRITE_TOKEN is niet ingesteld');
  }

  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      mutations: [
        {
          create: doc,
        },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const error = new Error(
      `Sanity API error (${res.status}): ${JSON.stringify(body)}`
    );
    (error as any).statusCode = res.status;
    (error as any).response = { status: res.status, body };
    throw error;
  }

  return res.json();
}

// Form input ends up in the notification e-mail, so escape it before it goes into the HTML
function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: Request) {
  let name = '';
  let email = '';
  let type = '';

  try {
    const body = await req.json();
    name = body.name || '';
    email = body.email || '';
    const message: string = body.message || '';
    // Titles taken from the site can carry invisible Visual Editing (stega) characters
    const eventTitle: string = stegaClean(body.eventTitle || '');
    const packageName: string = stegaClean(body.packageName || '');
    type = body.type || '';

    if (!name || !email) {
      return NextResponse.json({ error: 'Naam en e-mail zijn verplicht' }, { status: 400 });
    }

    // Saving to Sanity and e-mailing are independent: as long as one of them works, the submission reaches us
    let sanityError = '';
    try {
      await createSubmissionInSanity({
        _type: 'submission',
        name,
        email,
        message,
        eventTitle,
        packageName,
        type,
        submittedAt: new Date().toISOString(),
      });
    } catch (error) {
      // The message includes Sanity's status code and response body
      sanityError = error instanceof Error ? error.message : String(error);
      console.error('Opslaan in Sanity mislukt - details:', {
        message: sanityError,
        name: name,
        email: email,
        type: type,
      });
    }

    // Send Email Notification
    let emailSent = false;
    try {
      if (!process.env.SMTP_HOST) {
        throw new Error('SMTP_HOST is niet ingesteld');
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE === 'false' ? false : true, // false for TLS (usually port 587), true for SSL (port 465)
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        // Fail fast instead of letting the request hang when the mail server is unreachable
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 15_000,
      });

      // Construct email content based on type
      let subject = `Nieuwe aanmelding: ${type}`;
      if (packageName) subject += ` - ${packageName}`;
      if (eventTitle) subject += ` - ${eventTitle}`;

      const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #047857;">Nieuwe Inzending: ${escapeHtml(type)}</h2>
          ${sanityError ? `
          <p style="margin-top: 20px; padding: 12px; background: #fef2f2; color: #991b1b; border-radius: 6px; font-size: 14px;">
            <strong>Let op:</strong> deze inzending kon niet in Sanity worden opgeslagen en staat alleen in deze e-mail.
            Controleer SANITY_API_WRITE_TOKEN in Vercel.<br>
            Foutmelding: ${escapeHtml(sanityError)}
          </p>` : ''}
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 30%;">Naam:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">E-mail:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
            </tr>
            ${packageName ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Pakket:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(packageName)}</td>
            </tr>` : ''}
            ${eventTitle ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Bijeenkomst:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(eventTitle)}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px; font-weight: bold; vertical-align: top;">Bericht:</td>
              <td style="padding: 10px;">${message ? escapeHtml(message).replace(/\n/g, '<br>') : '<em>Geen bericht opgegeven</em>'}</td>
            </tr>
          </table>
          <p style="margin-top: 30px; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 10px;">
            Dit is een automatisch gegenereerd bericht vanaf <a href="https://barakahconnect.nl">barakahconnect.nl</a>.${sanityError ? '' : ' Deze gegevens zijn tevens veilig opgeslagen in de Sanity database.'}
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: `Barakah Connect Website <${process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@barakahconnect.nl'}>`,
        to: 'info@barakahconnect.nl', // Ontvanger zoals gevraagd door de gebruiker
        replyTo: email, // Zodat je direct kan replyen op de inzender
        subject: subject,
        html: htmlContent,
      });
      emailSent = true;
      console.log('E-mail succesvol verzonden');
    } catch (emailError: any) {
      console.error('Kon notificatie-email niet versturen:', emailError);
    }

    // Only report an error to the visitor when the submission was neither stored nor e-mailed
    if (sanityError && !emailSent) {
      return NextResponse.json({ error: 'Er is een interne fout opgetreden bij het verzenden' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Submission error - details:', {
      message: error?.message || 'Onbekende fout',
      name: name,
      email: email,
      type: type,
    });
    return NextResponse.json({ error: 'Er is een interne fout opgetreden bij het verzenden' }, { status: 500 });
  }
}
