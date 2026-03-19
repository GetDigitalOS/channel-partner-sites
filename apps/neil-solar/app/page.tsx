import {
  ComplianceDisclosure,
  IntegrationOptions,
  DemoPortalCTA,
  Footer,
} from '@channel-partner-sites/shared';

const PAIN_POINTS = [
  'Customer qualifies for solar but not the loan',
  'Customer won\u2019t add $150\u2013$300/mo to their bills',
  'System too large for standard financing caps',
  'Self-employed income doesn\u2019t pencil for DTI',
];

const WHAT_THEY_GET = [
  {
    title: 'Co-branded landing page',
    detail: 'Full page at your domain \u2014 your logo, colors, messaging. Looks like a product you built.',
    tag: 'Option A',
  },
  {
    title: 'Branded application portal',
    detail: 'Just the homeowner application flow at your domain. Cleaner, faster to set up.',
    tag: 'Option B',
  },
  {
    title: 'Referral tracking dashboard',
    detail: 'Every application your customers submit, tracked in real time under your account.',
    tag: 'Both',
  },
  {
    title: 'Partner leave-behind materials',
    detail: 'One-pager your reps can hand to customers on-site or email after a quote.',
    tag: 'Both',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    text: 'Homeowner applies through your branded page or portal',
  },
  {
    step: '02',
    text: 'HomeWealthIQ qualifies based on home equity \u2014 not credit score or DTI',
  },
  {
    step: '03',
    text: 'Funds released to complete the installation',
  },
  {
    step: '04',
    text: 'No monthly payments during the term. Repayment at sale, refi, or term end.*',
  },
];

const FUNNEL_POSITIONS = [
  {
    label: 'Top of Funnel',
    title: 'Add HEI to your marketing',
    description:
      'Put a "No Monthly Payment" financing option on your website and in your sales materials. Leads who would never click "apply for a loan" will click this.',
  },
  {
    label: 'Middle / Bottom of Funnel',
    title: 'Save the deal when financing is the obstacle',
    description:
      'Customer is sold on solar but can\u2019t stomach the monthly payment or doesn\u2019t qualify for the loan. HEI is the financing option that closes the deal.',
  },
  {
    label: 'Existing Client Base',
    title: 'Re-engage customers who couldn\u2019t get approved',
    description:
      'Go back to every homeowner who wanted solar but got declined by your lender. If they have equity, they have an option now.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'What exactly is a Home Equity Investment?',
    a: 'An HEI gives the homeowner a lump sum in exchange for a share of their home\u2019s future appreciation. There are no monthly payments and no interest rate. It\u2019s not a loan \u2014 it\u2019s an investment in the property. Repayment happens when the home is sold, refinanced, or at the end of the contract term (typically 10\u201330 years). A lien is recorded on the property for the duration.*',
  },
  {
    q: 'What does the partner setup process look like?',
    a: 'You sign one DocuSign agreement. Your branded portal is live within hours \u2014 automated, no manual handoff. You get a welcome email with your portal URL, referral link, dashboard login, and DNS setup instructions. Total hands-on time: under 10 minutes.',
  },
  {
    q: 'What are the compliance requirements?',
    a: 'All compliance language is built into both portal options automatically. You don\u2019t write or approve disclosures \u2014 they\u2019re standardized and pre-populated. Payment asterisks, lien language, repayment triggers, and worked examples are included in every homeowner-facing page.',
  },
  {
    q: 'How do I get paid?',
    a: 'You earn a percentage of the funded amount on every deal that closes through your referral link or portal. Compensation is tracked in your partner dashboard and paid on a regular schedule. No volume requirements or minimums.',
  },
  {
    q: 'Can I recruit other partners to share in the compensation?',
    a: 'Yes. You can sub-recruit other centers of influence \u2014 realtors, contractors, financial advisors \u2014 who refer homeowners through your network. Sub-partner activity is tracked in your dashboard. Compensation splits come from the available pool, not additional cost to the homeowner.',
  },
  {
    q: 'What happens after the homeowner applies?',
    a: 'HomeWealthIQ handles everything: qualification, underwriting, compliance review, offer generation, and closing. You track status in your dashboard. The homeowner receives updates directly. You don\u2019t need to manage the process \u2014 just make the introduction.',
  },
  {
    q: 'How is this different from a HELOC or home equity loan?',
    a: 'A HELOC or home equity loan adds a monthly payment and requires debt-to-income qualification. An HEI has no monthly payments during the term, doesn\u2019t rely on DTI for qualification, and is based on the home\u2019s equity position. For solar customers who can\u2019t or won\u2019t take on more debt, this fills a gap that traditional products can\u2019t.',
  },
];

