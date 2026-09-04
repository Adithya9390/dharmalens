import type { Category } from "../types";

export const CATEGORIES: Category[] = [
  {
    id: "decision-making",
    index: "01",
    title: "Decision Making",
    tagline: "When every option costs something",
    description:
      "Sunk costs, reversibility, escalation and the discipline of choosing under real pressure.",
  },
  {
    id: "leadership",
    index: "02",
    title: "Leadership",
    tagline: "Power, recognition and responsibility",
    description:
      "Credit, fairness, stepping into roles you only half-know, and leading without a script.",
  },
  {
    id: "conflict",
    index: "03",
    title: "Team Conflict",
    tagline: "Friction between people who need each other",
    description:
      "Feuding teams, humiliation, retaliation cycles and the craft of de-escalation.",
  },
  {
    id: "ethics",
    index: "04",
    title: "Ethics",
    tagline: "Technically true is not the same as true",
    description:
      "Half-truths, bystander silence, and what integrity costs when it is inconvenient.",
  },
  {
    id: "loyalty",
    index: "05",
    title: "Loyalty vs Responsibility",
    tagline: "When gratitude points one way and duty another",
    description:
      "Mentors who err, friends who fail, and the limits that keep loyalty from becoming complicity.",
  },
  {
    id: "ai-ethics",
    index: "06",
    title: "AI Ethics",
    tagline: "Systems inherit the blind spots of their makers",
    description:
      "Bias, automation pressure, and the duty of foresight before a system touches people.",
  },
  {
    id: "negotiation",
    index: "07",
    title: "Negotiation",
    tagline: "Ask clearly. Hold with dignity.",
    description:
      "Minimum just demands, anchoring without aggression, and keeping relationships intact.",
  },
  {
    id: "pressure",
    index: "08",
    title: "Pressure & Uncertainty",
    tagline: "Deciding when the data is incomplete",
    description:
      "Crisis hours, paralysis, and why steadiness of mind is itself a decision.",
  },
];

export const categoryTitle = (id: string): string =>
  CATEGORIES.find((c) => c.id === id)?.title ?? id;
