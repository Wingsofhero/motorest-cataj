import { FormEvent, useMemo, useState } from "react";
import { assistantReplies, driveInPhoto, gallery, heroImage, menuCategories, reviews, site, type AssistantTopic, type MenuCategory } from "./siteData";

export default function App() {
  const [activeMenuKey, setActiveMenuKey] = useState(menuCategories[0].key);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantTopic, setAssistantTopic] = useState<AssistantTopic>("menu");
  const [formSent, setFormSent] = useState(false);

  const activeMenu = useMemo(
    () => menuCategories.find((category) => category.key === activeMenuKey) ?? menuCategories[0],
    [activeMenuKey],
  );
  const assistantReply = assistantReplies[assistantTopic];

  function handleReservationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormSent(true);
  }

  return (
    <main className="min-h-screen bg-stone-50 text-slate-950">
      <Hero />
      <StatsBand />
      <AboutSection />
      <MenuSection activeMenu={activeMenu} activeMenuKey={activeMenuKey} onSelectMenu={setActiveMenuKey} />
      <GallerySection />
      <DriveInSection />
      <ReviewsSection />
      <ContactSection formSent={formSent} onSubmit={handleReservationSubmit} />
      <AssistantPanel
        isOpen={assistantOpen}
        topic={assistantTopic}
        reply={assistantReply}
        onToggle={() => setAssistantOpen((current) => !current)}
        onPickTopic={setAssistantTopic}
      />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[72svh] overflow-hidden bg-slate-950 text-white">
      <img className="absolute inset-0 h-full w-full object-cover" src={heroImage} alt="" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,17,14,0.94),rgba(9,17,14,0.68)_43%,rgba(9,17,14,0.22))]" />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <a className="text-lg font-semibold tracking-wide text-white" href="#top" aria-label={site.displayName}>
          {site.displayName}
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-white/82 md:flex">
          <a className="hover:text-amber-200" href="#menu">
            Menu
          </a>
          <a className="hover:text-amber-200" href="#drive-in">
            Drive In
          </a>
          <a className="hover:text-amber-200" href="#recenzie">
            Recenzie
          </a>
          <a className="hover:text-amber-200" href="#kontakt">
            Kontakt
          </a>
        </nav>
        <a
          className="rounded-md bg-amber-300 px-4 py-2 text-sm font-bold text-slate-950 shadow-lg shadow-black/15 transition hover:bg-amber-200"
          href={site.phoneHref}
        >
          Zavolať
        </a>
      </header>

      <div id="top" className="relative z-10 mx-auto flex min-h-[calc(72svh-76px)] max-w-7xl flex-col justify-center px-5 pb-10 pt-7 lg:px-8">
        <p className="max-w-2xl text-sm font-bold uppercase tracking-[0.22em] text-amber-200">{site.category}</p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.95] text-white sm:text-7xl lg:text-[94px]">
          {site.displayName}
        </h1>
        <p className="mt-6 max-w-2xl text-2xl font-semibold leading-tight text-white sm:text-3xl">{site.slogan}</p>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">{site.intro}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            className="rounded-md bg-white px-5 py-3 text-center text-sm font-bold text-slate-950 shadow-xl shadow-black/20 transition hover:bg-amber-100"
            href="#rezervacia"
          >
            Rezervovať alebo poslať dopyt
          </a>
          <a
            className="rounded-md border border-white/35 px-5 py-3 text-center text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
            href={site.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            Navigovať k motorestu
          </a>
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-5 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <InfoLine label="Hodnotenie" value={site.rating} />
        <InfoLine label="Recenzie" value={site.reviewsCount} />
        <InfoLine label="Adresa" value={site.address} />
        <InfoLine label="Otváracie hodiny" value={site.openingHours} />
      </div>
    </section>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function AboutSection() {
  return (
    <section className="bg-stone-50 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-700">O nás</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            Príjemná zastávka pre rýchly obed, rannú kávu aj pokojné posedenie.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            Či už cestujete po diaľnici, idete s rodinou alebo potrebujete rýchlo načerpať energiu, Motorest Čataj spája poctivú domácu
            kuchyňu, moderné priestory a organizovanú obsluhu aj počas väčšej návštevnosti.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {site.highlights.map((highlight) => (
              <div key={highlight} className="flex gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-700" />
                <span className="text-sm font-semibold leading-6 text-slate-800">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <FeatureTile title="Atmosféra" items={["Čistota", "Útulné prostredie", "Moderný interiér", "Krásne výhľady"]} />
          <FeatureTile title="Ideálne pre" items={site.audiences} />
        </div>
      </div>
    </section>
  );
}

function FeatureTile({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-md bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <ul className="mt-5 grid gap-3 text-sm text-white/78">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <span className="h-px w-7 bg-amber-300" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function MenuSection({
  activeMenu,
  activeMenuKey,
  onSelectMenu,
}: {
  activeMenu: MenuCategory;
  activeMenuKey: string;
  onSelectMenu: (key: string) => void;
}) {
  return (
    <section id="menu" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-800">Čo u nás nájdete</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            Jedlo, nápoje a služby pripravené pre ľudí na cestách.
          </h2>
        </div>

        <div className="mt-9 flex flex-wrap gap-2 rounded-md border border-slate-200 bg-slate-100 p-1">
          {menuCategories.map((category) => (
            <button
              key={category.key}
              className={`rounded-md px-4 py-2 text-sm font-bold transition ${
                activeMenuKey === category.key ? "bg-slate-950 text-white shadow-sm" : "text-slate-700 hover:bg-white"
              }`}
              onClick={() => onSelectMenu(category.key)}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-md bg-emerald-900 p-7 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-200">{activeMenu.label}</p>
            <h3 className="mt-4 text-3xl font-semibold leading-tight">{activeMenu.title}</h3>
            <p className="mt-4 leading-7 text-white/78">{activeMenu.description}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {activeMenu.items.map((item) => (
              <div key={item} className="rounded-md border border-slate-200 bg-stone-50 p-5">
                <p className="text-lg font-semibold text-slate-950">{item}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Dostupné podľa dennej ponuky a aktuálneho výberu kuchyne.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="bg-slate-950 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-200">Galéria</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Miesto, kde krátka prestávka vie chutiť ako poriadny oddych.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/68">
            Výber jedál, oddychové priestory a rýchle služby pre cestujúcich, ktorí chcú dobrú prestávku bez komplikácií.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {gallery.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-md bg-white text-slate-950">
              <img className="aspect-[4/3] w-full object-cover" src={item.image} alt={item.title} />
              <div className="p-5">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DriveInSection() {
  return (
    <section id="drive-in" className="bg-[#e9f0e8] py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
        <img className="min-h-80 w-full rounded-md object-cover shadow-2xl shadow-emerald-950/20" src={driveInPhoto} alt="Drive In" />
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-700">Drive In</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            Dobré jedlo aj vtedy, keď je prestávka krátka.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            Drive In dáva motorestu jasnú predajnú výhodu: zákazník vie rýchlo zastaviť, objednať a pokračovať v ceste bez zbytočného
            zdržiavania.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="rounded-md bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white hover:bg-slate-800" href={site.phoneHref}>
              Zavolať vopred
            </a>
            <a
              className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-bold text-slate-950 hover:border-slate-950"
              href={site.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              Spustiť navigáciu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section id="recenzie" className="bg-stone-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-800">Recenzie</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Dôvera postavená na tisícoch zastávok.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Hodnotenie {site.rating} a viac než {site.reviewsCount} recenzií pomáhajú návštevníkovi rýchlo sa rozhodnúť.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reviews.map((review) => (
              <blockquote key={review} className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-base leading-7 text-slate-800">„{review}“</p>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection({
  formSent,
  onSubmit,
}: {
  formSent: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <section id="kontakt" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-700">Kontakt</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Zastavte sa pri D1 alebo si vybavte jedlo vopred.
            </h2>
            <div className="mt-8 grid gap-5">
              <ContactBlock label="Adresa" value={site.address} />
              <ContactBlock label="Telefón" value={site.phone} href={site.phoneHref} />
              <ContactBlock label="Otváracie hodiny" value={site.openingHours} />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <MiniList title="Platby" items={site.payment} />
              <MiniList title="Parkovanie" items={site.parking} />
              <MiniList title="Prístup" items={site.accessibility} />
            </div>
          </div>

          <div id="rezervacia" className="grid gap-5">
            <form className="rounded-md bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/10" onSubmit={onSubmit}>
              <h3 className="text-2xl font-semibold">Rezervácia alebo rýchly dopyt</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-white/78">
                  Meno
                  <input className="rounded-md border border-white/10 bg-white px-3 py-3 text-slate-950 outline-none focus:border-amber-300" name="name" required />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-white/78">
                  Telefón
                  <input className="rounded-md border border-white/10 bg-white px-3 py-3 text-slate-950 outline-none focus:border-amber-300" name="phone" required />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-white/78">
                  Dátum
                  <input className="rounded-md border border-white/10 bg-white px-3 py-3 text-slate-950 outline-none focus:border-amber-300" name="date" type="date" />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-white/78">
                  Počet osôb
                  <input className="rounded-md border border-white/10 bg-white px-3 py-3 text-slate-950 outline-none focus:border-amber-300" min="1" name="people" type="number" />
                </label>
              </div>
              <label className="mt-4 grid gap-2 text-sm font-semibold text-white/78">
                Správa
                <textarea
                  className="min-h-28 rounded-md border border-white/10 bg-white px-3 py-3 text-slate-950 outline-none focus:border-amber-300"
                  name="message"
                  placeholder="Rezervácia, Drive In, skupina alebo otázka k ponuke"
                />
              </label>
              <button className="mt-5 w-full rounded-md bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-amber-200" type="submit">
                Odoslať dopyt
              </button>
              {formSent && <p className="mt-4 rounded-md bg-emerald-500/20 p-3 text-sm font-semibold text-emerald-100">Ďakujeme, dopyt sme prijali. Čoskoro sa ozveme.</p>}
            </form>
            <iframe
              className="h-80 w-full rounded-md border-0 shadow-lg shadow-slate-950/10"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={site.mapEmbed}
              title="Mapa Motorest Čataj"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactBlock({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = href ? (
    <a className="text-xl font-semibold text-slate-950 hover:text-rose-700" href={href}>
      {value}
    </a>
  ) : (
    <p className="text-xl font-semibold text-slate-950">{value}</p>
  );

  return (
    <div className="border-l-2 border-emerald-800 pl-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <div className="mt-1">{content}</div>
    </div>
  );
}

function MiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-slate-200 bg-stone-50 p-4">
      <h3 className="font-semibold text-slate-950">{title}</h3>
      <ul className="mt-3 grid gap-2 text-sm text-slate-600">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function AssistantPanel({
  isOpen,
  topic,
  reply,
  onToggle,
  onPickTopic,
}: {
  isOpen: boolean;
  topic: AssistantTopic;
  reply: { title: string; body: string; action: string; href: string };
  onToggle: () => void;
  onPickTopic: (topic: AssistantTopic) => void;
}) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex max-w-[calc(100vw-2.5rem)] flex-col items-end gap-3">
      {isOpen && (
        <section className="w-[min(390px,calc(100vw-2.5rem))] rounded-md border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">Rýchly asistent</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">Ako pomôžeme?</h2>
            </div>
            <button className="rounded-md px-2 py-1 text-xl leading-none text-slate-500 hover:bg-slate-100" onClick={onToggle} type="button" aria-label="Zavrieť asistenta">
              ×
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <AssistantChoice active={topic === "menu"} label="Menu" onClick={() => onPickTopic("menu")} />
            <AssistantChoice active={topic === "drive"} label="Drive In" onClick={() => onPickTopic("drive")} />
            <AssistantChoice active={topic === "family"} label="Rezervácia" onClick={() => onPickTopic("family")} />
            <AssistantChoice active={topic === "contact"} label="Kontakt" onClick={() => onPickTopic("contact")} />
          </div>
          <div className="mt-4 rounded-md bg-stone-50 p-4">
            <h3 className="font-semibold text-slate-950">{reply.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{reply.body}</p>
            <a
              className="mt-4 inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800"
              href={reply.href}
              target={reply.href.startsWith("http") ? "_blank" : undefined}
              rel={reply.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {reply.action}
            </a>
          </div>
        </section>
      )}
      <button
        className="rounded-full bg-rose-700 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-rose-950/25 transition hover:bg-rose-800"
        onClick={onToggle}
        type="button"
        aria-expanded={isOpen}
      >
        {isOpen ? "Zavrieť" : "Rýchla pomoc"}
      </button>
    </div>
  );
}

function AssistantChoice({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      className={`rounded-md px-3 py-2 text-sm font-bold transition ${
        active ? "bg-emerald-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      }`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
