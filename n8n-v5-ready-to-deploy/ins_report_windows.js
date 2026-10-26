// INSTANTLY WINDOWS (morning report, 26 Oct): the same three IST windows as "Build Report" (yesterday, last week
// Monday to Sunday ending today, last month), written as the start_date / end_date query of Instantly's
// GET /api/v2/campaigns/analytics/overview (full ISO timestamps are accepted), plus the last 30 days for the
// per-mailbox numbers (GET /api/v2/accounts/analytics/daily, at most 31 days). Every Instantly node after this one
// continues on error, so Instantly can never stop the report.
const IST = 330 * 60000;
const DAY = 86400000;
const now = Date.now();
const ist = new Date(now + IST);
const todayStart = Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate()) - IST;
const lastMonthStart = Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth() - 1, 1) - IST;
const monthStart = Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), 1) - IST;
const q = (a, b) => 'start_date=' + encodeURIComponent(new Date(a).toISOString()) + '&end_date=' + encodeURIComponent(new Date(b).toISOString());
return [{ json: {
  yesterday: q(todayStart - DAY, todayStart),
  last_week: q(todayStart - 7 * DAY, todayStart),
  last_month: q(lastMonthStart, monthStart),
  mailbox_from: new Date(now - 30 * DAY).toISOString().slice(0, 10),
  mailbox_to: new Date(now).toISOString().slice(0, 10),
} }];
