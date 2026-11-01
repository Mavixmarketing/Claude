// READ LUNA'S ANSWER and attach it to the conversation.
// 1 Nov (Farhan, after the 26 Oct signature-only reply 17 seconds after our email): AN INSTANT SIGNATURE IS AN AUTO-REPLY.
// When their newest message came within 2 minutes of our email and is only a signature (contact details, no real words
// of their own), it is marked "automated": no reply and no follow-ups. A signature-only message that comes later is a
// person, and the writer still asks kindly whether something didn't come through.
const convs = $('Luna Request').all();
const STAMP = /^(US|THEM)[^\n]*?· (\d{4}-\d{2}-\d{2} \d{2}:\d{2}) UTC/;
function minutesAfterOurs(transcript) {
  const blocks = String(transcript || '').split(/\n\n---\n\n/).map(b => b.trim()).map(b => b.match(STAMP)).filter(Boolean);
  const them = blocks[blocks.length - 1];
  if (!them || them[1] !== 'THEM') return Infinity;
  const ours = blocks.slice(0, -1).reverse().find(m => m[1] === 'US');
  if (!ours) return Infinity;
  return (Date.parse(them[2].replace(' ', 'T') + ':00Z') - Date.parse(ours[2].replace(' ', 'T') + ':00Z')) / 60000;
}
const REAL_WORDS = /\b(yes|yeah|yep|sure|ok|okay|no|nope|not|stop|remove|unsubscribe|interested|thanks|thank you|please|send|call|price|cost|how|what|when|why|who|where|which|can|could|would|will|do|does|did|are|is|we|our|i|i'm|i'll|me|my|you|your|audit|seo|google|website)\b|\?/i;
const SIGNATURE = /(\+?\d[\d ().-]{7,}\d)|\bwww\.|https?:\/\/|@|\||\b(owner|ceo|founder|manager|director|president|llc|inc|ltd)\b/i;
function signatureOnly(text) {
  const t = String(text || '').trim();
  if (!t || t.length > 600) return false;
  const words = t.replace(/(\+?\d[\d ().-]{7,}\d)|\S+@\S+|\bwww\.\S+|https?:\/\/\S+|[|•·:✨📅🌐📍📱💳📸]/g, ' ');
  return SIGNATURE.test(t) && !REAL_WORDS.test(words.replace(/\b(owner|ceo|founder|manager|director|president)\b/gi, ' '));
}
return $input.all().map((it, i) => {
  const c = convs[i] ? convs[i].json : {};
  let r = {};
  try {
    const txt = (((it.json.choices || [])[0] || {}).message || {}).content || '';
    r = JSON.parse(String(txt).replace(/^```(json)?|```$/g, '').trim());
  } catch (e) { r = {}; }
  const allowed = ['needs_reply', 'unsubscribe', 'not_interested', 'automated', 'no_reply_needed'];
  let category = allowed.includes(r.category) ? r.category : 'needs_reply'; // unsure: let Opus look at it
  let reason = r.reason || '';
  if (category === 'needs_reply' && minutesAfterOurs(c.transcript) <= 2 && signatureOnly(c.their_latest)) {
    category = 'automated';
    reason = 'signature only, within 2 minutes of our email: an auto-reply';
  }
  const { luna_body, ...rest } = c;
  return { json: { ...rest, category, first_name: r.first_name || '', sort_reason: reason } };
});
