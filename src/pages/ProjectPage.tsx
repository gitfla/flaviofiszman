import { useParams, Link } from "react-router-dom";
import { projects, getProject } from "../data/projects";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ImageFigure from "../components/ImageFigure";
import type { Project } from "../types";

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProjectHeader({ project }: { project: Project }): JSX.Element {
  return (
    <header
      style={{
        maxWidth: "var(--content-max)",
        margin: "0 auto",
        padding: "80px var(--pad-inner) 32px",
      }}
    >
      <Link
        to="/"
        className="link-arrow"
        style={{
          fontSize: 13,
          color: "var(--ink-3)",
          borderBottom: 0,
          paddingBottom: 0,
        }}
      >
        <span
          className="arr"
          style={{ display: "inline-block", transform: "rotate(180deg)" }}
        >
          →
        </span>{" "}
        Back to work
      </Link>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          gap: 16,
          marginTop: 36,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            color: "var(--ink-3)",
            letterSpacing: "0.06em",
          }}
        >
          {project.index} / 06
        </span>
        <span className="meta">
          {project.org} · {project.year}
        </span>
      </div>

      <h1
        className="h-display"
        style={{
          fontSize: "clamp(36px, 5.4vw, 68px)",
          margin: "18px 0 0",
          maxWidth: "20ch",
        }}
      >
        {project.title}
      </h1>

      <p
        style={{
          marginTop: 28,
          fontFamily: "var(--serif)",
          fontWeight: 400,
          fontVariationSettings: '"opsz" 36, "SOFT" 50',
          fontStyle: "italic",
          fontSize: "clamp(18px, 1.8vw, 22px)",
          lineHeight: 1.45,
          color: "var(--ink-2)",
          maxWidth: "44ch",
          margin: "28px 0 0",
        }}
      >
        {project.summary}
      </p>
    </header>
  );
}

function ProjectMeta({ project }: { project: Project }): JSX.Element {
  const rows: { key: string; value: string }[] = [
    { key: "Role", value: project.role },
    { key: "At", value: project.org },
    { key: "When", value: project.year },
    { key: "Stack", value: project.stack.join(", ") },
  ];
  const hasLinks = Boolean(project.liveUrl || project.githubUrl);

  return (
    <aside>
      {rows.map(({ key, value }) => (
        <div
          key={key}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            marginBottom: 20,
          }}
        >
          <span className="eyebrow">{key}</span>
          <span style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.5 }}>
            {value}
          </span>
        </div>
      ))}
      {hasLinks && (
        <div
          style={{
            borderTop: "1px solid var(--rule)",
            marginTop: 8,
            paddingTop: 20,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow"
              style={{ fontSize: 13 }}
            >
              {project.liveLabel ?? "Live site"} <span className="arr">↗</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow"
              style={{ fontSize: 13 }}
            >
              GitHub <span className="arr">↗</span>
            </a>
          )}
        </div>
      )}
    </aside>
  );
}

function ProjectBody({ project }: { project: Project }): JSX.Element {
  return (
    <div className="prose">
      {project.body.map((block, i) => {
        if (block.kind === "h") return <h3 key={i}>{block.text}</h3>;
        if (block.kind === "p") return <p key={i}>{block.text}</p>;
        if (block.kind === "p-link")
          return (
            <p key={i}>
              {block.text}
              <a
                href={block.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  borderBottom: "1px solid var(--rule)",
                  paddingBottom: 1,
                }}
              >
                {block.linkText}
              </a>
              .
            </p>
          );
        if (block.kind === "list")
          return (
            <ul key={i}>
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        return null;
      })}
    </div>
  );
}

// ─── Lead image ───────────────────────────────────────────────────────────────

interface LeadImageEntry {
  src: string;
  alt: string;
  caption?: string;
  noLightbox?: boolean;
}

// Portrait projects: all images shown side-by-side as a group (no separate lead/secondary split)
const PORTRAIT_IMAGES: Record<string, { src: string; alt: string }[]> = {
  "android-conversation-widget": [
    {
      src: "/projects/android-widget/android-12-conversations-widget-1.webp",
      alt: "Conversations Widget on Pixel homescreen",
    },
    {
      src: "/projects/android-widget/android-12-conversations-widget-2.webp",
      alt: "Conversations Widget — contact detail",
    },
  ],
  "repair-ticketing-app": [
    {
      src: "/projects/repair-ticketing/manu-ticket-list.png",
      alt: "Ticket list",
    },
    {
      src: "/projects/repair-ticketing/manu-ticket-detail.png",
      alt: "Ticket detail view",
    },
    {
      src: "/projects/repair-ticketing/manu-new-ticket-form.png",
      alt: "New ticket form",
    },
  ],
};

