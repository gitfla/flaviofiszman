import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";

function useScrollTo() {
  const navigate = useNavigate();
  const location = useLocation();

  return (anchor: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const scroll = () => {
      const el = document.getElementById(anchor);
      if (el) {
        const navHeight = document.querySelector("nav")?.getBoundingClientRect().height ?? 0;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };
    if (location.pathname === "/") {
      scroll();
    } else {
      navigate("/");
      setTimeout(scroll, 80);
    }
  };
}

export default function Nav(): JSX.Element {
  const scrollTo = useScrollTo();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const links = [
    { label: "Work", anchor: "work" },
    { label: "About", anchor: "about" },
    { label: "Contact", anchor: "contact" },
  ];

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "rgba(248, 248, 248, 0.82)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          padding: "var(--nav-pad-v) var(--pad-h)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
          <span style={{ fontFamily: "var(--sans)", fontSize: 15, fontWeight: 500, letterSpacing: "-0.005em", color: "var(--ink)" }}>
            Flavio Fiszman
          </span>
        </a>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 32 }}>
            {links.map((l) => (
              <a key={l.label} href={`/#${l.anchor}`} className="nav-link" onClick={scrollTo(l.anchor)}>
                {l.label}
              </a>
            ))}
          </div>
        )}

        {/* Mobile menu toggle */}
        {isMobile && (
          <button
            onClick={() => setOpen((o) => !o)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: "var(--mono)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--ink-2)",
            }}
          >
            {open ? "Close" : "Menu"}
          </button>
        )}
      </div>

      {/* Mobile dropdown */}
      {isMobile && open && (
        <div
          style={{
            borderTop: "1px solid var(--rule-soft)",
            borderBottom: "1px solid var(--rule-soft)",
            background: "rgba(248, 248, 248, 0.96)",
            padding: "8px var(--pad-h) 20px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={`/#${l.anchor}`}
              className="nav-link"
              style={{ fontSize: 15 }}
              onClick={(e) => { scrollTo(l.anchor)(e); setOpen(false); }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
