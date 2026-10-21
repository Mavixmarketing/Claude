// A SHORT SLACK NOTE when nothing was sent and Farhan should know, or this is a test.
const c = $input.first().json;
if (c.slack_text) return [{ json: c }];
const who = (c.lead_name || 'someone') + ' · ' + c.lead_url;
const why = c.problems || (c.category === 'unsubscribe' ? 'they asked us to stop. please remove them from the Prosp campaign'
  : c.category === 'needs_farhan' ? 'needs a person: ' + (c.sort_reason || 'angry or sensitive message')
  : (c.sort_reason || c.status || 'not sorted'));
const head = c.category === 'unsubscribe' ? '*Asked to stop, nothing was sent*' : '*LinkedIn reply needs you, nothing was sent*';
return [{ json: { ...c, slack_text: head + ' · ' + who + '\n*They wrote:* ' + String(c.their_latest || '').slice(0, 700) + '\n*Why:* ' + why } }];