const LEAD_IMAGES: Record<string, LeadImageEntry> = {
  "kaggle-search-migration": {
    src: "/projects/kaggle/arch.svg",
    alt: "Kaggle search infrastructure — pipeline architecture",
  },
  "pleasure-states": {
    src: "/projects/pleasure-states/splash-screen-1.png",
    alt: "Pleasure States — splash screen",
  },
  serve: {
    src: "/projects/serve/serve-architecture.svg",
    alt: "Serve architecture: indexing and conversation pipelines",
    caption: "Two pipelines: indexing and conversation.",
    noLightbox: true,
  },
  "carnaval-companion-app": {
    src: "/projects/carnaval/photo_2026-06-15%2013.48.12.jpeg",
    alt: "Carnaval Companion App",
  },
};

function LeadImage({ project }: { project: Project }): JSX.Element | null {
  // Portrait projects render all images side-by-side instead
  const portraits = PORTRAIT_IMAGES[project.slug];
  if (portraits) {
    return (
      <div
        style={{
          maxWidth: "var(--content-max)",
          margin: "48px auto 0",
          padding: "0 var(--pad-inner)",
          display: "grid",
          gridTemplateColumns: `repeat(${portraits.length}, 1fr)`,
          gap: 12,
          alignItems: "start",
        }}
      >
        {portraits.map((img) => (
          <ImageFigure key={img.src} src={img.src} alt={img.alt} />
        ))}
      </div>
    );
  }

  const entry = LEAD_IMAGES[project.slug];
  if (!entry) return null;

  return (
    <div
      style={{
        maxWidth: "var(--content-max)",
        margin: "48px auto 0",
        padding: "0 var(--pad-inner)",
      }}
    >
      <ImageFigure
        src={entry.src}
        alt={entry.alt}
        caption={entry.caption}
        noLightbox={entry.noLightbox}
      />
    </div>
  );
}

// ─── Secondary images ─────────────────────────────────────────────────────────

interface SecondaryImage {
  src: string;
  alt: string;
}
const SECONDARY_IMAGES: Record<string, SecondaryImage[]> = {
  "kaggle-search-migration": [
    {
      src: "/projects/kaggle/access.svg",
      alt: "Kaggle search — access control logic diagram",
    },
  ],
  serve: [
    {
      src: "/projects/serve/serve-select.png",
      alt: "Serve — writer selection",
    },
    { src: "/projects/serve/serve-chat.png", alt: "Serve — conversation view" },
  ],
  "pleasure-states": [
    {
      src: "/projects/pleasure-states/splash-screen-2.jpeg",
      alt: "Pleasure States — splash screen variant",
    },
    {
      src: "/projects/pleasure-states/what-we-do.jpeg",
      alt: "Pleasure States — what we do section",
    },
  ],
  "carnaval-companion-app": [
    {
      src: "/projects/carnaval/carnaval-event.png",
      alt: "Carnaval Companion — event detail",
    },
    {
      src: "/projects/carnaval/carnaval-checkin.png",
      alt: "Carnaval Companion — check-in",
    },
  ],
};

function SecondaryImages({
  project,
}: {
  project: Project;
}): JSX.Element | null {
  const images = SECONDARY_IMAGES[project.slug];
  if (!images || images.length === 0) return null;

  return (
    <div
      style={{
        maxWidth: "var(--content-max)",
        margin: "64px auto 0",
        padding: "0 var(--pad-inner)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(480px, 100%), 1fr))",
        gap: 16,
        alignItems: "start",
      }}
    >
      {images.map((img) => (
        <ImageFigure key={img.src} src={img.src} alt={img.alt} />
      ))}
    </div>
  );
}

function ProjectNextPrev({
  prev,
  next,
}: {
  prev: Project;
  next: Project;
}): JSX.Element {
  return (
    <div
      style={{
        maxWidth: "var(--content-max)",
        margin: "80px auto 0",
        padding: "0 var(--pad-inner)",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {(
          [
            { p: prev, label: "← Previous", align: "left" },
            { p: next, label: "Next →", align: "right" },
          ] as const
        ).map(({ p, label, align }) => (
          <Link
            key={p.slug}
            to={"/projects/" + p.slug}
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              padding: "clamp(18px, 2.5vw, 28px)",
              textAlign: align,
              alignItems: align === "right" ? "flex-end" : "flex-start",
            }}
          >
            <span className="eyebrow">{label}</span>
            <span
              className="h-title"
              style={{ fontSize: "clamp(16px, 1.6vw, 20px)" }}
            >
              {p.title}
            </span>
            <span className="meta">
              {p.org} · {p.year}
            </span>
          </Link>
        ))}
      </div>
      <div style={{ paddingBottom: 80 }} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug ?? "") ?? projects[0];
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <Nav />
      <div className="route-fade">
        <ProjectHeader project={project} />

        <LeadImage project={project} />

        <div
          className="sidebar-layout"
          style={{
            maxWidth: "var(--content-max)",
            margin: "72px auto 0",
            padding: "0 var(--pad-inner)",
          }}
        >
          <ProjectMeta project={project} />
          <ProjectBody project={project} />
        </div>

        <SecondaryImages project={project} />

        <ProjectNextPrev prev={prev} next={next} />
        <Footer />
      </div>
    </>
  );
}
