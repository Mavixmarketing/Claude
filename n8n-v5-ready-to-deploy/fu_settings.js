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
  STOP: ['andrei@brite.live', 'arihantkothari93@gmail.com'],
  // PLAN: nothing before the date, then one follow-up that follows his note, then light monthly check-ins.
  PLAN: {
    'anne.thomson@mymts.net': { from: '2026-11-16', note: 'On 15 oct Anne said she already has a provider and we wished her well. Farhan still wants to stay in touch: one short, kind check-in with one useful idea about getting her m prep course back to the first page of google. Never criticise her provider and never offer the audit again (she has it).' },
    't.schneider.phd@gmail.com': { from: '2026-12-01', note: 'Tina said no thanks on 7 oct. Farhan asked for one friendly check-in a month or two later: short, no pressure, one useful idea for her counselling practice, and one easy question.' },
  },
} }];
