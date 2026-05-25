import { FormEvent, useMemo, useState } from "react";
import {
  assistantReplies,
  driveInPhoto,
  gallery,
  heroImage,
  menuCategories,
  reviews,
  site,
  type AssistantTopic,
  type MenuCategory,
} from "./siteData";

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
    <main className="site-shell">
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
    <section className="hero-section" id="top">
      <img className="hero-image" src={heroImage} alt="" />
      <div className="hero-wash" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label={site.displayName}>
          {site.displayName}
        </a>
        <nav className="nav-links" aria-label="Hlavná navigácia">
          <a href="#menu">Menu</a>
          <a href="#drive-in">Drive In</a>
          <a href="#recenzie">Recenzie</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
        <a className="button button-red" href={site.phoneHref}>
          Zavolať
        </a>
      </header>

      <div className="hero-content">
        <div className="hero-frame">
          <p className="eyebrow">{site.category}</p>
          <h1>{site.displayName}</h1>
          <p className="hero-slogan">{site.slogan}</p>
          <p className="hero-copy">{site.intro}</p>
          <div className="button-row">
            <a className="button button-light" href="#rezervacia">
              Rezervovať alebo poslať dopyt
            </a>
            <a className="button button-ghost" href={site.mapUrl} target="_blank" rel="noreferrer">
              Navigovať k motorestu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="section-strip">
      <div className="content-grid stats-grid">
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
    <div className="soft-panel stat-panel">
      <p className="panel-label">{label}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
}

