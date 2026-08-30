// Feeds the canonical URL, Open Graph tags, sitemap and robots.txt.
// NEXT_PUBLIC_SITE_URL overrides this (useful for staging/preview deploys).
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://onestopimagingcenter.com";

export const SITE_NAME = "One Stop Medical Imaging Center";

export const SITE_TITLE = "Ultrasound Services in Kutus, Kirinyaga | One Stop Medical Imaging Center";

export const SITE_DESCRIPTION =
  "One Stop Medical Imaging Center: accurate, affordable ultrasound in Kutus, Kirinyaga. Pregnancy scans, Doppler studies, abdominal imaging and more. Same-day reports. Call 0717 617 470.";

export const FAQS = [
  {
    q: "Do I need a doctor’s referral?",
    a: "No. You can walk in or call to book directly. If your doctor gave you a request form, bring it along so we can focus the scan on what they need to see.",
  },
  {
    q: "How should I prepare for my scan?",
    a: "For abdominal scans, fast 6–8 hours beforehand. For pelvic and pregnancy scans, arrive with a full bladder. For most other scans no preparation is needed — call us if you’re unsure.",
  },
  {
    q: "Is ultrasound safe during pregnancy?",
    a: "Yes. Ultrasound uses sound waves, not radiation. It is safe for you and your baby at every stage of pregnancy.",
  },
  {
    q: "How long does a scan take?",
    a: "Most scans take 15–30 minutes, including time to explain your results.",
  },
  {
    q: "When do I get my results?",
    a: "The same day. You leave with a clear report to take straight back to your doctor.",
  },
  {
    q: "Do you accept insurance?",
    a: "[Confirm with clinic] Please call 0717 617 470 and we’ll advise on your cover.",
  },
];
