// A QUICK GLIMPSE OF THEIR HOME PAGE, and only when their email is on their own business address.
// One page, three things: what the page is called, how it describes itself, and its main heading.
// No searching for a website: if we do not already know it, we skip this and Farhan finds it himself.
const s = v => (v === null || v === undefined) ? '' : String(v).trim();
const strip = h => s(h).replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#39;|&rsquo;|&lsquo;/g, "'").replace(/&quot;|&ldquo;|&rdquo;/g, '"').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const out = [];
for (const it of $input.all()) {
  const c = it.json; const site = s(c.website_guess).toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/[\/?#].*$/, '');
  let glimpse = '';
  if (site) {
    try {
      const html = s(await this.helpers.httpRequest({ method: 'GET', url: 'https://' + site, timeout: 8000, headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36' } })).slice(0, 200000);
      const title = strip((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]).slice(0, 110);
      const desc = strip((html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i) || html.match(/<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i) || [])[1]).slice(0, 170);
      const h1 = strip((html.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ').match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1]).slice(0, 110);
      glimpse = [title && 'the page is called: ' + title, desc && 'it describes itself as: ' + desc, h1 && 'the first big heading says: ' + h1].filter(Boolean).join('\n');
    } catch (e) { /* their site did not answer: write without it */ }
  }
  out.push({ json: { ...c, site_seen: glimpse } });
}
return out;