function AboutSection() {
  return (
    <section className="page-section section-cream">
      <div className="content-grid two-column">
        <div className="soft-panel text-panel">
          <p className="panel-label red">O nás</p>
          <h2>Príjemná zastávka pre rýchly obed, rannú kávu aj pokojné posedenie.</h2>
          <p>
            Či už cestujete po diaľnici, idete s rodinou alebo potrebujete rýchlo načerpať energiu, Motorest Čataj spája poctivú domácu
            kuchyňu, moderné priestory a organizovanú obsluhu aj počas väčšej návštevnosti.
          </p>
        </div>

        <div className="stacked-panels">
          <FeatureTile title="Atmosféra" items={["Čistota", "Útulné prostredie", "Moderný interiér", "Krásne výhľady"]} />
          <FeatureTile title="Ideálne pre" items={site.audiences} />
        </div>
      </div>

      <div className="content-grid highlight-grid">
        {site.highlights.map((highlight) => (
          <div key={highlight} className="soft-panel mini-panel">
            <span className="red-dot" />
            <span>{highlight}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureTile({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="soft-panel feature-panel">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
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
    <section id="menu" className="page-section section-white">
      <div className="content-grid">
        <div className="soft-panel text-panel narrow">
          <p className="panel-label red">Čo u nás nájdete</p>
          <h2>Jedlo, nápoje a služby pripravené pre ľudí na cestách.</h2>
        </div>

        <div className="menu-tabs" role="tablist" aria-label="Ponuka">
          {menuCategories.map((category) => (
            <button
              key={category.key}
              className={activeMenuKey === category.key ? "active" : ""}
              onClick={() => onSelectMenu(category.key)}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="menu-layout">
          <div className="soft-panel menu-lead">
            <p className="panel-label red">{activeMenu.label}</p>
            <h3>{activeMenu.title}</h3>
            <p>{activeMenu.description}</p>
          </div>
          <div className="item-grid">
            {activeMenu.items.map((item) => (
              <div key={item} className="soft-panel menu-item">
                <h4>{item}</h4>
                <p>Dostupné podľa dennej ponuky a aktuálneho výberu kuchyne.</p>
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
    <section className="page-section section-cream gallery-section">
      <div className="content-grid gallery-intro">
        <div className="soft-panel text-panel">
          <p className="panel-label red">Galéria</p>
          <h2>Miesto, kde krátka prestávka vie chutiť ako poriadny oddych.</h2>
        </div>
        <p className="soft-panel side-note">
          Výber jedál, oddychové priestory a rýchle služby pre cestujúcich, ktorí chcú dobrú prestávku bez komplikácií.
        </p>
      </div>

      <div className="content-grid gallery-grid">
        {gallery.map((item) => (
          <article key={item.title} className="gallery-card">
            <img src={item.image} alt={item.title} />
            <div className="soft-panel gallery-copy">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DriveInSection() {
  return (
    <section id="drive-in" className="page-section section-white">
      <div className="content-grid drive-grid">
        <img className="framed-image" src={driveInPhoto} alt="Drive In" />
        <div className="soft-panel text-panel">
          <p className="panel-label red">Drive In</p>
          <h2>Dobré jedlo aj vtedy, keď je prestávka krátka.</h2>
          <p>
            Drive In dáva motorestu jasnú predajnú výhodu: zákazník vie rýchlo zastaviť, objednať a pokračovať v ceste bez zbytočného
            zdržiavania.
          </p>
          <div className="button-row">
            <a className="button button-red" href={site.phoneHref}>
              Zavolať vopred
            </a>
            <a className="button button-outline" href={site.mapUrl} target="_blank" rel="noreferrer">
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
    <section id="recenzie" className="page-section section-cream">
      <div className="content-grid reviews-layout">
        <div className="soft-panel text-panel">
          <p className="panel-label red">Recenzie</p>
          <h2>Dôvera postavená na tisícoch zastávok.</h2>
          <p>
            Hodnotenie {site.rating} a viac než {site.reviewsCount} recenzií pomáhajú návštevníkovi rýchlo sa rozhodnúť.
          </p>
        </div>
        <div className="quote-grid">
          {reviews.map((review) => (
            <blockquote key={review} className="soft-panel quote-panel">
              <p>„{review}“</p>
            </blockquote>
          ))}
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
    <section id="kontakt" className="page-section section-white">
      <div className="content-grid contact-grid">
        <div>
          <div className="soft-panel text-panel">
            <p className="panel-label red">Kontakt</p>
            <h2>Zastavte sa pri D1 alebo si vybavte jedlo vopred.</h2>
          </div>
          <div className="contact-list">
            <ContactBlock label="Adresa" value={site.address} />
            <ContactBlock label="Telefón" value={site.phone} href={site.phoneHref} />
            <ContactBlock label="Otváracie hodiny" value={site.openingHours} />
          </div>
          <div className="mini-list-grid">
            <MiniList title="Platby" items={site.payment} />
            <MiniList title="Parkovanie" items={site.parking} />
            <MiniList title="Prístup" items={site.accessibility} />
          </div>
        </div>

        <div id="rezervacia" className="contact-side">
          <form className="soft-panel form-panel" onSubmit={onSubmit}>
            <h3>Rezervácia alebo rýchly dopyt</h3>
            <div className="form-grid">
              <label>
                Meno
                <input name="name" required />
              </label>
              <label>
                Telefón
                <input name="phone" required />
              </label>
              <label>
                Dátum
                <input name="date" type="date" />
              </label>
              <label>
                Počet osôb
                <input min="1" name="people" type="number" />
              </label>
            </div>
            <label className="message-label">
              Správa
              <textarea name="message" placeholder="Rezervácia, Drive In, skupina alebo otázka k ponuke" />
            </label>
            <button className="button button-red full" type="submit">
              Odoslať dopyt
            </button>
            {formSent && <p className="success-message">Ďakujeme, dopyt sme prijali. Čoskoro sa ozveme.</p>}
          </form>
          <iframe
            className="map-frame"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={site.mapEmbed}
            title="Mapa Motorest Čataj"
          />
        </div>
      </div>
    </section>
  );
}

function ContactBlock({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = href ? (
    <a href={href}>{value}</a>
  ) : (
    <p>{value}</p>
  );

  return (
    <div className="soft-panel contact-block">
      <p className="panel-label">{label}</p>
      {content}
    </div>
  );
}

function MiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="soft-panel mini-list">
      <h3>{title}</h3>
      <ul>
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
    <div className="assistant-wrap">
      {isOpen && (
        <section className="assistant-panel">
          <div className="assistant-head">
            <div>
              <p className="panel-label red">Rýchly asistent</p>
              <h2>Ako pomôžeme?</h2>
            </div>
            <button className="close-button" onClick={onToggle} type="button" aria-label="Zavrieť asistenta">
              ×
            </button>
          </div>
          <div className="assistant-choices">
            <AssistantChoice active={topic === "menu"} label="Menu" onClick={() => onPickTopic("menu")} />
            <AssistantChoice active={topic === "drive"} label="Drive In" onClick={() => onPickTopic("drive")} />
            <AssistantChoice active={topic === "family"} label="Rezervácia" onClick={() => onPickTopic("family")} />
            <AssistantChoice active={topic === "contact"} label="Kontakt" onClick={() => onPickTopic("contact")} />
          </div>
          <div className="assistant-answer">
            <h3>{reply.title}</h3>
            <p>{reply.body}</p>
            <a
              className="button button-red"
              href={reply.href}
              target={reply.href.startsWith("http") ? "_blank" : undefined}
              rel={reply.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {reply.action}
            </a>
          </div>
        </section>
      )}
      <button className="assistant-toggle" onClick={onToggle} type="button" aria-expanded={isOpen}>
        {isOpen ? "Zavrieť" : "Rýchla pomoc"}
      </button>
    </div>
  );
}

function AssistantChoice({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button className={active ? "active" : ""} onClick={onClick} type="button">
      {label}
    </button>
  );
}
