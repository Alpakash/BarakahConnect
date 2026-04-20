import { NextResponse } from 'next/server';
import { client } from '@/sanity/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, type, eventTitle } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Naam en e-mail zijn verplicht' }, { status: 400 });
    }

    // Save to Sanity
    const doc = {
      _type: 'submission',
      name: body.name,
      email: body.email,
      message: body.message,
      eventTitle: body.eventTitle,
      packageName: body.packageName,
      type: body.type,
      submittedAt: new Date().toISOString(),
    };

    await client.create(doc);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Submission error:', error);
    return NextResponse.json({ error: 'Er is een interne fout opgetreden bij het verzenden' }, { status: 500 });
  }
}
