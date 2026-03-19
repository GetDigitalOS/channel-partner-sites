import { NextResponse } from 'next/server';
import { enrollPartner, type EnrollmentRequest } from '@channel-partner-sites/shared/lib/enroll';

export async function POST(request: Request) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_HOMEWEALTHIQ_API_URL;
  const apiKey = process.env.HOMEWEALTHIQ_API_KEY;

  if (!apiBaseUrl || !apiKey) {
    return NextResponse.json(
      { error: 'API configuration missing' },
      { status: 500 }
    );
  }

  let body: Partial<EnrollmentRequest>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const { partnerName, companyName, email, phone, domain, portalOption, docusignEnvelopeId } = body;

  if (!partnerName || !companyName || !email || !domain || !portalOption) {
    return NextResponse.json(
      { error: 'Missing required fields: partnerName, companyName, email, domain, portalOption' },
      { status: 400 }
    );
  }

  const enrollmentData: EnrollmentRequest = {
    partnerName,
    companyName,
    email,
    phone: phone || '',
    domain,
    portalOption,
    industryTrack: 'financial',
    bdPartnerId: process.env.NEXT_PUBLIC_BD_PARTNER_ID || 'rich-keal',
    docusignEnvelopeId,
  };

  const result = await enrollPartner(apiBaseUrl, apiKey, enrollmentData);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error || 'Enrollment failed' },
      { status: 502 }
    );
  }

  return NextResponse.json(result);
}
