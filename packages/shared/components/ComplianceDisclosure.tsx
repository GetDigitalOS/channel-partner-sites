import React from 'react';

interface ComplianceDisclosureProps {
  variant?: 'full' | 'compact';
  className?: string;
}

export function ComplianceDisclosure({ variant = 'full', className = '' }: ComplianceDisclosureProps) {
  if (variant === 'compact') {
    return (
      <div className={`text-xs text-muted-foreground leading-relaxed ${className}`}>
        <p>
          *A Home Equity Investment (HEI) is not a loan. HomeWealthIQ provides a lump-sum
          payment in exchange for a share of your home&apos;s future appreciation. A lien is placed on
          the property. Repayment is triggered by sale, refinance, or at the end of the contract term.
        </p>
      </div>
    );
  }

  return (
    <div className={`border border-border rounded-lg p-6 bg-card ${className}`}>
      <h3 className="text-sm font-semibold text-foreground mb-3">Important Disclosures</h3>
      <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
        <p>
          <strong className="text-foreground">*Payment Structure:</strong> A Home Equity Investment
          (HEI) is not a loan. There are no monthly payments. HomeWealthIQ provides a lump-sum
          payment in exchange for a share of your home&apos;s future appreciation.
        </p>
        <p>
          <strong className="text-foreground">Lien Disclosure:</strong> An HEI agreement results in
          a lien being placed on the property, which remains in effect for the duration of the
          contract term.
        </p>
        <p>
          <strong className="text-foreground">Repayment Trigger:</strong> The investment is settled
          upon sale of the property, refinance, or at the end of the agreed contract term
          (typically 10–30 years). The homeowner repays the original investment amount plus the
          investor&apos;s share of any appreciation.
        </p>
        <p>
          <strong className="text-foreground">Worked Example:</strong> If a homeowner receives
          $50,000 on a $500,000 home with a 20% equity share, and the home appreciates to $600,000,
          the settlement amount would be $50,000 + 20% of $100,000 appreciation = $70,000.
          If the home does not appreciate, the homeowner repays only the original $50,000.
        </p>
      </div>
    </div>
  );
}
