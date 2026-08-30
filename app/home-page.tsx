"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CATS = [
  {
    name: "Pregnancy & Women’s Health",
    image: "/images/cat-pregnancy.jpg",
    alt: "Close-up of an ultrasound probe on a pregnant belly",
    items: [
      { name: "Pregnancy scan", desc: "monitor your baby’s growth and wellbeing at every stage" },
      { name: "Pelvic scan", desc: "uterus, ovaries and bladder for pain, bleeding or fertility concerns" },
      { name: "Breast scan", desc: "safe, radiation-free lump checks" },
    ],
  },
  {
    name: "Abdominal & General",
    image: "/images/cat-abdominal.jpg",
    alt: "A sonographer examining a patient's abdomen",
    items: [
      { name: "Abdomen scan", desc: "liver, gallbladder, pancreas, spleen and more" },
      { name: "Abdomen/Pelvic combined", desc: "both areas in one visit" },
      { name: "Renal scan", desc: "kidneys and bladder for stones and cysts" },
      { name: "KUB scan", desc: "kidneys, ureters and bladder in one focused scan" },
      { name: "Regional scan", desc: "any specific area your doctor requests" },
    ],
  },
  {
    name: "Men’s Health",
    image: "/images/cat-mens.jpg",
    alt: "A male patient in consultation with a clinician",
    items: [
      { name: "Prostate scan", desc: "enlargement and changes" },
      { name: "Scrotal scan", desc: "pain, swelling or lumps" },
    ],
  },
  {
    name: "Vascular (Doppler)",
    image: "/images/cat-vascular.jpg",
    alt: "A modern ultrasound machine in a clean exam room",
    items: [
      { name: "Doppler venous", desc: "clots and circulation" },
      { name: "Doppler arterial", desc: "arterial blood flow" },
      { name: "Carotid Doppler", desc: "the neck arteries supplying the brain" },
      { name: "Vein mapping", desc: "before dialysis access or varicose vein treatment" },
    ],
  },
  {
    name: "Head, Neck & Small Parts",
    image: "/images/cat-headneck.jpg",
    alt: "A clinician performing a thyroid ultrasound",
    items: [
      { name: "Thyroid scan", desc: "nodules, swelling or enlargement" },
      { name: "Neck scan", desc: "lumps and swollen glands" },
      { name: "Cranial scan", desc: "gentle infant brain scan" },
    ],
  },
];

const FAQS = [
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

const REVIEWS = [
  {
    quote: "The sonographer explained everything as she went, and I walked out with my report the same morning.",
    name: "Grace",
    place: "Kutus",
    initial: "G",
  },
  {
    quote: "I came in without an appointment and was seen within the hour. Kind, professional and affordable.",
    name: "Peter",
    place: "Kerugoya",
    initial: "P",
  },
  {
    quote: "They took time with my mother’s Doppler scan and made sure her doctor got a clear report.",
    name: "Wanjiru",
    place: "Kagio",
    initial: "W",
  },
];

const STEPS = [
  { title: "Call or walk in", desc: "Ring us or just stop by. Bring your doctor’s request form if you have one." },
  { title: "Quick preparation", desc: "We’ll tell you exactly how to get ready, whether that’s fasting or arriving with a full bladder." },
  { title: "Your scan", desc: "Gentle and painless. Most scans are done in 15–30 minutes." },
  { title: "Clear results", desc: "A clear, same-day report to carry straight back to your doctor." },
];

const WHY = [
  {
    title: "Experienced sonographers",
    desc: "Kind, steady hands, and plain answers to every question you ask.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="7.5" r="3.5" stroke="#C9A227" strokeWidth="1.5" />
        <path d="M4.5 18.5 C5.5 14.5 8 13 11 13 C14 13 16.5 14.5 17.5 18.5" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Modern machines",
    desc: "Sharp, detailed images your doctor can trust.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="16" height="11" rx="2" stroke="#C9A227" strokeWidth="1.5" />
        <path d="M8 19 H14" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Fast, clear reports",
    desc: "You’ll walk out knowing exactly what comes next.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="4.5" y="3" width="13" height="16" rx="2" stroke="#C9A227" strokeWidth="1.5" />
        <path d="M8 8 H14 M8 11.5 H14 M8 15 H11.5" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Private & comfortable",
    desc: "A calm, private room and a visit that’s never rushed.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="5" y="3" width="12" height="16" rx="1.5" stroke="#C9A227" strokeWidth="1.5" />
        <circle cx="14" cy="11" r="1.1" fill="#C9A227" />
      </svg>
    ),
  },
];

function LogoBadge({ size = 44 }: { size?: number }) {
  return (
    <span className="logo-badge" style={{ width: size, height: size }}>
      <Image src="/images/logo-mark.jpg" alt="One Stop Imaging logo" width={size} height={size} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </span>
  );
}

