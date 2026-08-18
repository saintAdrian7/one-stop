import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ultrasound Services in Kutus, Kirinyaga | One Stop Medical Imaging Center",
  description:
    "One Stop Medical Imaging Center: accurate, affordable ultrasound in Kutus, Kirinyaga. Pregnancy scans, Doppler studies, abdominal imaging and more. Same-day reports. Call 0717 617 470.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "One Stop Medical Imaging Center",
  slogan: "Your One Stop Ultrasound Center",
  telephone: ["+254717617470", "+254103441698"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kutus",
    addressRegion: "Kirinyaga",
    addressCountry: "KE",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    opens: "08:00",
    closes: "17:30",
  },
  medicalSpecialty: "Radiology",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${figtree.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
