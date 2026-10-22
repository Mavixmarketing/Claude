CSS = r"""
@font-face { font-family:'Poppins'; font-weight:300; src:url('file:///usr/share/fonts/truetype/google-fonts/Poppins-Light.ttf'); }
@font-face { font-family:'Poppins'; font-weight:400; src:url('file:///usr/share/fonts/truetype/google-fonts/Poppins-Regular.ttf'); }
@font-face { font-family:'Poppins'; font-weight:500; src:url('file:///usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf'); }
@font-face { font-family:'Poppins'; font-weight:700; src:url('file:///usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf'); }

:root{ --ink:#0A0E27; --blue:#005AFF; --lime:#B4FF24; --soft:#EEF3FF; --bg:#F6F8FB;
  --border:#E4E8F0; --grey:#5F6675; --red:#E5484D; --redbg:#FDECEC; --green:#21763C; }

@page { size: Letter; margin: 0; }
@page content {
  size: Letter; margin: 16mm;
  @bottom-left   { content:"MAVIX MARKETING"; font-family:'Poppins'; font-size:7.4pt; font-weight:700; letter-spacing:1.2px; color:#9AA6BC; }
  @bottom-center { content:string(doctitle); font-family:'Poppins'; font-size:7.4pt; color:#9AA6BC; }
  @bottom-right  { content:counter(page); font-family:'Poppins'; font-size:7.8pt; font-weight:700; color:#005AFF; }
}

* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Poppins'; color:var(--ink); font-size:10.4pt; line-height:1.58; }
p { margin-bottom:9pt; color:#242B3D; }
strong { font-weight:700; color:var(--ink); }
.hl { background:linear-gradient(transparent 66%, rgba(180,255,36,0.5) 66%); padding:0 1px; font-weight:500; }
.docmeta { string-set: doctitle content(); position:absolute; visibility:hidden; height:0; }

/* ---------- COVER ---------- */
.cover { page:blank; position:relative; width:100%; height:279.4mm;
  background:radial-gradient(120% 90% at 82% -8%, rgba(180,255,36,0.16) 0%, rgba(180,255,36,0) 42%),
    linear-gradient(158deg,#0A0E27 0%,#071A6E 46%,#005AFF 118%); color:white; overflow:hidden; }
.c-pad { position:absolute; inset:0; padding:20mm 21mm; }
.c-top { display:flex; justify-content:space-between; align-items:center; }
.c-logo-img { height:30pt; }
.c-tag { font-size:8pt; font-weight:500; letter-spacing:2px; color:#9FB4E8; text-transform:uppercase; }
.c-mid { margin-top:16mm; }
.c-eyebrow { display:inline-flex; align-items:center; gap:7pt; font-size:8.2pt; font-weight:600; letter-spacing:3.2px;
  text-transform:uppercase; color:var(--lime); padding:5pt 0; border-top:2px solid var(--lime);
  border-bottom:1px solid rgba(255,255,255,0.18); margin-bottom:16pt; }
.c-eyebrow img { height:10pt; }
.c-title { font-size:42pt; font-weight:700; line-height:1.05; letter-spacing:-1.4px; }
.c-title .thin { font-weight:300; color:#C9D6F5; }
.c-sub { margin-top:15pt; font-size:11.5pt; font-weight:300; color:#C9D6F5; max-width:130mm; line-height:1.55; }
/* the prepared-for block is pinned to the bottom of the page */
.c-bottom { position:absolute; left:21mm; right:21mm; bottom:20mm; }
.c-client { padding-top:15pt; border-top:1px solid rgba(255,255,255,0.15); }
.c-client-lbl { font-size:8pt; font-weight:500; letter-spacing:2px; text-transform:uppercase; color:#8FA6DD; }
.c-client-name { font-size:21pt; font-weight:700; margin-top:3pt; letter-spacing:-0.4px; }
.c-client-meta { font-size:9.6pt; font-weight:300; color:#AFC0EC; margin-top:2pt; }
.c-services { display:flex; gap:7pt; margin-top:14pt; flex-wrap:wrap; }
.c-chip { font-size:8.2pt; font-weight:500; padding:5pt 13pt; border:1px solid rgba(255,255,255,0.25); border-radius:40px; color:#E5ECFB; }
.c-chip.on { background:var(--lime); color:var(--ink); border-color:var(--lime); font-weight:700; }
.c-foot { display:flex; justify-content:space-between; align-items:flex-end; font-size:8.6pt; color:#8FA6DD; margin-top:16pt; }
.c-foot b { color:white; font-weight:500; }

/* ---------- SECTION SHELL ---------- */
.sec { page:content; }
.newpage { page-break-before:always; }
.kicker { display:flex; align-items:center; gap:8pt; margin-bottom:10pt; }
.kstar { height:9pt; }
.knum { font-size:8.4pt; font-weight:700; color:var(--blue); letter-spacing:1px; }
.kline { height:1px; width:20pt; background:var(--blue); opacity:0.4; }
.klabel { font-size:8pt; font-weight:600; letter-spacing:2.4px; text-transform:uppercase; color:var(--grey); }
h1.sh { font-size:22pt; font-weight:700; letter-spacing:-0.8px; line-height:1.12; margin-bottom:12pt; }
h1.sh .accent { color:var(--blue); }
h2.sub { font-size:12.5pt; font-weight:700; margin:12pt 0 5pt; letter-spacing:-0.3px; }
h3.mini { font-size:10.2pt; font-weight:700; margin:8pt 0 3pt; }
.lead { font-size:11pt; color:#242B3D; line-height:1.6; }
.note { font-size:9.2pt; color:#3A4258; line-height:1.5; }

/* ---------- CONTENTS ---------- */
.toc { margin-top:10pt; }
.toc-row { display:flex; align-items:baseline; gap:8pt; padding:8.4pt 0; border-bottom:1px solid var(--border); }
.toc-n { font-size:9pt; font-weight:700; color:var(--blue); width:22pt; flex-shrink:0; }
.toc-t { font-size:10.4pt; font-weight:500; color:var(--ink); flex:1; }
.toc-d { font-size:9pt; color:var(--grey); }

/* ---------- PULL QUOTE ---------- */
.pull { margin:15pt 0; padding:15pt 24pt; background:var(--soft); border-radius:12px; text-align:center; }
.pull .qstar { height:11pt; margin-bottom:5pt; opacity:0.9; }
.pull p { font-size:12pt; font-style:italic; font-weight:400; line-height:1.48; color:var(--ink); margin:0; }
.pull.lime { background:rgba(180,255,36,0.14); }

/* ---------- STAT CARDS ---------- */
.stats { display:flex; gap:9pt; margin:14pt 0; }
.stat { flex:1; background:white; border:1px solid var(--border); border-radius:12px; padding:13pt 12pt; }
.stat .big { font-size:21pt; font-weight:700; letter-spacing:-1px; line-height:1; color:var(--blue); }
.stat .big.ink{ color:var(--ink);} .stat .big.red{ color:var(--red);}
.stat .lbl { font-size:8.4pt; font-weight:500; color:var(--grey); margin-top:5pt; line-height:1.3; }

/* ---------- CIRCLE STATS ---------- */
.cstats { display:flex; gap:8pt; margin:15pt 0; }
.cstat { flex:1; text-align:center; }
.circle { width:54pt; height:54pt; border-radius:50%; margin:0 auto 6pt; display:flex; align-items:center; justify-content:center;
  font-size:13pt; font-weight:700; color:white; }
.circle.blue{ background:linear-gradient(150deg,#005AFF,#0736A8);}
.circle.ink{ background:linear-gradient(150deg,#141A3A,#0A0E27);}
.circle.lime{ background:var(--lime); color:var(--ink);}
.cstat .ct{ font-size:8.6pt; font-weight:500; color:var(--grey); line-height:1.35; }

/* ---------- CHART FRAME ---------- */
.chart { margin:13pt 0; padding:13pt 14pt 8pt; background:white; border:1px solid var(--border); border-radius:14px; }
.chart img { width:100%; display:block; max-height:158pt; object-fit:contain; }
.chart.big img { max-height:245pt; }
.chart .ctitle { font-size:10.2pt; font-weight:700; margin-bottom:2pt; }
.chart .cnote { font-size:8.4pt; color:var(--grey); margin-bottom:7pt; line-height:1.4; }

/* ---------- TABLE ---------- */
table.tb { width:100%; border-collapse:collapse; margin:13pt 0; font-size:9.2pt; }
table.tb th { background:var(--ink); color:white; font-weight:600; text-align:left; padding:8pt 10pt; font-size:8.4pt; }
table.tb th:first-child{ border-radius:8px 0 0 0;} table.tb th:last-child{ border-radius:0 8px 0 0;}
table.tb td { padding:8.5pt 10pt; border-bottom:1px solid var(--border); color:#28304A; vertical-align:top; line-height:1.4; }
table.tb tr:nth-child(even) td { background:#FAFBFD; }
table.tb td.win { color:var(--green); font-weight:500; }
.tag { display:inline-block; font-size:7.6pt; font-weight:700; padding:2pt 7pt; border-radius:20px; }
.tag.b{ background:var(--soft); color:var(--blue);} .tag.g{ background:rgba(180,255,36,0.25); color:#4E6A07;}
.tag.r{ background:var(--redbg); color:var(--red);}

/* ---------- TWO-COLUMN PROBLEM / FIX ---------- */
.tcol { display:flex; gap:10pt; margin:14pt 0; }
.tcol .col { flex:1; border-radius:12px; padding:14pt 15pt; }
.tcol .prob { background:var(--redbg); border:1px solid #F5C9C9; }
.tcol .fix { background:rgba(180,255,36,0.12); border:1px solid #D9EEB0; }
.tcol h4 { font-size:8.6pt; font-weight:700; letter-spacing:1.4px; text-transform:uppercase; margin-bottom:6pt; }
.tcol .prob h4{ color:var(--red);} .tcol .fix h4{ color:#4E6A07;}
.tcol p { font-size:9.2pt; margin-bottom:7pt; line-height:1.5; }
.tcol p:last-child{ margin-bottom:0; }

/* ---------- RED ALERT ---------- */
.alert { display:flex; gap:11pt; align-items:flex-start; margin:14pt 0; padding:13pt 16pt; background:var(--redbg); border:1px solid #F3C4C4; border-radius:11px; }
.alert .ai { flex-shrink:0; width:15pt; height:15pt; }
.alert .at { font-size:9.4pt; line-height:1.45; } .alert .at b { color:var(--red); }

/* ---------- ICON BULLETS ---------- */
.ibul { list-style:none; margin:12pt 0; }
.ibul li { position:relative; padding-left:19pt; margin-bottom:8.5pt; font-size:9.8pt; line-height:1.52; color:#242B3D; }
.ibul li:before { content:''; position:absolute; left:0; top:4.5pt; width:8pt; height:8pt; border-radius:2.5px; background:var(--blue); }
.ibul.lime li:before{ background:var(--lime); }
.ibul.tight li { margin-bottom:4pt; font-size:9.2pt; }

/* ---------- GANTT ---------- */
.gantt { margin:14pt 0; }
.grow { display:flex; align-items:center; gap:10pt; margin-bottom:9pt; }
.glabel { width:96pt; font-size:9pt; font-weight:600; color:var(--ink); flex-shrink:0; }
.gtrack { flex:1; height:26pt; background:#EFF2F8; border-radius:7px; position:relative; overflow:hidden; }
.gbar { position:absolute; top:0; height:100%; border-radius:7px; display:flex; align-items:center; padding-left:10pt; font-size:8pt; font-weight:600; color:white; }
.gbar.p1{ left:0%; width:30%; background:linear-gradient(90deg,#0A0E27,#243056); }
.gbar.p2{ left:26%; width:46%; background:linear-gradient(90deg,#0736A8,#005AFF); }
.gbar.p3{ left:64%; width:36%; background:linear-gradient(90deg,#005AFF,#4D90FF); }
.gscale { display:flex; margin-left:105pt; margin-top:2pt; }
.gscale span { flex:1; font-size:7.6pt; color:var(--grey); text-align:center; }

/* ---------- STEP BOXES ---------- */
.steps { margin:13pt 0; }
.step { display:flex; gap:12pt; align-items:flex-start; padding:12pt 14pt; margin-bottom:8.5pt; background:white; border:1px solid var(--border); border-radius:11px; }
.step .sn { width:26pt; height:26pt; border-radius:8px; background:var(--ink); color:white; font-size:11.5pt; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.step .sc b { font-size:10.2pt; } .step .sc p { font-size:9.2pt; margin:2pt 0 0; color:#3A4258; line-height:1.42; }

/* ---------- SCORECARDS ---------- */
.scards { display:flex; flex-wrap:wrap; gap:9pt; margin:14pt 0; }
.scard { width:calc(33.33% - 6pt); background:white; border:1px solid var(--border); border-radius:11px; padding:13pt 13pt; }
.scard .sm { font-size:8.2pt; font-weight:600; color:var(--grey); text-transform:uppercase; letter-spacing:0.4px; }
.scard .srow { display:flex; align-items:baseline; gap:5pt; margin-top:4pt; }
.scard .cur { font-size:15pt; font-weight:700; color:var(--red); }
.scard .arr { font-size:9pt; color:var(--grey); }
.scard .tgt { font-size:15pt; font-weight:700; color:var(--blue); }
.scard .track { height:4.5pt; background:#EEF1F7; border-radius:3px; margin-top:7pt; overflow:hidden; }
.scard .fill { height:100%; background:linear-gradient(90deg,#005AFF,#5FC48A 55%,#B4FF24); border-radius:3px; }

/* ---------- BENEFIT CARDS ---------- */
.bgrid { display:flex; flex-wrap:wrap; gap:9pt; margin:14pt 0; }
.bcard { width:calc(50% - 4.5pt); background:white; border:1px solid var(--border); border-radius:12px; padding:13pt 15pt; }
.bcard .bico { width:28pt; height:28pt; border-radius:9px; background:var(--soft); display:flex; align-items:center; justify-content:center; margin-bottom:6pt; }
.bcard .bico svg { width:15pt; height:15pt; }
.bcard .bstat { font-size:16pt; font-weight:700; color:var(--blue); letter-spacing:-0.5px; }
.bcard .blbl { font-size:8.2pt; font-weight:700; letter-spacing:1.1px; text-transform:uppercase; color:var(--ink); margin:4pt 0 3pt; }
.bcard .btxt { font-size:9pt; color:#3A4258; line-height:1.42; margin:0; }

/* ---------- GOOGLE PARTNER ---------- */
.gpwrap { display:flex; gap:15pt; align-items:center; margin:14pt 0; background:white; border:1px solid var(--border); border-radius:14px; padding:13pt; }
.gpwrap img { width:36%; border-radius:9px; }
.gpwrap .gpx b { font-size:11.5pt; }
.gpwrap .gpx p { font-size:9.4pt; color:#28304A; margin:5pt 0 0; line-height:1.5; }

/* ---------- LOGO WALL ---------- */
.walltitle { font-size:8.4pt; font-weight:600; letter-spacing:1.4px; text-transform:uppercase; color:var(--grey); margin:16pt 0 9pt; text-align:center; }
.wall { display:flex; gap:8pt; justify-content:center; }
.ltile { width:19%; height:64pt; background:white; border:1px solid var(--border); border-radius:12px; display:flex; align-items:center; justify-content:center; overflow:hidden; }
.ltile img { width:100%; height:100%; object-fit:contain; }

/* ---------- TESTIMONIALS: 6 SQUARE CARDS, 2 x 3 ---------- */
.tgrid { display:flex; flex-wrap:wrap; gap:10pt; margin:14pt 0; }
.tsq { width:calc(50% - 5pt); background:white; border:1px solid var(--border); border-radius:14px;
  padding:15pt 16pt; display:flex; flex-direction:column; }
.tsq .thead { display:flex; align-items:center; gap:9pt; margin-bottom:8pt; }
.tsq .av { width:44pt; height:44pt; border-radius:50%; object-fit:cover; flex-shrink:0; border:2px solid var(--soft); }
.tsq .avi { width:44pt; height:44pt; border-radius:50%; flex-shrink:0; display:flex; align-items:center;
  justify-content:center; font-size:13pt; font-weight:700; color:white;
  background:linear-gradient(150deg,#005AFF,#0736A8); }
.tsq .avi.alt { background:linear-gradient(150deg,#141A3A,#0A0E27); }
.tsq .tn { font-size:10pt; font-weight:700; color:var(--ink); line-height:1.2; }
.tsq .tr { font-size:8.6pt; color:var(--grey); line-height:1.3; margin-top:2pt; }
.tstars { display:flex; gap:1.5pt; margin-bottom:5pt; }
.tstars svg { width:9pt; height:9pt; }
.tsq .tq { font-size:9.4pt; line-height:1.52; color:#28304A; font-style:italic; margin:0; }

/* ---------- PRICING (premium layout) ----------
   Three cards. The recommended card is the dark one: ink to blue gradient, lime price,
   a little taller than the others, so the eye lands there first. Deliverables are
   bullets inside the card, never a paragraph. A terms strip and the guarantee banner
   sit underneath. Nothing here goes below the 8pt label floor. */
.price { display:flex; gap:11pt; margin:24pt 0 16pt; align-items:stretch; }
.pc { flex:1; background:white; border:1px solid var(--border); border-radius:16px; padding:18pt 15pt 16pt; position:relative; }
.pc.reco { margin:-9pt 0; padding:27pt 16pt 25pt; border:none; color:white;
  background:radial-gradient(130% 80% at 85% -10%, rgba(180,255,36,0.16) 0%, rgba(180,255,36,0) 45%),
    linear-gradient(160deg,#0A0E27 0%,#0736A8 72%,#005AFF 120%); }
/* no box-shadow on the cards: WeasyPrint draws it as stray grey lines */
.pc .badge { position:absolute; top:-9pt; left:50%; transform:translateX(-50%); background:var(--lime); color:var(--ink); font-size:8pt; font-weight:700; letter-spacing:1.4px; padding:3.5pt 13pt; border-radius:20px; text-transform:uppercase; white-space:nowrap; }
.pc .ptier { font-size:9pt; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--ink); }
.pc.reco .ptier { color:var(--lime); }
.pc .pfit { font-size:8.6pt; color:var(--grey); margin-top:3pt; line-height:1.38; min-height:24pt; }
.pc.reco .pfit { color:#B9C8EC; }
.pc .pamt { font-size:27pt; font-weight:700; letter-spacing:-1.2px; margin-top:11pt; color:var(--ink); line-height:1; }
.pc.reco .pamt { color:white; font-size:30pt; }
.pc .pamt small { font-size:8.6pt; font-weight:500; color:var(--grey); letter-spacing:0; margin-left:2pt; }
.pc.reco .pamt small { color:#B9C8EC; }
.pc .pg { display:inline-block; margin-top:10pt; font-size:8pt; font-weight:700; letter-spacing:0.2px; padding:3pt 9pt; white-space:nowrap; border-radius:20px; background:var(--soft); color:var(--blue); }
.pc.reco .pg { background:rgba(180,255,36,0.16); color:var(--lime); border:1px solid rgba(180,255,36,0.55); }
.pc .pg.none { background:none; color:var(--grey); padding:3pt 0; font-weight:500; letter-spacing:0; }
/* deliverables as bullets, never a paragraph */
.pc ul { list-style:none; margin-top:12pt; border-top:1px solid var(--border); padding-top:11pt; }
.pc.reco ul { border-top:1px solid rgba(255,255,255,0.16); }
.pc li { position:relative; padding-left:14pt; font-size:8.8pt; line-height:1.45; margin-bottom:6.5pt; color:#28304A; }
.pc.reco li { color:#E3EAFB; }
.pc li:before { content:''; position:absolute; left:0; top:4pt; width:6pt; height:6pt; border-radius:2px; background:var(--blue); }
.pc.reco li:before { background:var(--lime); }
.pc .pwas { display:none; } /* the old "was 799" line is retired. Never print a crossed-out price. */

/* terms strip under the cards */
.terms { display:flex; gap:8pt; margin:14pt 0 4pt; }
.term { flex:1; display:flex; gap:6pt; align-items:flex-start; background:var(--bg); border:1px solid var(--border); border-radius:11px; padding:9pt 10pt; }
.term svg { width:11pt; height:11pt; flex-shrink:0; margin-top:1pt; }
.term span { font-size:8.6pt; font-weight:500; line-height:1.35; color:var(--ink); }

/* ---------- PHASE PRICING (ADS) ---------- */
.phases { display:flex; gap:9pt; margin:15pt 0; }
.ph { flex:1; border-radius:13px; padding:14pt 13pt; border:1px solid var(--border); background:white; }
.ph .phn { font-size:7.4pt; font-weight:700; letter-spacing:1.1px; text-transform:uppercase; color:white; background:var(--ink); display:inline-block; padding:2.5pt 9pt; border-radius:20px; }
.ph.p2 .phn{ background:#0736A8;} .ph.p3 .phn{ background:var(--blue);} .ph.p4 .phn{ background:var(--lime); color:var(--ink);}
.ph .pht { font-size:9.8pt; font-weight:700; margin:7pt 0 2pt; }
.ph .php { font-size:20pt; font-weight:700; letter-spacing:-1px; color:var(--blue); }
.ph .php small { font-size:8.4pt; font-weight:500; color:var(--grey); }
.ph ul { list-style:none; margin-top:7pt; }
.ph li { position:relative; padding-left:12pt; font-size:8.4pt; line-height:1.45; margin-bottom:5.5pt; color:#3A4258; }
.ph li:before { content:''; position:absolute; left:0; top:3.8pt; width:5pt; height:5pt; border-radius:2px; background:var(--blue); }
.ph.p4 li:before { background:var(--lime); }

/* ---------- GUARANTEE ---------- */
.guar { margin:15pt 0; padding:16pt 18pt; border-radius:14px; background:linear-gradient(135deg,#0A0E27,#0736A8); color:white; display:flex; gap:13pt; align-items:center; }
.guar .gi { flex-shrink:0; width:28pt; height:28pt; }
.guar .gt b { font-size:11pt; color:var(--lime); }
.guar .gt p { font-size:9.2pt; color:#D2DDF5; margin:3pt 0 0; line-height:1.48; }

/* ---------- NEON CALLOUT ---------- */
.neon { margin:14pt 0; padding:13pt 16pt; border-radius:11px; background:rgba(180,255,36,0.16); border-left:3px solid var(--lime); }
.neon p { font-size:10pt; font-weight:500; color:var(--ink); margin:0; line-height:1.48; }

/* ---------- FAQ: numbered ---------- */
.faq { margin:12pt 0; }
.fq { display:flex; gap:11pt; padding:9.5pt 0; border-bottom:1px solid var(--border); }
.fq .fn { flex-shrink:0; width:19pt; height:19pt; border-radius:6px; background:var(--soft); color:var(--blue);
  font-size:8.6pt; font-weight:700; display:flex; align-items:center; justify-content:center; margin-top:1pt; }
.fq b { font-size:9.8pt; color:var(--ink); display:block; margin-bottom:2.5pt; line-height:1.35; }
.fq p { font-size:9.2pt; color:#28304A; margin:0; line-height:1.52; }

/* ---------- SCOPE GRID ---------- */
.scope { display:flex; flex-wrap:wrap; gap:9pt; margin:13pt 0; }
.sgrp { width:calc(50% - 4.5pt); background:white; border:1px solid var(--border); border-radius:12px; padding:13pt 14pt; }
.sgrp h5 { font-size:8.4pt; font-weight:700; letter-spacing:1.1px; text-transform:uppercase; color:var(--blue); margin-bottom:6pt; }
.sgrp ul { list-style:none; }
.sgrp li { position:relative; padding-left:14pt; font-size:8.8pt; line-height:1.48; margin-bottom:5.5pt; color:#28304A; }
.sgrp li:before { content:''; position:absolute; left:0; top:4pt; width:6pt; height:6pt; border-radius:2px; background:var(--lime); }
.sgrp.wide { width:100%; }

/* ---------- CASE STUDY ---------- */
.cs-head { background:linear-gradient(135deg,#0A0E27,#0736A8 70%,#005AFF); color:white; border-radius:13px; padding:10pt 14pt; margin-bottom:6pt; }
.cs-head .csl { font-size:7.4pt; font-weight:700; letter-spacing:2.2px; text-transform:uppercase; color:var(--lime); }
.cs-head h2 { font-size:14.5pt; font-weight:700; line-height:1.14; letter-spacing:-0.5px; margin:4pt 0 4pt; }
.cs-head .csm { font-size:8.6pt; color:#C3D2F7; }
.chips { display:flex; gap:6pt; margin-bottom:6pt; }
.chip { flex:1; background:var(--redbg); border:1px solid #F3C4C4; border-radius:9px; padding:5pt 7pt; text-align:center; }
.chip .cv { font-size:11.6pt; font-weight:700; color:var(--red); letter-spacing:-0.4px; line-height:1.1; }
.chip .cl { font-size:7.4pt; font-weight:500; color:#8A5B5B; text-transform:uppercase; letter-spacing:0.4px; margin-top:3pt; }
.cs-cols { display:flex; gap:11pt; margin-bottom:6pt; }
.cs-cols .cc { flex:1; }
.cs-cols h6 { font-size:8pt; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; color:var(--blue); margin:0 0 2.5pt; }
.cs-cols h6.later { margin-top:6pt; }
.cs-cols p { font-size:8.8pt; line-height:1.4; color:#28304A; margin:0; }
.cs-cols ol { margin:0; padding-left:12pt; }
.cs-cols ol li { font-size:8.8pt; line-height:1.38; color:#28304A; margin-bottom:2pt; }
.cs-cta { background:linear-gradient(120deg,#0A0E27,#0736A8 68%,#005AFF); border-radius:12px; padding:9pt 14pt; display:flex; justify-content:space-between; align-items:center; gap:14pt; }
.cs-cta b { font-size:10.5pt; color:var(--lime); display:block; }
.cs-cta p { font-size:8.8pt; color:#CBD8F7; margin:2pt 0 0; line-height:1.35; }
.cs-cta .btn { background:var(--lime); color:var(--ink); font-size:8.8pt; font-weight:700; padding:7pt 15pt; border-radius:30px; white-space:nowrap; flex-shrink:0; }

/* ---------- RESULTS PANEL: real screenshot + platform tiles ---------- */
.rp { border:1px solid var(--border); border-radius:14px; overflow:hidden; margin:7pt 0; background:white; }
.rp-top { background:var(--ink); color:white; padding:7pt 13pt; display:flex; justify-content:space-between; align-items:center; }
.rp-top .rpt { font-size:9.2pt; font-weight:700; }
.rp-top .rps { font-size:7.6pt; color:#9FB0D8; letter-spacing:1px; text-transform:uppercase; }
.rp-tiles { display:flex; }
.rp-tile { flex:1; padding:7.5pt 8pt; border-right:1px solid var(--border); text-align:center; }
.rp-tile:last-child { border-right:none; }
.rp-tile .rv { font-size:15pt; font-weight:700; color:var(--blue); letter-spacing:-0.7px; line-height:1; }
.rp-tile .rv.lime { color:#4E6A07; }
.rp-tile .rv.red { color:var(--red); }
.rp-tile .rl { font-size:7.6pt; font-weight:500; color:var(--grey); text-transform:uppercase; letter-spacing:0.5px; margin-top:5pt; line-height:1.25; }
.rp-shot { padding:7pt 10pt 5pt; border-top:1px solid var(--border); }
.rp-shot img { width:100%; height:auto; display:block; border:1px solid #EDF0F6; border-radius:6px; }
.rp-foot { font-size:7.6pt; color:var(--grey); padding:0 13pt 8pt; }

/* ---------- FINAL CTA ---------- */
.cta { margin-top:12pt; padding:20pt; border-radius:16px; text-align:center;
  background:radial-gradient(120% 120% at 50% -20%, rgba(180,255,36,0.18), rgba(180,255,36,0) 55%), linear-gradient(150deg,#0A0E27,#071A6E 70%,#005AFF); color:white; }
.cta .cl { font-size:8.2pt; font-weight:600; letter-spacing:2.5px; text-transform:uppercase; color:var(--lime); }
.cta .ch { font-size:18pt; font-weight:700; margin:6pt 0 4pt; letter-spacing:-0.4px; }
.cta .cp { font-size:9.6pt; color:#D2DDF5; max-width:118mm; margin:6pt auto 0; line-height:1.48; }
.cta .cbtn { display:inline-block; margin-top:12pt; background:var(--lime); color:var(--ink); font-size:10.5pt; font-weight:700; padding:9pt 28pt; border-radius:40px; }
.cta .cc { font-size:8.6pt; color:#B9C8EC; margin-top:11pt; }
/* ---------- FINAL CLOSE: your plan, your price, reply yes ---------- */
.cl-hero { margin-top:6pt; padding:20pt 22pt; border-radius:18px; color:white; display:flex; justify-content:space-between; align-items:center; gap:16pt;
  background:radial-gradient(120% 120% at 90% -30%, rgba(180,255,36,0.20), rgba(180,255,36,0) 55%), linear-gradient(150deg,#0A0E27,#071A6E 70%,#005AFF); }
.cl-hero .k { font-size:8.2pt; font-weight:700; letter-spacing:2.2px; text-transform:uppercase; color:var(--lime); }
.cl-hero .n { font-size:21pt; font-weight:700; letter-spacing:-0.6px; margin-top:4pt; line-height:1.1; }
.cl-hero .g { font-size:9.2pt; color:#C9D6F5; margin-top:6pt; line-height:1.45; max-width:92mm; }
.cl-hero .pr { text-align:right; flex-shrink:0; }
.cl-hero .pr .v { font-size:34pt; font-weight:700; letter-spacing:-1.5px; color:var(--lime); line-height:1; }
.cl-hero .pr .u { font-size:8.8pt; color:#B9C8EC; margin-top:4pt; }
.cl-row { display:flex; gap:10pt; margin-top:12pt; }
.cl-target { flex:1; background:var(--soft); border-radius:14px; padding:15pt 16pt; }
.cl-target .h, .cl-first .h { font-size:8.2pt; font-weight:700; letter-spacing:1.4px; text-transform:uppercase; color:var(--blue); margin-bottom:6pt; }
.cl-target .t { font-size:13pt; font-weight:700; line-height:1.3; color:var(--ink); letter-spacing:-0.3px; }
.cl-target .s { font-size:8.8pt; color:#3A4258; margin-top:7pt; line-height:1.45; }
.cl-first { flex:1.25; background:white; border:1px solid var(--border); border-radius:14px; padding:15pt 16pt; }
.cl-first .it { display:flex; gap:9pt; align-items:flex-start; margin-bottom:8pt; }
.cl-first .it:last-child { margin-bottom:0; }
.cl-first .nb { width:20pt; height:20pt; border-radius:6px; background:var(--ink); color:white; font-size:9.5pt; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.cl-first .tx b { font-size:9.6pt; display:block; line-height:1.3; }
.cl-first .tx span { display:block; font-size:8.8pt; color:#3A4258; line-height:1.4; margin-top:1pt; }
.cl-yes-h { font-size:12.5pt; font-weight:700; margin:18pt 0 8pt; letter-spacing:-0.3px; }
.cl-yes { display:flex; gap:10pt; }
.cl-way { flex:1; border-radius:14px; padding:15pt 16pt; }
.cl-way.a { background:rgba(180,255,36,0.18); border:1.5px solid var(--lime); }
.cl-way.b { background:white; border:1.5px solid var(--blue); }
.cl-way .w { font-size:8.2pt; font-weight:700; letter-spacing:1.4px; text-transform:uppercase; color:var(--grey); }
.cl-way .t { font-size:14pt; font-weight:700; margin:4pt 0 4pt; letter-spacing:-0.3px; color:var(--ink); }
.cl-way p { font-size:9pt; color:#3A4258; line-height:1.45; margin:0; }
.cl-way a.btn { display:inline-block; margin-top:11pt; font-size:9.4pt; font-weight:700; padding:7pt 16pt; border-radius:30px; text-decoration:none; }
.cl-way.a a.btn { background:var(--ink); color:var(--lime); }
.cl-way.b a.btn { background:var(--blue); color:white; }
.cl-way .url { font-size:8.4pt; color:var(--blue); margin-top:6pt; }
.cl-foot { font-size:8.6pt; color:var(--grey); text-align:center; margin-top:14pt; }
.cl-foot b { color:var(--ink); }
"""
