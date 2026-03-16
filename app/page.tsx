"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const IG = "https://www.instagram.com/cuba_car_wash__/";
const WA = "https://wa.me/17259103737";

/* ── SCROLL REVEAL HOOK ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── PARALLAX HOOK ── */
function useParallax(strength = 0.15) {
  const ref = useRef<HTMLImageElement>(null);
  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - window.innerHeight / 2;
    el.style.transform = `translateY(${center * strength}px) scale(1.08)`;
  }, [strength]);
  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);
  return ref;
}

/* ── DATA ── */
const SERVICES = [
  { img: "/images/svc-lavado.png",  num: "01", title: "Lavado Premium",          price: "Desde $50",  desc: "Lavado completo con técnica sin contacto. Sin marcas, sin rayones. Solo brillo." },
  { img: "/images/svc-espuma.png",  num: "02", title: "Espuma Activa",            price: "Desde $25",  desc: "Pre-lavado de contacto cero. La espuma disuelve la suciedad antes de tocar la pintura." },
  { img: "/images/svc-interior.png",num: "03", title: "Detallado Interior",       price: "Desde $75",  desc: "Aspirado profundo, tapicería, tablero y cristales. Tu interior como nuevo." },
  { img: "/images/svc-pulido.png",  num: "04", title: "Pulido & Paint Correction",price: "Desde $150", desc: "Corrección de pintura con máquina orbital. Eliminamos rayones leves y oxidación." },
  { img: "/images/svc-ceramic.png", num: "05", title: "Protección & Sellado",     price: "Desde $100", desc: "Recubrimiento cerámico o sellador de alta durabilidad. Tu pintura protegida por meses." },
  { img: "/images/svc-clay.png",    num: "06", title: "Descontaminación",         price: "Desde $80",  desc: "Clay bar y tratamiento químico para contaminantes que el lavado no puede quitar." },
];

const STEPS = [
  { n: "1", img: "/images/svc-espuma.png",  title: "Lavado seguro",       desc: "Espuma activa, técnica de dos cubetas. Suciedad fuera sin tocar la pintura." },
  { n: "2", img: "/images/svc-pulido.png",  title: "Corrección de pintura", desc: "Pulido con máquina orbital bajo luz de inspección. Cada micro-rayón eliminado." },
  { n: "3", img: "/images/svc-ceramic.png", title: "Protección final",    desc: "Sellado o recubrimiento cerámico. El acabado que dura." },
];

const REVIEWS = [
  { name: "Carlos M.", text: "El resultado fue brutal. Mi carro parecía salido de agencia. Jorge es detallista al máximo.", stars: 5 },
  { name: "María L.", text: "Llegó hecho un desastre y salió perfecto. Trabajo serio, precio justo.", stars: 5 },
  { name: "Robert K.", text: "El mejor detailing en Las Vegas. No hay comparación.", stars: 5 },
];

