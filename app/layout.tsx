import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import { FAQS, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "./site-config";

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
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "ultrasound Kutus",
    "ultrasound Kirinyaga",
    "pregnancy scan Kutus",
    "pregnancy ultrasound Kirinyaga",
    "Doppler scan Kenya",
    "abdominal ultrasound Kutus",
    "medical imaging Kirinyaga",
    "One Stop Medical Imaging Center",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/hero-photo.jpg",
        width: 2560,
        height: 1440,
        alt: "A caring sonographer performing an ultrasound scan at One Stop Medical Imaging Center in Kutus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/hero-photo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${SITE_URL}/#clinic`,
  name: SITE_NAME,
  slogan: "Your One Stop Ultrasound Center",
  url: SITE_URL,
  image: `${SITE_URL}/images/hero-photo.jpg`,
  logo: `${SITE_URL}/images/logo-mark.jpg`,
  telephone: ["+254717617470", "+254103441698"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kutus",
    addressRegion: "Kirinyaga",
    addressCountry: "KE",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "17:30",
  },
  medicalSpecialty: "Radiology",
  availableService: [
    "Pregnancy ultrasound",
    "Pelvic ultrasound",
    "Breast ultrasound",
    "Abdominal ultrasound",
    "Renal ultrasound",
    "Prostate ultrasound",
    "Doppler studies (venous, arterial, carotid)",
    "Thyroid ultrasound",
    "Cranial ultrasound",
  ].map((name) => ({ "@type": "MedicalTest", name })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.filter((f) => !f.a.startsWith("[")).map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${figtree.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
