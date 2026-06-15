import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { projects } from "../data/projects";
import type { Project } from "../types";

// ─── Contact row data ────────────────────────────────────────────────────────

interface ContactItem {
  label: string;
  handle: string;
  action: string;
  href: string;
  target?: string;
  copyValue?: string;
}

const contactItems: ContactItem[] = [
  {
    label: "Email",
    handle: "flaviofiszman@gmail.com",
    action: "Write me →",
    href: "mailto:flaviofiszman@gmail.com",
    copyValue: "flaviofiszman@gmail.com",
  },
  {
    label: "LinkedIn",
    handle: "in/flavio-fiszman",
    action: "Connect ↗",
    href: "https://linkedin.com/in/flavio-fiszman",
    target: "_blank",
  },
  {
    label: "GitHub",
    handle: "github.com/gitfla",
    action: "See code ↗",
    href: "https://github.com/gitfla",
    target: "_blank",
  },
  {
    label: "Résumé",
    handle: "PDF · 1 page",
    action: "Download ↓",
    href: "/FlavioFiszman.pdf",
    target: "_blank",
  },
];

// ─── Other work data ──────────────────────────────────────────────────────────

interface OtherWorkItem {
  name: string;
  description: string;
  year: string;
}

const otherWorkItems: OtherWorkItem[] = [
  {
    name: "Heartbeats",
    description: "TouchDesigner + heartbeat sensor AV installation",
    year: "2023",
  },
  {
    name: "XandAvião",
    description: "TouchDesigner arcade-style physical installation",
    year: "2023",
  },
  { name: "Pendura", description: "Art placement app", year: "2026" },
  {
    name: "Comidinha",
    description: "AI recipe and meal-planning app",
    year: "2026",
  },
  {
    name: "Digital Wellbeing / Flip to Shhh",
    description: "Android reliability and cross-team coordination (Google)",
    year: "2019–2021",
  },
  {
    name: "Cloud Dataflow / Apache Beam",
    description: "Early Google cloud infrastructure work",
    year: "2016–2017",
  },
  {
    name: "Escola SAP",
    description:
      "High school technology teaching, Python through cryptography (Rio de Janeiro)",
    year: "2023",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      to={"/projects/" + p.slug}
      className="card"
      style={{ minHeight: 260, display: "block" }}
    >
      <span className="eyebrow">
        {p.org} · {p.year}
      </span>
      <h3 className="h-title" style={{ fontSize: 22, margin: "12px 0 0" }}>
        {p.title}
      </h3>
      <p
        style={{
          fontSize: 14.5,
          lineHeight: 1.6,
          color: "var(--ink-2)",
          margin: "12px 0 0",
        }}
      >
        {p.summary}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
        {p.stack.map((s) => (
          <span key={s} className="pill">
            {s}
          </span>
        ))}
      </div>
      <span className="open-hint">open →</span>
    </Link>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button
      onClick={handleClick}
      title="Copy to clipboard"
      style={{
        fontFamily: "var(--mono)",
        fontSize: 11,
        color: copied ? "var(--accent)" : "var(--ink-3)",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "2px 6px",
        letterSpacing: "0.04em",
        transition: "color 0.15s",
      }}
    >
      {copied ? "copied!" : "copy"}
    </button>
  );
}

