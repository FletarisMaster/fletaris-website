// Insights: short, dated notes for lessors and investors (direction v2, after MBA Aviation's
// "Aviation Insights" feed). Plain and specific (W19); no figure without a source (W14). Drafted
// by Claude on 21 Oct 2026 for Sam to review and correct before they go live.

export interface InsightBlock {
  h?: string;
  p: string[];
}

export interface Insight {
  slug: string;
  title: string;
  date: string; // ISO date
  summary: string;
  blocks: InsightBlock[];
}

export const INSIGHTS: Insight[] = [
  {
    slug: 'late-records-at-redelivery',
    title: 'What late records cost at redelivery',
    date: '2026-10-21',
    summary:
      'A redelivery is decided by the technical records long before the aircraft reaches the return location. Gaps found late turn into delays, extensions and compensation.',
    blocks: [
      {
        p: [
          'When an aircraft comes off lease, the lessor and the lessee meet over two things: the aircraft and its records. The aircraft can usually be inspected in days. The records take longer, and they are where most return disputes start.',
          'Return conditions ask for more than an airworthy aircraft. They ask for proof: the status of every check, airworthiness directive and service bulletin, and for life-limited parts, a traceable history back to new. A part without that history may be airworthy and still not acceptable at return.',
        ],
      },
      {
        h: 'Where the cost comes from',
        p: [
          'A missing back-to-birth trace, an open finding or an incomplete repair record rarely stops the return on its own. What it does is move the date. The aircraft waits while documents are found, parts are re-certified or replaced, and the two sides agree on who pays for what.',
          'Every week of that wait has a cost the lease never priced: the aircraft is not earning rent, the next lessee is waiting, and the outgoing lessee may be paying holdover rent or compensation under the return terms.',
        ],
      },
      {
        h: 'Finding gaps while there is still time',
        p: [
          'The gaps that hurt at return are usually visible in the records months earlier. Read against the return conditions, the records show which conditions will not be met on the date, what it would take to close them, and who is responsible for each.',
          'Found months ahead, a gap is a task with an owner. Found at the return location, it is a negotiation. That difference is what Fletaris is built to give a lessor: the return conditions read against the records continuously, well before the aircraft comes back.',
        ],
      },
    ],
  },
  {
    slug: 'reading-a-lease-waterfall',
    title: 'Reading a lease waterfall: who returns, when, and whether reserves cover it',
    date: '2026-10-21',
    summary:
      'A portfolio is easiest to manage as one list of returns in date order. Three questions decide where to look first.',
    blocks: [
      {
        p: [
          'A lease waterfall lists every aircraft in a portfolio by the date its lease ends. It is the simplest view of what is coming, and on a spreadsheet it is often where the analysis stops: a date per aircraft, sorted.',
          'The date is the least interesting part. What matters is what each aircraft will look like on that date, and what it will cost to bring it to the condition the lease asks for.',
        ],
      },
      {
        h: 'Three questions per aircraft',
        p: [
          'Will it be ready? Each return has conditions: check status, remaining life on engines and landing gear, records. Projected forward to the return date, each condition is met, marginal or failing.',
          'What will it cost to close what is failing? A failing condition is either work to be done before return or compensation to be agreed. Either way it has a price, and the price changes as the date gets closer.',
          'Do the reserves cover it? Where the lease collects maintenance reserves, the balance on the return date can be set against the expected cost. A shortfall is a negotiation to prepare for; a surplus is a reimbursement question.',
        ],
      },
      {
        h: 'Where to look first',
        p: [
          'Sort the waterfall by urgency, not only by date: aircraft already past their return date, returns where conditions are failing, and returns where an extension notice is due soon. A return a year away with a reserve shortfall can need attention before a return next month that is fully covered.',
          'Fletaris builds this view from the records the lessor already holds and keeps it current as the records change, so the waterfall shows readiness and cost at each date, not only the date.',
        ],
      },
    ],
  },
  {
    slug: 'shop-visits-decided-early',
    title: 'Why the next engine shop visit is decided years before it happens',
    date: '2026-10-21',
    summary:
      'Life-limited parts set hard limits on an engine’s time on wing. For a lessor, those limits meet the lease return conditions long before the engine comes off.',
    blocks: [
      {
        p: [
          'Some engine parts, mostly rotating parts such as discs and shafts, have a hard life limit counted in cycles. When a part reaches its limit, it must be replaced, whatever its condition. These life-limited parts are among the most expensive items in a shop visit.',
          'Because each part has its own limit and its own history, the stack of parts in an engine runs out unevenly. The part with the least life left often sets the date of the next shop visit, unless performance or a finding brings it forward.',
        ],
      },
      {
        h: 'Where the lease comes in',
        p: [
          'Many leases set a minimum remaining life for engines and their life-limited parts at return, or a compensation if the engine comes back below it. Whether an engine meets that condition on the return date depends on how many cycles it will fly before then, and on when its last shop visit was.',
          'That makes the shop visit plan a lease question as much as a maintenance one. A visit done just before return can satisfy the condition at a high cost; a visit deferred past return can move the cost to the lessor through compensation, or the other way round.',
        ],
      },
      {
        h: 'Seeing it early',
        p: [
          'All of this can be projected from the records: the cycles left on each part, the expected utilisation, and the return conditions that apply. Projected forward, the records show which engines will fall short of their return condition, roughly when, and what closing the gap is likely to cost.',
          'Fletaris projects life-limited parts, checks and shop visits from the records and prices them, so a lessor can see which engines need a decision, and when, while every option is still open.',
        ],
      },
    ],
  },
];

export function insightBySlug(slug: string) {
  return INSIGHTS.find((i) => i.slug === slug);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));
}
