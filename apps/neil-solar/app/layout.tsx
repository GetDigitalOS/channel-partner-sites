import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Partner with HomeWealthIQ | Solar Industry',
  description:
    'Join the HomeWealthIQ channel partner network. Offer your solar customers access to home equity investments — no monthly payments, no interest. Earn referral compensation on every funded deal.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">
        {children}
      </body>
    </html>
  );
}
