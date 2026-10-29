// READ LUNA'S ANSWER and attach it to the conversation.
const convs = $('Luna Request').all();
return $input.all().map((it, i) => {
  const c = convs[i] ? convs[i].json : {};
  let r = {};
  try {
    const txt = (((it.json.choices || [])[0] || {}).message || {}).content || '';
    r = JSON.parse(String(txt).replace(/^```(json)?|```$/g, '').trim());
  } catch (e) { r = {}; }
  const allowed = ['needs_reply', 'unsubscribe', 'not_interested', 'automated', 'no_reply_needed'];
  const category = allowed.includes(r.category) ? r.category : 'needs_reply'; // unsure: let Opus look at it
  const { luna_body, ...rest } = c;
  return { json: { ...rest, category, first_name: r.first_name || '', sort_reason: r.reason || '' } };
});
