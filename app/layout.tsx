import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", weight: ["400", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Cuba Car Wash | Detailing Premium — Las Vegas",
  description: "Detailing profesional de alto nivel en Las Vegas. Lavado, pulido, paint correction y protección cerámica. @cuba_car_wash__",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${interTight.variable} font-sans bg-[#0A0A0A] text-white`}>
        {children}
      </body>
    </html>
  );
}
