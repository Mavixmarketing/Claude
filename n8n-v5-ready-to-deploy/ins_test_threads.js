// TEST ONLY (26 Oct): sample Instantly threads, shaped exactly like GET /api/v2/emails?search=thread:<id>
// ({ items: [Email, ...] }, fields as in the Instantly API v2 Email schema), so the whole agent can be tried before
// Instantly has any real replies. Runs on any test run, never on the live schedule, and never sends: test runs
// stop before "Schedule Reply" and "Block List". Sample 1 is a "yes" in an AI Written campaign (new prices),
// sample 2 asks to be removed (goes the unsubscribe way). The mailboxes and leads are made up.
if (!$('Settings').first().json.TEST) return [];
const ORG = 'a8d523a0-0000-4000-8000-000000000000';
const t = (minAgo) => new Date(Date.now() - minAgo * 60000).toISOString();
function email(o) {
  return {
    id: o.id, timestamp_created: o.at, timestamp_email: o.at, message_id: '<' + o.id + '@mail.example>', subject: o.subject,
    from_address_email: o.from, to_address_email_list: o.to, cc_address_email_list: null, bcc_address_email_list: null, reply_to: null,
    body: { text: o.text, html: o.text.replace(/\n/g, '<br/>') }, organization_id: ORG, campaign_id: o.campaign, subsequence_id: null, list_id: null,
    lead: o.lead, lead_id: o.lead_id, eaccount: o.eaccount, ue_type: o.ue_type, step: o.ue_type === 1 ? '0_0_0' : null, is_unread: o.ue_type === 2 ? 1 : 0,
    is_auto_reply: 0, reminder_ts: null, ai_interest_value: null, ai_assisted: 0, is_focused: 1, i_status: 0, thread_id: o.thread,
    content_preview: o.text.slice(0, 80), body_fallback_reason: null, attachment_json: null, from_address_json: null, to_address_json: null, cc_address_json: null, ai_agent_id: null,
  };
}
const yesThread = '0199f0aa-1111-7aaa-8aaa-000000000001';
const noThread = '0199f0aa-2222-7bbb-8bbb-000000000002';
const yes = [
  email({ id: '0199f0aa-1111-7aaa-8aaa-0000000000a1', at: t(26 * 60), subject: 'roof replacements in plano', from: 'farhan@getmavixseo.com', to: 'mike@summit-roofing-example.com', eaccount: 'farhan@getmavixseo.com', lead: 'mike@summit-roofing-example.com', lead_id: '0199f0aa-1111-7aaa-8aaa-0000000000l1', campaign: '0199f0aa-cccc-7ccc-8ccc-0000000000c1', ue_type: 1, thread: yesThread,
    text: 'Hi Mike,\nI noticed Summit Roofing does roof replacements and storm repairs around Plano.\nThat got me thinking about how a homeowner after a hail storm finds a roofer today.\nFor searches like that, Google now puts an AI answer at the very top. It shapes which roofers people see first.\nWant a free audit showing how Summit Roofing shows up today, and where you could do better?\nFarhan\nNot for you? Just reply "no" and I\'ll stop.' }),
  email({ id: '0199f0aa-1111-7aaa-8aaa-0000000000a2', at: t(9), subject: 'Re: roof replacements in plano', from: 'mike@summit-roofing-example.com', to: 'farhan@getmavixseo.com', eaccount: 'farhan@getmavixseo.com', lead: 'mike@summit-roofing-example.com', lead_id: '0199f0aa-1111-7aaa-8aaa-0000000000l1', campaign: '0199f0aa-cccc-7ccc-8ccc-0000000000c1', ue_type: 2, thread: yesThread,
    text: 'Yes please, send it over. We mostly do full roof replacements in Plano and Frisco.\n\nMike\n\nOn Sun, Oct 25, 2026 at 9:02 AM Farhan <farhan@getmavixseo.com> wrote:\n> Hi Mike,\n> I noticed Summit Roofing does roof replacements and storm repairs around Plano.' }),
];
const no = [
  email({ id: '0199f0aa-2222-7bbb-8bbb-0000000000b1', at: t(30 * 60), subject: 'more calls for landscaping in austin', from: 'farhan@trymavixgrowth.com', to: 'sarah@greenleaf-landscaping-example.com', eaccount: 'farhan@trymavixgrowth.com', lead: 'sarah@greenleaf-landscaping-example.com', lead_id: '0199f0aa-2222-7bbb-8bbb-0000000000l2', campaign: '0199f0aa-cccc-7ccc-8ccc-0000000000c2', ue_type: 1, thread: noThread,
    text: 'Hi Sarah,\nI noticed GreenLeaf designs gardens and patios across Austin.\nWant a free audit showing how GreenLeaf shows up on Google today?\nFarhan\nNot for you? Just reply "no" and I\'ll stop.' }),
  email({ id: '0199f0aa-2222-7bbb-8bbb-0000000000b2', at: t(6), subject: 'Re: more calls for landscaping in austin', from: 'sarah@greenleaf-landscaping-example.com', to: 'farhan@trymavixgrowth.com', eaccount: 'farhan@trymavixgrowth.com', lead: 'sarah@greenleaf-landscaping-example.com', lead_id: '0199f0aa-2222-7bbb-8bbb-0000000000l2', campaign: '0199f0aa-cccc-7ccc-8ccc-0000000000c2', ue_type: 2, thread: noThread,
    text: 'Please remove me from your mailing list and do not email me again.\n\nSarah' }),
];
return [
  { json: { items: yes, next_starting_after: null, sample_event_id: 'test:inst:sample-yes', campaign_name: 'AI Written - US roofers (sample)' } },
  { json: { items: no, next_starting_after: null, sample_event_id: 'test:inst:sample-unsubscribe', campaign_name: 'US home services (sample)' } },
];
