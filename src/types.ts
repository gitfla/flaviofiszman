export interface Project {
  slug: string;
  index: string;        // "01", "02", etc.
  title: string;
  org: string;
  year: string;
  role: string;
  summary: string;
  stack: string[];
  liveUrl?: string;
  liveLabel?: string;   // overrides "Live site" label in sidebar
  githubUrl?: string;
  heroPlaceholder: string;    // label for the hero image placeholder
  body: ContentBlock[];
}

export type ContentBlock =
  | { kind: 'h'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'p-link'; text: string; linkText: string; href: string };
