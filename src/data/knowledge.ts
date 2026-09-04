/* Knowledge Explorer data — characters, parvas, themes, principles.
 * Deliberately conservative: descriptions are neutral, widely attested
 * summaries. No invented quotations, episodes, or relationships. */

export interface KBCharacter {
  id: string;
  name: string;
  epithet: string;
  bio: string;
  scenarioIds: string[];
}

export interface KBParva {
  id: string;
  index: string;
  name: string;
  meaning: string;
  desc: string;
  scenarioIds: string[];
}

export interface KBTheme {
  id: string;
  name: string;
  desc: string;
  scenarioIds: string[];
}

export interface KBPrinciple {
  id: string;
  name: string;
  desc: string;
  scenarioId: string;
}

export const KB_CHARACTERS: KBCharacter[] = [
  {
    id: "yudhishthira",
    name: "Yudhishthira",
    epithet: "The eldest Pandava",
    bio: "Famed for truthfulness and adherence to dharma; tested repeatedly by the dice hall, by exile, and by the language of half-truths.",
    scenarioIds: ["sunk-ship", "necessary-half-truth", "five-villages", "one-chair-left"],
  },
  {
    id: "arjuna",
    name: "Arjuna",
    epithet: "The archer",
    bio: "The Pandavas' greatest warrior. His collapse of nerve at the field's edge occasions the Bhagavad Gita's counsel on duty and steadiness.",
    scenarioIds: ["crisis-hour", "into-the-spiral"],
  },
  {
    id: "krishna",
    name: "Krishna",
    epithet: "Envoy and counsel",
    bio: "Cousin and guide of the Pandavas. Carries the peace mission to Hastinapura; counsels Arjuna when action itself comes into doubt.",
    scenarioIds: ["two-teams-one-goal", "five-villages", "crisis-hour"],
  },
  {
    id: "draupadi",
    name: "Draupadi",
    epithet: "The questioner of the hall",
    bio: "Her question to the assembly — about the order in which things were staked and lost — exposes a court's moral failure through procedure.",
    scenarioIds: ["the-silent-room"],
  },
  {
    id: "bhishma",
    name: "Bhishma",
    epithet: "The bound guardian",
    bio: "Grand-uncle of both houses, bound by a vow to serve Hastinapura's throne. The emblem of loyalty strained against conscience — and of silence at the wrong hour.",
    scenarioIds: ["the-silent-room"],
  },
  {
    id: "vidura",
    name: "Vidura",
    epithet: "The voice of foresight",
    bio: "Chief counsellor of the court. His night counsel (Vidura Niti) and his objections in the dice hall mark him as the epic's conscience of process.",
    scenarioIds: ["biased-algorithm", "the-silent-room"],
  },
  {
    id: "vikarna",
    name: "Vikarna",
    epithet: "The first voice",
    bio: "A Kaurava brother who objected openly when the assembly would not. Proof that first speech is a role, not a temperament.",
    scenarioIds: ["the-silent-room"],
  },
  {
    id: "duryodhana",
    name: "Duryodhana",
    epithet: "The refuser of peace",
    bio: "Eldest Kaurava. His refusal of even five villages is remembered as the moment a negotiable peace was publicly declined.",
    scenarioIds: ["sunk-ship", "five-villages", "two-teams-one-goal", "mentors-mistake"],
  },
  {
    id: "shakuni",
    name: "Shakuni",
    epithet: "The loaded hand",
    bio: "Prince of Gandhara and master of the dice. The architect of a game only one side could win.",
    scenarioIds: ["sunk-ship"],
  },
  {
    id: "karna",
    name: "Karna",
    epithet: "The loyal giver",
    bio: "Raised apart from his birth family; bound to Duryodhana by chosen debt. Gives away the armor that makes him invincible — knowingly, and asks one weapon in return.",
    scenarioIds: ["mentors-mistake", "open-the-armor"],
  },
  {
    id: "kunti",
    name: "Kunti",
    epithet: "Keeper of the secret",
    bio: "Mother of the Pandavas and, before her marriage, of Karna. Her late revelation tests every loyalty in the epic's final act.",
    scenarioIds: ["mentors-mistake"],
  },
  {
    id: "drona",
    name: "Drona",
    epithet: "The teacher in the wrong court",
    bio: "Teacher of the princes, bound to Hastinapura's service. Asked for Ekalavya's thumb; broken at last by a half-truth he chose to believe.",
    scenarioIds: ["credit-where-due", "necessary-half-truth", "into-the-spiral", "after-they-struck"],
  },
  {
    id: "ekalavya",
    name: "Ekalavya",
    epithet: "The self-taught",
    bio: "Forest archer who trained himself before a clay image of the teacher who refused him — and surpassed the princes the institution was built for.",
    scenarioIds: ["credit-where-due"],
  },
  {
    id: "abhimanyu",
    name: "Abhimanyu",
    epithet: "The boy who knew the way in",
    bio: "Son of Arjuna. Breached the chakravyuha at sixteen with entry-knowledge only; the epic's enduring parable of irreversible commitments.",
    scenarioIds: ["into-the-spiral"],
  },
  {
    id: "ashwatthama",
    name: "Ashwatthama",
    epithet: "The night raider",
    bio: "Son of Drona. His retaliatory night raid after the war's decision closes the epic's ledger on vengeance.",
    scenarioIds: ["after-they-struck", "necessary-half-truth"],
  },
  {
    id: "nakula",
    name: "Nakula",
    epithet: "The chosen brother",
    bio: "Son of Madri. Named for revival by Yudhishthira at the enchanted pool — impartiality made flesh in a forced choice.",
    scenarioIds: ["one-chair-left"],
  },
];

