import type { Scenario } from "../types";

export const SCENARIOS_P1: Scenario[] = [
  {
    id: "sunk-ship",
    title: "The Sunk Ship",
    category: "decision-making",
    difficulty: "Intermediate",
    themes: ["Escalation", "Sunk Cost", "Self-Control", "Governance"],
    coreTension: "Keep going versus stop well",
    modernProblem:
      "Your flagship project has missed three milestones. Your team believes in it, leadership keeps funding it — but your own data says it will not work.",
    situation:
      "You lead a product initiative that has consumed fourteen months and most of your division's innovation budget. The last three milestones slipped, adoption in the pilot is nearly zero, and two senior engineers have quietly told you the architecture needs to be rebuilt. Yet the team is emotionally invested — this project is their identity — and your sponsor, under pressure from the CFO, asks for 'just three more months'. Saying yes is easy. Saying no feels like betraying people you recruited personally.",
    context:
      "The organisation has a history of letting failing initiatives drift for years because nobody wants to be the one who stopped them. Whatever you do will set the precedent for how this company ends things.",
    stakeholders: [
      { name: "You", role: "Product Lead", interest: "Shipping something real; protecting the team's trust in you." },
      { name: "Core team", role: "6 engineers & designers", interest: "Their work mattering; not feeling discarded." },
      { name: "Sponsor", role: "VP, division head", interest: "A defensible story for the CFO; no sudden write-offs." },
      { name: "Customers", role: "Pilot accounts", interest: "A promised capability — or an honest timeline." },
    ],
    constraints: [
      "Almost no budget remains after this quarter.",
      "Two core engineers are showing signs of burnout.",
      "A competitor is expected to launch a rival feature within six months.",
      "Your performance review — and the team's bonuses — reference this project.",
    ],
    choices: [
      {
        id: "a",
        label: "Push ahead unchanged",
        summary: "Give the team the three months and hope commitment turns the numbers around.",
        style: "Persistent",
        analysis: {
          benefits: [
            "Morale is protected in the short term; nobody feels abandoned mid-effort.",
            "A late breakthrough, while unlikely, remains possible.",
            "You avoid the political cost of admitting failure this quarter.",
          ],
          risks: [
            "Sunk cost deepens: the exit you refuse today is more expensive in three months.",
            "Burnout accelerates among the engineers who already see the wall.",
            "When it fails, it fails publicly and retroactively discredits your earlier optimism.",
          ],
          ethical: [
            "You are spending other people's money and your team's careers on a belief you privately no longer hold.",
            "Hope communicated as strategy quietly becomes a misleading message.",
          ],
          stakeholderImpact: [
            { name: "Core team", effect: "Short-term relief, long-term exhaustion and a harder landing." },
            { name: "Sponsor", effect: "Risk exposure continues to compound silently." },
            { name: "Customers", effect: "Another quarter waiting for something that is not coming." },
          ],
          longTerm: [
            "Escalation of commitment becomes the documented culture of the division.",
            "Killing the project later costs more budget, more trust, and more people.",
          ],
          scores: { responsibility: 5, fairness: 6, consequences: 4, selfControl: 3, strategic: 4 },
          closing:
            "Endurance is a virtue when the destination is right; it is a trap when the map is wrong.",
        },
      },
      {
        id: "b",
        label: "Kill it immediately, alone",
        summary: "Announce the shutdown today without a review process and reassign everyone by Friday.",
        style: "Decisive",
        analysis: {
          benefits: [
            "Losses stop immediately; the remaining budget is protected.",
            "Sends an unmistakable signal that evidence beats sentiment here.",
            "Ends the team's slow bleed of quarterly deadline anxiety.",
          ],
          risks: [
            "Feels autocratic: people who gave fourteen months get no voice in the ending.",
            "Salvageable components may be thrown away with the dead architecture.",
            "The organisation learns 'projects die suddenly', so people hide bad news next time.",
          ],
          ethical: [
            "The people who invested the most have the least say — a fairness failure even if the call is right.",
            "Deciding in secret, then announcing, withholds the respect the team is owed.",
          ],
          stakeholderImpact: [
            { name: "Core team", effect: "Shock and grief with no closure ritual; trust in you erodes." },
            { name: "Sponsor", effect: "Relief on the budget; anxiety about the narrative." },
            { name: "Customers", effect: "An abrupt broken promise with no transition plan." },
          ],
          longTerm: [
            "A culture of fear where reality is concealed until it is undeniable.",
            "High performers leave for places where endings are handled with dignity.",
          ],
          scores: { responsibility: 6, fairness: 4, consequences: 6, selfControl: 5, strategic: 6 },
          closing:
            "The right verdict delivered without process still teaches the wrong lesson.",
        },
      },
      {
        id: "c",
        label: "Set a final validation gate",
        summary: "Agree with the team and sponsor on one 30-day gate: explicit metrics, a review everyone joins, and a pre-committed go / no-go.",
        style: "Strategic",
        analysis: {
          benefits: [
            "Risk is bounded: exactly one month and one metric framework stand between today and a decision.",
            "Honours the team's effort by giving the project a fair, evidence-based final trial.",
            "Creates a reusable precedent — this org finally learns how to end things well.",
          ],
          risks: [
            "Metrics can be gamed by a team that desperately wants to pass its own gate.",
            "Decision fatigue: one more month of uncertainty is still a real cost.",
            "If the gate says no, some will argue you always intended to kill it.",
          ],
          ethical: [
            "Honesty with compassion: the evidence gets to speak, and so does everyone affected.",
            "Pre-committing to criteria in advance is an act of self-discipline against your own bias.",
          ],
          stakeholderImpact: [
            { name: "Core team", effect: "Clarity, agency, and a defined moment of closure either way." },
            { name: "Sponsor", effect: "Bounded exposure and a defensible story in both outcomes." },
            { name: "Customers", effect: "An honest date for a final answer instead of drift." },
          ],
          longTerm: [
            "The division gains a healthy mechanism for stopping — which makes starting safer too.",
            "Your credibility rises: you are seen to decide with evidence, not mood.",
          ],
          scores: { responsibility: 9, fairness: 8, consequences: 8, selfControl: 8, strategic: 9 },
          closing:
            "You did not choose between loyalty and truth; you built a structure where both could speak.",
        },
      },
      {
        id: "d",
        label: "Quietly salvage and rebrand",
        summary: "Strip the project for its best parts, fold them into a new initiative, and let the old one fade without an announcement.",
        style: "Tactful",
        analysis: {
          benefits: [
            "Real value is retained without a public post-mortem.",
            "The team's pride is protected; nobody wears the failure.",
            "Politically smooth: no conflict with the sponsor's hopes.",
          ],
          risks: [
            "Opacity: nobody can learn from a failure that was never named.",
            "The same structural flaw may be quietly carried into the new initiative.",
            "People notice. Undocumented endings breed conspiracy more than gratitude.",
          ],
          ethical: [
            "Spin and protection sit close together; the line is whether colleagues can still make informed judgments.",
            "Comfort bought with ambiguity is a debt paid later in trust.",
          ],
          stakeholderImpact: [
            { name: "Core team", effect: "Pride intact, but no shared learning — the wound is dressed, not healed." },
            { name: "Sponsor", effect: "No awkward conversation; also no clear accounting." },
            { name: "Customers", effect: "The promised capability quietly disappears." },
          ],
          longTerm: [
            "The organisation never develops the muscle of honest endings.",
            "Institutional memory of the failure is lost, inviting a repeat.",
          ],
          scores: { responsibility: 6, fairness: 5, consequences: 6, selfControl: 6, strategic: 7 },
          closing:
            "Preserving dignity matters; preserving the truth of what happened matters just as much.",
        },
      },
    ],
    mahabharata: {
      episode: "The Dice Game of Hastinapura",
      characters: ["Yudhishthira", "Shakuni", "Duryodhana"],
      context:
        "In the great hall of Hastinapura, Yudhishthira is drawn into a game of dice against Shakuni, a player who does not lose honestly. Round after round he stakes more — wealth, kingdom, brothers — even as every observer sees the trajectory. Each loss becomes the argument for one more round. The tragedy is not a single bad wager; it is the continuation of commitment long after reason has left the table.",
      insight:
        "Commitment is a virtue; escalation is a trap. Once pride, honour and prior investment enter the hall, stopping no longer feels like judgment — it feels like defeat. The epic's warning is structural: define your exit before your emotions define it for you.",
      modernApplication:
        "Sunk-cost escalation is the corporate dice game: 'one more quarter' staked on a project everyone privately doubts. The discipline is pre-commitment — exit criteria written while you are still calm, so the decision to stop is a governed act, not a collapse.",
      source: {
        title: "The Game of Dice",
        parva: "Sabha Parva (Book of the Assembly-Hall)",
        section: "Dyuta Parvan — sub-parva naming varies across editions",
        episode: "Yudhishthira's losses at the rigged game in the assembly hall",
        translation: "Kisari Mohan Ganguli translation (1883–1896), public domain",
        url: "https://www.sacred-texts.com/hin/m02/index.htm",
        note: "Chapter numbering differs between the Ganguli edition, the Critical Edition (BORI), and abridged retellings. Verify section numbers against the edition you cite.",
      },
    },
    reflectionQuestions: [
      "What evidence would need to exist for you to stop something you have publicly championed — and have you written it down?",
      "Whose dignity are you protecting when you avoid naming a failure — theirs, or yours?",
      "What pre-committed exit criteria will you set for your most important current commitment?",
    ],
  },
  {
    id: "credit-where-due",
    title: "Credit Where It Is Due",
    category: "leadership",
    difficulty: "Foundational",
    themes: ["Recognition", "Fairness", "Attribution", "Voice"],
    coreTension: "Stay silent versus claim what is yours",
    modernProblem:
      "Your teammate has taken credit for your work in front of leadership. What would you do?",
    situation:
      "You designed the analysis and built the model behind your team's quarterly win. In the review meeting, your teammate presents it as their work — your slides, your framing, their name. Leadership applauds them. Your manager, who does not know the contribution split, nods approvingly. The meeting is moving on. You have perhaps a week before the attribution hardens into permanent record — and into the promotion case that follows it.",
    context:
      "You and this teammate collaborate daily. They are well-liked, socially skilled, and close to your manager. Speaking up risks looking petty; staying silent risks a pattern.",
    stakeholders: [
      { name: "You", role: "Individual contributor", interest: "Fair attribution; a career built on visible work." },
      { name: "Teammate", role: "Presenter / peer", interest: "Status and momentum — possibly an honest mistake, possibly not." },
      { name: "Manager", role: "Direct supervisor", interest: "An accurate picture of who does what." },
      { name: "Team", role: "8 colleagues", interest: "A culture where credit matches contribution." },
    ],
    constraints: [
      "Attribution is being written into the promotion record this month.",
      "You work with this person every day; open warfare has a cost.",
      "Your contribution exists in commit history, drafts and early decks — if you assemble it.",
      "Your manager dislikes internal drama and rewards 'team players'.",
    ],
    choices: [
      {
        id: "a",
        label: "Stay silent",
        summary: "Let it go this time. Your work will speak for itself eventually.",
        style: "Avoidant",
        analysis: {
          benefits: [
            "No immediate conflict; the relationship stays untouched.",
            "You avoid any risk of being seen as small or credit-hungry.",
            "Energy stays on the work rather than the politics.",
          ],
          risks: [
            "Silence reads as consent; the misattribution becomes fact.",
            "A pattern forms — once, then twice, then as a habit of the team.",
            "Resentment accumulates privately and leaks into the collaboration anyway.",
          ],
          ethical: [
            "You withhold information your manager needs to allocate reward fairly.",
            "Self-erasure is not humility when it distorts the record others rely on.",
          ],
          stakeholderImpact: [
            { name: "You", effect: "Invisible contribution; compounding doubt and resentment." },
            { name: "Teammate", effect: "Learns that taking credit works — the lesson is reinforced." },
            { name: "Manager", effect: "Makes promotion decisions on a false picture." },
          ],
          longTerm: [
            "A ceiling forms over your career that you helped build.",
            "The team's culture quietly shifts from merit to performance of merit.",
          ],
          scores: { responsibility: 3, fairness: 3, consequences: 4, selfControl: 7, strategic: 3 },
          closing: "Unspoken, the incident does not end. It simply repeats with your permission.",
        },
      },
      {
        id: "b",
        label: "Confront them publicly",
        summary: "Correct the record in the next meeting, in front of the same audience.",
        style: "Confrontational",
        analysis: {
          benefits: [
            "The correction reaches exactly the audience that received the error.",
            "Establishes a hard boundary; unlikely to be tried again.",
            "Releases the pressure of swallowed anger.",
          ],
          risks: [
            "Humiliation triggers defensiveness, not reflection — the teammate becomes an adversary.",
            "The room remembers the drama more than the correction.",
            "If any part of the misunderstanding is honest, you have over-committed to theft as the explanation.",
          ],
          ethical: [
            "Public proportionality: the audience of a correction should match the audience of the harm — but so should its evidence.",
            "Justice for your work can create injustice to a colleague if the facts are incomplete.",
          ],
          stakeholderImpact: [
            { name: "You", effect: "Credit partly restored; reputation as volatile also installed." },
            { name: "Teammate", effect: "Public shame; the working relationship is likely broken." },
            { name: "Team", effect: "Watches and learns that conflict here is theatrical." },
          ],
          longTerm: [
            "Every future disagreement with this person is now a feud.",
            "Leadership may conclude both of you are 'difficult'.",
          ],
          scores: { responsibility: 6, fairness: 5, consequences: 4, selfControl: 3, strategic: 4 },
          closing: "A true charge delivered as a spectacle is heard as noise, not as justice.",
        },
      },
      {
        id: "c",
        label: "Discuss privately and present evidence",
        summary: "Speak to the teammate first with your drafts and commit history; agree on a joint correction to the manager.",
        style: "Principled",
        analysis: {
          benefits: [
            "Gives the teammate a face-saving path to correct the record themselves.",
            "Evidence converts an accusation into an accounting.",
            "A joint correction repairs attribution without repairing it at the cost of the relationship.",
          ],
          risks: [
            "Takes days of emotional labour you should not have to spend.",
            "The teammate may agree privately and stall publicly.",
            "Requires you to stay calm in a conversation where you are the wronged party.",
          ],
          ethical: [
            "Due process before verdict: intent is established before consequences are assigned.",
            "Fairness to yourself and to the colleague are pursued together rather than traded off.",
          ],
          stakeholderImpact: [
            { name: "You", effect: "Attribution restored through a process that also demonstrates maturity." },
            { name: "Teammate", effect: "A chance to correct with dignity — their response tells you what you need to know." },
            { name: "Manager", effect: "Receives an accurate record plus evidence of how you handle conflict." },
          ],
          longTerm: [
            "Sets a norm: credit disputes here are handled by evidence and correction, not silence or spectacle.",
            "Either strengthens a partnership or documents a pattern — both are clarity.",
          ],
          scores: { responsibility: 9, fairness: 9, consequences: 8, selfControl: 8, strategic: 8 },
          closing: "You protected your work and your standards at the same time — that is the whole job.",
        },
      },
      {
        id: "d",
        label: "Report immediately",
        summary: "Go straight to your manager today and file it as a formal complaint.",
        style: "Escalating",
        analysis: {
          benefits: [
            "Creates an official record immediately; nothing can be softened or lost.",
            "Appropriate if this is a repeat pattern rather than a first offence.",
            "Moves the burden of handling it to the person paid to handle it.",
          ],
          risks: [
            "Skips the conversation that distinguishes theft from sloppiness.",
            "The manager experiences you as escalation-first in a peer dispute.",
            "Once formal, the process owns the outcome — you no longer shape the repair.",
          ],
          ethical: [
            "Proportionality: the weight of the response should match established intent, not just the sting of the moment.",
            "Escalation is a legitimate instrument; its first use on a first event spends trust you may need later.",
          ],
          stakeholderImpact: [
            { name: "You", effect: "Protected position; costlier standing in the team's informal economy." },
            { name: "Teammate", effect: "Formal proceedings without a chance to explain." },
            { name: "Manager", effect: "Must now adjudicate a case instead of correcting a record." },
          ],
          longTerm: [
            "If the act was deliberate, you did exactly right. If it was careless, you lit a match in a dry forest.",
            "Peers become careful around you — in both senses of careful.",
          ],
          scores: { responsibility: 7, fairness: 5, consequences: 5, selfControl: 5, strategic: 5 },
          closing: "Formal channels exist for repeat offenders; they are blunt instruments for first conversations.",
        },
      },
    ],
    mahabharata: {
      episode: "Ekalavya and the Teacher's Fee",
      characters: ["Ekalavya", "Drona"],
      context:
        "In the Adi Parva, Ekalavya — a young archer of the forest Nishada people — trains himself before a clay image of Drona, the royal teacher who refused him as a student. He surpasses the princes the institution was built for. When Drona discovers him, he does not deny the merit; he claims the teacher's fee and asks for Ekalavya's right thumb. The institution protects its hierarchy not by disputing the achievement but by cutting away the means to repeat it.",
      insight:
        "Merit without recognition does not disappear — it curdles into quiet injustice. Attribution is not a courtesy; it is a system, and systems that misassign credit teach everyone watching that contribution and reward have parted company.",
      modernApplication:
        "Credit is your context's thumb and bowstring. Guard the evidence of contribution, correct the record through process before spectacle, and fix the mechanism that let misattribution happen once — because what is not corrected once is practised twice.",
      source: {
        title: "The Episode of Ekalavya",
        parva: "Adi Parva (Book of the Beginning)",
        section: "Sub-parva naming varies across editions (Sambhava cycle)",
        episode: "Ekalavya's self-training and Drona's demand for the guru-dakshina",
        translation: "Kisari Mohan Ganguli translation (1883–1896), public domain",
        url: "https://www.sacred-texts.com/hin/m01/index.htm",
        note: "Chapter numbering differs between the Ganguli edition, the Critical Edition (BORI), and abridged retellings. Verify section numbers against the edition you cite.",
      },
    },
    reflectionQuestions: [
      "Where in your current work is credit drifting from contribution — for you or for someone quieter than you?",
      "What evidence trail do you maintain that would let you correct the record calmly instead of emotionally?",
      "Which response protects both your work and your working relationships — and what would have to be true for escalation to become the principled choice?",
    ],
    featured: true,
  },
  {
    id: "two-teams-one-goal",
    title: "Two Teams, One Goal",
    category: "conflict",
    difficulty: "Intermediate",
    themes: ["Mediation", "Escalation", "Trust", "Shared Purpose"],
    coreTension: "Manage around the feud versus mediate it",
    modernProblem:
      "Design and engineering are openly feuding — blame in standups, veto by delay — and the release your company depends on is dissolving between them.",
    situation:
      "As the new programme lead you inherit two brilliant teams who have stopped speaking directly. Engineering says design ships fantasies; design says engineering ships excuses. Every review becomes a proxy war: velocity debates that are really respect debates. Six weeks from a release your company has publicly promised, work is being routed hallway-to-hallway so the two leads never share a room. You can feel both sides testing whose side you are on.",
    context:
      "Both leads are respected founders-era employees. Leadership's implicit advice is: deliver the release, manage the personalities later. But the feud is now the critical path.",
    stakeholders: [
      { name: "You", role: "Programme Lead", interest: "The release; a functioning organisation after it ships." },
      { name: "Design lead", role: "Principal designer", interest: "Craft, and being heard before scope is cut." },
      { name: "Engineering lead", role: "Staff engineer", interest: "Stability, and not being blame-billed for slips." },
      { name: "Company", role: "Leadership & customers", interest: "A credible promise kept." },
    ],
    constraints: [
      "Six weeks to a publicly committed release date.",
      "Neither lead will accept being 'managed' by the other.",
      "Leadership sees this as a personality issue, not a structural one.",
      "Both teams contain junior members copying the feuding behaviour.",
    ],
    choices: [
      {
        id: "a",
        label: "Route around them and ship",
        summary: "Minimise contact: freeze scope, formalise handoffs, and let the process carry the release over the broken relationship.",
        style: "Cautious",
        analysis: {
          benefits: [
            "Removes daily friction quickly; work stops waiting on diplomacy.",
            "Written handoffs create clarity that personality struggles erase.",
            "Buys time to address the relationship after the deadline pressure passes.",
          ],
          risks: [
            "The feud goes underground and resurfaces at the worst moment — usually integration week.",
            "Formalised walls become permanent architecture: two teams, one vendor relationship.",
            "Juniors learn that conflict here is handled by avoidance.",
          ],
          ethical: [
            "You treat symptoms as structure: people are managed around instead of spoken with.",
            "Shipping at any relational cost exports the damage into the next project.",
          ],
          stakeholderImpact: [
            { name: "Design lead", effect: "Feels processed, not heard; disengagement risk rises." },
            { name: "Engineering lead", effect: "Same, mirrored — and both feel confirmed that the other side 'cannot be worked with'." },
            { name: "Company", effect: "Release might ship; the organisation that must build the next one is hollowed out." },
          ],
          longTerm: [
            "A cold war institutionalised: duplicated work, defensive documentation, slow everything.",
            "The next cross-team project inherits a manufactured border.",
          ],
          scores: { responsibility: 5, fairness: 5, consequences: 5, selfControl: 6, strategic: 5 },
          closing: "You can ship around a feud once. Then the feud ships you.",
        },
      },
      {
        id: "b",
        label: "Mediate a structural reset",
        summary: "Convene both leads, name the feud as a shared failure of process — not of persons — and rebuild ownership, interfaces and shared metrics together.",
        style: "Collaborative",
        analysis: {
          benefits: [
            "Attacks the actual disease: undefined ownership and unshared stakes, not the symptoms.",
            "Gives both leads a graceful way to de-escalate without losing face.",
            "Shared metrics make future disputes about evidence, not respect.",
          ],
          risks: [
            "Mediation can fail publicly if either lead performs rather than engages.",
            "Consumes a week of the six you have — a real gamble on process.",
            "Requires you to be genuinely neutral, which both sides will test.",
          ],
          ethical: [
            "Treats both parties as adults with legitimate grievances rather than problems to be routed around.",
            "Names the conflict honestly in the room where it lives.",
          ],
          stakeholderImpact: [
            { name: "Design lead", effect: "Heard — and also held to shared commitments." },
            { name: "Engineering lead", effect: "Same symmetry: voice exchanged for accountability." },
            { name: "Company", effect: "A release built on a repaired interface, and a template for the next conflict." },
          ],
          longTerm: [
            "The organisation gains a conflict-resolution muscle it uses again.",
            "Juniors learn that disagreement is processed, not performed.",
          ],
          scores: { responsibility: 9, fairness: 8, consequences: 8, selfControl: 7, strategic: 8 },
          closing: "You refused to pick a side, so the sides stopped being the point.",
        },
      },
      {
        id: "c",
        label: "Reorganise: split ownership permanently",
        summary: "End the feud by ending the interface — give each team full-stack ownership of separate products.",
        style: "Decisive",
        analysis: {
          benefits: [
            "A clean structural fix if the conflict is genuinely an architecture of dependencies.",
            "Removes the daily negotiation surface entirely.",
            "Both leads get full agency within their own domain.",
          ],
          risks: [
            "The product is one experience; splitting teams splits its coherence.",
            "Reads as rewarding a feud with two kingdoms — an expensive lesson for the culture.",
            "The next cross-cutting initiative recreates the interface with worse language.",
          ],
          ethical: [
            "Sometimes structure is the problem; sometimes structure is the excuse. Choosing wrongly teaches the org that feuds are rewarded.",
            "Avoids the harder but fairer work of establishing shared standards.",
          ],
          stakeholderImpact: [
            { name: "Design lead", effect: "A kingdom — and isolation from constraining reality." },
            { name: "Engineering lead", effect: "The mirror image: freedom without a counterweight." },
            { name: "Company", effect: "Two half-products where one whole was promised." },
          ],
          longTerm: [
            "Organisational seams become quality seams that customers can feel.",
            "Future conflicts learn to escalate to reorg rather than to conversation.",
          ],
          scores: { responsibility: 6, fairness: 6, consequences: 5, selfControl: 5, strategic: 6 },
          closing: "Splitting a team to stop an argument is amputation offered as surgery.",
        },
      },
      {
        id: "d",
        label: "Let them fight it out",
        summary: "Stay out of it. Peer conflicts resolve themselves when both sides get tired enough.",
        style: "Avoidant",
        analysis: {
          benefits: [
            "You spend zero political capital inside the feud.",
            "Occasionally exhaustion does produce a working truce.",
            "You keep both leads' goodwill by never judging either.",
          ],
          risks: [
            "The release is the arena the war is fought in; it burns down first.",
            "Your neutrality reads as permission — you are now part of the mechanism.",
            "Waiting selects for whoever fights dirtiest, not whoever is right.",
          ],
          ethical: [
            "Leadership duties are not optional during conflicts that harm third parties — here, juniors and customers.",
            "Silence of the referee is a decision with a beneficiary.",
          ],
          stakeholderImpact: [
            { name: "Both leads", effect: "An unresolved drain on their standing and their health." },
            { name: "Juniors", effect: "Collatage: they copy the behaviour and absorb the chaos." },
            { name: "Company", effect: "A public promise dissolving while its steward watches." },
          ],
          longTerm: [
            "The feud veterans leave; the feud culture stays.",
            "You are remembered as the lead who watched.",
          ],
          scores: { responsibility: 2, fairness: 3, consequences: 2, selfControl: 5, strategic: 2 },
          closing: "Conflicts aged without intervention do not mellow; they ferment.",
        },
      },
    ],
    mahabharata: {
      episode: "Krishna's Peace Mission to Hastinapura",
      characters: ["Krishna", "Dhritarashtra", "Duryodhana", "Yudhishthira"],
      context:
        "In the Udyoga Parva, with war all but certain, Krishna travels to the Kaurava court as a peace envoy. He is realistic — he has already told the Pandavas to prepare — yet he gives negotiation his full weight: listening to each party, exposing the actual stakes beneath the stated positions, and letting the court itself refuse reason, so that responsibility for the war is visible. Mediation fails, but it fails honestly: afterwards no one can claim peace was not seriously attempted.",
      insight:
        "Mediation before escalation is not softness; it is due diligence. A serious peacemaker forces the real issue to the surface and makes each side own its refusal or its acceptance — in front of witnesses.",
      modernApplication:
        "In a feuding organisation, your role is the envoy's: neutral stance, full effort, visible process. You are not there to make the leads like each other; you are there to make them build together in front of shared metrics — and to make any refusal to do so a visible, owned choice.",
      source: {
        title: "The Journey of the Bhagavat (Krishna's Embassy)",
        parva: "Udyoga Parva (Book of the Effort)",
        section: "Bhagavat-Yana Parvan — sub-parva naming varies across editions",
        episode: "Krishna's failed peace embassy to the Kaurava court before the war",
        translation: "Kisari Mohan Ganguli translation (1883–1896), public domain",
        url: "https://www.sacred-texts.com/hin/m05/index.htm",
        note: "Chapter numbering differs between the Ganguli edition, the Critical Edition (BORI), and abridged retellings. Verify section numbers against the edition you cite.",
      },
    },
    reflectionQuestions: [
      "In conflicts around you, are you currently a mediator, a bystander, or a wall being routed around?",
      "What shared metric would turn your team's loudest recurring argument into a question of evidence?",
      "Whose refusal, in your situation, needs to become visible — and what forum would make it visible fairly?",
    ],
  },
  {
    id: "necessary-half-truth",
    title: "The Necessary Half-Truth",
    category: "ethics",
    difficulty: "Advanced",
    themes: ["Truth", "Communication", "Credibility", "Ends & Means"],
    coreTension: "Calm the panic versus tell the whole truth",
    modernProblem:
      "A layoff rumour is causing resignations and panic. Leadership wants to announce 'no jobs are affected by the restructuring' — technically true, practically misleading. You are asked to approve the statement.",
    situation:
      "You head internal communications. A rumour of layoffs has three of your best engineers interviewing elsewhere and a Slack channel of speculation growing hourly. The truth: restructuring is undecided; a reduction is one of three options the board will weigh in six weeks, and if it happens it will likely spare engineering — probably. Legal has drafted a statement: 'No employee's role is affected by the restructuring.' Narrowly defined, 'the restructuring' is a process that affects no roles today. The statement as employees will hear it — 'you are safe' — is not something you know to be true.",
    context:
      "The CEO wants calm and retention through the quarter. Saying nothing is accelerating the damage: two resignations came in this morning. Every option you have spends or saves credibility.",
    stakeholders: [
      { name: "You", role: "Head of Communications", interest: "Calm the panic without mortgaging the company's word." },
      { name: "Employees", role: "400 colleagues", interest: "The truth early enough to act on it." },
      { name: "CEO & Board", role: "Decision makers", interest: "Stability through the quarter; options kept open." },
      { name: "Key engineers", role: "Flight risks", interest: "A real basis for deciding whether to stay." },
    ],
    constraints: [
      "Legal-approved wording is factually defensible but materially misleading.",
      "The board decision is six weeks out; full disclosure would trigger the very exodus everyone fears.",
      "Two resignations this morning; more by Friday unless something is said.",
      "Whatever you publish now will be quoted back to you if the board later chooses layoffs.",
    ],
    choices: [
      {
        id: "a",
        label: "Release the statement as drafted",
        summary: "Publish the technically-true wording. Calm today, consequences later.",
        style: "Pragmatic",
        analysis: {
          benefits: [
            "Stops the panic and the resignations within hours.",
            "Defensible in litigation: every word can be supported.",
            "Preserves every strategic option for the board.",
          ],
          risks: [
            "If layoffs come, this statement becomes the exhibit: the company 'lied in writing'.",
            "Employees who stayed on your word will feel personally deceived — by you.",
            "The comms function's word, once spent on a technicality, buys nothing when it is needed next.",
          ],
          ethical: [
            "This is Ashwatthama-the-elephant wording: true in the register of law, false in the register of meaning.",
            "The audience is not treated as adults capable of handling bounded uncertainty.",
          ],
          stakeholderImpact: [
            { name: "Employees", effect: "Calmed now; betrayed precisely in the moment they needed the truth most." },
            { name: "You", effect: "Your signature becomes the instrument of the deception." },
            { name: "CEO & Board", effect: "A quiet quarter — purchased with the company's future credibility." },
          ],
          longTerm: [
            "Every future reassurance you issue is discounted by employees who remember this one.",
            "Retention inverts: the people with options leave first — next time without warning.",
          ],
          scores: { responsibility: 4, fairness: 3, consequences: 4, selfControl: 6, strategic: 5 },
          closing: "A technically true sentence can be the most expensive lie a company ever buys.",
        },
      },
      {
        id: "b",
        label: "Refuse the wording; propose bounded honesty",
        summary: "Decline the technicality and draft instead: what is decided, what is not, when it will be — with a date.",
        style: "Principled",
        analysis: {
          benefits: [
            "Calms the panic with something stronger than reassurance: a process and a date.",
            "If the board does choose cuts, the company's prior honesty cushions the blow.",
            "Your office's credibility compounds instead of depleting.",
          ],
          risks: [
            "Bounded honesty still admits uncertainty; the best engineers may leave anyway.",
            "The CEO may go around you or replace you for 'editorialising'.",
            "Naming the board date creates a new pressure point six weeks out.",
          ],
          ethical: [
            "Treats employees as adults owed the material facts of their own livelihoods.",
            "Refuses to let the organisation's ease be purchased with its members' ignorance.",
          ],
          stakeholderImpact: [
            { name: "Employees", effect: "Uncertainty, but honoured uncertainty — with visibility and a timeline." },
            { name: "You", effect: "Short-term friction with leadership; long-term ownership of a trusted channel." },
            { name: "CEO & Board", effect: "Keeps options open at the price of visible ambiguity." },
          ],
          longTerm: [
            "A truthful track record makes every future communication cheaper.",
            "The people who stay, stay on accurate grounds — which is the only retention that lasts.",
          ],
          scores: { responsibility: 9, fairness: 9, consequences: 8, selfControl: 7, strategic: 8 },
          closing: "You did not choose truth over calm; you built calm out of truth.",
        },
      },
      {
        id: "c",
        label: "Say nothing for now",
        summary: "Decline to publish anything until the board decides; let the rumour run.",
        style: "Cautious",
        analysis: {
          benefits: [
            "Zero risk of a statement being quoted against you later.",
            "Fully preserves the board's options and Legal's positions.",
            "Avoids a fight with the CEO this week.",
          ],
          risks: [
            "Silence in a vacuum is not neutral — the worst story wins by default.",
            "Resignations accelerate precisely among the people you can least afford to lose.",
            "When you finally speak, you have lost the audience's best weeks.",
          ],
          ethical: [
            "You knowingly allow colleagues to make life decisions inside an information vacuum you could have filled honestly.",
            "Abstention protects the communicator, not the communicated-to.",
          ],
          stakeholderImpact: [
            { name: "Employees", effect: "Anxiety compounds; departures select for the most employable." },
            { name: "You", effect: "Personal safety purchased with professional irrelevance." },
            { name: "Company", effect: "Damage continues, now unmanaged." },
          ],
          longTerm: [
            "The informal rumour channel becomes the trusted one.",
            "Your function's silence in crisis becomes precedent.",
          ],
          scores: { responsibility: 3, fairness: 4, consequences: 3, selfControl: 6, strategic: 3 },
          closing: "In a crisis of truth, silence is not the safe option; it is the slow option.",
        },
      },
      {
        id: "d",
        label: "Deputise: let the CEO's office issue it",
        summary: "Step aside. If leadership wants that wording, leadership can sign it.",
        style: "Tactful",
        analysis: {
          benefits: [
            "You do not personally counterfeit your credibility.",
            "The accountability for the wording sits with its authors.",
            "You survive to protect the channel another day.",
          ],
          risks: [
            "The misleading statement still goes out — employees are no less deceived.",
            "You had the standing to improve it and traded that standing for innocence.",
            "Leadership learns comms folds when it matters; your influence withers.",
          ],
          ethical: [
            "Clean hands, same outcome: refusing to be the instrument without stopping the harm is an incomplete ethics.",
            "Responsibility for counsel is part of the role; resignation-by-delegation dodges it.",
          ],
          stakeholderImpact: [
            { name: "Employees", effect: "Same deception, same later betrayal." },
            { name: "You", effect: "Credible conscience, diminished platform." },
            { name: "CEO", effect: "Owns the wording — and may remember who declined to help." },
          ],
          longTerm: [
            "The channel's authority migrates to whoever speaks without principles — or without you.",
            "Next time the wording fight happens, you are not in the room.",
          ],
          scores: { responsibility: 5, fairness: 5, consequences: 5, selfControl: 6, strategic: 6 },
          closing: "Declining to sign the letter is not the same as stopping the letter.",
        },
      },
    ],
    mahabharata: {
      episode: "The Fall of Drona and the Elephant Named Ashwatthama",
      characters: ["Yudhishthira", "Drona", "Bhima", "Krishna"],
      context:
        "On the fifteenth day in the Drona Parva, the Pandavas cannot defeat the warrior-teacher Drona by arms. Bhima kills an elephant named Ashwatthama — which is also the name of Drona's son — and the army proclaims 'Ashwatthama is dead'. Asked by Drona, who trusts him above all men, Yudhishthira repeats it: 'Ashwatthama is dead', adding under his breath '—the elephant'. The technically-true sentence works; Drona lays down his weapons. The tradition adds: Yudhishthira's chariot, which had floated a finger-breadth above the earth because he had never lied, touches the ground.",
      insight:
        "A half-truth can win the day and still cost the thing it was spent from: the credibility of the speaker. The epic itself does not celebrate the manoeuvre — it prices it, in the image of the chariot settling to earth.",
      modernApplication:
        "Corporate 'technically accurate' statements are elephant-wording. Before approving one, ask the chariot question: what does this cost the voice that says it, and will that voice still be believed when it must carry something heavier?",
      source: {
        title: "The Death of Drona",
        parva: "Drona Parva (Book of Drona's Command)",
        section: "Sub-parva naming varies across editions",
        episode: "The slaying of the elephant Ashwatthama and Yudhishthira's fatal half-truth",
        translation: "Kisari Mohan Ganguli translation (1883–1896), public domain",
        url: "https://www.sacred-texts.com/hin/m07/index.htm",
        note: "Chapter numbering differs between the Ganguli edition, the Critical Edition (BORI), and abridged retellings. Verify section numbers against the edition you cite.",
      },
    },
    reflectionQuestions: [
      "Has your organisation traded its credibility for calm in the past year — and what is the interest rate?",
      "Where is the line for you between tactful framing and material deception, and who else knows where your line is?",
      "What would a bounded, honest statement look like in your hardest current communication?",
    ],
  },
  {
    id: "mentors-mistake",
    title: "The Mentor's Mistake",
    category: "loyalty",
    difficulty: "Advanced",
    themes: ["Loyalty", "Integrity", "Gratitude", "Complicity"],
    coreTension: "Protect the person versus protect the standard",
    modernProblem:
      "The mentor who built your career made a serious compliance error and asks you to help quietly correct it before the audit. No one else knows.",
    situation:
      "Eight years ago your mentor hired you when no one would. Promotions, sponsorship, protection — your career exists because of them. Last night they came to your desk, grey-faced: a certification report they signed two years ago contains results that were never properly verified. It is almost certainly sloppiness, not fraud, but the client is a hospital network, and the audit begins in twelve days. Correcting the record silently is technically possible now. They are asking for your help to do it — 'so we can fix the actual problem without a career ending for a paperwork sin'.",
    context:
      "The report's flaw did not, as far as anyone knows, cause harm. Disclosure would trigger regulatory review, void a contract, and likely end your mentor's career. Concealment carries legal exposure for anyone who participates — now including you.",
    stakeholders: [
      { name: "You", role: "Senior manager, mentee", interest: "Gratitude honoured; integrity and legal standing intact." },
      { name: "Mentor", role: "Division director", interest: "Survival of a career built over decades." },
      { name: "Hospital client", role: "Auditee", interest: "Certifications that mean what they claim." },
      { name: "Company", role: "Employer", interest: "Compliance standing; honest internal culture." },
    ],
    constraints: [
      "Twelve days until the external audit begins.",
      "Silent correction is possible but would make you a participant in concealment.",
      "Disclosure likely ends your mentor's career even if intent was innocent.",
      "The client relies on the certification for patient-facing operations.",
    ],
    choices: [
      {
        id: "a",
        label: "Help fix it silently tonight",
        summary: "Correct the file, document nothing about the conversation, and let the audit pass over clean paper.",
        style: "Loyal",
        analysis: {
          benefits: [
            "Honours eight years of debt in the currency your mentor actually needs.",
            "The substantive fix happens; potential patient risk is addressed immediately.",
            "A decent person survives an honest administrative failure.",
          ],
          risks: [
            "You are now inside the concealment — legally and ethically, the error is partly yours.",
            "If discovered, 'sloppiness' becomes 'cover-up', a career-ending word for both of you.",
            "The system that produced the unverified report learns nothing and repeats.",
          ],
          ethical: [
            "Loyalty to a person has been allowed to override duty to the people the certification protects.",
            "The concealment, not the original error, is the moral event — and you authored half of it.",
          ],
          stakeholderImpact: [
            { name: "Mentor", effect: "Saved today; carrying a secret that now owns them — and you." },
            { name: "Hospital client", effect: "Risk fixed in substance, deceived in record." },
            { name: "You", effect: "A debt paid with your own integrity as the currency." },
          ],
          longTerm: [
            "One quiet fix becomes a template; the culture of the division goes grey.",
            "Your mentor's hold on your conscience becomes a standing arrangement.",
          ],
          scores: { responsibility: 4, fairness: 3, consequences: 4, selfControl: 5, strategic: 4 },
          closing: "Some debts must be refused, or they are never finished being paid.",
        },
      },
      {
        id: "b",
        label: "Report it yourself, immediately",
        summary: "Go to compliance this morning with what you know, before any further conversation with your mentor.",
        style: "Rule-First",
        analysis: {
          benefits: [
            "The certification's integrity is restored through proper channels.",
            "You keep clean legal and ethical standing.",
            "The systemic cause gets addressed, not just the document.",
          ],
          risks: [
            "Your mentor learns of your report from investigators, not from you — the relationship ends in the coldest available way.",
            "A career of sponsorship ends not in gratitude's language but in procedure's.",
            "Colleagues who watched you rise will weigh your dutifulness against your ruthlessness.",
          ],
          ethical: [
            "The standard is protected — but the person is handled as a case, not as the human who asked for your counsel first.",
            "There is a version of disclosure in which your mentor participates with dignity; this skips it.",
          ],
          stakeholderImpact: [
            { name: "Mentor", effect: "Ambushed by process; worst available version of an already bad outcome." },
            { name: "Hospital client", effect: "Fully served — the record is cleansed openly." },
            { name: "You", effect: "Protected and isolated in the same stroke." },
          ],
          longTerm: [
            "Others learn: never take a difficult confession to you first.",
            "The culture gains compliance and loses candour — both measurably.",
          ],
          scores: { responsibility: 8, fairness: 6, consequences: 6, selfControl: 7, strategic: 5 },
          closing: "Correct procedure can still be the second-best version of doing right.",
        },
      },
      {
        id: "c",
        label: "Give them 48 hours to self-report",
        summary: "Refuse the silent fix, tell your mentor exactly why, and walk with them to compliance if they will go — yourself if they will not.",
        style: "Principled",
        analysis: {
          benefits: [
            "Preserves the substance: the record is corrected through proper channels within the audit window.",
            "Honours the relationship at the highest available level: truth told first, help offered second, limits named clearly.",
            "Self-reporting changes the story from cover-up to conscience — regulators and colleagues read it differently.",
          ],
          risks: [
            "Your mentor may spend the 48 hours destroying evidence or pre-empting you.",
            "If they refuse, you must execute the worst outcome anyway — now with foreknowledge on record.",
            "Emotionally the hardest path: you carry both the friendship and the standard for two days.",
          ],
          ethical: [
            "Loyalty is honoured through candour rather than concealment — gratitude repaid in the coin that matters most.",
            "The person is treated as capable of choosing integrity, not merely as a risk to be managed.",
          ],
          stakeholderImpact: [
            { name: "Mentor", effect: "A real chance to own the mistake — with a friend beside them and a boundary behind them." },
            { name: "Hospital client", effect: "Protected through honest correction." },
            { name: "You", effect: "Whatever comes, your account of these two days will be one you can say aloud." },
          ],
          longTerm: [
            "Whether the mentor complies or not, the division sees that confession is survivable and concealment is not.",
            "Your integrity becomes reference-grade: strict about standards, generous about people.",
          ],
          scores: { responsibility: 9, fairness: 8, consequences: 8, selfControl: 8, strategic: 8 },
          closing: "You loved the person enough to refuse them, and the standard enough to carry it yourself.",
        },
      },
      {
        id: "d",
        label: "Step back quietly and warn no one",
        summary: "Refuse to help, say nothing, and make sure the paper trail shows you were never near it.",
        style: "Avoidant",
        analysis: {
          benefits: [
            "You carry neither the concealment nor the disclosure.",
            "The friendship is not directly severed by your hand.",
            "Your own legal exposure stays minimal if it all stays hidden.",
          ],
          risks: [
            "The silent fix probably proceeds without you — the risk to the client remains live and you knew.",
            "If it surfaces, your prior knowledge and silence are indistinguishable from participation.",
            "You have protected yourself against every duty in the room.",
          ],
          ethical: [
            "Knowledge without action is its own decision: the client was left exposed by the only person free to act.",
            "This is loyalty to neither the person nor the principle — only to your own safety.",
          ],
          stakeholderImpact: [
            { name: "Mentor", effect: "Alone with the choice, minus your counsel, plus your silent knowledge." },
            { name: "Hospital client", effect: "Unprotected while there was still time." },
            { name: "You", effect: "Technically untouched, actually implicated — by your own memory if nothing else." },
          ],
          longTerm: [
            "If it surfaces, the record shows you knew and calculated.",
            "A private erosion: you now know precisely what your integrity costs, and it was not much.",
          ],
          scores: { responsibility: 3, fairness: 4, consequences: 3, selfControl: 5, strategic: 4 },
          closing: "Neutrality in the presence of a live risk is not a position; it is an absence.",
        },
      },
    ],
    mahabharata: {
      episode: "Karna Learns the Truth — and Stays",
      characters: ["Karna", "Kunti", "Krishna", "Duryodhana"],
      context:
        "In the Udyoga Parva, on the edge of war, Karna is told his true origin: he is the eldest son of Kunti, born before her marriage, brother to the very Pandavas he has sworn to destroy. Kunti begs him to cross over; Krishna offers him the kingdom that would be his by birth. Karna refuses. Duryodhana, he says, took him in when the world had no seat for him; to abandon him now that he needs him would make every year of loyalty a lie. The epic honours the grandeur of this — and lets the war it feeds consume nearly everything.",
      insight:
        "Loyalty is chosen debt repaid in character. But the epic's question hangs over Karna's choice: when loyalty requires shielding what is wrong, it stops being a virtue and becomes a becoming — the slow construction of complicity. Gratitude binds; it must not blind.",
      modernApplication:
        "Honour your mentors in the only currency that preserves both of you: candour. The move that is both loyal and responsible exists — walk with them toward disclosure rather than around it. If you must choose between the person and the standard, refuse to let gratitude choose against the people neither of you can see — the client, the user, the patient.",
      source: {
        title: "Karna's Revelation before the War",
        parva: "Udyoga Parva (Book of the Effort)",
        section: "Karna cycle — sub-parva naming varies across editions",
        episode: "Kunti and Krishna reveal Karna's birth; Karna declines to abandon Duryodhana",
        translation: "Kisari Mohan Ganguli translation (1883–1896), public domain",
        url: "https://www.sacred-texts.com/hin/m05/index.htm",
        note: "Chapter numbering differs between the Ganguli edition, the Critical Edition (BORI), and abridged retellings. Verify section numbers against the edition you cite.",
      },
    },
    reflectionQuestions: [
      "Who holds enough gratitude-debt over you that you would feel the pull to protect them past your line?",
      "What would 'walking them to disclosure' look like in your organisation — literally, which door, which conversation?",
      "Where exactly is your loyalty's limit, and have you ever said it out loud before you needed it?",
    ],
  },
];
