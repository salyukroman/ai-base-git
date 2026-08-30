import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Roman Saliuk | AI Automator & No-Code Developer",
  description: "Будую автономні AI-системи та веб-додатки, які масштабують бізнес без лінійного зростання витрат. Інтеграція Notion, CRM та нейромереж.",
  openGraph: {
    title: "Roman Saliuk | Saliuk Automation",
    description: "Будую автономні AI-системи та веб-додатки, які масштабують бізнес без лінійного зростання витрат.",
    url: "https://www.saliukautomation.online",
    siteName: "Saliuk Automation",
    images: [
      {
        url: "https://www.saliukautomation.online/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Roman Saliuk - AI Automator",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roman Saliuk | Saliuk Automation",
    description: "Будую автономні AI-системи та веб-додатки, які масштабують бізнес без лінійного зростання витрат.",
    images: ["https://www.saliukautomation.online/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.saliukautomation.online",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={inter.variable} suppressHydrationWarning>
      <body>
        <div className="noise-bg"></div>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Roman Saliuk",
              "url": "https://www.saliukautomation.online",
              "jobTitle": "No-Code Developer & AI Automator",
              "worksFor": {
                "@type": "Organization",
                "name": "Saliuk Automation"
              },
              "sameAs": [
                "https://github.com/salyukroman",
                "https://linkedin.com/in/roman-saliuk"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
