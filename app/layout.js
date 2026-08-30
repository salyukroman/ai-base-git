import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Роман Салюк | AI Automator",
  description: "Будую AI-агентів та автоматизації, які скорочують ручну роботу в бізнесі — від кваліфікації лідів до повної оркестрації складних процесів.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={inter.variable} suppressHydrationWarning>
      <body>
        <div className="noise-bg"></div>
        {children}
      </body>
    </html>
  );
}
