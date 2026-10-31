// SKIP ANYONE ON THE INSTANTLY BLOCK LIST (1 Nov, Farhan). SalesBlink sends never look at Instantly's block list, so a
// person who said no, unsubscribed or bounced on Instantly could still get a SalesBlink follow-up. Full email matches,
// plus the old whole-domain entries. If the list cannot be read (Instantly down), follow-ups go on as before.
// Planned one-time check-ins still go: Farhan's PLAN dates and the 80-day check-in after a polite "not right now"
// (those people are on the block list for cold email, but Farhan wants that one check-in).
const pages = $input.all().map(i => i.json || {});
const blocked = new Set(), domains = new Set();
for (const p of pages) for (const e of (p.items || [])) {
  const v = String(e.bl_value || '').toLowerCase().trim();
  if (!v) continue;
  if (e.is_domain || !v.includes('@')) domains.add(v.replace(/^@/, '')); else blocked.add(v);
}
const due = $('Due List').all();
if (!blocked.size && !domains.size) return due;
return due.filter(it => {
  const j = it.json || {};
  if (j.date_followup === true || String(j.farhan_note || '').trim()) return true;
  const em = String(j.email || '').toLowerCase().trim();
  return !(blocked.has(em) || domains.has(em.split('@')[1] || ''));
});
