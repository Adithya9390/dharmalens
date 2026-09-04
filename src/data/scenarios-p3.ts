import type { Scenario } from "../types";

export const SCENARIOS_P3: Scenario[] = [
  {
    id: "into-the-spiral",
    title: "Into the Spiral",
    category: "leadership",
    difficulty: "Intermediate",
    themes: ["Reversibility", "Courage", "Preparation", "Exit Design"],
    coreTension: "Seize the role versus design the exit first",
    modernProblem:
      "You've been offered a high-visibility transformation leadership role in a domain you half-know. There is no graceful off-ramp once you accept.",
    situation:
      "The COO offers it over coffee: lead the platform migration the company's next three years depend on. Eighty engineers, fourteen months, board-level visibility. You are brilliant at the people half; the technical half you know well enough to follow and not well enough to be caught out. Two predecessors quit this programme: one was scapegoated, one quietly reassigned. The COO says: 'It's yours if you want it. But if you take it, you own it — there is no version where you hand it back.' It is the fastest promotion path you will see this decade. It is also a wheel of blades with a very attractive door.",
    context:
      "Declining costs little: you keep a role you excel in. Accepting commits you publicly. The migration genuinely lacks its leader, and everyone knows the clock is running.",
    stakeholders: [
      { name: "You", role: "Senior leader", interest: "Growth that compounds rather than visibility that consumes." },
      { name: "COO", role: "Sponsor", interest: "A credible owner for a programme that has burned two." },
      { name: "Programme team", role: "80 engineers", interest: "A leader who lasts and shields them." },
      { name: "Company", role: "Board", interest: "The migration landing on time; stop cycling leaders." },
    ],
    constraints: [
      "Acceptance is public and effectively irreversible; failure is equally public.",
      "You know the people domain deeply and the technical domain partially.",
      "Two predecessors failed; the programme's reputation contaminates its leader.",
      "Declining keeps your current trajectory intact but flat.",
    ],
    choices: [
      {
        id: "a",
        label: "Accept and improvise",
        summary: "Take it with both hands. You'll learn the technical half faster than anyone expects.",
        style: "Bold",
        analysis: {
          benefits: [
            "The growth this decade promised starts Monday.",
            "Real learning does happen under total commitment; many great careers begin exactly this way.",
            "The programme finally gets a leader wholly committed rather than cautiously assigned.",
          ],
          risks: [
            "Wheel-of-blades arithmetic: entering formations you cannot exit converts courage into exposure.",
            "Half-knowledge that suffices in meetings fails in the moment the migration forks.",
            "Two predecessors stand as evidence about what this programme does to confidence.",
          ],
          ethical: [
            "The eighty engineers are owed a leader who knows what they were sold to; self-belief is not a deliverable they can use.",
            "Accepting irreversible authority over others' work without the means to judge it is a quiet over-claim.",
          ],
          stakeholderImpact: [
            { name: "Programme team", effect: "Energised by belief; unprotected at the technical seams." },
            { name: "COO", effect: "The ownership they asked for — with the risk unpriced." },
            { name: "You", effect: "Maximum growth or third burn on the pyre, with no middle exit." },
          ],
          longTerm: [
            "If it works: the decade's defining success, earned at real odds.",
            "If it cracks: the learning is permanent, and so is the headline.",
          ],
          scores: { responsibility: 5, fairness: 5, consequences: 4, selfControl: 4, strategic: 5 },
          closing: "Audacity is a strategy only when someone has costed the retreat.",
        },
      },
      {
        id: "b",
        label: "Accept — with the exit designed first",
        summary: "Take the role only with agreed terms: staged gates, a technical co-authority, advisory access, and pre-defined review points where the mandate can change hands cleanly.",
        style: "Strategic",
        analysis: {
          benefits: [
            "You enter the wheel with the exit mapped: staged authority matched to staged proof.",
            "A co-authority on the technical half converts your ignorance from liability into structure.",
            "Pre-agreed review points make any future hand-back a designed event, not a collapse.",
          ],
          risks: [
            "The COO may read terms as half-heartedness and give the role elsewhere.",
            "Gates and co-authority slow the early weeks when momentum helps.",
            "You must hold yourself to the gates when pride later argues against them.",
          ],
          ethical: [
            "Honest about capability with those accepting your leadership — the eighty engineers get a functioning authority structure, not a bet on your learning curve.",
            "Pre-commitment to review is self-skepticism institutionalised — the rarest deliverable a leader can ship.",
          ],
          stakeholderImpact: [
            { name: "Programme team", effect: "Led by a structure that covers its own seams; shielded by design." },
            { name: "COO", effect: "An owner plus a governance frame — strictly more than was asked." },
            { name: "You", effect: "The growth, with the fall priced and bounded in advance." },
          ],
          longTerm: [
            "Success becomes repeatable because the structure, not luck, carried the risk.",
            "The programme inherits its first ever leadership with a designed succession mechanic.",
          ],
          scores: { responsibility: 9, fairness: 8, consequences: 9, selfControl: 8, strategic: 10 },
          closing: "You entered the formation the way generals do: knowing where the door out is cut.",
        },
      },
      {
        id: "c",
        label: "Decline and propose a better fit",
        summary: "Say no, name the missing capability honestly, and put forward the colleague who has it — offering yourself in the supporting role.",
        style: "Candid",
        analysis: {
          benefits: [
            "The programme gets the right-shaped leader; the company stops cycling.",
            "Your candour about your own limits buys trust that compounds for years.",
            "The supporting role lets you learn the domain beside real authority instead of inside its blast radius.",
          ],
          risks: [
            "In most org charts, the sponsor grows faster than the supporter — you may watch a slower decade.",
            "Some read decline-and-nominate as declining ambition itself.",
            "If the nominated leader fails, the memory of your refusal becomes complicated.",
          ],
          ethical: [
            "Refusal with a constructive alternative is duty, not timidity: the programme's needs were weighed above your trajectory.",
            "Honest inventory of one's own capability is a service to everyone who would have depended on the myth.",
          ],
          stakeholderImpact: [
            { name: "Company", effect: "A fatal pattern possibly broken by the one candid conversation no predecessor had." },
            { name: "Nominated colleague", effect: "Opportunity they earned, plus your commitment beside them." },
            { name: "You", effect: "Slower ascent, sturdier ground, cleaner mirror." },
          ],
          longTerm: [
            "The organisation learns declining can be a form of leadership — once, which may be enough.",
            "Your next yes is believed because your no was honest.",
          ],
          scores: { responsibility: 9, fairness: 9, consequences: 7, selfControl: 9, strategic: 7 },
          closing: "You chose the formation's survival over your entrance into it — a leader's answer in decline's clothing.",
        },
      },
      {
        id: "d",
        label: "Negotiate a reversible pilot",
        summary: "Accept only a 90-day discovery mandate: assessment, plan, and team charter — with a hard decision point and no penalty for your honest recommendation either way.",
        style: "Tactful",
        analysis: {
          benefits: [
            "Converts an irreversible door into a reversible probe: everyone learns before anyone commits.",
            "Your honest find-out becomes a deliverable instead of a guess.",
            "The company gets ninety days of clarity it currently lacks about the programme itself.",
          ],
          risks: [
            "The COO explicitly said there is no hand-back version; you are negotiating against the stated terms of the offer.",
            "A pilot leader may be seen as a placeholder by the eighty, who have watched leaders rotate.",
            "Ninety days may prove too short to know the wheel's interior.",
          ],
          ethical: [
            "Tests the sponsor's real appetite: ownership of reality — including the reality that you may not be the answer.",
            "Fair to the team only if the pilot's limits are stated to them, not just to the board.",
          ],
          stakeholderImpact: [
            { name: "COO", effect: "Asked to trade the clean story of 'an owner' for the truer story of 'an answer'. " },
            { name: "Programme team", effect: "Yet another interim — unless the charter names what follows." },
            { name: "You", effect: "A bounded experiment instead of a bet-the-decade hand." },
          ],
          longTerm: [
            "If the pilot informs a confident yes: the strongest acceptance case the role has ever had.",
            "If the pilot reveals a needed no: the cheapest no in the programme's history.",
          ],
          scores: { responsibility: 8, fairness: 7, consequences: 8, selfControl: 8, strategic: 8 },
          closing: "You made the first commitment small enough to tell the truth in.",
        },
      },
    ],
    mahabharata: {
      episode: "Abhimanyu and the Chakravyuha",
      characters: ["Abhimanyu", "Arjuna", "Drona"],
      context:
        "In the Drona Parva, with Arjuna drawn away, the Kaurava army forms the chakravyuha — the wheel-formation almost no one alive can breach. Sixteen-year-old Abhimanyu steps forward: he learned, in the womb as the story is told, how to break into the formation — but he never learned the way back out. He enters gloriously, alone; the wheel closes behind him; and the day ends in the grief the whole epic still carries. The tragedy is structured, not accidental: brilliance at entry is not knowledge of exit.",
      insight:
        "Courage enters; strategy asks how it leaves. Commitments should be evaluated by their exit design, not their entrance romance — the formation that cannot be exited converts every gift into exposure.",
      modernApplication:
        "The glamorous irreversible role is the corporate chakravyuha. Before stepping in, ask the Abhimanyu question: what is my route out — staged gates, co-authority, review points, a clean hand-back? If none exists, cut one into the terms; if none can be cut, the honest answer may be to decline and nominate.",
      source: {
        title: "The Death of Abhimanyu",
        parva: "Drona Parva (Book of Drona's Command)",
        section: "Sub-parva naming varies across editions",
        episode: "Abhimanyu breaches the wheel-formation he cannot exit",
        translation: "Kisari Mohan Ganguli translation (1883–1896), public domain",
        url: "https://www.sacred-texts.com/hin/m07/index.htm",
        note: "Chapter numbering differs between the Ganguli edition, the Critical Edition (BORI), and abridged retellings. Verify section numbers against the edition you cite.",
      },
    },
    reflectionQuestions: [
      "Which commitment in front of you right now is a wheel you know how to enter but not exit?",
      "What gates, co-authority or review points could you cut into its terms before stepping through?",
      "Whose capability are you over-claiming by accepting — and what would honest inventory let you propose instead?",
    ],
  },
  {
    id: "the-silent-room",
    title: "The Silent Room",
    category: "ethics",
    difficulty: "Foundational",
    themes: ["Voice", "Complicity", "Courage", "Process"],
    coreTension: "Speak in the room versus repair after the room",
    modernProblem:
      "In a leadership meeting, a junior colleague is publicly blamed for a failure you know isn't theirs. Every senior person stays silent. You are mid-table.",
    situation:
      "Quarterly review. A launch incident is being dissected, and the narrative — wrong, you know — has settled on a junior engineer who is in the room to take notes. The VP says: 'This is what happens when ownership isn't taken seriously.' Heads nod. The engineer looks at the table. You carry the facts: the decision that caused the failure was made two levels above them, over their written objection. You have organisational capital to spend, a mortgage, and a review of your own in the same cycle. The room is twenty seconds from moving to the next agenda item.",
    context:
      "The company speaks often about 'ownership culture'. Nobody at your level has publicly contradicted this VP in a meeting in living memory. Whatever you do will be remembered.",
    stakeholders: [
      { name: "You", role: "Senior manager", interest: "The record set right without self-immolation." },
      { name: "Junior engineer", role: "Note-taker, blamed", interest: "Not being branded for others' decisions." },
      { name: "VP", role: "Authority in the room", interest: "A narrative of accountability — ideally a cheap one." },
      { name: "The silent seniors", role: "Your peers", interest: "Safety; someone else going first." },
    ],
    constraints: [
      "Twenty seconds until the moment passes and the record hardens.",
      "Contradicting this VP in public carries a known career price.",
      "The engineer's written objection exists — the facts are provable, not just felt.",
      "Your own performance review sits in this same quarterly cycle.",
    ],
    choices: [
      {
        id: "a",
        label: "Speak in the room, procedurally",
        summary: "Intervene on agenda-grounds, not verdict-grounds: 'Before we move on — the record should show the decision path; I'd like it noted correctly, with the documents attached.'",
        style: "Principled",
        analysis: {
          benefits: [
            "The record is corrected at the only moment correction is cheap: before it hardens.",
            "Procedural framing — documents, decision path — lets the truth land without you indicting the VP.",
            "Every silent person in the room watches speech be survivable; the room's physics change slightly.",
          ],
          risks: [
            "However procedural, you contradicted power in public; the price is real and may be invoiced later.",
            "If your facts are incomplete, you have publicly defended the wrong account.",
            "The junior colleague's relief may cost them the VP's interest as a marked person.",
          ],
          ethical: [
            "First speech is a duty, not a personality type: the room's silence was a decision, and yours breaks it.",
            "Truth entered into the record protects the powerless in the only form that endures — documentation.",
          ],
          stakeholderImpact: [
            { name: "Junior engineer", effect: "Spared a false brand, in the room where it was being applied." },
            { name: "VP", effect: "Corrected, publicly but procedurally — with a face-saving on-ramp." },
            { name: "The silent seniors", effect: "Shown that someone can go first; each now chooses what that changes." },
          ],
          longTerm: [
            "A precedent exists: the record matters here more than the room's comfort.",
            "Your capital converts into the only currency that appreciates — credibility.",
          ],
          scores: { responsibility: 9, fairness: 10, consequences: 8, selfControl: 8, strategic: 8 },
          closing: "You were the first voice; that is the entire mechanism by which rooms ever change.",
        },
      },
      {
        id: "b",
        label: "Stay silent; repair it afterwards",
        summary: "Say nothing in public. Visit the VP privately, present the documents, and get the record corrected without the theatre.",
        style: "Tactful",
        analysis: {
          benefits: [
            "The correction may still happen, at one-hundredth of your personal cost.",
            "Privately, the VP can adopt the truth as their own idea — adoption beats coercion for durability.",
            "No public wound: relationships that hold the organisation's functioning day stay intact.",
          ],
          risks: [
            "The room's lesson stands: blame flowed downhill in public while correction climbed uphill in whispers.",
            "The junior engineer spends days or weeks under the brand while your private process grinds.",
            "Silence in the room is witnessed and learned; repair after the room is invisible.",
          ],
          ethical: [
            "The harm that is public deserves correction at the same altitude it occurred; quiet repair leaves the audience poisoned.",
            "This still counts as speech — late speech — and late is not nothing; but the ledger of the room is not corrected by the ledger of the hallway.",
          ],
          stakeholderImpact: [
            { name: "Junior engineer", effect: "Eventually cleared, after carrying the brand publicly through the interval." },
            { name: "VP", effect: "Corrected gently; the power structure undisturbed." },
            { name: "The silent seniors", effect: "Confirmed in the strategy you just modelled: wait, whisper, survive." },
          ],
          longTerm: [
            "A culture where records are fixed in corridors and blame stays theatrical.",
            "Your safety intact; your example spent on the safer lesson.",
          ],
          scores: { responsibility: 6, fairness: 6, consequences: 6, selfControl: 8, strategic: 7 },
          closing: "Corridor corrections fix files; room corrections fix cultures.",
        },
      },
      {
        id: "c",
        label: "Comfort the colleague privately only",
        summary: "Tell the engineer afterwards you know the truth and it wasn't their fault. Change nothing official.",
        style: "Sympathetic",
        analysis: {
          benefits: [
            "The person most harmed receives real comfort from real knowledge.",
            "You spend no capital and make no enemies.",
            "The engineer learns they are seen, which protects their mind if not their file.",
          ],
          risks: [
            "Private sympathy beside a public false record is comfort that changes nothing operational.",
            "The engineer must now carry both the brand and the knowledge that observers knew.",
            "If they ever repeat your words, you are exposed as a silent knower.",
          ],
          ethical: [
            "Kindness without correction is solidarity with the person and collusion with the harm, executed in one gesture.",
            "You used the truth as a balm instead of as an instrument.",
          ],
          stakeholderImpact: [
            { name: "Junior engineer", effect: "Consoled and abandoned simultaneously — seen by you, branded by the record." },
            { name: "The silent seniors", effect: "Unchallenged; the strategy of the room validated again." },
            { name: "You", effect: "The comforts of courage with none of its costs — a debt of identity." },
          ],
          longTerm: [
            "A private knowledge economy grows: everyone knows, nobody amends.",
            "The engineer's trust in institutions quietly retires; perhaps so does yours.",
          ],
          scores: { responsibility: 4, fairness: 4, consequences: 3, selfControl: 6, strategic: 3 },
          closing: "Sympathy that avoids the record keeps the machinery that made the wound.",
        },
      },
      {
        id: "d",
        label: "Align with the room, revisit later",
        summary: "Nod along, stay safe, and raise accountability reform in your own review cycle when you have more standing.",
        style: "Strategic-Patient",
        analysis: {
          benefits: [
            "Your capital compounds untouched for a larger fight.",
            "A systemic fix — real accountability review — could prevent a hundred such rooms.",
            "You keep the standing that any future correction requires.",
          ],
          risks: [
            "The future standing you are saving may never feel sufficient; this is how forever-silence begins.",
            "The junior engineer pays today for reform due next cycle.",
            "Rooms remember who aligned; your reform later is read through your nod now.",
          ],
          ethical: [
            "Postponed justice is scheduled injustice for the person in the interval; the calendar is paid in their name.",
            "Trading one concrete person's record for an abstract systemic fix is a real trade — name it as one, or it names you.",
          ],
          stakeholderImpact: [
            { name: "Junior engineer", effect: "Branded, unrescued, hopefully remembered in an initiative someday." },
            { name: "VP", effect: "Uncontested; the accountability culture ratified by its senior witnesses." },
            { name: "You", effect: "Capital preserved; a small permanent lien placed on your self-respect." },
          ],
          longTerm: [
            "If the reform happens: a genuine ledger entry in your favour.",
            "If it quietly doesn't: this room was the moment it could have started.",
          ],
          scores: { responsibility: 5, fairness: 3, consequences: 4, selfControl: 7, strategic: 6 },
          closing: "Capital saved for a battle chosen later is often just a taller wall around silence.",
        },
      },
    ],
    mahabharata: {
      episode: "The Silence of the Assembly",
      characters: ["Draupadi", "Bhishma", "Vidura", "Vikarna"],
      context:
        "At the climax of the dice game in the Sabha Parva, Draupadi — staked and lost by Yudhishthira after he had already lost himself — is dragged into the hall and asks the assembly a procedural question with a moral heart: whom did the king lose first, himself or her? The great hall of elders falls to legalism and silence. Bhishma, the greatest of them, admits that dharma is subtle and he cannot resolve it. Vidura speaks; so does young Vikarna, a Kaurava brother — the first speech coming from the least expected chair. The hall's doom is not decided by dice; it is decided by the silence of the seated.",
      insight:
        "In rooms of power, silence is complicity with the strongest person present. Dharma being subtle is not an exemption from speech; it is the reason speech must happen anyway — someone always goes first, and going first is a role, not a temperament.",
      modernApplication:
        "Your meeting is a small assembly hall. The instruments that changed that hall still work: ask the procedural question in the open, attach the documents to the record, and make it survivable to be the second voice. If you will not speak, at least refuse to let the record say the room agreed.",
      source: {
        title: "Draupadi's Question to the Assembly",
        parva: "Sabha Parva (Book of the Assembly-Hall)",
        section: "Sub-parva naming varies across editions",
        episode: "The humiliation of Draupadi and the assembly's contested silence; Vidura and Vikarna object",
        translation: "Kisari Mohan Ganguli translation (1883–1896), public domain",
        url: "https://www.sacred-texts.com/hin/m02/index.htm",
        note: "Chapter numbering differs between the Ganguli edition, the Critical Edition (BORI), and abridged retellings. Verify section numbers against the edition you cite.",
      },
    },
    reflectionQuestions: [
      "Which room, in your last quarter, went silent in a way you now remember with your body?",
      "What is your procedural script — the exact first sentence you could say that corrects the record without declaring war?",
      "Whose record are you currently letting harden while you wait for more standing?",
    ],
  },
  {
    id: "one-chair-left",
    title: "One Chair Left",
    category: "loyalty",
    difficulty: "Advanced",
    themes: ["Impartiality", "Justice", "Loyalty", "Triage"],
    coreTension: "Preference versus principle under forced choice",
    modernProblem:
      "Budget forces you to keep exactly one of two people: your loyal lieutenant of six years, or the quiet top performer you barely know. The decision is yours alone.",
    situation:
      "The merger math lands on your desk: the combined team has one seat, your org has two candidates. Arjun-your-lieutenant has carried your projects for six years, taken the hard calls at midnight, and passed on offers to stay with you. Meera joined nineteen months ago, keeps to herself, and by every measurable standard is the stronger engineer — the review data is unambiguous, even after you adjust for opportunity. You can justify either name on paper. Nobody above you will question the choice; nobody below you will forget it. The email waiting in your drafts has one field left to fill.",
    context:
      "The retained person inherits the flagship project. The departed gets standard severance and, in this market, a hard quarter ahead. Your team watches not just whom you keep, but how you decide.",
    stakeholders: [
      { name: "You", role: "Director", interest: "The right criterion, defensibly applied, in a decision with no painless version." },
      { name: "Lieutenant", role: "6-year loyal deputy", interest: "Loyalty honoured by the person it was given to." },
      { name: "Top performer", role: "19-month quiet star", interest: "Merit weighed without the tariff of closeness." },
      { name: "Remaining team", role: "14 colleagues", interest: "Evidence that the rules here are real." },
    ],
    constraints: [
      "Exactly one retention slot; the decision is yours and unreviewable.",
      "Merit data and loyalty ledger point to different names.",
      "Both are good; the difference is legible mainly to you.",
      "How you decide will be reverse-engineered by the remaining fourteen.",
    ],
    choices: [
      {
        id: "a",
        label: "Keep the lieutenant",
        summary: "Six years of midnight calls is data too. Loyalty is how teams survive, and you reward what you want repeated.",
        style: "Loyal",
        analysis: {
          benefits: [
            "Honours a genuine ledger: loyalty freely given for years is a real organisational asset.",
            "The team sees that giving yourself to this place is not a sucker's trade.",
            "Continuity of trust in the role that most depends on it — yours.",
          ],
          risks: [
            "Merit becomes negotiable in public: the quiet learn that proximity outranks performance.",
            "Your future lieutenants understand the tariff exactly: years, not excellence.",
            "The flagship project inherits the weaker hand at precisely its hardest moment.",
          ],
          ethical: [
            "Gratitude administered with institutional power is a private debt paid from a public purse.",
            "Fairness to the third group — the fourteen watching — is dissenting from your answer.",
          ],
          stakeholderImpact: [
            { name: "Lieutenant", effect: "Loyalty repaid in full; a debt closed." },
            { name: "Top performer", effect: "Learned the lesson accurately: merit was insufficient here." },
            { name: "Remaining team", effect: "The observed rule: attach to power early; keep your CV warm." },
          ],
          longTerm: [
            "A court forms: personal bonds as the hiring architecture.",
            "The next forced choice finds the performance data mysteriously unavailable.",
          ],
          scores: { responsibility: 5, fairness: 3, consequences: 4, selfControl: 5, strategic: 5 },
          closing: "Debts of the heart should be settled with the heart's own currency, not the team's.",
        },
      },
      {
        id: "b",
        label: "Keep the top performer",
        summary: "Apply the stated standard: the stronger record stays. Explain it to your lieutenant yourself, with everything the institution can fairly offer them.",
        style: "Impartial",
        analysis: {
          benefits: [
            "The rule everyone was told was real is revealed to be real — once, at the moment it was hardest.",
            "The flagship project gets its strongest hand.",
            "The quiet members of your team receive the most important signal available: performance is portable here.",
          ],
          risks: [
            "Your lieutenant gives the company a story it cannot answer: six years, pack your desk.",
            "Institutional memory of loyalty's value — a real asset — takes a measurable hit.",
            "Your own working life loses the person who made it function.",
          ],
          ethical: [
            "Impartiality under personal loss is the only impartiality that is evidence.",
            "The standard applied against your own interest is the standard proven; anything easier is preference with paperwork.",
          ],
          stakeholderImpact: [
            { name: "Top performer", effect: "Merit honoured at the moment it was most at risk." },
            { name: "Lieutenant", effect: "Wounded by the hand they served — owed maximal candour, advocacy, and support in return." },
            { name: "Remaining team", effect: "A costly proof that the rules bind even the ruler." },
          ],
          longTerm: [
            "Standards that survive their hardest case stop needing enforcement.",
            "A personal cost you will feel for years; a culture others will build on longer.",
          ],
          scores: { responsibility: 9, fairness: 10, consequences: 8, selfControl: 9, strategic: 8 },
          closing: "You chose the brother-by-merit in the hour of loss — and paid for the standard to be believed.",
        },
      },
      {
        id: "c",
        label: "Refuse the frame and escalate",
        summary: "Hand the merged-headcount letter back: challenge the one-seat premise, propose alternatives — budget shifts, role redesign, your own title surrendered — and accept their arbitration if it stands.",
        style: "Principled",
        analysis: {
          benefits: [
            "Refuses to launder an upstream decision through your personal values; the real trade-off gets owned at the level that made it.",
            "Genuinely explores whether the scarce seat is real — sometimes it is a spreadsheet's artefact.",
            "Whatever the outcome, both candidates know someone fought."
          ],
          risks: [
            "Often the frame is real: escalation may simply delay and add the appearance of dithering.",
            "You spend political capital meant for ten future fights on this one.",
            "The final arbitration can land harder than your own decision would have.",
          ],
          ethical: [
            "Some zero-sum frames are manufactured; forcing the manufacturer to sign it is an act of justice upstream.",
            "But refusal to choose can also be cowardice dressed as challenge — the test is whether you will accept the verdict.",
          ],
          stakeholderImpact: [
            { name: "Both candidates", effect: "Their case argued by the person who knows it best." },
            { name: "Upper management", effect: "Required to own or rescind the scarcity they declared." },
            { name: "Remaining team", effect: "Shown that their director fights frames before executing them." },
          ],
          longTerm: [
            "If the seat is rescued: the strongest possible precedent against spreadsheet logic.",
            "If it stands: you still must choose — now with clean hands about the frame.",
          ],
          scores: { responsibility: 8, fairness: 7, consequences: 7, selfControl: 7, strategic: 8 },
          closing: "Contesting the frame is honourable exactly once; then the chair must be filled.",
        },
      },
      {
        id: "d",
        label: "Rebuild the criteria transparently",
        summary: "Define the retention criteria with HR and the two affected managers before scoring anyone; apply it blind where possible; document it fully.",
        style: "Procedural",
        analysis: {
          benefits: [
            "The criterion precedes the person — the only arrangement where justice can be inspected.",
            "Documented process protects both candidates from the story version of your decision.",
            "The fourteen watching receive a manual, not just an outcome.",
          ],
          risks: [
            "Process this formal for a two-person decision can read as machinery for a pre-chosen answer.",
            "Time consumed extends the agony for two lives on hold.",
            "Blind scoring cannot capture everything the role actually demands — including trust.",
          ],
          ethical: [
            "Justice administered with reasons stated in advance is the strongest form available to institutions.",
            "Honesty requires including 'deep working trust' as a declared criterion if it will decide — undisclosed deciding factors are rigged criteria.",
          ],
          stakeholderImpact: [
            { name: "Both candidates", effect: "Judged by a rule they can see, applied before their names were attached." },
            { name: "Remaining team", effect: "A published standard survives this decision and governs the next." },
            { name: "You", effect: "Bound by your own rule — including when it selects against your heart." },
          ],
          longTerm: [
            "Retention decisions gain a repeatable instrument.",
            "The rule you publish becomes the standard you are held to at your own review.",
          ],
          scores: { responsibility: 8, fairness: 9, consequences: 8, selfControl: 8, strategic: 8 },
          closing: "You wrote the rule before you read the names — the oldest technology for being fair.",
        },
      },
    ],
    mahabharata: {
      episode: "The Yaksha's Questions at the Enchanted Pool",
      characters: ["Yudhishthira", "Nakula", "Dharma (as the Yaksha)"],
      context:
        "In the Vana Parva, during exile, the Pandava brothers drink from a forbidden lake one by one and fall. Yudhishthira comes last and finds a Yaksha — a voice above the water — who requires answers to questions of dharma before any may drink. His final answers must be bought with a choice: only one of his fallen brothers may be revived, and Yudhishthira must say which. Kunti and Madri, his father's two wives, each have surviving sons; so that both lineages remain, Yudhishthira names Nakula — a son of Madri, not of his own mother, not the brother dearest to him. The Yaksha, testing precisely this, restores all four: impartiality under personal loss was the answer the test was built to find.",
      insight:
        "The rarest fairness is fairness that costs the judge. Anyone is impartial between strangers; the measure of a standard is whether it still governs when applied against your own affections, debts and comfort.",
      modernApplication:
        "The forced ranking is your enchanted pool. Decide the criterion before you read the names, apply it against your own lieutenant if that is where it points, and then spend everything the institution offers — advocacy, time, severance beyond minimum — on the person the standard could not save.",
      source: {
        title: "Yaksha Prashna — the Questions of the Yaksha",
        parva: "Vana Parva (Book of the Forest)",
        section: "Araneya Parvan — sub-parva naming varies across editions",
        episode: "Yudhishthira answers the Yaksha and chooses Nakula for revival",
        translation: "Kisari Mohan Ganguli translation (1883–1896), public domain",
        url: "https://www.sacred-texts.com/hin/m03/index.htm",
        note: "Chapter numbering differs between the Ganguli edition, the Critical Edition (BORI), and abridged retellings. Verify section numbers against the edition you cite. This platform does not reproduce the Yudhishthira's answers as quotations; consult the translation for the text.",
      },
    },
    reflectionQuestions: [
      "Where in your leadership does a stated standard currently bend around a personal debt?",
      "Which criterion would you accept reading your own file — and would you read it blind?",
      "When your standard costs you something personal for the first time, what support will you give the person it did not save?",
    ],
  },
];
