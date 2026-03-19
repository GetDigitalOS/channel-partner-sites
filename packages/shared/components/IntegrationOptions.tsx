import React from 'react';

interface IntegrationOptionsProps {
  embedUrl: string;
  className?: string;
}

export function IntegrationOptions({ embedUrl, className = '' }: IntegrationOptionsProps) {
  const options = [
    {
      id: 'embed',
      title: 'Embed on Your Website',
      description: 'Add a prequalification form directly to your existing site with a simple iframe snippet.',
      detail: 'Best for partners with an existing website who want seamless integration.',
      tag: 'Most Popular',
      tagColor: 'bg-success/10 text-success border-success/30',
    },
    {
      id: 'link',
      title: 'Personal Referral Link',
      description: 'Get a unique referral URL that tracks all applications back to your account.',
      detail: 'Share via email, text, social media, or in person. Works immediately.',
      tag: 'Fastest',
      tagColor: 'bg-info/10 text-info border-info/30',
    },
    {
      id: 'branded-a',
      title: 'Option A: Full Landing Page',
      description: 'Complete co-branded page with your logo, messaging, FAQ, and compliance language built in.',
      detail: 'URL format: hei.yourdomain.com — requires one DNS record.',
      tag: 'Recommended',
      tagColor: 'bg-warning/10 text-warning border-warning/30',
    },
    {
      id: 'branded-b',
      title: 'Option B: Application Portal Only',
      description: 'Branded application flow — minimal footprint, same tracking and compliance.',
      detail: 'URL format: applyhei.yourdomain.com — requires one DNS record.',
      tag: 'Lightweight',
      tagColor: 'bg-muted text-muted-foreground border-border',
    },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-xl font-bold text-foreground">Integration Options</h2>
      <p className="text-sm text-muted-foreground">
        Choose how you want to connect HomeWealthIQ to your business. All options include
        full application tracking and compliance-approved content.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            className="border border-border rounded-lg p-5 bg-card hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">{option.title}</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${option.tagColor}`}>
                {option.tag}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
            <p className="text-xs text-muted-foreground">{option.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
