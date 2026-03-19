import React from 'react';

interface DemoPortalCTAProps {
  demoUrl: string;
  brandParam?: string;
  industryTrack: 'solar' | 'financial';
  className?: string;
}

export function DemoPortalCTA({
  demoUrl,
  brandParam,
  industryTrack,
  className = '',
}: DemoPortalCTAProps) {
  const href = brandParam ? `${demoUrl}?brand=${brandParam}` : demoUrl;

  return (
    <div className={`border border-border rounded-lg p-6 bg-card text-center ${className}`}>
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-6 h-6 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">See It In Action</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Preview the {industryTrack === 'solar' ? 'solar partner' : 'financial advisor'} portal
        experience your clients will use. Fully branded, compliance-approved, ready to go.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Preview Demo Portal
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}