export const KB_PARVAS: KBParva[] = [
  {
    id: "adi",
    index: "I",
    name: "Adi Parva",
    meaning: "The Book of the Beginning",
    desc: "Origins and lineages; the early education of the princes. DharmaLens draws the Ekalavya episode from this book.",
    scenarioIds: ["credit-where-due"],
  },
  {
    id: "sabha",
    index: "II",
    name: "Sabha Parva",
    meaning: "The Book of the Assembly-Hall",
    desc: "The great hall, the dice match, and the silence of the seated. Source of the platform's scenarios on escalation and on bystander ethics.",
    scenarioIds: ["sunk-ship", "the-silent-room"],
  },
  {
    id: "vana",
    index: "III",
    name: "Vana Parva",
    meaning: "The Book of the Forest",
    desc: "The years of exile. Holds the Yaksha's questions at the enchanted pool and the taking of Karna's armor.",
    scenarioIds: ["open-the-armor", "one-chair-left"],
  },
  {
    id: "udyoga",
    index: "V",
    name: "Udyoga Parva",
    meaning: "The Book of the Effort",
    desc: "Preparations for war and the last efforts for peace: Vidura's counsel, Krishna's embassy, Karna's revelation, the five villages.",
    scenarioIds: ["two-teams-one-goal", "mentors-mistake", "biased-algorithm", "five-villages"],
  },
  {
    id: "bhishma-p",
    index: "VI",
    name: "Bhishma Parva",
    meaning: "The Book of Bhishma's Command",
    desc: "The war's opening. Contains the Bhagavad Gita — Arjuna's crisis of nerve and the counsel that answers it.",
    scenarioIds: ["crisis-hour"],
  },
  {
    id: "drona-p",
    index: "VII",
    name: "Drona Parva",
    meaning: "The Book of Drona's Command",
    desc: "The wheel-formation and Abhimanyu; the elephant named Ashwatthama and the fall of the teacher.",
    scenarioIds: ["necessary-half-truth", "into-the-spiral"],
  },
  {
    id: "sauptika",
    index: "X",
    name: "Sauptika Parva",
    meaning: "The Book of the Sleeping Warriors",
    desc: "The night raid after the war's decision — the epic's closing argument against vengeance.",
    scenarioIds: ["after-they-struck"],
  },
];

