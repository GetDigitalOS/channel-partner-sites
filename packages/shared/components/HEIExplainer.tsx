import React from 'react';

interface HEIExplainerProps {
  className?: string;
}

const STEPS = [
  {
    number: '1',
    title: 'Homeowner Applies',
    description:
      'Your client fills out a simple prequalification form. No credit pull, no commitment. Takes under 5 minutes.',
  },
  {
    number: '2',
    title: 'We Evaluate & Match',
    description:
      'HomeWealthIQ evaluates the property and homeowner, then matches them with the best investment program for their situation.',
  },
  {
    number: '3',
    title: 'Offer & Close',
    description:
      'The homeowner receives an offer with clear terms — no monthly payments, no interest rate. If they accept, we close and fund.',
  },
  {
    number: '4',
    title: 'You Get Paid',
    description:
      'When the deal funds, you earn your referral compensation. Track everything in your partner dashboard.',
  },
];

export function HEIExplainer({ className = '' }: HEIExplainerProps) {
  return (
    <div className={className}>
      <h2 className="text-xl font-bold text-foreground mb-2">How It Works</h2>
      <p className="text-sm text-muted-foreground mb-6">
        A Home Equity Investment lets homeowners access their equity without monthly payments
        or interest. Here&apos;s how the process works for your clients.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STEPS.map((step) => (
          <div key={step.number} className="border border-border rounded-lg p-5 bg-card">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <span className="text-sm font-bold text-primary">{step.number}</span>
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-2">{step.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
