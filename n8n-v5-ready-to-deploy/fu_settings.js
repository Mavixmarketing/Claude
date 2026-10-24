// SETTINGS. The live daily run sends; any other run is a test that sends nothing
// and uses three sample conversations from this week so you can read the drafts.
// No booking link here on purpose: follow-ups never suggest a call.
const test = $execution.mode !== 'production';
return [{ json: {
  SEND_FOR_REAL: !test,
  TEST: test,
  WRITE_MODEL: 'anthropic/claude-opus-5.5',
  // Farhan's choices for single people (19 oct). Emails in lower case.
  // STOP: never send these people a follow-up.
  // 24 oct: slovenia is talking with Farhan on whatsapp. camille wrote "please don't contact me again" on 8 oct
  // (after a new campaign emailed her), so her 1 feb date follow-up is off unless Farhan takes her off this list.
  STOP: ['andrei@brite.live', 'arihantkothari93@gmail.com', 'fellinlovewithslovenia@gmail.com', 'camillechapline@gmail.com'],
  // PLAN: nothing before the date, then one follow-up that follows his note, then light monthly check-ins.
  PLAN: {
    'anne.thomson@mymts.net': { from: '2026-11-16', note: 'On 15 oct Anne said she already has a provider and we wished her well. Farhan still wants to stay in touch: one short, kind check-in with one useful idea about getting her m prep course back to the first page of google. Never criticise her provider and never offer the audit again (she has it).' },
    'admin@powerbandelectrical.com.au': { from: '2027-01-05', note: 'Amanda said in oct they already have someone for their SEO and are happy with it. Farhan wants a friendly 3-month check-in: ask how things are going with their current setup and whether a free second opinion (the audit) would help now. No pressure, never criticise their provider.' },
    // jackie@ is the address in SalesBlink; her mail shows it lands in Jackie Rainforth's mailbox jackier@rainmakersgroup.ca (same person, one check-in, sent in the jackie@ thread)
    'jackie@rainmakersgroup.ca': { from: '2027-01-05', note: 'On 8 oct Jackie Rainforth said she has enough customers, and on 11 oct Farhan wrote that he had taken her off his list and would not reach out again, but that the free audit offer stands if things slow down. Farhan still wants one friendly check-in a few months on: ask how business is going and whether anything has changed, offer the free audit only lightly. No pressure.' },
    // 24 oct: chats Farhan unarchived
    'nycpaintingcontractors@gmail.com': { from: '2026-10-28', note: 'Jill (NYC painting contractors) got the audit by hand in mid sep and had a video call with Farhan on 28 sep; nothing since. One short, friendly note: ask how things are going since the call and whether she has any questions about the audit or would like to take the next step. No pressure, no link, no new pitch.' },
    'newsroom@ltcnews.com': { from: '2026-11-24', note: 'LTC News is a consumer news site that sells advertising and upgraded caregiver directory listings. In sep Farhan offered to find them advertisers, our emails reached them garbled, they sent their partner rates, and our last email (29 sep) was a bit sharp. One short, polite, plain-English note: say sorry for the muddled emails and ask one easy question, whether more care providers finding their caregiver directory through Google would be worth a short look. Never mention pay per lead, fees, ad budgets or prices.' },
    'drcharpeterson@gmail.com': { from: '2027-01-05', note: 'On 6 oct Dr. Peterson said he already has someone working on his SEO visibility; we never wrote back. One short, friendly check-in: ask how things are going with his current setup and whether a free second opinion (the audit) would help now. No pressure, never criticise his provider.' },
    't.schneider.phd@gmail.com': { from: '2026-12-01', note: 'Tina said no thanks on 7 oct. Farhan asked for one friendly check-in a month or two later: short, no pressure, one useful idea for her counselling practice, and one easy question.' },
  },
} }];