export const KB_THEMES: KBTheme[] = [
  { id: "dharma", name: "Dharma", desc: "The order of right action — contextual, subtle, and never reducible to a rulebook.", scenarioIds: ["the-silent-room", "necessary-half-truth", "one-chair-left"] },
  { id: "duty", name: "Duty", desc: "What your role owes even when your feelings object.", scenarioIds: ["crisis-hour", "mentors-mistake"] },
  { id: "leadership", name: "Leadership", desc: "Authority exercised as stewardship of people and standards.", scenarioIds: ["credit-where-due", "into-the-spiral", "one-chair-left"] },
  { id: "strategy", name: "Strategy", desc: "Power held in structure: gates, exits, thresholds, timing.", scenarioIds: ["sunk-ship", "open-the-armor", "biased-algorithm"] },
  { id: "responsibility", name: "Responsibility", desc: "Ownership that survives the moment credit and blame are assigned.", scenarioIds: ["crisis-hour", "biased-algorithm", "mentors-mistake"] },
  { id: "loyalty", name: "Loyalty", desc: "Chosen debt — honoured as candour, corrupted as concealment.", scenarioIds: ["mentors-mistake", "one-chair-left"] },
  { id: "justice", name: "Justice", desc: "Rules that bind the ruler; standards proven at their hardest case.", scenarioIds: ["one-chair-left", "the-silent-room", "credit-where-due"] },
  { id: "decision-making", name: "Decision Making", desc: "Pre-commitment, reversibility and clear-eyed valuation of options.", scenarioIds: ["sunk-ship", "into-the-spiral", "open-the-armor"] },
  { id: "conflict", name: "Conflict", desc: "Friction processed into structure — or fermented into war.", scenarioIds: ["two-teams-one-goal", "after-they-struck"] },
  { id: "self-control", name: "Self-Control", desc: "Governing the instrument — the deciding mind — before governing events.", scenarioIds: ["crisis-hour", "after-they-struck", "sunk-ship"] },
];

export const KB_PRINCIPLES: KBPrinciple[] = [
  { id: "p01", name: "Bounded Commitment", desc: "Define the exit before the emotion invests; make stopping a governed act, not a collapse.", scenarioId: "sunk-ship" },
  { id: "p02", name: "Recognition Is Structural", desc: "Attribution is a system. Correct through evidence and process before spectacle.", scenarioId: "credit-where-due" },
  { id: "p03", name: "Mediation Before Escalation", desc: "Give peace a full, honest, visible attempt — and make refusal of it a public choice.", scenarioId: "two-teams-one-goal" },
  { id: "p04", name: "The Cost of the Half-Truth", desc: "Technically accurate is not true. Price deception in the speech it was spent from.", scenarioId: "necessary-half-truth" },
  { id: "p05", name: "Loyalty Has Limits", desc: "Gratitude binds; it must not blind. Walk people toward disclosure, not around it.", scenarioId: "mentors-mistake" },
  { id: "p06", name: "Foresight Is a Duty", desc: "Name the fault in writing before the system touches the people it will affect.", scenarioId: "biased-algorithm" },
  { id: "p07", name: "The Minimum Just Demand", desc: "State the smallest fair outcome, calmly, in the open — then hold it without theatre.", scenarioId: "five-villages" },
  { id: "p08", name: "Steadiness Before Action", desc: "Govern the mind first; separate known from unknown; then commit fully.", scenarioId: "crisis-hour" },
  { id: "p09", name: "Generosity With Open Eyes", desc: "Give from strength, know the price, and name what stays protected.", scenarioId: "open-the-armor" },
  { id: "p10", name: "No Victory in Vengeance", desc: "Retaliation after the contest spends the legitimacy the contest was fought to protect.", scenarioId: "after-they-struck" },
  { id: "p11", name: "Design for Reversibility", desc: "Evaluate commitments by their exit design, not their entrance romance.", scenarioId: "into-the-spiral" },
  { id: "p12", name: "Someone Must Speak First", desc: "First speech is a role, not a personality type. Silence is complicity with the strongest voice.", scenarioId: "the-silent-room" },
  { id: "p13", name: "Impartiality Under Loss", desc: "A standard is proven the first time it is applied against your own affections.", scenarioId: "one-chair-left" },
];
