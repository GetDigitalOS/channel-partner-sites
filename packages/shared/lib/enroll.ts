export interface EnrollmentRequest {
  partnerName: string;
  companyName: string;
  email: string;
  phone: string;
  domain: string;
  portalOption: 'A' | 'B';
  industryTrack: 'solar' | 'financial';
  bdPartnerId: string;
  docusignEnvelopeId?: string;
}

export interface EnrollmentResponse {
  success: boolean;
  partnerId?: string;
  temporaryPortalUrl?: string;
  welcomeEmailSent?: boolean;
  error?: string;
}

/**
 * Calls HomeWealthIQ-OS API to enroll a new channel partner.
 * Called from the app's API route (server-side only) — never from the client.
 */
export async function enrollPartner(
  apiBaseUrl: string,
  apiKey: string,
  data: EnrollmentRequest
): Promise<EnrollmentResponse> {
  const response = await fetch(`${apiBaseUrl}/api/channel-partners/enroll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    return {
      success: false,
      error: `Enrollment failed: ${response.status} ${errorBody}`,
    };
  }

  return response.json();
}
