import { NextResponse } from 'next/server';
import { client } from '@/sanity/client';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, type, eventTitle, packageName } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Naam en e-mail zijn verplicht' }, { status: 400 });
    }

    // Save to Sanity
    const doc = {
      _type: 'submission',
      name: name,
      email: email,
      message: message,
      eventTitle: eventTitle,
      packageName: packageName,
      type: type,
      submittedAt: new Date().toISOString(),
    };

    await client.create(doc);

    // Send Email Notification
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE === 'false' ? false : true, // false for TLS (usually port 587), true for SSL (port 465)
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Construct email content based on type
      let subject = `Nieuwe aanmelding: ${type}`;
      if (packageName) subject += ` - ${packageName}`;
      if (eventTitle) subject += ` - ${eventTitle}`;

      const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #047857;">Nieuwe Inzending: ${type}</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 30%;">Naam:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">E-mail:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${packageName ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Pakket:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${packageName}</td>
            </tr>` : ''}
            ${eventTitle ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Bijeenkomst:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${eventTitle}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px; font-weight: bold; vertical-align: top;">Bericht:</td>
              <td style="padding: 10px;">${message ? message.replace(/\n/g, '<br>') : '<em>Geen bericht opgegeven</em>'}</td>
            </tr>
          </table>
          <p style="margin-top: 30px; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 10px;">
            Dit is een automatisch gegenereerd bericht vanaf <a href="https://barakahconnect.nl">barakahconnect.nl</a>. Deze gegevens zijn tevens veilig opgeslagen in de Sanity database.
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
      console.log('E-mail succesvol verzonden');
    } catch (emailError: any) {
      console.error('Kon notificatie-email niet versturen, maar inzending is wel opgeslagen:', emailError);
      // We don't throw an error here, otherwise the user sees an error on the frontend 
      // even though their data reached the database correctly.
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Submission error:', error);
    return NextResponse.json({ error: 'Er is een interne fout opgetreden bij het verzenden' }, { status: 500 });
  }
}
