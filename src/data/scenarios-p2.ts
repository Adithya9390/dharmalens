import type { Scenario } from "../types";

export const SCENARIOS_P2: Scenario[] = [
  {
    id: "biased-algorithm",
    title: "The Biased Algorithm",
    category: "ai-ethics",
    difficulty: "Advanced",
    themes: ["Foresight", "Justice", "Automation", "Accountability"],
    coreTension: "Ship the system versus ship the warning first",
    modernProblem:
      "Your AI screening model passes every accuracy benchmark, but your own testing shows it systematically undervalues one demographic group. Leadership wants to launch on schedule.",
    situation:
      "You are the technical lead on an automated screening platform that shortlists candidates for a hiring client with 40,000 applications a year. The model beats the old process on every agreed metric. But three weeks before launch, your fairness audit finds a pattern: applicants from one group are ranked lower at equal qualification — not from any protected feature, but from proxies your features quietly learned. The client says the lift in overall accuracy justifies launch 'with monitoring'. Your CEO has already announced the product at an industry event. You are the only person with both the evidence and the standing to set the launch conditions.",
    context:
      "The contract is worth 30% of company revenue this year. Post-launch 'fixes' have a bad track record at this company: two known issues from last year are still in the backlog. Nobody outside the team knows the audit result exists.",
    stakeholders: [
      { name: "You", role: "Technical lead", interest: "A system that does what it claims, for everyone it claims to serve." },
      { name: "Rejected applicants", role: "Unaware public", interest: "Fair evaluation of merit they cannot appeal." },
      { name: "Client CHRO", role: "Buyer", interest: "Efficiency, defensibility, a vendor that flags problems." },
      { name: "Company", role: "CEO & board", interest: "Revenue milestone, reputation, launch timing." },
    ],
    constraints: [
      "Public launch announcement already made; sales pipeline booked against the date.",
      "The biased pattern is real but subtle: you would need a slide and ten minutes to prove it.",
      "Post-launch fixes at this company historically die in the backlog.",
      "The affected applicants will never know the system scored them.",
    ],
    choices: [
      {
        id: "a",
        label: "Ship with a monitoring disclaimer",
        summary: "Launch on schedule, add fairness monitoring, and promise remediation in the next release cycle.",
        style: "Pragmatic",
        analysis: {
          benefits: [
            "Revenue, timeline and public commitments are all preserved.",
            "Monitoring does create a data trail that could power a genuine fix.",
            "Overall accuracy really will improve for most applicants.",
          ],
          risks: [
            "You know the 'next cycle' backlog is where second-order ethics go to die.",
            "Thousands of real rejections accumulate before any fix is even scoped.",
            "The disclaimer converts your knowledge of harm into a documented acceptance of it.",
          ],
          ethical: [
            "The efficiency gain is privatised; the accuracy cost is distributed onto people who never consented and cannot appeal.",
            "Monitoring without a committed fix is surveillance of a known harm, not stewardship.",
          ],
          stakeholderImpact: [
            { name: "Rejected applicants", effect: "Systematically under-ranked, silently, at scale." },
            { name: "Client CHRO", effect: "Buys a liability dressed as diligence." },
            { name: "Company", effect: "Hits the quarter; plants the story that ends the trust in the product." },
          ],
          longTerm: [
            "The fairness debt compounds with every hiring cycle.",
            "When the pattern surfaces — and patterns surface — the question becomes who knew and when.",
          ],
          scores: { responsibility: 3, fairness: 3, consequences: 4, selfControl: 5, strategic: 5 },
          closing:
            "A known bias shipped on schedule is not an unknown risk; it is a chosen one.",
        },
      },
      {
        id: "b",
        label: "Hold the launch and escalate formally",
        summary: "Put the audit in writing to the client and your CEO; delay launch until a defined fairness threshold is met, and take the revenue hit.",
        style: "Principled",
        analysis: {
          benefits: [
            "The system the public meets is the system your conscience approved.",
            "Written escalation makes the warning part of the record — governance, not gossip.",
            "A defined threshold turns 'we'll fix it later' into a condition with teeth.",
          ],
          risks: [
            "You absorb the full political and financial blast radius of the delay.",
            "The client may poach your roadmap knowledge and buy from a less scrupulous competitor.",
            "Your CEO's public announcement becomes a public reversal — you will own that story.",
          ],
          ethical: [
            "Foresight exercised as duty: the person who can see the fault names it before it is baked in.",
            "Rules, like vows, are tested at the moment they cost something — not when they are convenient.",
          ],
          stakeholderImpact: [
            { name: "Rejected applicants", effect: "Protected before harm, invisibly — the best kind of protection." },
            { name: "Client CHRO", effect: "Receives the honest vendor that every audit hopes for and few get." },
            { name: "Company", effect: "A painful quarter and a product it can defend in any hearing." },
          ],
          longTerm: [
            "Fairness-by-construction becomes a sales feature, not a compliance tax.",
            "You establish that evidence, in writing, moves this company — which changes the company.",
          ],
          scores: { responsibility: 9, fairness: 9, consequences: 8, selfControl: 7, strategic: 7 },
          closing:
            "You converted your foreknowledge into governance instead of into regret.",
        },
      },
      {
        id: "c",
        label: "Ship with a real kill-switch",
        summary: "Launch, but make fairness a launch criterion: automated group-level monitoring with hard rollback thresholds the client signs in advance.",
        style: "Strategic",
        analysis: {
          benefits: [
            "Meets the deadline while making harm containment automatic rather than promised.",
            "Pre-signed rollback thresholds remove the future meeting where nobody wants to pull the plug.",
            "Converts ethics into an engineering spec — which is where it survives.",
          ],
          risks: [
            "Thresholds miscalibrated slightly wrong still process real people wrongly at scale.",
            "A kill-switch is a confession that you are launching with a fuse lit.",
            "Complex governance can fail silently; the monitor itself can be gamed by drift.",
          ],
          ethical: [
            "Accepts a bounded, monitored harm against an unbounded, unmonitored one — a defensible trade only if the thresholds are honest.",
            "The affected group still bears risk they never consented to; the consent obtained is the client's, not theirs.",
          ],
          stakeholderImpact: [
            { name: "Rejected applicants", effect: "Exposed for weeks at most, with automatic relief — if the switch holds." },
            { name: "Client CHRO", effect: "Buys efficiency plus contractual accountability." },
            { name: "Company", effect: "Nearly on time, with a governable risk rather than a reputational landmine." },
          ],
          longTerm: [
            "If the switch fires once, every future launch inherits the discipline.",
            "Pre-agreed ethics thresholds become a pattern the industry copies — or a fig leaf it copies.",
          ],
          scores: { responsibility: 7, fairness: 7, consequences: 7, selfControl: 7, strategic: 9 },
          closing:
            "You did not fix the system before launch; you made the system unable to hide after it.",
        },
      },
      {
        id: "d",
        label: "Quietly reweight the proxies",
        summary: "Adjust the feature weights until the audit passes, and mention the fix to no one.",
        style: "Tactful",
        analysis: {
          benefits: [
            "The measurable bias disappears before launch without a political fight.",
            "Applicants are genuinely better served than under the disclaimer plan.",
            "The launch, the revenue, and the narrative all proceed smoothly.",
          ],
          risks: [
            "Governance by secret: the fix exists only in your commit and your memory.",
            "Proxies regenerate — the model can re-learn the pattern from residual signal, with nobody now watching.",
            "If it emerges later, 'silent patch' reads as cover-up, whatever your intent.",
          ],
          ethical: [
            "The right outcome pursued through an invisible route denies the institution the learning that produces durable right outcomes.",
            "You appointed yourself the entire ethics function — unaccountable, unaudited, and eventually absent.",
          ],
          stakeholderImpact: [
            { name: "Rejected applicants", effect: "Better off now; hostage to a fix nobody else knows to defend." },
            { name: "Company", effect: "Protected by a secret it does not know it holds." },
            { name: "You", effect: "A clean conscience on contract — renewable only by you." },
          ],
          longTerm: [
            "No policy, no threshold, no institutional memory; correctness dies with your tenure.",
            "The organisation never builds the muscle, because it never saw the problem.",
          ],
          scores: { responsibility: 5, fairness: 7, consequences: 5, selfControl: 6, strategic: 5 },
          closing:
            "An undocumented fix is a favour, not a foundation.",
        },
      },
    ],
    mahabharata: {
      episode: "Vidura Niti — the Counsel of Foresight",
      characters: ["Vidura", "Dhritarashtra"],
      context:
        "In the Udyoga Parva, the night before fateful decisions, Dhritarashtra summons his minister Vidura — sleepless with anxiety about what is coming. Vidura's extended counsel, known as the Vidura Niti, repeatedly returns to one theme: the wise see the fault before it is a catastrophe, and the counsellor's duty is to name it to power, plainly, whether or not power enjoys the naming. The tragedy that follows in the epic is not a failure of intelligence; it is the failure of a court that heard warnings and postponed them.",
      insight:
        "Foresight is a duty, not a talent. Systems — courts, codes, models — faithfully inherit the blind spots of their makers; the institution that punishes the naming of faults guarantees it will meet the fault later, larger, and in public.",
      modernApplication:
        "An algorithm with a known, documentable bias is a Vidura moment: the fault is visible, the forum exists, and the question is whether the warning becomes part of the record in writing, with thresholds, before the system touches forty thousand unnamed people.",
      source: {
        title: "Vidura Niti",
        parva: "Udyoga Parva (Book of the Effort)",
        section: "Vidura-Niti — sub-parva naming varies across editions",
        episode: "Vidura's night counsel to the sleepless Dhritarashtra on statecraft and foresight",
        translation: "Kisari Mohan Ganguli translation (1883–1896), public domain",
        url: "https://www.sacred-texts.com/hin/m05/index.htm",
        note: "Chapter numbering differs between the Ganguli edition, the Critical Edition (BORI), and abridged retellings. Verify section numbers against the edition you cite.",
      },
    },
    reflectionQuestions: [
      "What harm in your current work is 'documentable but not yet documented' — and what would putting it in writing change?",
      "If you are making a rule the exception for launch pressure, what precedent are you pre-signing for the next launch?",
      "Who, in your organisation, pays you to hear the fault named — and do they know it yet?",
    ],
  },
  {
    id: "five-villages",
    title: "Ask for the Five Villages",
    category: "negotiation",
    difficulty: "Foundational",
    themes: ["Negotiation", "Dignity", "Clarity", "Minimum Terms"],
    coreTension: "Win the room versus name the floor",
    modernProblem:
      "In a partnership term-sheet your contribution is being quietly undervalued. Pushing harder risks the relationship; accepting quietly re-prices you forever.",
    situation:
      "You built the technology at the heart of a joint venture now being negotiated. The other side's revised term-sheet shifts equity and decision rights toward them — politely, in footnotes. Your counterpart is charming, powerful, and hinting that 'difficult founders get replaced before signing'. Your advisors split: one says take the deal, the partnership is the opportunity; another says anchor high and bargain. What you do not have is a line — your line — stated to anyone, including yourself.",
    context:
      "You need this partnership's distribution, but they need your technology more than their tone suggests. The deal closes or dies within two weeks.",
    stakeholders: [
      { name: "You", role: "Technical founder", interest: "Fair value and a working relationship that survives the table." },
      { name: "Counterpart", role: "Corporate partner", interest: "Maximum advantage with the deal closed." },
      { name: "Your team", role: "11 employees", interest: "A deal that funds them and respects the work." },
      { name: "Future you", role: "In two years", interest: "Terms you can live inside, not just sign." },
    ],
    constraints: [
      "Two weeks to signature or walk.",
      "Your BATNA (best alternative) is real but slower: independent growth, eighteen months behind.",
      "Every concession is precedent: the operating agreement borrows from the term-sheet.",
      "The counterpart controls the narrative in your shared industry circle.",
    ],
    choices: [
      {
        id: "a",
        label: "Accept the terms for the relationship",
        summary: "Sign as offered. Harmony now, renegotiation someday.",
        style: "Accommodating",
        analysis: {
          benefits: [
            "The deal closes; your team is funded; distribution starts on schedule.",
            "You bank goodwill with a powerful partner.",
            "No public conflict in a small industry.",
          ],
          risks: [
            "You ratify your own re-pricing; every future term borrows from this floor.",
            "The footnote rights you conceded today decide a real dispute in year two.",
            "Goodwill spent by compliance is rarely returned as respect.",
          ],
          ethical: [
            "Duty to your team's work: you were its custodian at the table, and the table priced it down.",
            "Avoiding conflict is a choice whose costs are billed to people not in the room.",
          ],
          stakeholderImpact: [
            { name: "You", effect: "Relief now; a residency inside terms you resent later." },
            { name: "Your team", effect: "Funded — and governed by a structure tilted against their interest." },
            { name: "Counterpart", effect: "Learns that pressure moves you; files the information." },
          ],
          longTerm: [
            "The operating agreement inherits the term-sheet's tilt; disputes are decided before they begin.",
            "Your reputation in the circle: valuable and movable.",
          ],
          scores: { responsibility: 4, fairness: 3, consequences: 4, selfControl: 6, strategic: 4 },
          closing: "Peace purchased by pre-concession is usually an instalment plan for conflict.",
        },
      },
      {
        id: "b",
        label: "Anchor high and apply pressure",
        summary: "Open with aggressive demands and signal the deal can die daily until they improve.",
        style: "Aggressive",
        analysis: {
          benefits: [
            "Reframes the negotiation: you are a price-setter, not a supplicant.",
            "Creates room to 'concede' toward your true target.",
            "Signals to the industry that you are not the soft side of deals.",
          ],
          risks: [
            "High anchors read as bad faith when the technology dependency is visible to both sides.",
            "Applying pressure to a face-conscious counterpart can harden them beyond logic.",
            "You become the story of the deal's failure if it dies — 'the difficult founder'.",
          ],
          ethical: [
            "Theatre substitutes for substance: you are negotiating your image more than your terms.",
            "Escalation risks your team's funding to serve a signalling game.",
          ],
          stakeholderImpact: [
            { name: "Counterpart", effect: "Cornered publicly; motivated to win rather than to settle." },
            { name: "Your team", effect: "Riding a gamble they did not choose." },
            { name: "Industry", effect: "Receives a reputation you will spend years managing." },
          ],
          longTerm: [
            "A win here teaches your counterpart to seek revenge in the operating details.",
            "A loss here is public, formative, and narrated by them.",
          ],
          scores: { responsibility: 5, fairness: 4, consequences: 4, selfControl: 4, strategic: 6 },
          closing: "Anchors move numbers; they do not move dignity — yours or theirs.",
        },
      },
      {
        id: "c",
        label: "Name your minimum, calmly and in writing",
        summary: "State the fair floor — the few points you must have and why — hold it without theatre, and let them choose in the open.",
        style: "Principled",
        analysis: {
          benefits: [
            "Clarity is strength: a reasoned, minimal demand is the hardest thing in negotiation to refuse without exposure.",
            "The relationship survives because nothing is personal — every ask is argued, none is imposed.",
            "Refusal tells you the truth you needed before signature, at the price of a deal you should not have signed.",
          ],
          risks: [
            "You reveal your floor; a cynical counterpart may meet it and shave everything above it.",
            "Holding the line may actually end the deal — you must be willing to walk.",
            "Calm can be misread as softness until the deadline proves otherwise.",
          ],
          ethical: [
            "Treats the counterpart as an adult with a real choice, and yourself as bound by your own stated reasons.",
            "Fairness argued in the open is the kind that survives enforcement later.",
          ],
          stakeholderImpact: [
            { name: "Counterpart", effect: "Given a respectable path to yes — and ownership of no." },
            { name: "Your team", effect: "Terms that protect their work, or a timely escape." },
            { name: "You", effect: "Either residency in livable terms or freedom with your narrative intact." },
          ],
          longTerm: [
            "Your stated reasons become the operating culture of the partnership itself.",
            "The circle learns you are exact, not easy — the most valuable reputation to carry to the next table.",
          ],
          scores: { responsibility: 9, fairness: 9, consequences: 8, selfControl: 9, strategic: 9 },
          closing: "You did not win the room; you gave the room a clear, honest choice — and kept your standing either way.",
        },
      },
      {
        id: "d",
        label: "Walk away publicly, now",
        summary: "Announce the deal is off and tell your circle exactly why, before they can frame you.",
        style: "Confrontational",
        analysis: {
          benefits: [
            "You seize the narrative before the counterpart frames you as replaced or difficult.",
            "No bad terms will ever bind you.",
            "Publicly walking from a mispriced deal can re-rate you upward.",
          ],
          risks: [
            "You burn the relationship before exhausting the negotiation that might have fixed it.",
            "Eighteen months of slower growth begins today, funded by your team's patience.",
            "Going public first is remembered as temperament, whatever the merits.",
          ],
          ethical: [
            "Public breakup before clear private demand is verdict before trial.",
            "The prestige of walking away can be its own vanity — a cost silently split with your team.",
          ],
          stakeholderImpact: [
            { name: "Counterpart", effect: "Publicly rejected; an opponent for years." },
            { name: "Your team", effect: "Rewarded with integrity, billed in runway." },
            { name: "Industry", effect: "Applauds the spine; notes the flare." },
          ],
          longTerm: [
            "A reputation for drama that travels faster than the one for judgment.",
            "The slower path you bought must now actually work.",
          ],
          scores: { responsibility: 6, fairness: 5, consequences: 4, selfControl: 4, strategic: 5 },
          closing: "Leaving loudly is a power you can spend once per reputation.",
        },
      },
    ],
    mahabharata: {
      episode: "The Request for Five Villages",
      characters: ["Krishna", "Duryodhana", "Yudhishthira", "Dhritarashtra"],
      context:
        "In the Udyoga Parva, with both halls preparing for war, the Pandavas send through Krishna a final offer: they who were owed half a kingdom will name a minimum — five villages. Not half, not a province; five places to live in dignity. The demand's power is precisely its modesty: it is public, reasoned, and minimal. Duryodhana's refusal — not even land the size of a needle's point, he says, without war — settles more than the negotiation. It settles the question of who ended the peace, in front of everyone.",
      insight:
        "In negotiation, strength is the clarity of the minimum that is right — stated once, calmly, in the open. A reasonable floor does the work that pressure cannot: it transfers the burden of refusal to the other side, visibly.",
      modernApplication:
        "Define your five villages before you enter the room: the smallest fair outcome, argued with reasons, named without anger. Then hold it. Whatever they choose afterwards, you will own the narrative and your self-respect — which are the two assets that travel to every future table.",
      source: {
        title: "The Five Villages Demand",
        parva: "Udyoga Parva (Book of the Effort)",
        section: "Peace embassy cycle — sub-parva naming varies across editions",
        episode: "The Pandavas' minimal territorial demand and Duryodhana's refusal",
        translation: "Kisari Mohan Ganguli translation (1883–1896), public domain",
        url: "https://www.sacred-texts.com/hin/m05/index.htm",
        note: "Chapter numbering differs between the Ganguli edition, the Critical Edition (BORI), and abridged retellings. Verify section numbers against the edition you cite.",
      },
    },
    reflectionQuestions: [
      "What are your 'five villages' in the most important negotiation you currently face — and have you stated them to yourself in one sentence?",
      "Where are you anchoring for image when you should be naming a floor with reasons?",
      "If the other side refuses your reasonable minimum tomorrow, what exactly does your walk-away look like — and is it quiet enough to keep?",
    ],
  },
  {
    id: "crisis-hour",
    title: "The Crisis Hour",
    category: "pressure",
    difficulty: "Foundational",
    themes: ["Steadiness", "Crisis", "Duty", "Clarity"],
    coreTension: "Speed of response versus quality of mind",
    modernProblem:
      "A major production incident is live. Data is incomplete, two response options are both costly, and the executive channel wants your decision in thirty minutes.",
    situation:
      "At 03:12 the paging system wakes you: a payments outage, cascading. What you know: transaction failures at 34% and climbing. What you do not know: whether rollback fixes it or forks it, whether the data corruption window is minutes or hours. Two senior engineers argue opposite plans in the incident channel. The COO types: 'Decision needed by 04:00. Your call.' Hundreds of merchants' checkout pages are failing while you read this. You can feel the specific paralysis of wanting one more dashboard to refresh before you choose.",
    context:
      "You are the incident commander on rotation. Rollback is irreversible across a three-hour data window. A wrong call at this scale has ended careers at this company; so has a slow one.",
    stakeholders: [
      { name: "You", role: "Incident commander", interest: "The right call at the right speed — and to still trust your own judgment at noon." },
      { name: "Merchants", role: "Thousands of businesses", interest: "Their revenue hour, restored or at least honestly managed." },
      { name: "Engineering team", role: "9 responders", interest: "A commander who commands, not a committee." },
      { name: "COO", role: "Executive", interest: "A defensible timeline and clear ownership." },
    ],
    constraints: [
      "Thirty-minute executive deadline against fundamentally incomplete information.",
      "Rollback trades a three-hour data window against unknown corruption depth.",
      "The team's two most senior engineers publicly disagree; both watch how you handle it.",
      "Every minute of outage costs merchants money and your platform trust.",
    ],
    choices: [
      {
        id: "a",
        label: "Decide alone, right now",
        summary: "Pick the option your first analysis favours and own it completely.",
        style: "Decisive",
        analysis: {
          benefits: [
            "Maximum speed — sometimes the actual variable that decides outcomes.",
            "The channel gets one voice and total clarity; panic drops.",
            "Ownership is unambiguous, which the review afterwards will respect if the call was right.",
          ],
          risks: [
            "Speed substitutes for signal: your first analysis is also your least informed.",
            "Two senior engineers' contrary evidence is never incorporated.",
            "Deciding alone under adrenaline is the state least suited to irreversible choices.",
          ],
          ethical: [
            "Duty to decide includes the duty to decide well; haste is a choice, not a condition.",
            "The merchants bears the cost of your confidence either way — their stake deserves your best process, not your fastest.",
          ],
          stakeholderImpact: [
            { name: "Merchants", effect: "Fast resolution or fast catastrophe — variance, packaged as leadership." },
            { name: "Engineering team", effect: "Commanded clearly; consulted never." },
            { name: "COO", effect: "Gets the 04:00 decision, whatever its quality." },
          ],
          longTerm: [
            "If right: a heroic story that teaches the next incident the wrong lesson.",
            "If wrong: full ownership of an avoidable error, made alone.",
          ],
          scores: { responsibility: 6, fairness: 5, consequences: 4, selfControl: 4, strategic: 5 },
          closing: "Speed is a weapon; fired in the dark it discriminates poorly.",
        },
      },
      {
        id: "b",
        label: "Run a 15-minute clarity protocol",
        summary: "Contain the blast radius first; then one structured block — what we know, what we don't, next checkpoint at 03:45 — and decide from steady ground.",
        style: "Strategic",
        analysis: {
          benefits: [
            "Converts adrenaline into procedure: the decision that emerges is a product of the team's best facts, not your loudest fear.",
            "Containment first shrinks the cost of the remaining uncertainty.",
            "A visible checkpoint gives executives a promise they can hold while you think.",
          ],
          risks: [
            "Fifteen minutes of structure is also fifteen minutes of outage if the first instinct was right.",
            "Protocol can become its own procrastination if the deadline slides.",
            "You must hold the discipline while two camps lobby during the block.",
          ],
          ethical: [
            "Governing your own mind first is a duty owed to everyone downstream of the decision.",
            "Steadiness chosen in public lets the team lend you their facts instead of their panic.",
          ],
          stakeholderImpact: [
            { name: "Merchants", effect: "Contained damage plus a decision built on evidence; an honest status at a stated time." },
            { name: "Engineering team", effect: "Both camps heard in one frame; the channel settles." },
            { name: "COO", effect: "04:00 arrives with a decision plus its reasoning attached." },
          ],
          longTerm: [
            "The protocol becomes the team's remembered template for the next 3 AM.",
            "Your judgment at noon is one you can still respect.",
          ],
          scores: { responsibility: 9, fairness: 8, consequences: 8, selfControl: 9, strategic: 9 },
          closing: "You governed the mind first, and then the moment obeyed.",
        },
      },
      {
        id: "c",
        label: "Delegate the call down",
        summary: "Let the two senior engineers decide between them and support whatever they pick.",
        style: "Delegating",
        analysis: {
          benefits: [
            "The decision sits with the deepest technical context.",
            "You stay available for coordination and external communication.",
            "It builds their ownership for future incidents.",
          ],
          risks: [
            "They already disagree; delegation does not resolve the fork, it moves it.",
            "In a crisis, the commander's abdication reads as absence precisely when presence settles the channel.",
            "If it fails, the decision was yours by role and escaped by practice — the worst accountability shape.",
          ],
          ethical: [
            "Duty delegated upward-covering is duty declined: the role exists to absorb exactly this pressure.",
            "Fairness to the engineers: forcing them to share a call that splits their careers between them.",
          ],
          stakeholderImpact: [
            { name: "Engineering team", effect: "Two seniors carrying a command decision without command authority." },
            { name: "Merchants", effect: "Waiting on a debate their money is funding." },
            { name: "COO", effect: "A decision arrives without an owner." },
          ],
          longTerm: [
            "The team learns that hard calls get pushed sideways at the top.",
            "Your next rotation inherits a quieter channel and a heavier pager.",
          ],
          scores: { responsibility: 4, fairness: 5, consequences: 4, selfControl: 5, strategic: 4 },
          closing: "Delegation is guidance given; abdication is guidance missing.",
        },
      },
      {
        id: "d",
        label: "Wait for more data while containing",
        summary: "Freeze changes, keep the failover holding, and tell the executive the decision moves to 05:00 when the corruption window is known.",
        style: "Cautious",
        analysis: {
          benefits: [
            "No irreversible step is taken on unknown corruption depth.",
            "The 05:00 picture may be genuinely decisive, not just slightly better.",
            "Containment alone may stabilise merchant impact to a bearable plateau.",
          ],
          risks: [
            "If the failure is compounding, the hour of waiting is billed to merchants at scale.",
            "Moving the executive deadline without a decision grows the channel's anxiety, not its patience.",
            "Waiting can be paralysis wearing the costume of diligence.",
          ],
          ethical: [
            "Caution is owed to the irreversible, but delay is not free; its price is paid by people with no dashboard.",
            "Renegotiating a deadline is legitimate once — as a decision, not as drift.",
          ],
          stakeholderImpact: [
            { name: "Merchants", effect: "A contained but continuing outage, in exchange for a safer fix." },
            { name: "Engineering team", effect: "A clear hold order; less clarity about who is steering." },
            { name: "COO", effect: "A moved deadline and a held breath." },
          ],
          longTerm: [
            "If the plateau held: vindicated patience, institutionalised.",
            "If it did not: the review title is 'the hour we watched'.",
          ],
          scores: { responsibility: 6, fairness: 6, consequences: 5, selfControl: 7, strategic: 6 },
          closing: "Waiting is a decision with a meter running; be sure what it is buying.",
        },
      },
    ],
    mahabharata: {
      episode: "Arjuna's Dilemma on the Field of Kurukshetra",
      characters: ["Arjuna", "Krishna"],
      context:
        "At the opening of the war, in the Bhishma Parva, Arjuna asks for the chariot to be driven between the two armies — and seeing his teachers, cousins and elders arrayed to be killed, his nerve fails: his bow slips, his mind reels, and he says he will not fight, because every outcome he can see is ash. The response he receives — the Bhagavad Gita — is not a reflex order to act. It is a long discipline of mind: see clearly what your duty is, act with full commitment, and release the panic about outcomes you cannot guarantee. Steadiness first; then the arrow.",
      insight:
        "Under pressure, the mind's condition is itself part of the decision. Paralysis and reflex are twin failures; between them runs disciplined steadiness — know what you know, act from duty rather than from fear of blame, and own the outcome chase afterwards.",
      modernApplication:
        "The 3 AM incident is a small Kurukshetra: incomplete data, two costly options, and an audience. The protocol is the epic's advice operationalised — stabilise your mind and the blast radius, separate known from unknown, set the checkpoint, then execute the call with full commitment.",
      source: {
        title: "The Bhagavad Gita (within the Mahabharata)",
        parva: "Bhishma Parva (Book of Bhishma's Command)",
        section: "Bhagavad-Gita Parvan — sub-parva naming varies across editions",
        episode: "Arjuna's collapse of nerve and Krishna's counsel at the field's edge",
        translation: "Kisari Mohan Ganguli translation (1883–1896) — the Gita chapters within Bhishma Parva; compare any major Gita translation",
        url: "https://www.gitasupersite.iitk.ac.in/",
        note: "The Gita Supersite (IIT Kanpur) offers the text across multiple translations and commentaries. Chapter and verse numbering for the Gita is standardised (18 chapters), but its placement within parvas differs by edition.",
      },
    },
    reflectionQuestions: [
      "In your last crisis, which failure mode claimed you — reflex or paralysis — and what did it cost?",
      "What does your personal 'chariot between the armies' ritual look like: the five minutes that steady you before a hard call?",
      "Which decision in your current week are you delaying not for better data, but for better feelings?"
    ],
  },
  {
    id: "open-the-armor",
    title: "Open the Armor",
    category: "decision-making",
    difficulty: "Intermediate",
    themes: ["Generosity", "Boundaries", "Openness", "Reciprocity"],
    coreTension: "Protect the edge versus grow the commons",
    modernProblem:
      "Your research is your startup's only moat. The community that taught you asks you to open-source it — competitors included. What do you give?",
    situation:
      "Four years ago you learned your craft from open papers and public code. Now your startup's survival rests on one novel method you developed. A respected foundation asks you to open-source it as the reference implementation: immense credibility, hiring gravity, goodwill of the entire field — handed, also, to every competitor on earth, the same week a large rival launched a closed clone of your product. Your two co-founders split: 'we owe the commons' versus 'we are the commons now, and we will not survive it'.",
    context:
      "You have eleven months of runway. The rival is ten times your size. Open releases cannot be recalled. The foundation's offer of stewardship, visibility and potential grant funding is real but unsigned.",
    stakeholders: [
      { name: "You", role: "Founder / author", interest: "Honouring the commons without mortgaging the people who joined you." },
      { name: "Team & cofounders", role: "9 colleagues", interest: "Survival of the company and equity they sacrificed for." },
      { name: "Foundation", role: "Community steward", interest: "A shared standard that lifts the whole field." },
      { name: "Users of the commons", role: "Developers worldwide", interest: "Access to the method that advanced your product." },
    ],
    constraints: [
      "Eleven months of runway; a closed-clone rival with ten times your resources.",
      "An open release is irreversible.",
      "Foundation support is promised in principle but not yet signed.",
      "Your hiring brand depends heavily on credibility in the open community.",
    ],
    choices: [
      {
        id: "a",
        label: "Open everything, tomorrow",
        summary: "Release the full method, all weights and tooling, and trust generosity to return as gravity.",
        style: "Generous",
        analysis: {
          benefits: [
            "Maximal credibility: your name becomes the field's reference.",
            "The commons that raised you is repaid in full, in kind.",
            "External contributions may out-pace what your nine people could do alone.",
          ],
          risks: [
            "The rival integrates your method in a sprint and out-distributes you within a quarter.",
            "Your moat reduces to execution speed — with eleven months of fuel.",
            "Unsigned foundation support may never convert into runway.",
          ],
          ethical: [
            "Generosity is owed to the commons; stewardship is owed to your team — an open release weighs both at once.",
            "Giving from a position of strength is virtue; giving what is not entirely yours is appropriation with good PR.",
          ],
          stakeholderImpact: [
            { name: "Users of the commons", effect: "Everything, immediately, irrevocably." },
            { name: "Team & cofounders", effect: "Pride and exposure in equal measure — chosen for them, partly." },
            { name: "You", effect: "A halo with an eleven-month timer." },
          ],
          longTerm: [
            "Either the field's standard-bearer at scale, or the beloved ancestor of the rival's product.",
            "The credit is permanent; the company may not be.",
          ],
          scores: { responsibility: 6, fairness: 7, consequences: 5, selfControl: 4, strategic: 5 },
          closing: "Pure gifts are for those whose dependents are already safe.",
        },
      },
      {
        id: "b",
        label: "Open the core, keep the edge",
        summary: "Release a genuinely useful open core under a reciprocal licence, document the method, and keep the production refinements that are your survival margin.",
        style: "Strategic",
        analysis: {
          benefits: [
            "Real generosity — the commons gets a working method, not a marketing demo — with boundaries drawn where your payroll begins.",
            "A reciprocal licence asks contribution from those who build on you.",
            "The rival gains a reference, not your operational edge.",
          ],
          risks: [
            "Purists will call it open-core hedging; some goodwill evaporates.",
            "The line between core and edge must be defended release after release.",
            "Reciprocity clauses slow enterprise adoption you might want.",
          ],
          ethical: [
            "Honours both creditors: the commons that taught you and the team that trusts you.",
            "Boundaries stated in a licence are more honest than generosity implied beyond your means.",
          ],
          stakeholderImpact: [
            { name: "Users of the commons", effect: "The method, the tooling, and a claim on your future contribution." },
            { name: "Team & cofounders", effect: "A moat narrowed but held; the mission visibly honoured." },
            { name: "Foundation", effect: "A serious standard to steward instead of a press release." },
          ],
          longTerm: [
            "You become the ecosystem's centre without ceasing to exist — the only durable form of generosity available to the small.",
            "Reciprocity normalises a healthier commons for everyone after you.",
          ],
          scores: { responsibility: 9, fairness: 8, consequences: 8, selfControl: 8, strategic: 9 },
          closing: "You gave the armor's craft to the world and kept the armor for the war.",
        },
      },
      {
        id: "c",
        label: "Keep everything closed",
        summary: "Politely decline. Survival first; the commons will still be there after you win.",
        style: "Defensive",
        analysis: {
          benefits: [
            "The rival gains nothing from your hand.",
            "All resources focus purely on the survival fight.",
            "Your investors' interpretation of fiduciary care is fully satisfied.",
          ],
          risks: [
            "The community that made you watches you close the door you walked through.",
            "Hiring gravity, goodwill and external contribution all go to more open rivals.",
            "'After we win' is a promise generous people make and rarely keep.",
          ],
          ethical: [
            "Legitimate self-preservation — but legitimacy erodes if the debt to the commons is never scheduled, only eulogised.",
            "Your method itself stands on open shoulders; the ethical cost is arrears, not theft.",
          ],
          stakeholderImpact: [
            { name: "Team & cofounders", effect: "Maximally protected, publicly colder." },
            { name: "Users of the commons", effect: "Nothing — including nothing of what was owed." },
            { name: "Rival", effect: "Unassisted, and unbothered." },
          ],
          longTerm: [
            "If you survive: a closed winner whose origin story quietly embarrasses it.",
            "If you fail: you take the method to the grave with the company.",
          ],
          scores: { responsibility: 6, fairness: 4, consequences: 6, selfControl: 7, strategic: 6 },
          closing: "A door closed for survival can still be left unlocked; mark the date you mean to open it.",
        },
      },
      {
        id: "d",
        label: "Trade openness for signed reciprocity",
        summary: "Release fully — but only after the foundation signs grant funding, stewardship commitments and a trademarked standard governed jointly.",
        style: "Tactful",
        analysis: {
          benefits: [
            "The gift lands with infrastructure attached: funding flows, governance seats, and a standard with your name in law.",
            "Converts unsigned goodwill into contracts before the irreversible step.",
            "The rival faces a governed standard, not just your code.",
          ],
          risks: [
            "Negotiation takes months the runway does not have; deals stall.",
            "The foundation may walk, finding conditional generosity unlovely.",
            "Trademark governance can sour the commons' friendship into a standards war.",
          ],
          ethical: [
            "Asking return for a gift is not greed when the return sustains the giver's ability to keep giving.",
            "But holding generosity hostage to terms changes what the act is — be honest with yourself about which act you are performing.",
          ],
          stakeholderImpact: [
            { name: "Foundation", effect: "Offered a partnership with responsibilities, not just an asset." },
            { name: "Team & cofounders", effect: "Runway extended if the deal closes; consumed by the deal if it drags." },
            { name: "Users of the commons", effect: "Everything, on governance rails you co-design." },
          ],
          longTerm: [
            "If signed: the strongest position — author, steward and funded beneficiary at once.",
            "If stalled: the window closed while you were drafting it.",
          ],
          scores: { responsibility: 8, fairness: 7, consequences: 7, selfControl: 7, strategic: 8 },
          closing: "You asked the gift to carry its own weight — fair, if the gift must also carry nine salaries.",
        },
      },
    ],
    mahabharata: {
      episode: "Karna's Armor and Earrings",
      characters: ["Karna", "Indra", "Surya"],
      context:
        "In the Vana Parva, the god Surya warns his son Karna in a dream: Indra will come disguised as a beggar to ask for the golden armor and earrings Karna was born with — the things that make him unconquerable. Karna knows the trap and gives anyway when Indra comes; generosity is not something he does, it is what he is. But the tradition preserves a second stroke: seeing Karna's integrity, Indra offers a boon in return, and Karna asks for the Shakti — the single irresistible weapon — bargaining his open hand for one reserved power.",
      insight:
        "Generosity with open eyes is not the same as giving blind. Karna's act is honoured precisely because he knew the price — and the epic lets him ask for something back. Giving from strength, knowing what you give, naming what must stay protected: that is the adult form of the open hand.",
      modernApplication:
        "Open-sourcing is armor-giving. Do it knowingly: release what builds the commons, license it so value flows back, and be explicit about the spear you keep. Generosity that bankrupts the giver teaches the commons to prey; generosity with structure teaches it to circulate.",
      source: {
        title: "The Taking of Karna's Earrings (Kundala-harana)",
        parva: "Vana Parva (Book of the Forest)",
        section: "Sub-parva naming varies across editions",
        episode: "Indra, disguised, requests Karna's natural armor and earrings; Karna gives, and asks for the Shakti",
        translation: "Kisari Mohan Ganguli translation (1883–1896), public domain",
        url: "https://www.sacred-texts.com/hin/m03/index.htm",
        note: "Chapter numbering differs between the Ganguli edition, the Critical Edition (BORI), and abridged retellings. Verify section numbers against the edition you cite.",
      },
    },
    reflectionQuestions: [
      "What is the 'armor' in your work — the thing whose gift would be irreversible — and what is the 'spear' you would ask in return?",
      "Whose shoulders does your own method stand on, and what instalment do you owe them this year?",
      "Where is the licence line — the written boundary — between your generosity and your payroll?",
    ],
  },
  {
    id: "after-they-struck",
    title: "After They Struck You",
    category: "conflict",
    difficulty: "Intermediate",
    themes: ["Retaliation", "Restraint", "Reputation", "De-escalation"],
    coreTension: "Strike back versus break the cycle",
    modernProblem:
      "A rival publicly torpedoed your launch with a misleading teardown. You now hold genuinely damaging evidence about their product. Publish, warn, or let it go?",
    situation:
      "Three weeks ago a competitor published a 'technical review' of your flagship launch that was 80% insinuation — your growth stalled overnight. Your engineers, still angry, have since found something real: the rival's own product fails the standard they accused you of missing, and their security whitepaper overclaims. The evidence is solid, legal, and devastating. Your team has a draft post ready. Publishing it would feel like justice; the rival burned your quarter, and the truth is on your side. But you can already see the mid-game: their response, your counter, two brands bleeding trust while a third player watches.",
    context:
      "Your users are asking whether you will respond. The rival has a history of litigious, personal responses. Your investors have explicitly said they fund growth, not feuds.",
    stakeholders: [
      { name: "You", role: "Founder / CEO", interest: "Reality defended; the company's attention spent on building." },
      { name: "Team", role: "Engineers, wronged", interest: "Vindication for work they are proud of." },
      { name: "Rival", role: "Competitor", interest: "Survival of their own narrative — at any cost." },
      { name: "Market", role: "Customers & press", interest: "Signal about which product is trustworthy." },
    ],
    constraints: [
      "Your evidence is solid, but publishing it brands you as a combatant.",
      "The rival escalates personally when attacked.",
      "Your quarter's recovery depends on refocusing press on your roadmap.",
      "The team is emotionally invested in striking back; leadership tone will set theirs.",
    ],
    choices: [
      {
        id: "a",
        label: "Publish the takedown",
        summary: "Release the evidence anonymously-via-press — let the facts 'independently' emerge.",
        style: "Retaliatory",
        analysis: {
          benefits: [
            "Symmetry restored: they live under the standard they weaponised.",
            "The team's rage gets a productive outlet; morale surges.",
            "Customers see the full picture, arguably serving the market's information.",
          ],
          risks: [
            "Anonymous provenance will be traced to you within days — it always is — converting vindication into conspiracy.",
            "The feud becomes your brand's second product line; press covers combat, not roadmaps.",
            "A litigious, personal rival now has motive plus target.",
          ],
          ethical: [
            "Truth offered through a disguised channel borrows the ethics of its disguise.",
            "Your customers' real interest — a better product — is not served by a better feud.",
          ],
          stakeholderImpact: [
            { name: "Rival", effect: "Wounded as you were; converted into a permanent enemy with nothing to lose." },
            { name: "Market", effect: "More heat, less light; trust in the category itself erodes." },
            { name: "Team", effect: "A sugar-high of vindication, then the strange flatness of fighting a war nobody staffed." },
          ],
          longTerm: [
            "The industry learns you both brawl; buyers route around categories that brawl.",
            "You inherit the frame of your opponent: attack as identity.",
          ],
          scores: { responsibility: 3, fairness: 4, consequences: 3, selfControl: 2, strategic: 4 },
          closing: "A victory in vengeance costs what the original defeat never could: your own shape.",
        },
      },
      {
        id: "b",
        label: "Answer with the roadmap only",
        summary: "Publish nothing about them. Fix what their teardown got almost-right in public, ship relentlessly, and let the comparison do the talking.",
        style: "Restrained",
        analysis: {
          benefits: [
            "Every ounce of attention returns to product — the only arena where you actually win.",
            "Fixing their fairest criticism in public converts their attack into your release notes.",
            "Press gets a story about momentum instead of a story about mud.",
          ],
          risks: [
            "Their insinuation stands publicly unrefuted; some share of the market keeps believing it.",
            "Restraint can read as inability to answer, especially in the short news cycle.",
            "The team's anger, unaddressed, curdles into 'leadership can't protect us'.",
          ],
          ethical: [
            "You refuse to make the market's understanding hostage to a feud both sides choreograph.",
            "The restraint is real only if you also fix the true part — otherwise it is evasion wearing composure.",
          ],
          stakeholderImpact: [
            { name: "Market", effect: "Signal returns to product quality within a cycle or two." },
            { name: "Team", effect: "Needs to be told plainly: we are winning by building, and here is the proof cadence." },
            { name: "Rival", effect: "Deprived of the oxygen of response; their attack ages into noise." },
          ],
          longTerm: [
            "Reputation compounds as 'the company that ships', which is the only durable one available.",
            "If the rival's real flaw matters to users, it surfaces through users — at a time and credibility you do not control.",
          ],
          scores: { responsibility: 8, fairness: 7, consequences: 8, selfControl: 10, strategic: 8 },
          closing: "You declined to spend your name punishing theirs.",
        },
      },
      {
        id: "c",
        label: "Back-channel warning and terms",
        summary: "Send their CEO the evidence dossier privately with one line: we will publish if you ever repeat. Then say nothing publicly either way.",
        style: "Tactful",
        analysis: {
          benefits: [
            "The deterrent exists without the feud: they now behave under a held sword.",
            "Their misleading teardowns likely stop — your actual aim — without a public exchange.",
            "You demonstrate strength to the one audience that matters here: them.",
          ],
          risks: [
            "A dossier sent to a litigious rival is a compliance exhibit someday: 'they threatened us'.",
            "Held swords invite testing; one provocation and you must publish or fold.",
            "Your team, never told, still believes leadership did nothing.",
          ],
          ethical: [
            "This is deterrence by private menace — defensible as peacekeeping only if the terms are truly defensive.",
            "The market you serve never learns the rival overclaims; you have prioritised your peace over their information.",
          ],
          stakeholderImpact: [
            { name: "Rival", effect: "Reined in, resentful, and holding a grievance about the threat itself." },
            { name: "Market", effect: "Protected from feuds; unprotected from the rival's future overclaims." },
            { name: "Team", effect: "Unaware of the shield; morale work still required in the open." },
          ],
          longTerm: [
            "An armed quiet: stable until the day the terms are tested.",
            "If it ever surfaces, 'takedown withheld as blackmail' is the available headline; your defence is your intent.",
          ],
          scores: { responsibility: 6, fairness: 5, consequences: 6, selfControl: 7, strategic: 7 },
          closing: "Deterrence works until interpreted; put the terms in writing you would be proud to see published.",
        },
      },
      {
        id: "d",
        label: "Escalate publicly, point by point",
        summary: "Publish a signed, complete rebuttal — their teardown dissected, their product's failures documented, your name on it.",
        style: "Confrontational",
        analysis: {
          benefits: [
            "A rigorous public correction is its own product: the market sees competence under fire.",
            "Fully on-record is cleaner than the anonymous route — no disguise to be unmasked.",
            "Sets a price for attacking you in public, which deters the next aggressor.",
          ],
          risks: [
            "You have now published a war declaration; the rival meets you at that level with nothing to lose.",
            "The news cycle rewards the conflict, not the correction; nuance loses to headline.",
            "Your investors watch two quarters of roadmap energy convert into rebuttal maintenance.",
          ],
          ethical: [
            "Honest about its own violence: this is an open strike, not a masked one — but a strike.",
            "Public truth-serving may justify it if the market genuinely needs the data; distinguish that need from your need.",
          ],
          stakeholderImpact: [
            { name: "Rival", effect: "Publicly wounded and professionally obligated to answer in kind." },
            { name: "Market", effect: "Fully informed, and exhausted by both of you." },
            { name: "Team", effect: "Thrilled, then conscripted into a feud's logistics." },
          ],
          longTerm: [
            "Two brands at war make a third brand the default choice.",
            "You will be asked in every interview for a year — about them.",
          ],
          scores: { responsibility: 5, fairness: 6, consequences: 4, selfControl: 4, strategic: 5 },
          closing: "Winning the exchange is not winning back the quarter; count what the war itself taxes.",
        },
      },
    ],
    mahabharata: {
      episode: "The Night Raid of the Sauptika Parva",
      characters: ["Ashwatthama", "Drona", "Dhrishtadyumna"],
      context:
        "The war is over. The Kaurava cause is lost, Duryodhana dying, Drona dead by the half-truth. In the Sauptika Parva, Ashwatthama — unable to digest the humiliation of how his father fell — leads two companions into the Pandava camp at night and slaughters the sleeping victors' sons and allies. It is 'victory' of a kind: the deed is done, the targets destroyed. And it wins nothing; even those it was meant to avenge call it adharma. The raiders inherit not relief but a curse and the longest night of their lives. The epic's ledger of the war ends here precisely to make the point: violence after the decision avenges pride, not people.",
      insight:
        "Retaliation after the contest is decided buys nothing back. Vengeance spends the very currency the original struggle was fought to protect — legitimacy, reputation, self-respect — and it converts today's enemy into tomorrow's cause.",
      modernApplication:
        "You hold the raid plan in your drafts folder. Before you send it, run the epic's arithmetic: what does a successful strike return — the quarter, the trust, the roadmap? Nothing returns. The only wins available now are refusal of the cycle and investment in the next real contest: the product.",
      source: {
        title: "The Night Assault (Sauptika)",
        parva: "Sauptika Parva (Book of the Sleeping Warriors)",
        section: "Sub-parva naming varies across editions",
        episode: "Ashwatthama's night raid on the sleeping camp after the war's decision",
        translation: "Kisari Mohan Ganguli translation (1883–1896), public domain",
        url: "https://www.sacred-texts.com/hin/m10/index.htm",
        note: "Chapter numbering differs between the Ganguli edition, the Critical Edition (BORI), and abridged retellings. Verify section numbers against the edition you cite.",
      },
    },
    reflectionQuestions: [
      "What are you hoping a strike returns that it cannot actually return?",
      "If you answered only by shipping for six months, what would the review meeting sound like — and who would tell it you were right?",
      "Where is your team's anger being productively spent right now, and who is responsible for routing it there?",
    ],
  },
];
