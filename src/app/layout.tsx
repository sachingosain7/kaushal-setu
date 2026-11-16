import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kaushal Setu (कौशल सेतु) — AI Skill Intelligence Platform',
  description: 'AI-enabled competency intelligence and capacity building platform for India’s Official Statistical System (MoSPI / DIID). Smart India Hackathon 2026.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="jaali-pattern">
        {children}
      </body>
    </html>
  );
}