function ContactRow({ item }: { item: ContactItem }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={item.href}
      target={item.target}
      rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr auto",
        alignItems: "center",
        gap: 16,
        padding: "16px 0",
        minHeight: 48,
        borderBottom: "1px solid var(--rule-soft)",
        textDecoration: "none",
        color: "inherit",
        background: hovered ? "rgba(31,29,26,0.02)" : "transparent",
        transition: "background 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="eyebrow">{item.label}</span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 13,
            color: "var(--ink-2)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.handle}
        </span>
        {item.copyValue && <CopyButton value={item.copyValue} />}
      </span>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          color: "var(--accent)",
          letterSpacing: "0.04em",
        }}
      >
        {item.action}
      </span>
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage(): JSX.Element {
  const contentStyle: React.CSSProperties = {
    maxWidth: "var(--content-max)",
    margin: "0 auto",
  };

  return (
    <div className="route-fade">
      <Nav />

      {/* ── Hero ── */}
      <section>
        <div
          style={{
            ...contentStyle,
            padding: "var(--pad-hero-v) var(--pad-h) var(--pad-section-v)",
          }}
        >
          <div
            className="hero-eyebrow"
            style={{ display: "flex", alignItems: "center", gap: 14 }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "var(--accent)",
                display: "inline-block",
              }}
            />
            <span className="eyebrow" style={{ color: "var(--accent)" }}>
              Software Engineer
            </span>
          </div>

          <h1
            className="h-display"
            style={{
              fontSize: "clamp(38px, 5.2vw, 68px)",
              margin: "24px 0 0",
              maxWidth: "16ch",
            }}
          >
            Full-stack engineer building <em>end-to-end</em> products across
            web, data, and infrastructure.
          </h1>

          <p
            style={{
              fontFamily: "var(--sans)",
              fontSize: "clamp(15px, 1.4vw, 17px)",
              lineHeight: 1.55,
              color: "var(--ink-2)",
              maxWidth: "46ch",
              marginTop: 28,
              marginBottom: 0,
            }}
          >
            Five years at Google, across backend infrastructure, cloud systems,
            and Android. I'm drawn to projects where strong backend architecture
            meets thoughtful user experience.
          </p>
        </div>
      </section>

      {/* ── Project grid ── */}
      <section id="work">
        <div
          style={{
            ...contentStyle,
            padding: "32px var(--pad-h) var(--pad-section-v)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 32,
            }}
          >
            <h2 className="h-section" style={{ fontSize: 24, margin: 0 }}>
              Selected work
            </h2>
            <span className="meta">06 projects</span>
          </div>
          <hr className="rule" style={{ marginBottom: 24 }} />
          <div className="project-grid">
            {projects.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── About strip ── */}
      <section id="about">
        <div style={{ ...contentStyle, padding: "88px var(--pad-h)" }}>
          <div
            className="about-strip-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 420px",
              gap: 64,
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 15,
                  color: "var(--ink-2)",
                }}
              >
                About
              </span>
              <p
                className="h-title"
                style={{
                  fontSize: "clamp(24px, 2.6vw, 32px)",
                  lineHeight: 1.3,
                  margin: "16px 0 28px",
                  color: "var(--ink)",
                }}
              >
                Around ten years of experience, five at Google and now shipping
                product work end-to-end for clients.
              </p>
              <Link to="/about" className="link-arrow" style={{ fontSize: 14 }}>
                Read more <span className="arr">→</span>
              </Link>
            </div>
            <div
              className="about-photo-wrap"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                style={{
                  width: 250,
                  height: 250,
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/flavio.png"
                  alt="Flavio Fiszman"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "40% 35%",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other work ── */}
      <section>
        <div
          style={{
            ...contentStyle,
            padding: "0 var(--pad-h) var(--pad-section-v)",
            borderTop: "1px solid var(--rule-soft)",
          }}
        >
          <h2
            className="h-section"
            style={{ fontSize: 18, margin: "48px 0 20px" }}
          >
            Other work
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--ink-2)",
              lineHeight: 1.6,
              margin: "0 0 24px",
              maxWidth: "52ch",
            }}
          >
            Smaller projects and experiments: creative technology,
            installations, teaching.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {otherWorkItems.map((item) => (
              <li
                key={item.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--rule-soft)",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: 14,
                      color: "var(--ink)",
                      fontWeight: 500,
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: "var(--ink-2)",
                      marginLeft: 10,
                    }}
                  >
                    {item.description}
                  </span>
                </div>
                <span className="meta">{item.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact">
        <div
          style={{
            ...contentStyle,
            padding: "var(--pad-section-v) var(--pad-h) 88px",
            borderTop: "1px solid var(--rule)",
          }}
        >
          <div
            className="contact-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
              gap: "clamp(40px, 5vw, 64px)",
              alignItems: "start",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 15,
                  color: "var(--ink-2)",
                }}
              >
                Contact
              </span>
              <h2
                className="h-title"
                style={{
                  fontSize: "clamp(26px, 3.2vw, 42px)",
                  lineHeight: 1.18,
                  margin: "16px 0 20px",
                  maxWidth: "14ch",
                }}
              >
                Have something to{" "}
                <em
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    color: "var(--accent-ink)",
                  }}
                >
                  build?
                </em>{" "}
                Let's talk.
              </h2>
              <p
                style={{
                  fontSize: 14.5,
                  color: "var(--ink-2)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Available for senior engineering roles — backend,
                infrastructure, product engineering. Remote, US / EU hours.
              </p>
            </div>
            <div style={{ borderTop: "1px solid var(--rule)" }}>
              {contactItems.map((item) => (
                <ContactRow key={item.label} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
