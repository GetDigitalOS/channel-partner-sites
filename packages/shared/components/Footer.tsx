import React from 'react';

interface FooterProps {
  partnerName?: string;
  className?: string;
}

export function Footer({ partnerName, className = '' }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={`border-t border-border bg-muted/30 ${className}`}>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground text-center sm:text-left">
            <p>
              Powered by{' '}
              <span className="font-semibold text-foreground">HomeWealthIQ</span>
            </p>
            <p className="mt-1">
              &copy; {year} HomeWealthIQ. All rights reserved.
              {partnerName && (
                <span> | Partner: {partnerName}</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="https://homewealthiq.com/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="https://homewealthiq.com/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-[10px] text-muted-foreground leading-relaxed text-center">
            A Home Equity Investment is not a loan. No monthly payments or interest.
            A lien is placed on the property for the contract term.
            Repayment is triggered by sale, refinance, or term expiration.
            All applications subject to eligibility requirements and property evaluation.
          </p>
        </div>
      </div>
    </footer>
  );
}
