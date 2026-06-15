import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function AboutPage(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="route-fade">
        <header style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "80px var(--pad-inner) 48px" }}>
          <Link to="/" className="link-arrow" style={{ fontSize: 13, color: "var(--ink-3)", borderBottom: 0, paddingBottom: 0 }}>
            <span className="arr" style={{ display: "inline-block", transform: "rotate(180deg)" }}>→</span>{" "}
            Back to work
          </Link>

          <span className="eyebrow" style={{ color: "var(--accent)", display: "block", marginTop: 36 }}>About</span>

          <h1 className="h-display" style={{ fontSize: "clamp(36px, 4.8vw, 60px)", margin: "16px 0 0", maxWidth: "16ch" }}>
            Flavio Fiszman
          </h1>
        </header>

        <main className="about-sidebar-layout" style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 var(--pad-inner) 120px" }}>
          <aside>
            <img src="/flavio.png" alt="Flavio Fiszman" className="sidebar-photo"
              style={{ width: "100%", display: "block", aspectRatio: "3 / 4", objectFit: "cover", objectPosition: "center 15%", border: "1px solid var(--rule)", marginBottom: 28 }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="eyebrow">Email</span>
              <a href="mailto:flaviofiszman@gmail.com" className="link-arrow" style={{ fontSize: 12 }}>
                flaviofiszman@gmail.com <span className="arr">→</span>
              </a>
            </div>
          </aside>

          <div>
            <div className="prose">
              <p>
                I'm a software engineer with around ten years of experience.
                Five of them were at Google, and then I moved onto shipping
                product work end-to-end for clients. At Google I worked across
                infrastructure, search, and mobile platforms; since then,
                independent client work with backend and cloud as my anchor.
              </p>
              <p>
                Whether at a large company or solo on a client engagement, I do
                my best work when I own a coherent slice of a system: the data
                model, the backend, the integrations, and the experience at the
                other end. That's been the through-line across both halves of my
                career so far.
              </p>
              <p>
                Alongside the engineering work, I've done a handful of
                creative-technology projects: physical installations and
                interactive art pieces. They're the same impulse as the rest of
                the work — making a system that does something specific and
                well, applied to different surfaces.
              </p>
              <p>
                I'm currently open to engineering work, freelance or full-time.
                The roles I'm most drawn to are ones where I can ship end-to-end
                features and stay close to the people using the software.
                Backend-leaning roles are also a good fit and a real interest,
                given the Google background. Happy to talk about either.
              </p>

              <h3>Google (2016–2021)</h3>
              <p>
                Infrastructure engineer on Cloud Dataflow / Apache Beam. Search
                engineer on Kaggle, migrating from Azure to GCP. Android
                engineer on the Conversations Widget in Android 12. Also:
                Digital Wellbeing / Flip to Shhh reliability and cross-team
                coordination.
              </p>

              <h3>Client work (2022–present)</h3>
              <p>
                Mobile apps, APIs, and web for clients across consumer, creative,
                and enterprise. Backend and cloud as the anchor; end-to-end when
                the project calls for it. Also CS teaching.
              </p>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