function Wordmark({ inverted = false }: { inverted?: boolean }) {
  const color = inverted ? "#FAF7F2" : "#0F5257";
  return (
    <span className="font-heading" style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
      <span style={{ fontWeight: 800, color, fontSize: 17, letterSpacing: "-0.01em" }}>ONE STOP</span>
      <span style={{ fontWeight: 700, color, fontSize: 9.5, letterSpacing: ".14em", opacity: 0.8 }}>MEDICAL IMAGING CENTER</span>
    </span>
  );
}

const EDUCATION = [
  { school: "Chaffey Community College", place: "California" },
  { school: "California State University, San Bernardino", place: "San Bernardino, California" },
  { school: "Modern Technology School", place: "Anaheim, California" },
];

const NAV_ITEMS = [
  { id: "services", label: "Services" },
  { id: "why", label: "Why Us" },
  { id: "owner", label: "About" },
  { id: "how", label: "How It Works" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openCat, setOpenCat] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [carIndex, setCarIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const catHover = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevCat = useRef(0);
  const carRef = useRef<HTMLDivElement>(null);
  const carPaused = useRef(false);
  const carResume = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dateRef.current) dateRef.current.min = new Date().toISOString().slice(0, 10);
  }, [submitted]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      setPastHero(window.scrollY > window.innerHeight * 0.85);
    };
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();
    onResize();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const f = document.getElementById("stepline-fill");
      if (f) f.style.transform = "none";
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const EASE = "expo.out";
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-word",
        { yPercent: 115, rotate: 3, transformOrigin: "left bottom" },
        { yPercent: 0, rotate: 0, duration: 1, ease: EASE, stagger: 0.14, delay: 0.15 }
      );
      gsap.from("[data-hero-in]", { y: 24, opacity: 0, duration: 0.8, ease: EASE, stagger: 0.11, delay: 0.55 });
      gsap.fromTo(
        "[data-hero-img]",
        { scale: 1.06, clipPath: "inset(0 0 0 8%)" },
        { scale: 1, clipPath: "inset(0 0 0 0%)", duration: 1.5, ease: "power3.out", delay: 0.2 }
      );
      const REPLAY = "play reverse play reverse";
      gsap.from(".trust-cell", {
        y: 24, opacity: 0, duration: 0.75, ease: EASE, stagger: 0.1,
        scrollTrigger: { trigger: ".trust", start: "top 88%", toggleActions: REPLAY },
      });
      gsap.from(".trust-icon", {
        scale: 0.6, duration: 0.7, ease: "back.out(1.4)", stagger: 0.12,
        scrollTrigger: { trigger: ".trust", start: "top 88%", toggleActions: REPLAY },
      });
      gsap.utils.toArray<HTMLElement>(".gold-rule").forEach((el) => {
        gsap.from(el, {
          scaleX: 0, transformOrigin: "left center", duration: 0.7, ease: EASE,
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: REPLAY },
        });
      });
      gsap.from(".carousel figure", {
        opacity: 0, y: 20, duration: 0.7, ease: EASE, stagger: 0.1,
        scrollTrigger: { trigger: "#reviews", start: "top 80%", toggleActions: REPLAY },
      });
      gsap.from(".contact-card form > *", {
        y: 18, opacity: 0, duration: 0.6, ease: EASE, stagger: 0.07,
        scrollTrigger: { trigger: ".contact-card", start: "top 85%", toggleActions: REPLAY },
      });
      document.querySelectorAll("[data-anim]").forEach((el) => {
        gsap.from(el, { y: 26, opacity: 0, duration: 0.8, ease: EASE, scrollTrigger: { trigger: el, start: "top 87%", toggleActions: REPLAY } });
      });
      document.querySelectorAll("[data-stagger]").forEach((group) => {
        gsap.from(group.children, {
          y: 26, opacity: 0, duration: 0.75, ease: EASE, stagger: 0.09,
          scrollTrigger: { trigger: group, start: "top 85%", toggleActions: REPLAY },
        });
      });
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const n = parseInt(el.getAttribute("data-count")!, 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: n, duration: 1.4, ease: "power3.out",
          onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      const wrap = document.getElementById("steps-wrap");
      if (wrap) {
        const nodes = wrap.querySelectorAll(".step-node");
        gsap.set(nodes, { scale: 0.4, opacity: 0 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: wrap, start: "top 78%", toggleActions: "play reverse play reverse" } });
        tl.to("#stepline-fill", { scaleX: 1, duration: 1.8, ease: "power2.inOut" });
        nodes.forEach((nd, i) => {
          tl.to(nd, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.4)" }, 0.1 + i * 0.45);
          const text = nd.parentElement?.querySelectorAll(".step-title, .step-desc");
          if (text) tl.from(text, { opacity: 0, y: 12, duration: 0.5, ease: EASE }, 0.25 + i * 0.45);
        });
      }
    });
    const sonar = document.querySelector(".cta-sonar");
    let io: IntersectionObserver | undefined;
    if (sonar) {
      io = new IntersectionObserver(([entry]) => {
        sonar.classList.toggle("sonar-paused", !entry.isIntersecting);
      });
      io.observe(sonar);
    }
    return () => {
      ctx.revert();
      io?.disconnect();
    };
  }, []);

  const carStep = () => {
    const c = carRef.current;
    const card = c?.querySelector("figure");
    return card ? card.getBoundingClientRect().width + 24 : 424;
  };

  const pauseCarousel = () => {
    carPaused.current = true;
    if (carResume.current) clearTimeout(carResume.current);
    carResume.current = setTimeout(() => {
      carPaused.current = false;
    }, 10000);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const timer = setInterval(() => {
      if (carPaused.current || document.hidden) return;
      const c = carRef.current;
      if (!c) return;
      const atEnd = c.scrollLeft + c.clientWidth >= c.scrollWidth - 10;
      c.scrollTo({ left: atEnd ? 0 : c.scrollLeft + carStep(), behavior: "smooth" });
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  };

  const selectCat = (i: number) => {
    if (catHover.current) clearTimeout(catHover.current);
    prevCat.current = openCat;
    setOpenCat(i);
  };

  const hoverCat = (i: number) => {
    if (catHover.current) clearTimeout(catHover.current);
    catHover.current = setTimeout(() => selectCat(i), 140);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const carGo = (delta: number, abs?: number) => {
    const c = carRef.current;
    if (!c) return;
    const step = carStep();
    const left = abs !== undefined ? abs * step : c.scrollLeft + delta * step;
    c.scrollTo({ left, behavior: "smooth" });
  };

  const onCarScroll = () => {
    const c = carRef.current;
    if (!c) return;
    setCarIndex(Math.min(2, Math.round(c.scrollLeft / carStep())));
  };

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="site-header-inner">
          <a href="#top" className="brand" style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <LogoBadge />
            <Wordmark />
          </a>
          <nav className="site-nav">
            {NAV_ITEMS.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className="nav-link">
                {n.label}
              </a>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="tel:+254717617470" className="header-call-btn">
              Call 0717 617 470
            </a>
            <button
              className={`menu-btn${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu${menuOpen ? " open" : ""}`} inert={!menuOpen}>
        <nav style={{ display: "flex", flexDirection: "column" }}>
          {NAV_ITEMS.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className="mobile-menu-link" style={{ transitionDelay: menuOpen ? `${0.06 + i * 0.05}s` : "0s" }}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href="tel:+254717617470" className="btn-primary" style={{ textAlign: "center", marginTop: 28 }}>
          CALL TO BOOK
        </a>
      </div>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero-panel">
            <h1 className="hero-title">
              <span className="hero-word-mask">
                <span className="hero-word">Clear Scans.</span>
              </span>
              <span className="hero-word-mask">
                <span className="hero-word hero-word-accent">Caring Hands.</span>
              </span>
            </h1>
            <p data-hero-in style={{ margin: "0 0 36px 0", fontSize: 17, lineHeight: 1.6, color: "rgba(34,37,43,.7)", maxWidth: "40ch" }}>
              From your baby&rsquo;s first heartbeat to answers about a nagging pain, we offer gentle ultrasound care in Kutus,
              Kirinyaga, with results in your hands the same day. Walk in or call, and we&rsquo;ll take good care of you.
            </p>
            <div data-hero-in style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
              <a href="tel:+254717617470" className="btn-primary">
                CALL TO BOOK
              </a>
              <a href="#services" onClick={go("services")} className="link-underline">
                OUR SERVICES
              </a>
            </div>
          </div>
          <div className="hero-media">
            <div data-hero-img style={{ position: "absolute", inset: 0, filter: "saturate(.9)" }}>
              <Image
                src="/images/hero-photo.jpg"
                alt="A caring sonographer performing an ultrasound scan on a smiling patient"
                fill
                preload
                sizes="(max-width: 900px) 100vw, 58vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 80, background: "linear-gradient(90deg,#FAF7F2,rgba(250,247,242,0))", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, background: "#0F5257", opacity: 0.05, pointerEvents: "none" }} />
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="trust">
          <div className="trust-cell">
            <span className="trust-icon">
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M4 11 L11 4 L18 11 M6.5 9.5 V18 H15.5 V9.5" stroke="#0F5257" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <strong className="font-heading" style={{ fontWeight: 700, fontSize: 17, color: "#0F5257" }}>Walk-Ins Welcome</strong>
              <span style={{ fontSize: 14.5, color: "rgba(34,37,43,.7)", lineHeight: 1.5 }}>No booking needed. Come as you are and we&rsquo;ll see you today.</span>
            </div>
          </div>
          <div className="trust-cell">
            <span className="trust-icon">
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <rect x="4.5" y="3" width="13" height="16" rx="2" stroke="#0F5257" strokeWidth="1.5" />
                <path d="M8 8 H14 M8 11.5 H14 M8 15 H11.5" stroke="#0F5257" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <strong className="font-heading" style={{ fontWeight: 700, fontSize: 17, color: "#0F5257" }}>Same-Day Reports</strong>
              <span style={{ fontSize: 14.5, color: "rgba(34,37,43,.7)", lineHeight: 1.5 }}>You leave with a clear report in hand, ready for your doctor.</span>
            </div>
          </div>
          <div className="trust-cell">
            <span className="trust-icon">
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M11 19 C11 19 4.5 13.5 4.5 9 a6.5 6.5 0 1 1 13 0 C17.5 13.5 11 19 11 19 Z" stroke="#0F5257" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="11" cy="9" r="2.2" stroke="#0F5257" strokeWidth="1.5" />
              </svg>
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <strong className="font-heading" style={{ fontWeight: 700, fontSize: 17, color: "#0F5257" }}>Find Us in Kutus</strong>
              <span style={{ fontSize: 14.5, color: "rgba(34,37,43,.7)", lineHeight: 1.5 }}>
                Kutus, Kirinyaga. Call{" "}
                <a href="tel:+254717617470" style={{ fontWeight: 600 }}>
                  0717 617 470
                </a>
                .
              </span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={{ background: "rgba(15,82,87,.06)" }}>
          <div className="stats">
            <div data-anim className="stat-cell">
              <div className="stat-number">
                <span data-count="17">17</span>
                <span className="stat-unit">scans</span>
              </div>
              <p className="stat-caption">under one roof, no running across town</p>
            </div>
            <div data-anim className="stat-cell">
              <div className="stat-number">
                <span>
                  15&ndash;<span data-count="30">30</span>
                </span>
                <span className="stat-unit">min</span>
              </div>
              <p className="stat-caption">of gentle care is all most scans take</p>
            </div>
            <div data-anim className="stat-cell">
              <div className="stat-number">
                <span>8:00&ndash;5:30</span>
                <span className="stat-unit">pm</span>
              </div>
              <p className="stat-caption">open Monday to Saturday, walk in any time</p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="data-sec" style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 130px 24px", boxSizing: "border-box" }}>
          <h2 data-anim className="section-title" style={{ maxWidth: "22ch" }}>
            Our Services
          </h2>
          <div className="gold-rule" style={{ margin: "0 0 48px 0" }} />
          <div className="data-cols" style={{ display: "flex", gap: 64, alignItems: "flex-start" }}>
            <div data-anim style={{ flex: 1, minWidth: 0 }}>
              {CATS.map((c, i) => (
                <div key={c.name} className="cat-row">
                  <button
                    onClick={() => selectCat(i)}
                    onMouseEnter={() => hoverCat(i)}
                    onMouseLeave={() => { if (catHover.current) clearTimeout(catHover.current); }}
                    onFocus={() => selectCat(i)}
                    aria-expanded={openCat === i}
                    aria-controls={`cat-panel-${i}`}
                    className="cat-btn"
                  >
                    <span
                      className="cat-name"
                      style={{
                        color: openCat === i ? "#0F5257" : "rgba(15,82,87,.55)",
                        transform: openCat === i ? "translateX(8px)" : "translateX(0)",
                      }}
                    >
                      {c.name}
                    </span>
                    <span className="cat-count">{c.items.length} SCANS</span>
                  </button>
                  <div
                    id={`cat-panel-${i}`}
                    style={{
                      display: "grid",
                      gridTemplateRows: openCat === i ? "1fr" : "0fr",
                      transition: "grid-template-rows .6s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <div style={{ minHeight: 0, overflow: "hidden" }} inert={openCat !== i}>
                      <ul className={`cat-items${openCat === i ? " open" : ""}`}>
                        {c.items.map((it) => (
                          <li key={it.name} className="cat-item">
                            <span className="cat-dot" />
                            <span>
                              <strong style={{ color: "#0F5257" }}>{it.name}:</strong>{" "}
                              <span style={{ color: "rgba(34,37,43,.65)" }}>{it.desc}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div data-anim className="services-media">
              <div className="services-media-frame">
                {CATS.map((c, i) => (
                  <div
                    key={c.name}
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: openCat === i ? 1 : 0,
                      transform: openCat === i ? "scale(1)" : "scale(1.04)",
                      transition: "opacity .7s ease, transform 1.4s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <Image src={c.image} alt={c.alt} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                  </div>
                ))}
                <div style={{ position: "absolute", inset: 0, background: "#0F5257", opacity: 0.05, pointerEvents: "none" }} />
                <div
                  key={openCat}
                  className="font-heading cat-pill"
                  style={{
                    position: "absolute", left: 20, bottom: 20, background: "rgba(250,247,242,.95)", borderRadius: 999,
                    padding: "9px 20px", fontWeight: 700, fontSize: 13, letterSpacing: ".06em", color: "#0F5257", pointerEvents: "none",
                  }}
                >
                  {CATS[openCat].name}
                </div>
              </div>
            </div>
          </div>
          <p data-anim style={{ margin: "52px 0 0 0", fontSize: 18, fontWeight: 600, color: "#0F5257" }}>
            Not sure which scan you need?{" "}
            <a href="tel:+254717617470" className="services-help-link">
              Call us and we&rsquo;ll guide you.
            </a>
          </p>
        </section>

        {/* WHY US */}
        <section id="why" style={{ background: "#0F5257", color: "#FAF7F2" }}>
          <div className="data-sec" style={{ maxWidth: 1240, margin: "0 auto", padding: "130px 24px", boxSizing: "border-box" }}>
            <h2 data-anim className="section-title" style={{ color: "#FAF7F2", maxWidth: "20ch" }}>
              What makes us different.
            </h2>
            <div className="gold-rule" style={{ margin: "0 0 56px 0" }} />
            <div data-stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "44px 40px" }}>
              {WHY.map((w) => (
                <div key={w.title} className="why-card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <span className="why-icon">{w.icon}</span>
                  <strong className="font-heading" style={{ fontSize: 19, fontWeight: 700 }}>
                    {w.title}
                  </strong>
                  <span style={{ fontSize: 15, opacity: 0.8, lineHeight: 1.6 }}>{w.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MEET THE OWNER */}
        <section id="owner" className="data-sec" style={{ maxWidth: 1240, margin: "0 auto", padding: "130px 24px", boxSizing: "border-box" }}>
          <div className="data-cols" style={{ display: "flex", gap: 80, alignItems: "center" }}>
            <div data-anim className="owner-media">
              <div className="owner-media-frame">
                <Image
                  src="/images/owner.jpeg"
                  alt="The owner of One Stop Medical Imaging Center"
                  fill
                  sizes="(max-width: 900px) 100vw, 42vw"
                  style={{ objectFit: "cover", objectPosition: "50% 18%" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "#0F5257", opacity: 0.05, pointerEvents: "none" }} />
                <div className="font-heading owner-badge">
                  <span style={{ color: "#B22234" }}>25</span>&nbsp;YEARS OF EXPERIENCE
                </div>
              </div>
            </div>
            <div style={{ flex: 1.1, minWidth: 0 }}>
              <p data-anim className="font-heading owner-eyebrow">MEET THE OWNER</p>
              <h2 data-anim className="section-title" style={{ maxWidth: "16ch" }}>
                The caring hands behind your scan.
              </h2>
              <div className="gold-rule" style={{ margin: "0 0 36px 0" }} />
              <p data-anim style={{ margin: "0 0 36px 0", fontSize: 17, lineHeight: 1.75, color: "rgba(34,37,43,.78)", maxWidth: "52ch", textWrap: "pretty" }}>
                With 25 years of experience in both the USA and Kenya, the founder built One Stop Medical
                Imaging Center on a simple belief: everyone deserves clear answers, delivered kindly. That experience
                 and that care is behind every scan we do.
              </p>
              <h3 data-anim className="font-heading" style={{ margin: "0 0 20px 0", fontSize: 13, fontWeight: 700, letterSpacing: ".16em", color: "#C9A227" }}>
                EDUCATION &amp; TRAINING
              </h3>
              <ul data-stagger style={{ margin: "0 0 40px 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 18 }}>
                {EDUCATION.map((e) => (
                  <li key={e.school} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span className="owner-edu-icon">
                      <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                        <path d="M2.5 8.5 L11 4.5 L19.5 8.5 L11 12.5 Z" stroke="#C9A227" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M6.5 10.8 V14.5 C6.5 15.8 8.5 17 11 17 C13.5 17 15.5 15.8 15.5 14.5 V10.8" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M19.5 8.5 V13" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.4 }}>
                      <strong className="font-heading" style={{ fontSize: 16.5, fontWeight: 700, letterSpacing: "-0.01em", color: "#0F5257" }}>{e.school}</strong>
                      <span style={{ fontSize: 14, color: "rgba(34,37,43,.6)" }}>{e.place}</span>
                    </span>
                  </li>
                ))}
              </ul>
             
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, filter: "saturate(.85)" }}>
            <Image src="/images/how-bg.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(250,247,242,.97) 0%,rgba(250,247,242,.93) 55%,rgba(250,247,242,.88) 100%)", pointerEvents: "none" }} />
          <div className="data-sec" style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "130px 24px", boxSizing: "border-box" }}>
            <h2 data-anim className="section-title" style={{ maxWidth: "20ch" }}>
              From walk-in to results.
            </h2>
            <div className="gold-rule" style={{ margin: "0 0 64px 0" }} />
            <div id="steps-wrap" style={{ position: "relative" }}>
              <div className="stepline" style={{ position: "absolute", top: 29, left: 30, right: 30, height: 1.5, background: "rgba(15,82,87,.15)" }} />
              <div
                className="stepline"
                id="stepline-fill"
                style={{ position: "absolute", top: 29, left: 30, right: 30, height: 1.5, background: "#B22234", transform: "scaleX(0)", transformOrigin: "left center" }}
              />
              <div className="steps" style={{ display: "flex", gap: 48, position: "relative" }}>
                {STEPS.map((s, i) => (
                  <div key={s.title} style={{ flex: 1, position: "relative" }}>
                    <div className="step-node">{i + 1}</div>
                    <h3 className="step-title">{s.title}</h3>
                    <p className="step-desc">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="reviews" style={{ background: "rgba(15,82,87,.06)" }}>
          <div className="data-sec" style={{ maxWidth: 1240, margin: "0 auto", padding: "110px 24px", boxSizing: "border-box" }}>
            <div data-anim style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 52, flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h2 className="section-title" style={{ margin: 0, maxWidth: "20ch" }}>
                  What patients say.
                </h2>
                <div className="gold-rule" />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => carGo(-1)} aria-label="Previous reviews" className="car-arrow">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M13 8 H3 M7 4 L3 8 L7 12" stroke="#0F5257" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button onClick={() => carGo(1)} aria-label="Next reviews" className="car-arrow">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8 H13 M9 4 L13 8 L9 12" stroke="#0F5257" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
            <div
              ref={carRef}
              className="carousel"
              role="group"
              aria-label="Patient reviews"
              tabIndex={0}
              onScroll={onCarScroll}
              onMouseEnter={() => { carPaused.current = true; }}
              onMouseLeave={() => { carPaused.current = false; }}
              onPointerDown={pauseCarousel}
              onTouchStart={pauseCarousel}
            >
              {REVIEWS.map((r) => (
                <figure
                  key={r.name}
                  style={{
                    flex: "none", width: 400, maxWidth: "84vw", scrollSnapAlign: "start", background: "#fff",
                    border: "1.5px solid rgba(15,82,87,.12)", borderRadius: 16, padding: 36, margin: 0,
                    display: "flex", flexDirection: "column", gap: 20, boxSizing: "border-box",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                    <span className="font-heading" style={{ fontSize: 48, fontWeight: 800, color: "#C9A227", lineHeight: 0.55 }}>&ldquo;</span>
                   
                  </div>
                  <blockquote style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: "#22252B", flex: 1 }}>{r.quote}</blockquote>
                  <figcaption style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span
                      className="font-heading"
                      style={{
                        width: 44, height: 44, borderRadius: "50%", background: "#0F5257", color: "#FAF7F2",
                        display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 17, flex: "none",
                      }}
                    >
                      {r.initial}
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.35 }}>
                      <strong style={{ fontSize: 15.5, color: "#0F5257" }}>{r.name}</strong>
                      <span style={{ fontSize: 13.5, color: "rgba(34,37,43,.6)" }}>{r.place}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 28 }}>
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => carGo(0, i)}
                  aria-label={`Go to review ${i + 1}`}
                  aria-current={carIndex === i}
                  className="car-dot"
                >
                  <span
                    style={{
                      display: "block",
                      width: carIndex === i ? 28 : 8,
                      height: 8,
                      borderRadius: 999,
                      background: carIndex === i ? "#0F5257" : "rgba(15,82,87,.35)",
                      transition: "background .25s ease, width .25s ease",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* BIG CTA */}
        <section className="cta-sonar" style={{ background: "linear-gradient(135deg,#0F5257,#0A3A3E)", color: "#FAF7F2", position: "relative", overflow: "hidden" }}>
          <span className="sonar-ring" style={{ borderColor: "rgba(250,247,242,.10)" }} />
          <span className="sonar-ring sonar-ring-2" style={{ borderColor: "rgba(250,247,242,.07)" }} />
          <div className="data-sec" style={{ maxWidth: 1240, margin: "0 auto", padding: "130px 24px", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 36, position: "relative" }}>
            <h2 data-anim className="font-heading" style={{ margin: 0, fontSize: "clamp(36px,4.4vw,64px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.05, maxWidth: "18ch" }}>
              Ready for answers? We&rsquo;re ready for you.
            </h2>
            <div data-anim className="big-phones font-heading" style={{ display: "flex", gap: "20px 48px", flexWrap: "wrap", justifyContent: "center", fontWeight: 800, fontSize: 44, letterSpacing: "-0.02em" }}>
              <a href="tel:+254717617470" className="cta-phone">0717 617 470</a>
              <a href="tel:+254103441698" className="cta-phone">0103 441 698</a>
            </div>
            <a data-anim href="tel:+254717617470" className="cta-btn">
              CALL NOW
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ position: "relative", overflow: "hidden" }}>
          <div className="faq-bg" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(10,20,22,.55) 0%,rgba(10,20,22,.45) 50%,rgba(10,20,22,.55) 100%)", pointerEvents: "none" }} />
          <div className="data-sec" style={{ position: "relative", maxWidth: 880, margin: "0 auto", padding: "130px 24px", boxSizing: "border-box" }}>
            <h2 data-anim className="font-heading" style={{ fontSize: "clamp(30px,3vw,42px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#FAF7F2", margin: "0 0 18px 0" }}>
              Good questions.
            </h2>
            <div className="gold-rule" style={{ margin: "0 0 40px 0" }} />
            <div data-stagger style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {FAQS.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div
                    key={f.q}
                    style={{
                      background: open ? "#fff" : "rgba(250,247,242,.92)",
                      border: `1.5px solid ${open ? "#0F5257" : "rgba(15,82,87,.14)"}`,
                      borderRadius: 14,
                      boxShadow: open ? "0 12px 28px rgba(15,82,87,.10)" : "none",
                      transition: "background .3s ease,border-color .3s ease,box-shadow .3s ease",
                      overflow: "hidden",
                    }}
                  >
                    <button onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} aria-controls={`faq-panel-${i}`} className="faq-card-btn">
                      <span className="font-heading" style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".08em", color: "#C9A227", flex: "none", width: 26 }}>
                        0{i + 1}
                      </span>
                      <span className="font-heading" style={{ flex: 1, fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em", color: "#0F5257" }}>
                        {f.q}
                      </span>
                      <span
                        style={{
                          flex: "none", width: 36, height: 36, borderRadius: "50%",
                          background: open ? "#0F5257" : "transparent", border: "1.5px solid #0F5257",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "background .3s ease,transform .3s ease",
                          transform: open ? "rotate(135deg)" : "rotate(0deg)",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M7 2.5 V11.5 M2.5 7 H11.5" stroke={open ? "#FAF7F2" : "#0F5257"} strokeWidth="1.6" strokeLinecap="round" style={{ transition: "stroke .3s ease" }} />
                        </svg>
                      </span>
                    </button>
                    <div
                      id={`faq-panel-${i}`}
                      style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows .45s cubic-bezier(0.22,1,0.36,1)" }}
                    >
                      <div style={{ minHeight: 0, overflow: "hidden" }} inert={!open}>
                        <div className="faq-answer">
                          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.75, maxWidth: "54ch", color: "rgba(34,37,43,.78)", textWrap: "pretty" }}>{f.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="data-sec" style={{ maxWidth: 1240, margin: "0 auto", padding: "40px 24px 140px 24px", boxSizing: "border-box" }}>
          <div className="data-cols" style={{ display: "flex", gap: 72, alignItems: "flex-start" }}>
            <div data-stagger style={{ flex: 1, display: "flex", flexDirection: "column", gap: 22 }}>
              <h2 className="font-heading" style={{ margin: 0, fontSize: "clamp(30px,3vw,42px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#0F5257" }}>
                Visit us
              </h2>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7 }}>
                <strong style={{ color: "#0F5257" }}>Kutus, Kirinyaga</strong>
                <br />
                Open 8:00 am &ndash; 5:30 pm
              </p>
             
              <div style={{ height: 220, borderRadius: 16, overflow: "hidden", filter: "saturate(.9)", position: "relative" }}>
                <Image src="/images/clinic-sign.jpeg" alt="One Stop Medical Imaging Center clinic signage" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              </div>
              <div className="map-frame">
                <iframe
                  src="https://maps.google.com/maps?q=Kutus,+Kirinyaga,+Kenya&z=14&output=embed"
                  title="Map — One Stop Medical Imaging Center, Kutus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                />
              </div>
            </div>
            <div data-anim className="contact-card">
              {!submitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    const lines = [
                      "Hello One Stop Medical Imaging Center, I would like to request an appointment.",
                      `Name: ${fd.get("name")}`,
                      `Phone: ${fd.get("phone")}`,
                      `Service: ${fd.get("service")}`,
                      fd.get("date") ? `Preferred date: ${fd.get("date")}` : "",
                    ].filter(Boolean);
                    window.open(`https://wa.me/254717617470?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
                    setSubmitted(true);
                  }}
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  <h3 className="font-heading" style={{ margin: "0 0 4px 0", fontSize: 24, fontWeight: 800, letterSpacing: "-0.015em", color: "#0F5257" }}>
                    Request an appointment
                  </h3>
                  <label className="form-label">
                    Name
                    <input name="name" required autoComplete="name" placeholder="Your full name" className="form-input" />
                  </label>
                  <label className="form-label">
                    Phone
                    <input name="phone" type="tel" required autoComplete="tel" placeholder="07XX XXX XXX" className="form-input" />
                  </label>
                  <label className="form-label">
                    Service needed
                    <select name="service" className="form-input">
                      <option>Pregnancy &amp; Women&rsquo;s Health</option>
                      <option>Abdominal &amp; General</option>
                      <option>Men&rsquo;s Health</option>
                      <option>Vascular (Doppler)</option>
                      <option>Head, Neck &amp; Small Parts</option>
                    </select>
                  </label>
                  <label className="form-label">
                    Preferred date
                    <input name="date" type="date" ref={dateRef} className="form-input" />
                  </label>
                  <button type="submit" className="form-submit">
                    REQUEST APPOINTMENT
                  </button>
                  <p style={{ margin: 0, fontSize: 13, opacity: 0.65, lineHeight: 1.5 }}>
                    Submitting opens WhatsApp with your details ready to send &mdash; we&rsquo;ll call you back to confirm.
                  </p>
                </form>
              ) : (
                <div role="status" className="form-success" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "48px 12px", textAlign: "center", position: "relative" }}>
                  <span style={{ position: "relative", width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ position: "absolute", inset: 0, border: "1.5px solid #B22234", borderRadius: "50%", animation: "sonar 1.4s cubic-bezier(0.22,1,0.36,1) 2" }} />
                    <svg width="30" height="30" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      <path d="M4.5 11.5 L9 16 L17.5 6" stroke="#B22234" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="font-heading" style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0F5257" }}>
                    Thank you, we&rsquo;ll call you back shortly
                  </h3>
                  <p style={{ margin: 0, fontSize: 16, maxWidth: "34ch" }}>
                    Or reach us right now on{" "}
                    <a href="tel:+254717617470" style={{ fontWeight: 600 }}>
                      0717 617 470
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer style={{ background: "#0F5257", color: "#FAF7F2" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 40px 24px", boxSizing: "border-box" }}>
          <div className="footer-cols" style={{ display: "flex", gap: 64, alignItems: "flex-start" }}>
            <div style={{ flex: 1.3, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <LogoBadge size={48} />
                <Wordmark inverted />
              </div>
              <p style={{ margin: 0, fontSize: 15, opacity: 0.85, fontStyle: "italic" }}>Your One Stop Ultrasound Center</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 16, fontWeight: 600 }}>
                <a href="tel:+254717617470" className="footer-link">0717 617 470</a>
                <a href="tel:+254103441698" className="footer-link">0103 441 698</a>
              </div>
              <p style={{ margin: 0, fontSize: 14, opacity: 0.75, lineHeight: 1.6 }}>Kutus, Kirinyaga &middot; Open 8:00 am &ndash; 5:30 pm</p>
            </div>
            <div style={{ flex: 1 }}>
              <h4 className="footer-heading">SERVICES</h4>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, fontSize: 14.5, opacity: 0.9 }}>
                <li>Pregnancy &amp; Women&rsquo;s Health</li>
                <li>Abdominal &amp; General</li>
                <li>Men&rsquo;s Health</li>
                <li>Vascular (Doppler)</li>
                <li>Head, Neck &amp; Small Parts</li>
              </ul>
            </div>
            <div style={{ flex: 1 }}>
              <h4 className="footer-heading">EXPLORE</h4>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, fontSize: 14.5 }}>
                {NAV_ITEMS.map((n) => (
                  <li key={n.id}>
                    <a href={`#${n.id}`} onClick={go(n.id)} className="footer-link">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ marginTop: 56, paddingTop: 24, borderTop: "1px solid rgba(201,162,39,.3)", display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap", fontSize: 13, opacity: 0.7 }}>
            <span>Results are for diagnostic purposes and should be reviewed with your doctor.</span>
            <span>&copy; 2026 One Stop Medical Imaging Center</span>
          </div>
        </div>
      </footer>

      {isMobile && (
        <div className={`mobile-bar${pastHero ? " show" : ""}`}>
          <a href="tel:+254717617470" className="mobile-bar-btn" style={{ background: "#B22234" }}>
            CALL
          </a>
          <a href="https://wa.me/254717617470" target="_blank" rel="noopener" className="mobile-bar-btn" style={{ background: "#0F5257" }}>
            WHATSAPP
          </a>
        </div>
      )}
    </>
  );
}
