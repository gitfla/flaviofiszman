const linkStyle: React.CSSProperties = {
  transition: "color 160ms ease",
  color: "var(--ink-3)",
  textDecoration: "none",
};

const links: { label: string; href: string; target?: string }[] = [
  { label: "flaviofiszman@gmail.com", href: "mailto:flaviofiszman@gmail.com" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/flavio-fiszman",
    target: "_blank",
  },
  {
    label: "GitHub",
    href: "https://github.com/gitfla",
    target: "_blank",
  },
  { label: "Resume (PDF)", href: "/FlavioFiszman.pdf", target: "_blank" },
];

export default function Footer(): JSX.Element {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--rule)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          padding: "40px var(--pad-h) 56px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Left: copyright */}
        <span
          className="meta"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--ink-3)",
          }}
        >
          © 2026 Flavio Fiszman
        </span>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--ink) !important;
        }
      `}</style>
    </footer>
  );
}
