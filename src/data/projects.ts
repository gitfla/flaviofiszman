import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "kaggle-search-migration",
    index: "01",
    title: "Search Platform Migration",
    org: "Google / Kaggle",
    year: "2018\u20132019",
    role: "Sole engineer",
    summary:
      "Migrated Kaggle\u2019s search from Azure to Elasticsearch on Kubernetes as part of the post-acquisition move to GCP. Designed and shipped private-content search with owner, role, and group-based access.",
    stack: ["Elasticsearch", "Kubernetes", "GCP", "React"],
    liveUrl: undefined,
    heroPlaceholder:
      "Architecture diagram \u2014 production DB \u2192 indexing service \u2192 ES on GKE \u2192 query API",
    body: [
      { kind: "h", text: "Context" },
      {
        kind: "p",
        text: "After Google acquired Kaggle, the entire platform had to move from Azure to GCP: database, services, infrastructure. Search was my piece. I owned it end-to-end for about six months as the sole engineer.",
      },
      { kind: "h", text: "What I built" },
      {
        kind: "p",
        text: "I chose Elasticsearch on GKE, then designed and built the full pipeline: index design for Kaggle\u2019s content types (datasets, notebooks, competitions, users, discussions), the indexing service syncing from production, the Kubernetes deployment, and the query layer behind a redesigned search UX with filters Azure Search couldn\u2019t support.",
      },
      {
        kind: "p",
        text: "The harder half was search over private and shared content: private datasets and notebooks, content shared with specific users, groups, or organizations. All of it had to be searchable by the right people, invisible to everyone else, at the same latency as public search. I designed the access model around owners, roles, and groups, and built permission resolution into the query path so checks happened at search time without a separate filter pass.",
      },
      { kind: "h", text: "Hardest part" },
      {
        kind: "p",
        text: "The real risk wasn\u2019t returning private content to the right user. It was making sure it never appeared to the wrong one. Permissions change constantly: content gets unshared, group membership changes, datasets flip visibility. The system had to reconcile search latency, index freshness, and correctness under edge cases. I designed it to fail closed (when in doubt, don\u2019t return the result) and built the pipeline to propagate permission changes fast rather than relying on periodic re-indexing.",
      },
      { kind: "h", text: "Outcome" },
      {
        kind: "p",
        text: "Shipped on schedule as part of Kaggle\u2019s 18-month GCP migration, the first such migration at Google to complete. Search ran on Elasticsearch on GKE in production, served public and private content under the new access model, and supported the redesigned UX.",
      },
      { kind: "h", text: "Stack" },
      {
        kind: "list",
        items: [
          "Elasticsearch",
          "Kubernetes (GKE)",
          "GCP",
          "React",
          "Azure Search (decommissioned)",
        ],
      },
    ],
  },
  {
    slug: "android-conversation-widget",
    index: "02",
    title: "Android Conversation Widget",
    org: "Google / Android",
    year: "2020\u20132021",
    role: "Co-developer (2 of 2)",
    summary:
      "Co-developed the Conversations Widget that shipped as part of Android 12, a homescreen widget that surfaces recent messages, missed calls, and contact activity. Owned the notification-interception layer that pulled messages from any messaging app.",
    stack: ["Android", "Kotlin", "Android Notification APIs"],
    liveUrl: "https://9to5google.com/2023/02/05/android-conversations-widget/",
    liveLabel: "Press coverage",
    heroPlaceholder:
      "Screenshot \u2014 Conversations Widget on Pixel homescreen",
    body: [
      { kind: "h", text: "Context" },
      {
        kind: "p",
        text: "Two engineers, working closely together on a new system widget for the Android homescreen. We split by area: my co-developer owned the contacts integration, and I owned notification interception and message ingestion, plus the visual treatment for special message content.",
      },
      { kind: "h", text: "What I built" },
      {
        kind: "p",
        text: "The widget needed to show recent messages from any messaging app the user had installed, not just one. I built on top of Android\u2019s notification system, classifying incoming notifications by app and message type and surfacing them in the widget UI.",
      },
      {
        kind: "p",
        text: "Some apps didn\u2019t play nicely. Their notifications weren\u2019t classified as message notifications because third-party apps integrate with Android in different ways, and the message text wasn\u2019t always accessible from the notification payload. That meant per-app handling and fallbacks. I also built the visual enhancements that picked up on message content: messages ending in emojis or special punctuation got distinct treatment in the widget, making the UI feel responsive to the actual conversation rather than just showing text.",
      },
      { kind: "h", text: "What made it interesting" },
      {
        kind: "p",
        text: "Working inside Android\u2019s privacy model. A system widget that reads from notifications has tight constraints on what data it can access and what it can show. Some features we initially wanted turned out to be off-limits for good reasons, and we designed around them. The per-app notification handling was the same shape of problem: the platform gives you a consistent API, but the long tail of messaging apps use it inconsistently, so the work was as much about graceful fallbacks as it was about the happy path. Shipping a system widget also means strict performance and battery budgets, which shaped a lot of small implementation choices.",
      },
      { kind: "h", text: "Outcome" },
      {
        kind: "p-link",
        text: "Shipped as part of Android 12, available on Pixel and beyond. Got coverage in ",
        linkText: "9to5Google",
        href: "https://9to5google.com/2023/02/05/android-conversations-widget/",
      },
      { kind: "h", text: "Stack" },
      {
        kind: "list",
        items: [
          "Android (Kotlin/Java)",
          "Android Notification APIs",
          "Android system widget framework",
        ],
      },
    ],
  },
  {
    slug: "repair-ticketing-app",
    index: "03",
    title: "Repair Ticketing App",
    org: "Client work",
    year: "2024\u20132025",
    role: "Tech lead, sole engineer",
    summary:
      "Built and shipped a production repair ticketing app for a sales team inside a global cosmetics company. In active use for over a year, processing hundreds of tickets, with role-based admin workflows and automated budget generation.",
    stack: ["FlutterFlow", "Firebase", "Cloud Functions"],
    heroPlaceholder:
      "Screenshots \u2014 ticket list, ticket detail, admin workflow, budget output",
    body: [
      { kind: "h", text: "Context" },
      {
        kind: "p",
        text: "The client\u2019s team sells products into pharmacies and needed a way to track repair and support tickets across their points of sale: ticket creation, status tracking, evidence photos, automated budgets based on what needed fixing. I built it solo, end-to-end, on a tight budget and timeline.",
      },
      { kind: "h", text: "What I built" },
      {
        kind: "p",
        text: "The app on FlutterFlow + Firebase, with the heavier logic in Cloud Functions:",
      },
      {
        kind: "list",
        items: [
          "Ticket lifecycle: creation by sales-point users, status management, image upload for problem evidence and resolution proof, association with specific sales points and their locations.",
          "Admin workflows: role-based access for admins to triage, update, and close tickets across the network.",
          "Automated budget generation: Cloud Functions that compute repair budgets from the ticket inputs (sizes, quantities, formulas) so admins don\u2019t price each one by hand.",
        ],
      },
      { kind: "h", text: "Design decisions" },
      {
        kind: "p",
        text: "Two choices shaped this project. The first was the platform. FlutterFlow + Firebase let me ship the whole thing solo on the budget and timeline available. A custom React Native or Flutter app would have been technically cleaner but wouldn\u2019t have shipped on time. The fact that the app is still in production a year later is the evidence that the call was right.",
      },
      {
        kind: "p",
        text: "The second was where to put the budget logic. FlutterFlow can express simple formulas inline, but the pricing rules had real complexity: multiple inputs, formula-driven, needs to be auditable when something looks wrong. I put it in Cloud Functions instead, which kept the business logic in version-controlled, testable code outside the low-code surface. When the rules needed to change later, it was a code review rather than a click-through.",
      },
      { kind: "h", text: "Outcome" },
      {
        kind: "p",
        text: "In active production for over a year. Hundreds of tickets processed. Used by the client\u2019s sales team and admins across multiple points of sale.",
      },
      { kind: "h", text: "Stack" },
      {
        kind: "list",
        items: [
          "FlutterFlow",
          "Firebase (Firestore, Auth, Storage)",
          "Google Cloud Functions",
        ],
      },
    ],
  },
  {
    slug: "carnaval-companion-app",
    index: "04",
    title: "Carnaval Companion App",
    org: "Client work",
    year: "2025",
    role: "Tech lead \u00b7 backend, data, integrations",
    summary:
      "Tech lead and sole backend engineer on a mobile companion app for Rio Carnaval, with a feed, ticketed events with biometric entry, AR camera, and a Flickr-synced photo gallery. Built end-to-end in 3 months with one mobile developer.",
    stack: [
      "React Native",
      "Firebase",
      "Retool",
      "Snap Camera Kit",
      "Flickr API",
    ],
    heroPlaceholder:
      "Screenshots \u2014 feed, calendar/tickets, AR camera, gallery",
    body: [
      { kind: "h", text: "Context" },
      {
        kind: "p",
        text: "A four-area mobile app for Carnaval-goers: an Instagram-style feed, a calendar of events with ticketing (some requiring biometric registration for entry), a camera section with AR filters powered by Snap Camera Kit, and a photo gallery synced from a Flickr account. Two engineers: a mobile developer who owned the React Native client end-to-end, and me on backend, data, integrations, admin tooling, and security.",
      },
      { kind: "h", text: "What I built" },
      {
        kind: "p",
        text: "The interesting part of this project was the shape of the system: four feature areas, four different integrations, all wired to a single admin surface, in three months. Holding that together meant getting the data model and security boundaries right early so the rest stayed tractable.",
      },
      {
        kind: "list",
        items: [
          "Data model and Firebase backend for posts, events, tickets, users, gallery items, and notifications, with Firestore security rules to match the access model.",
          "Biometric ticketing integration with a third-party biometrics provider, so users registered their face when buying tickets for events that required it. Spec, integrate, and ship in roughly two weeks.",
          "Flickr sync engine that kept the client\u2019s Flickr albums mirrored into our database (fresh URLs, updated metadata, fast loads on device) so the gallery section always reflected the current state of the source without hitting Flickr on every request.",
          "Retool admin app for the client team to create posts, schedule events, send notifications, and trigger Flickr syncs.",
          "Signed-URL upload pipeline for user-generated and admin-uploaded images, with gated, time-limited access.",
        ],
      },
      { kind: "h", text: "Outcome" },
      {
        kind: "p",
        text: "Fully implemented across all four areas. Launch was paused before release due to changing priorities on the client side; I retained the right to showcase the work.",
      },
      { kind: "h", text: "Stack" },
      {
        kind: "list",
        items: [
          "React Native (mobile)",
          "Firebase (Firestore, Auth, Storage, Cloud Functions)",
          "Retool (admin)",
          "Snap Camera Kit",
          "Flickr API",
          "Third-party biometrics API",
        ],
      },
    ],
  },
  {
    slug: "pleasure-states",
    index: "05",
    title: "Pleasure States",
    org: "Client work",
    year: "2024",
    role: "Sole engineer \u00b7 de facto UX lead",
    summary:
      "Built and shipped the website for Pleasure States, an art direction studio based in New York. Translated a highly art-directed visual concept into a custom interactive site with fullscreen video, snap-scroll choreography, and animated transitions.",
    stack: ["HTML", "CSS", "JavaScript", "Vercel"],
    liveUrl: "https://pleasurestates.com",
    heroPlaceholder:
      "Screenshots \u2014 splash screen, scroll choreography, key transition",
    body: [
      { kind: "h", text: "Context" },
      {
        kind: "p",
        text: "Pleasure States is the studio of a New York-based art director. The brief wasn\u2019t a marketing site. It was closer to a digital installation: cinematic fullscreen sections, video and motion as primary content, scroll behavior treated as part of the choreography rather than just a way to move through the page. I worked directly with the art director and a visual designer across multiple feedback rounds, built the whole thing in custom HTML/CSS/JS, and deployed it on Vercel.",
      },
      { kind: "h", text: "What I built" },
      {
        kind: "list",
        items: [
          "Custom frontend, not no-code. Hand-written HTML/CSS/JS with custom interaction logic: splash-screen animation, scroll-snap navigation, animated transitions between sections, fullscreen video handling.",
          "Mobile interaction layer. Mobile-specific interaction adjustments, handling of mobile autoplay restrictions, and performance work for video-heavy pages so the experience held up on phones.",
          "Production deployment pipeline. Vercel deployment with Git-based version control, DNS and domain configuration, SEO/canonical setup.",
        ],
      },
      { kind: "h", text: "What made it interesting" },
      {
        kind: "p",
        text: "The real work on a project like this is bridging an artistic vision and a site that actually has to function. The visual designer was strong on aesthetics, and I ended up being the de facto UX voice, thinking through what happens on the first tap, the third, the tenth, where intent and usability sometimes pulled in different directions.",
      },
      {
        kind: "p",
        text: "The most interesting decisions came in the middle of the build, when ambitious early ideas met working code. Some held up beautifully and shipped; others we adjusted together once we could see them in motion. That back-and-forth \u2014 holding the artistic intent and the practical experience as equally real constraints \u2014 is the part of creative-tech work I find most rewarding.",
      },
      { kind: "h", text: "Outcome" },
      {
        kind: "p",
        text: "Site is live and in active use as the studio\u2019s web presence. Delivered across multiple rounds of art-direction feedback, with the final experience visually consistent across devices while preserving the intended atmosphere.",
      },
      { kind: "h", text: "Stack" },
      {
        kind: "list",
        items: ["HTML", "CSS", "JavaScript", "Vercel", "GoDaddy (DNS)"],
      },
    ],
  },
  {
    slug: "serve",
    index: "06",
    title: "Serve",
    org: "Personal project",
    year: "2016 \u2192 present",
    role: "Sole engineer",
    summary:
      "A long-running personal project that simulates conversations between writers using semantic retrieval. Users browse a curated set of authors, type a prompt, and get back the most semantically relevant sentences from a database of embedded texts.",
    stack: [
      "React",
      "TypeScript",
      "Node",
      "Cloud Run",
      "Supabase",
      "pgvector",
      "Cohere",
    ],
    liveUrl: "#",
    githubUrl: "#",
    heroPlaceholder:
      "Architecture diagram \u2014 frontend \u2192 Cloud Run \u2192 Cohere + Supabase, with retrieval flow",
    body: [
      { kind: "h", text: "Context" },
      {
        kind: "p",
        text: "The original version was a 2016 experiment: I indexed one book from each of several writers as an inverted index, picked a starting sentence at random, then used TF-IDF to find the most semantically similar sentence from a different writer\u2019s book, letting the \u201cconversation\u201d unfold across the source texts. It worked, in a strange and lovely way.",
      },
      {
        kind: "p",
        text: "I rebuilt it in 2024 with embeddings instead of TF-IDF, a real backend, and a real database, partly to bring it up to current methods, partly as a portfolio-scale full-stack project I could actually point at and defend.",
      },
      { kind: "h", text: "What I built" },
      {
        kind: "p",
        text: "Modern full-stack, intentionally lightweight and designed to run cheaply:",
      },
      {
        kind: "list",
        items: [
          "Frontend: React + TypeScript on Vite, deployed on Vercel.",
          "Backend: Node.js + TypeScript API, structured into routes / controllers / services, deployed on Google Cloud Run with GitHub-triggered deploys.",
          "Data: Postgres with pgvector on Supabase for embeddings and metadata; the relational schema models writers, texts, sentences, and conversations as first-class objects.",
          "Retrieval: Sentences embedded individually via the Cohere API at index time; user prompts embedded at query time; cosine similarity for retrieval, with top matches logged for debugging.",
        ],
      },
      { kind: "h", text: "What made it interesting" },
      {
        kind: "p",
        text: "The schema is the spine of the project. Writers, texts, sentences, conversations, and the relationships between them: getting that model right is what turns \u201csemantic search demo\u201d into something you can actually build features on top of. The current schema lets the system treat a \u201cconversation\u201d as a first-class object with its own history, which is what makes follow-up retrieval coherent rather than just a series of independent queries.",
      },
      {
        kind: "p",
        text: "The 2016 to 2024 jump is itself part of the project. The same idea went from being a manual inverted-index exercise to a one-line embedding call against an off-the-shelf API. The work moved up the stack: less about implementing retrieval primitives, more about schema design, deployment, cost management, and shaping a coherent user experience. That shift is the shift in the whole field over those years.",
      },
      { kind: "h", text: "Outcome" },
      {
        kind: "p",
        text: "Live and in active use as a public demo. The project is intentionally never finished. I keep returning to it as embedding models, vector databases, and retrieval approaches evolve, which is half the point.",
      },
      { kind: "h", text: "Stack" },
      {
        kind: "list",
        items: [
          "React + TypeScript (Vite)",
          "Node.js + TypeScript",
          "Google Cloud Run",
          "Supabase (Postgres + pgvector)",
          "Cohere embeddings",
          "Vercel",
          "GitHub Actions",
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