export default function NeilSolarEnrollmentPage() {
  const demoPortalUrl = process.env.NEXT_PUBLIC_DEMO_PORTAL_URL || '';
  const docusignUrl = process.env.NEXT_PUBLIC_DOCUSIGN_ENROLLMENT_URL || '#';
  const embedUrl = process.env.NEXT_PUBLIC_HOMEWEALTHIQ_API_URL
    ? `${process.env.NEXT_PUBLIC_HOMEWEALTHIQ_API_URL}/embed/prequalify`
    : '';

  return (
    <div className="min-h-screen">

      {/* ═══════════════════════════════════════════════════════════
          HERO — Dark background, amber accents
          ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: 'hsl(var(--hero-bg))' }}
      >
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-6 py-16 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            {/* Headline block */}
            <div className="flex-1 max-w-xl">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-primary text-[10px] font-bold uppercase tracking-[3px]">
                  HomeWealthIQ Channel Partner Program
                </span>
              </div>

              <h1
                className="text-2xl sm:text-3xl lg:text-[32px] font-normal italic leading-snug font-serif"
                style={{ color: 'hsl(var(--hero-fg))' }}
              >
                Close the solar deals your financing is leaving on the table.
              </h1>

              <p
                className="mt-4 text-sm leading-relaxed max-w-md"
                style={{ color: 'hsl(var(--hero-muted))' }}
              >
                A deferred-payment home equity option for customers who won&apos;t take a
                monthly payment &mdash; co-branded to your company, live on your domain,
                nothing to build.
              </p>
            </div>

            {/* Introduced-by card */}
            <div className="bg-warning/20 rounded-lg px-5 py-4 flex-shrink-0">
              <div className="text-[9px] font-bold uppercase tracking-[2px] text-primary mb-1.5">
                Introduced by
              </div>
              <div className="text-sm font-bold text-foreground">Neil Okun</div>
              <div
                className="text-[11px] mt-0.5"
                style={{ color: 'hsl(var(--hero-muted))' }}
              >
                HomeWealthIQ Partner
              </div>
            </div>
          </div>

          {/* Stat strip */}
          <div
            className="mt-8 rounded-lg grid grid-cols-1 sm:grid-cols-3 overflow-hidden"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          >
            {[
              { value: '$0', label: 'Monthly payments during term*' },
              { value: 'Equity', label: 'Based approval \u2014 not credit score' },
              { value: 'Zero', label: 'Setup cost for the partner' },
            ].map((stat, i) => (
              <div
                key={i}
                className={`px-5 py-4 ${i < 2 ? 'sm:border-r' : ''}`}
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="text-xl font-normal italic font-serif text-primary">
                  {stat.value}
                </div>
                <div
                  className="text-[10px] mt-1 leading-relaxed"
                  style={{ color: 'hsl(var(--hero-muted))' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Hero CTA */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={docusignUrl}
              className="inline-flex items-center rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Become a Partner &rarr;
            </a>
            <span
              className="text-[11px]"
              style={{ color: 'hsl(var(--hero-muted))' }}
            >
              One DocuSign. Portal live same day. DNS in under 10 minutes.
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FUNNEL POSITIONS — Where HEI fits in their sales process
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-[10px] font-bold uppercase tracking-[3px] text-muted-foreground mb-4">
          Where this fits in your sales process
        </p>
        <h2 className="text-xl font-bold text-foreground mb-8">
          Three ways to use Home Equity Investment in your business
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FUNNEL_POSITIONS.map((pos) => (
            <div key={pos.label} className="border border-border rounded-lg p-5 bg-card">
              <span className="inline-block text-[9px] font-bold uppercase tracking-[2px] text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full mb-3">
                {pos.label}
              </span>
              <h3 className="text-sm font-semibold text-foreground mb-2">{pos.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{pos.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PAIN POINTS + WHAT THEY GET — Two column
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Pain points */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[3px] text-muted-foreground mb-5">
                The gap you&apos;re sitting on
              </p>
              <div className="space-y-3">
                {PAIN_POINTS.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-destructive text-xs font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span className="text-sm text-foreground leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What they get */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[3px] text-muted-foreground mb-5">
                What you get when you sign
              </p>
              <div className="space-y-4">
                {WHAT_THEY_GET.map((item, i) => {
                  const tagClass =
                    item.tag === 'Option A'
                      ? 'bg-success/10 text-success border-success/30'
                      : item.tag === 'Option B'
                        ? 'bg-info/10 text-info border-info/30'
                        : 'bg-muted text-muted-foreground border-border';
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap mt-0.5 flex-shrink-0 ${tagClass}`}>
                        {item.tag}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS — 4 step horizontal flow
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-[10px] font-bold uppercase tracking-[3px] text-muted-foreground mb-5">
          How it works for your customers
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOW_IT_WORKS.map((item, i) => (
            <div key={i} className="relative">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center mb-2 ${
                  i === 0 ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`text-[10px] font-bold ${
                    i === 0 ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {item.step}
                </span>
              </div>
              <p className="text-[11px] text-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        {/* Inline compliance for asterisk */}
        <div className="mt-6 bg-warning/10 border border-warning/30 rounded-lg px-4 py-3">
          <p className="text-[10px] text-foreground leading-relaxed">
            <strong>Important:</strong> *No monthly payments during the agreement term.
            Repayment is due upon home sale, refinance, or at term end (typically 10 years).
            A lien is recorded on the property. Total repayment depends on home appreciation.
            Not a loan. See full disclosures below.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          INTEGRATION OPTIONS — Shared component
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <IntegrationOptions embedUrl={embedUrl} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          COMPENSATION — What partners earn
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-[10px] font-bold uppercase tracking-[3px] text-muted-foreground mb-4">
          Partner compensation
        </p>
        <h2 className="text-xl font-bold text-foreground mb-6">
          Earn on every deal. Build a network for more.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-border rounded-lg p-5 bg-card">
            <h3 className="text-sm font-semibold text-foreground mb-2">Direct Referral Compensation</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When a homeowner you refer gets funded, you earn a percentage of the funded
              amount. Compensation is tracked automatically in your partner dashboard and
              paid on a regular schedule. No volume minimums. No caps.
            </p>
          </div>
          <div className="border border-border rounded-lg p-5 bg-card">
            <h3 className="text-sm font-semibold text-foreground mb-2">Sub-Partner Recruitment</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Recruit other professionals in your network &mdash; realtors, contractors,
              financial advisors &mdash; as sub-partners. When their referrals fund, a
              portion of the available compensation is attributed to your account. Activity
              is tracked in your dashboard.
            </p>
          </div>
        </div>
        <p className="mt-4 text-[10px] text-muted-foreground leading-relaxed">
          Compensation is a percentage of the funded investment amount. Exact percentages
          are specified in the partnership agreement. No earnings projections or income
          guarantees are made. Past partner outcomes are not indicative of future results.
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SOCIAL PROOF — Barastone track record
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[3px] text-muted-foreground mb-4">
            Built on a decade of experience
          </p>
          <h2 className="text-xl font-bold text-foreground mb-8">
            Backed by Barastone&apos;s 10+ Year Track Record
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            <div className="border border-border rounded-lg p-5 bg-card">
              <div className="text-2xl font-normal italic font-serif text-primary mb-1">10+</div>
              <p className="text-xs text-muted-foreground">Years in home equity investment</p>
            </div>
            <div className="border border-border rounded-lg p-5 bg-card">
              <div className="text-2xl font-normal italic font-serif text-primary mb-1">Hundreds</div>
              <p className="text-xs text-muted-foreground">Of millions deployed</p>
            </div>
            <div className="border border-border rounded-lg p-5 bg-card">
              <div className="text-2xl font-normal italic font-serif text-primary mb-1">Full</div>
              <p className="text-xs text-muted-foreground">In-house origination &amp; servicing</p>
            </div>
          </div>
          <p className="mt-6 text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
            HomeWealthIQ is powered by Barastone, a vertically integrated home equity
            investment platform. We handle qualification, underwriting, compliance, closing,
            and servicing. Partners focus on introductions &mdash; we handle everything else.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          DEMO PORTAL CTA — Shared component
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="max-w-lg mx-auto">
          <DemoPortalCTA
            demoUrl={demoPortalUrl}
            brandParam="solar"
            industryTrack="solar"
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FAQ — 7 questions, solar-specific
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-sm font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FINAL CTA — DocuSign conversion
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-card border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3 font-serif">
            Ready to close more solar deals?
          </h2>
          <p className="text-muted-foreground mb-6 text-sm max-w-lg mx-auto">
            Sign the partnership agreement and your branded portal is live within hours.
            One DocuSign. Total partner setup time: under 10 minutes.
          </p>
          <a
            href={docusignUrl}
            className="inline-flex items-center rounded-lg bg-primary px-8 py-3 text-base font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Become a Partner &rarr;
          </a>
          <p className="text-xs text-muted-foreground mt-3">
            Free to join. No volume requirements. No setup cost.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          COMPLIANCE DISCLOSURE — Full, non-negotiable
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <ComplianceDisclosure variant="full" />
      </section>

      <Footer partnerName="Neil Okun \u2014 Solar Partners" />
    </div>
  );
}