/* ── COMPONENTS ── */
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Label({ text }: { text: string }) {
  return (
    <p className="text-[#2563EB] text-xs font-bold uppercase tracking-[0.2em] mb-4 font-tight">{text}</p>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 mb-5">
      {Array.from({ length: n }).map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
    </div>
  );
}

/* ── PAGE ── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [tab, setTab] = useState<"before" | "after">("after");
  const heroImgRef = useParallax(0.1);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="bg-[#0A0A0A] text-white overflow-x-hidden">

      {/* ─────────────────── NAV ─────────────────── */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.06]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-tight font-black text-base tracking-widest uppercase">Cuba Car Wash</span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/40 font-medium">
            {[["#servicios","Servicios"],["#resultados","Resultados"],["#vegas","Las Vegas"],["#nosotros","Nosotros"]].map(([h,l])=>(
              <a key={h} href={h} className="hover:text-white transition-colors">{l}</a>
            ))}
          </nav>
          <a href={IG} target="_blank" rel="noopener noreferrer"
            className="btn-glow bg-[#2563EB] hover:bg-blue-500 text-white font-tight font-bold text-sm px-5 py-2.5 rounded-full transition-colors pulse-glow">
            Reservar cita
          </a>
        </div>
      </header>

      {/* ─────────────────── HERO ─────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={heroImgRef} src="/images/hero.png" alt="Cuba Car Wash Las Vegas"
          className="absolute inset-0 w-full h-full object-cover scale-105 parallax-img" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-[#0A0A0A]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-28 w-full">
          <div className="max-w-3xl">
            <div className="hero-text-1 flex items-center gap-3 mb-6">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#002A8F]" />
                <span className="w-2 h-2 rounded-full bg-[#CF142B]" />
                <span className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span className="text-white/40 text-sm font-medium uppercase tracking-widest">Las Vegas, Nevada</span>
            </div>
            <h1 className="hero-text-2 font-tight font-black leading-[0.92] tracking-tighter mb-6 text-[clamp(3.5rem,10vw,7rem)]">
              El brillo que<br />
              <span className="neon-blue text-[#2563EB]">merece tu carro.</span>
            </h1>
            <p className="hero-text-3 text-white/60 text-xl mb-10 max-w-lg leading-relaxed">
              Detailing profesional con estilo cubano.<br />Cuba Car Wash — Las Vegas.
            </p>
            <div className="hero-text-4 flex flex-wrap gap-3">
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="btn-glow bg-[#2563EB] hover:bg-blue-500 text-white font-tight font-black px-8 py-4 rounded-full text-base transition-colors">
                Reservar lavado
              </a>
              <a href="#resultados"
                className="border border-white/20 hover:border-white/50 text-white font-tight font-semibold px-8 py-4 rounded-full text-base transition-colors hover:bg-white/5">
                Ver resultados
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator z-10">
          <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ─────────────────── SERVICIOS ─────────────────── */}
      <section id="servicios" className="py-32 max-w-7xl mx-auto px-6">
        <Section>
          <Label text="Servicios" />
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <h2 className="font-tight font-black text-[clamp(2.5rem,6vw,4.5rem)] tracking-tight leading-tight">Lo que hacemos.</h2>
            <a href={IG} target="_blank" rel="noopener noreferrer"
              className="text-white/30 hover:text-white text-sm font-semibold transition-colors shrink-0">
              Consultar precios →
            </a>
          </div>
        </Section>

        <div className="grid md:grid-cols-3 gap-px bg-white/[0.05] rounded-2xl overflow-hidden">
          {SERVICES.map((s) => (
            <div key={s.num} className="bg-[#0A0A0A] card-hover border border-transparent group">
              <div className="img-zoom h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-white/15 text-xs font-bold tracking-widest font-tight">{s.num}</span>
                  <span className="text-[#2563EB] text-xs font-bold font-tight">{s.price}</span>
                </div>
                <h3 className="font-tight font-black text-lg mb-2 group-hover:text-[#2563EB] transition-colors">{s.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────── RESULTADOS ─────────────────── */}
      <section id="resultados" className="py-32 bg-[#111] border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <Label text="Resultados" />
                <h2 className="font-tight font-black text-[clamp(2.5rem,6vw,4.5rem)] tracking-tight">El trabajo habla.</h2>
              </div>
              <div className="flex gap-2 shrink-0">
                {(["after","before"] as const).map((t) => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`px-5 py-2.5 rounded-full text-sm font-tight font-bold transition-all ${tab === t ? "bg-white text-[#0A0A0A]" : "border border-white/15 text-white/40 hover:text-white hover:border-white/40"}`}>
                    {t === "after" ? "Después" : "Antes"}
                  </button>
                ))}
              </div>
            </div>
          </Section>

          <Section className="mb-4">
            <div className="relative overflow-hidden rounded-2xl img-zoom" style={{ aspectRatio: "16/7" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tab === "after" ? "/images/after.png" : "/images/before.png"} alt=""
                className="w-full h-full object-cover transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 to-transparent pointer-events-none" />
              <span className={`absolute bottom-6 left-6 px-3 py-1.5 rounded-full text-xs font-tight font-black uppercase tracking-wider ${tab === "after" ? "bg-[#2563EB] text-white" : "bg-white/10 backdrop-blur text-white"}`}>
                {tab === "after" ? "✦ Resultado final" : "Estado inicial"}
              </span>
            </div>
          </Section>

          <div className="grid grid-cols-3 gap-4">
            {[
              { src: "/images/gallery-2.png", label: "Espuma activa" },
              { src: "/images/gallery-4.png", label: "Brillo extremo" },
              { src: "/images/gallery-3.png", label: "Interior impecable" },
            ].map((item, i) => (
              <Section key={item.label} className={`reveal-delay-${i + 1}`}>
                <div className="relative overflow-hidden rounded-xl img-zoom" style={{ aspectRatio: "4/3" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <p className="absolute bottom-3 left-4 text-xs font-tight font-bold uppercase tracking-wider text-white/70">{item.label}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── PROCESO ─────────────────── */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <Section>
          <Label text="Proceso" />
          <h2 className="font-tight font-black text-[clamp(2.5rem,6vw,4.5rem)] tracking-tight mb-16">Sin atajos.</h2>
        </Section>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((s, i) => (
            <Section key={s.n} className={`reveal-delay-${i + 1}`}>
              <div className="relative overflow-hidden rounded-xl img-zoom mb-6" style={{ aspectRatio: "4/3" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-xs font-tight font-black">{s.n}</div>
              </div>
              <h3 className="font-tight font-black text-xl mb-2">{s.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed">{s.desc}</p>
            </Section>
          ))}
        </div>
      </section>

      {/* ─────────────────── LAS VEGAS ─────────────────── */}
      <section id="vegas" className="relative py-40 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/vegas.png" alt="Las Vegas" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <Section>
            <Label text="Las Vegas" />
            <h2 className="font-tight font-black text-[clamp(2.5rem,7vw,5.5rem)] tracking-tight mb-6 neon-blue">
              Brillo digno<br />de Las Vegas.
            </h2>
            <p className="text-white/50 text-xl max-w-xl mx-auto leading-relaxed">
              En una ciudad donde todo brilla, tu carro también debería hacerlo.<br />
              Cuba Car Wash trae el detailing de alto nivel a Las Vegas.
            </p>
          </Section>
        </div>
      </section>

      {/* ─────────────────── IDENTIDAD CUBANA ─────────────────── */}
      <section className="py-32 border-y border-white/[0.05] bg-[#111]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <Section>
            <div className="flex items-center gap-3 mb-6">
              <span className="star-blink text-3xl">✦</span>
              <Label text="Identidad" />
            </div>
            <h2 className="font-tight font-black text-[clamp(2.5rem,6vw,4.5rem)] tracking-tight mb-6 leading-tight">
              Hecho por<br />
              <span style={{ color: "#CF142B" }}>cubanos.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Los cubanos sabemos trabajar duro.<br />
              Cada carro que tocamos lo tratamos como si fuera nuestro.
            </p>
            <p className="text-white/30 mt-4 leading-relaxed">
              No hay atajos. Solo resultados impecables.
            </p>
          </Section>
          <Section className="reveal-delay-2">
            <div className="flex gap-3 mb-6">
              {["#002A8F","#CF142B","#FFFFFF"].map((c) => (
                <div key={c} className="h-2 flex-1 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Origen", value: "Cuba 🇨🇺" },
                { label: "Operación", value: "Las Vegas, NV" },
                { label: "Filosofía", value: "Cero atajos" },
                { label: "Estándar", value: "Máximo detalle" },
              ].map((item) => (
                <div key={item.label} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 card-hover">
                  <p className="text-white/25 text-xs uppercase tracking-wider mb-1.5 font-tight">{item.label}</p>
                  <p className="font-tight font-bold text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ─────────────────── NOSOTROS ─────────────────── */}
      <section id="nosotros" className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <Section>
            <Label text="Quién lo hace" />
            <h2 className="font-tight font-black text-[clamp(3rem,7vw,5.5rem)] tracking-tight leading-[0.95] mb-8">
              Jorge<br />Machado.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-4">
              Cubano. Ex-médico. Detailer por convicción.
            </p>
            <p className="text-white/35 leading-relaxed mb-4">
              Cambié los consultorios por los garajes y encontré mi verdadera pasión. Cada carro que entra aquí es un compromiso personal.
            </p>
            <p className="text-white/25 leading-relaxed mb-8">
              Traigo la misma obsesión por el detalle que exige la medicina. Sin excepciones.
            </p>
            <a href={IG} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#2563EB] hover:text-blue-400 font-tight font-bold text-sm transition-colors">
              Ver trabajo en Instagram →
            </a>
          </Section>
          <Section className="reveal-delay-2">
            <div className="space-y-px bg-white/[0.05] rounded-2xl overflow-hidden">
              {[
                { label: "Especialidad", value: "Paint correction & full detailing" },
                { label: "Ubicación", value: "Las Vegas, Nevada" },
                { label: "Experiencia", value: "5+ años en el sector" },
                { label: "Instagram", value: "@cuba_car_wash__" },
              ].map((item) => (
                <div key={item.label} className="bg-[#0A0A0A] px-6 py-5 hover:bg-white/[0.02] transition-colors">
                  <p className="text-white/25 text-xs uppercase tracking-wider mb-1 font-tight">{item.label}</p>
                  <p className="font-tight font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ─────────────────── GALERÍA ─────────────────── */}
      <section className="py-32 bg-[#111] border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <Section className="mb-16">
            <Label text="Galería" />
            <h2 className="font-tight font-black text-[clamp(2.5rem,6vw,4.5rem)] tracking-tight">Premium. Siempre.</h2>
          </Section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "/images/gallery-1.png",
              "/images/gallery-2.png",
              "/images/gallery-3.png",
              "/images/gallery-4.png",
            ].map((src, i) => (
              <Section key={src} className={`reveal-delay-${i + 1}`}>
                <div className="relative overflow-hidden rounded-xl img-zoom" style={{ aspectRatio: "3/4" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── TESTIMONIOS ─────────────────── */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <Section>
          <Label text="Clientes" />
          <h2 className="font-tight font-black text-[clamp(2.5rem,6vw,4.5rem)] tracking-tight mb-16">Ellos hablan.</h2>
        </Section>
        <div className="grid md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <Section key={r.name} className={`reveal-delay-${i + 1}`}>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 card-hover h-full">
                <Stars n={r.stars} />
                <p className="text-white/50 leading-relaxed mb-6 text-sm">"{r.text}"</p>
                <p className="font-tight font-bold text-sm">{r.name}</p>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* ─────────────────── CTA FINAL ─────────────────── */}
      <section className="relative py-40 overflow-hidden border-t border-white/[0.05]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#002A8F]/10 via-[#2563EB]/5 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.12)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <Section>
            <h2 className="font-tight font-black text-[clamp(3rem,9vw,7rem)] tracking-tighter leading-[0.9] mb-6">
              Tu carro puede<br />
              <span className="neon-blue text-[#2563EB]">verse así.</span>
            </h2>
            <p className="text-white/40 text-lg mb-10 max-w-md mx-auto">
              Reserva tu lavado hoy y deja que tu auto brille como nuevo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="btn-glow w-full sm:w-auto bg-[#2563EB] hover:bg-blue-500 text-white font-tight font-black px-10 py-5 rounded-full text-base transition-colors pulse-glow">
                Reservar cita →
              </a>
              <a href={IG} target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto border border-white/15 hover:border-white/40 text-white font-tight font-bold px-10 py-5 rounded-full text-base transition-colors hover:bg-white/5">
                Instagram
              </a>
            </div>
          </Section>
        </div>
      </section>

      {/* ─────────────────── FOOTER ─────────────────── */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-tight font-black text-sm tracking-widest uppercase">Cuba Car Wash</span>
          <span className="text-white/15 text-sm">© 2025 · Jorge Machado · Las Vegas, NV</span>
          <a href={IG} target="_blank" rel="noopener noreferrer" className="text-white/25 hover:text-white text-sm transition-colors font-tight">
            @cuba_car_wash__
          </a>
        </div>
      </footer>

      {/* ─────────────────── STICKY MOBILE CTA ─────────────────── */}
      <div className={`fixed bottom-0 inset-x-0 z-50 p-4 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/[0.07] md:hidden transition-transform duration-500 ${scrolled ? "translate-y-0" : "translate-y-full"}`}>
        <div className="flex gap-2">
          <a href={WA} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center bg-[#2563EB] text-white font-tight font-black py-4 rounded-xl text-sm">
            Reservar cita
          </a>
          <a href={IG} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center border border-white/20 px-5 rounded-xl">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>

    </div>
  );
}
