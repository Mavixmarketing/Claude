// CHECK INSTANTLY CONNECTION (manual, read only): did the "Instantly API" credential work? Lists up to 10
// campaigns and the 5 newest received emails, and shows only counts and campaign names (no email content).
const c = $('Connection: Campaigns').first().json || {};
const e = $('Connection: Emails').first().json || {};
const err = x => x && x.error ? String(x.error.message || x.error.description || JSON.stringify(x.error)).slice(0, 300) : '';
return [{ json: {
  campaigns_ok: !err(c) && Array.isArray(c.items),
  campaigns_found: Array.isArray(c.items) ? c.items.length : 0,
  campaign_names: Array.isArray(c.items) ? c.items.map(x => String(x.name || '') + ' (status ' + x.status + ', stop on reply ' + x.stop_on_reply + ')') : [],
  campaigns_error: err(c),
  emails_ok: !err(e) && Array.isArray(e.items),
  received_emails_found: Array.isArray(e.items) ? e.items.length : 0,
  emails_error: err(e),
} }];
