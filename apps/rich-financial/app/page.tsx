import {
  ComplianceDisclosure,
  IntegrationOptions,
  HEIExplainer,
  DemoPortalCTA,
  Footer,
} from '@channel-partner-sites/shared';

export default function RichFinancialEnrollmentPage() {
  const demoPortalUrl = process.env.NEXT_PUBLIC_DEMO_PORTAL_URL || '';
  const docusignUrl = process.env.NEXT_PUBLIC_DOCUSIGN_ENROLLMENT_URL || '#';
  const embedUrl = process.env.NEXT_PUBLIC_HOMEWEALTHIQ_API_URL
    ? `${process.env.NEXT_PUBLIC_HOMEWEALTHIQ_API_URL}/embed/prequalify`
    : '';

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <div className="inline-block bg-info/10 text-info border border-info/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Financial Professionals
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-serif">
            Unlock Home Equity for Your Clients
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Give your clients access to their home equity without monthly payments or
            interest. A powerful tool for financial advisors, mortgage professionals, and
            estate planners. Earn referral compensation on every funded deal.
          </p>
          <a
            href={docusignUrl}
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Become a Partner
          </a>
          <p className="text-xs text-muted-foreground mt-3">
            Free to join. No volume requirements. Start referring in under 24 hours.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <HEIExplainer />
      </section>

      {/* Integration Options */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <IntegrationOptions embedUrl={embedUrl} />
        </div>
      </section>

      {/* Demo Portal */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="max-w-lg mx-auto">
          <DemoPortalCTA
            demoUrl={demoPortalUrl}
            brandParam="financial"
            industryTrack="financial"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card border-y border-border">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-6">
            Sign the partnership agreement and your portal is live within hours.
            Total partner setup time: under 10 minutes.
          </p>
          <a
            href={docusignUrl}
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Sign Partnership Agreement
          </a>
        </div>
      </section>

      {/* Compliance */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <ComplianceDisclosure variant="full" />
      </section>

      <Footer partnerName="Rich Keal — Financial Partners" />
    </div>
  );
}
