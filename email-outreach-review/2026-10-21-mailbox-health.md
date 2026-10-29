# Mailbox health, 21 Oct 2026 (last 90 days, SalesBlink)

DNS: 28 of 29 domains pass SPF, DKIM, DMARC and MX (Instantly check). grantcalculator.ca fails SPF and DMARC; it is not a cold email sender.
Instantly warm-up: on for all 130 sending mailboxes, health 100.

# Mailbox health table (read-only snapshot, 2026-10-21 ~18:50 UTC)

Windows: 90d = 2026-07-23 to 2026-10-21, 30d = 2026-09-21 to 2026-10-21 (get_analytics_mailbox_stats with from/to). Rates are computed here from counts.
DNS columns: NOT CHECKED. DNS over HTTPS (dns.google, cloudflare-dns.com and others) was blocked by the session's egress proxy, and SalesBlink's get_sender_health reports no SPF/DKIM/DMARC/MX data. So MX/SPF/DKIM/DMARC are shown as 'n/c' (not checked), not yes/no.
Verdict = first matching of: likely spam (>=300 sent in 90d with 0 replies, OR 90d reply rate <0.2%; applied literally, so mailboxes with 0 replies on fewer than 300 sends also land here and are marked '(<300 sent)' in All flags as weaker evidence), error (health 'error' field set), high bounce (>2%, 90d), high unsub (>2%, 90d), ok. 'All flags' lists every rule that matched.

| # | email | domain | 90d sent | 90d repl | repl % | bounces | bounce % | unsubs | unsub % | 30d sent | 30d repl | 30d repl % | health | error | warmup | MX | SPF | DKIM | DMARC | verdict | all flags |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | mfarhan@mavicmarketing.com | mavicmarketing.com | 433 | 0 | 0.00 | 5 | 1.15 | 3 | 0.69 | 232 | 0 | 0.00 | 80 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam |
| 2 | farhan@mavixgrowth.com | mavixgrowth.com | 133 | 0 | 0.00 | 0 | 0.00 | 0 | 0.00 | 133 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam (<300 sent) |
| 3 | farhan@mavixmarketinggroup.com | mavixmarketinggroup.com | 124 | 0 | 0.00 | 2 | 1.61 | 2 | 1.61 | 124 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam (<300 sent) |
| 4 | mfarhan@mavixmarketinggroup.com | mavixmarketinggroup.com | 118 | 0 | 0.00 | 2 | 1.69 | 2 | 1.69 | 118 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam (<300 sent) |
| 5 | farhan@mavixmarketinghub.com | mavixmarketinghub.com | 150 | 0 | 0.00 | 1 | 0.67 | 2 | 1.33 | 150 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam (<300 sent) |
| 6 | farhanmohd@mavixmarketinghub.com | mavixmarketinghub.com | 150 | 0 | 0.00 | 2 | 1.33 | 2 | 1.33 | 150 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam (<300 sent) |
| 7 | mfarhan@mavixmarketinghub.com | mavixmarketinghub.com | 136 | 0 | 0.00 | 2 | 1.47 | 1 | 0.74 | 136 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam (<300 sent) |
| 8 | farhan@mavixmarketinglab.com | mavixmarketinglab.com | 154 | 0 | 0.00 | 3 | 1.95 | 3 | 1.95 | 154 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam (<300 sent) |
| 9 | mdfarhan@mavixmarketinglab.com | mavixmarketinglab.com | 140 | 0 | 0.00 | 0 | 0.00 | 2 | 1.43 | 140 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam (<300 sent) |
| 10 | farhanmohd@mavixmarketinglab.com | mavixmarketinglab.com | 150 | 0 | 0.00 | 3 | 2.00 | 1 | 0.67 | 150 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam (<300 sent) |
| 11 | mdfarhan@mavixmarketingpartners.com | mavixmarketingpartners.com | 147 | 0 | 0.00 | 1 | 0.68 | 2 | 1.36 | 147 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam (<300 sent) |
| 12 | farhan@mavixmarketingplus.com | mavixmarketingplus.com | 144 | 0 | 0.00 | 5 | 3.47 | 4 | 2.78 | 144 | 0 | 0.00 | 80 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam (<300 sent), high bounce, high unsub |
| 13 | farhan@mavixmarketingpro.com | mavixmarketingpro.com | 147 | 0 | 0.00 | 7 | 4.76 | 6 | 4.08 | 147 | 0 | 0.00 | 80 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam (<300 sent), high bounce, high unsub |
| 14 | mdfarhan@mavixmarketingpro.com | mavixmarketingpro.com | 143 | 0 | 0.00 | 3 | 2.10 | 0 | 0.00 | 143 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam (<300 sent), high bounce |
| 15 | mfarhan@mavixmarketingservices.com | mavixmarketingservices.com | 156 | 0 | 0.00 | 0 | 0.00 | 2 | 1.28 | 156 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam (<300 sent) |
| 16 | mohdfarhan@mavixmarketingsolutions.com | mavixmarketingsolutions.com | 138 | 0 | 0.00 | 2 | 1.45 | 3 | 2.17 | 138 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam (<300 sent), high unsub |
| 17 | farhanmohd@mavixmarketingteam.com | mavixmarketingteam.com | 148 | 0 | 0.00 | 1 | 0.68 | 4 | 2.70 | 148 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam (<300 sent), high unsub |
| 18 | mdfarhan@mavixmarketingteam.com | mavixmarketingteam.com | 147 | 0 | 0.00 | 0 | 0.00 | 2 | 1.36 | 147 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | likely spam | likely spam (<300 sent) |
| 19 | mfarhan@mavixmarketingworks.com | mavixmarketingworks.com | 152 | 1 | 0.66 | 2 | 1.32 | 2 | 1.32 | 152 | 1 | 0.66 | 100 | Connection error detected | off | n/c | n/c | n/c | n/c | error | error |
| 20 | mdfarhan@mavexmarketing.com | mavexmarketing.com | 434 | 3 | 0.69 | 5 | 1.15 | 7 | 1.61 | 237 | 2 | 0.84 | 100 | Connection error detected | off | n/c | n/c | n/c | n/c | error | error |
| 21 | farhan@mavixmarkeeting.com | mavixmarkeeting.com | 419 | 6 | 1.43 | 6 | 1.43 | 7 | 1.67 | 221 | 4 | 1.81 | 100 | Connection error detected | off | n/c | n/c | n/c | n/c | error | error |
| 22 | mfarhan@mavixmarketting.com | mavixmarketting.com | 393 | 7 | 1.78 | 6 | 1.53 | 3 | 0.76 | 205 | 2 | 0.98 | 100 | Connection error detected | off | n/c | n/c | n/c | n/c | error | error |
| 23 | farhan@mavixmarketingservices.com | mavixmarketingservices.com | 140 | 1 | 0.71 | 5 | 3.57 | 6 | 4.29 | 140 | 1 | 0.71 | 100 | none | off | n/c | n/c | n/c | n/c | high bounce | high bounce, high unsub |
| 24 | mohdfarhan@mavixmarketingplus.com | mavixmarketingplus.com | 141 | 1 | 0.71 | 5 | 3.55 | 4 | 2.84 | 141 | 1 | 0.71 | 80 | none | off | n/c | n/c | n/c | n/c | high bounce | high bounce, high unsub |
| 25 | mohdfarhan@mavixmarketingworks.com | mavixmarketingworks.com | 159 | 1 | 0.63 | 5 | 3.14 | 1 | 0.63 | 159 | 1 | 0.63 | 80 | none | off | n/c | n/c | n/c | n/c | high bounce | high bounce |
| 26 | farhanmohd@mavixmarketingservices.com | mavixmarketingservices.com | 139 | 5 | 3.60 | 4 | 2.88 | 6 | 4.32 | 139 | 5 | 3.60 | 100 | none | off | n/c | n/c | n/c | n/c | high bounce | high bounce, high unsub |
| 27 | mfarhan@mavixgrowth.com | mavixgrowth.com | 117 | 1 | 0.85 | 3 | 2.56 | 4 | 3.42 | 117 | 1 | 0.85 | 100 | none | off | n/c | n/c | n/c | n/c | high bounce | high bounce, high unsub |
| 28 | mohdfarhan@mavixmarketinggroup.com | mavixmarketinggroup.com | 118 | 2 | 1.69 | 3 | 2.54 | 3 | 2.54 | 118 | 2 | 1.69 | 100 | none | off | n/c | n/c | n/c | n/c | high bounce | high bounce, high unsub |
| 29 | farhanmohd@mavixmarketingsolutions.com | mavixmarketingsolutions.com | 147 | 3 | 2.04 | 3 | 2.04 | 4 | 2.72 | 147 | 3 | 2.04 | 100 | none | off | n/c | n/c | n/c | n/c | high bounce | high bounce, high unsub |
| 30 | mfarhan@mavixmarketingpartners.com | mavixmarketingpartners.com | 142 | 2 | 1.41 | 2 | 1.41 | 8 | 5.63 | 142 | 2 | 1.41 | 100 | none | off | n/c | n/c | n/c | n/c | high unsub | high unsub |
| 31 | farhanmohd@mavixmarketingpro.com | mavixmarketingpro.com | 141 | 4 | 2.84 | 2 | 1.42 | 7 | 4.96 | 141 | 4 | 2.84 | 100 | none | off | n/c | n/c | n/c | n/c | high unsub | high unsub |
| 32 | farhanmohd@mavixmarketingplus.com | mavixmarketingplus.com | 150 | 3 | 2.00 | 3 | 2.00 | 6 | 4.00 | 150 | 3 | 2.00 | 100 | none | off | n/c | n/c | n/c | n/c | high unsub | high unsub |
| 33 | mohdfarhan@mavixmarketinghub.com | mavixmarketinghub.com | 149 | 1 | 0.67 | 2 | 1.34 | 4 | 2.68 | 149 | 1 | 0.67 | 100 | none | off | n/c | n/c | n/c | n/c | high unsub | high unsub |
| 34 | farhanmohd@mavixmarketinggroup.com | mavixmarketinggroup.com | 118 | 3 | 2.54 | 2 | 1.69 | 3 | 2.54 | 118 | 3 | 2.54 | 100 | none | off | n/c | n/c | n/c | n/c | high unsub | high unsub |
| 35 | mdfarhan@mavixxmarketing.com | mavixxmarketing.com | 424 | 3 | 0.71 | 6 | 1.42 | 10 | 2.36 | 226 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | high unsub | high unsub |
| 36 | farhan@mavixmarketting.com | mavixmarketting.com | 429 | 1 | 0.23 | 6 | 1.40 | 1 | 0.23 | 231 | 1 | 0.43 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 37 | farhanmohd@mavixmarkting.com | mavixmarkting.com | 411 | 1 | 0.24 | 3 | 0.73 | 0 | 0.00 | 210 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 38 | farhan@mavixmarketingg.com | mavixmarketingg.com | 395 | 1 | 0.25 | 5 | 1.27 | 5 | 1.27 | 215 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 39 | mohdfarhan@mavixxmarketing.com | mavixxmarketing.com | 463 | 2 | 0.43 | 1 | 0.22 | 6 | 1.30 | 253 | 1 | 0.40 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 40 | mohdfarhan@mavixmarketting.com | mavixmarketting.com | 412 | 2 | 0.49 | 1 | 0.24 | 1 | 0.24 | 218 | 1 | 0.46 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 41 | mdfarhan@mavixmarketingg.com | mavixmarketingg.com | 411 | 2 | 0.49 | 3 | 0.73 | 5 | 1.22 | 215 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 42 | farhan@mavixmarkting.com | mavixmarkting.com | 410 | 2 | 0.49 | 3 | 0.73 | 5 | 1.22 | 216 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 43 | mdfarhan@mavvixmarketing.com | mavvixmarketing.com | 410 | 2 | 0.49 | 4 | 0.98 | 2 | 0.49 | 214 | 1 | 0.47 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 44 | mdfarhan@mavixmarketinghq.com | mavixmarketinghq.com | 410 | 2 | 0.49 | 2 | 0.49 | 3 | 0.73 | 204 | 1 | 0.49 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 45 | farhan@mavixmarketingco.com | mavixmarketingco.com | 409 | 2 | 0.49 | 2 | 0.49 | 4 | 0.98 | 218 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 46 | mfarhan@mavixmarketinghq.com | mavixmarketinghq.com | 403 | 2 | 0.50 | 0 | 0.00 | 2 | 0.50 | 212 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 47 | mdfarhan@mavixmarketingagency.com | mavixmarketingagency.com | 401 | 2 | 0.50 | 2 | 0.50 | 1 | 0.25 | 206 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 48 | mdfarhan@mavixmarketting.com | mavixmarketting.com | 396 | 2 | 0.51 | 3 | 0.76 | 3 | 0.76 | 206 | 2 | 0.97 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 49 | mdfarhan@maviksmarketing.com | maviksmarketing.com | 391 | 2 | 0.51 | 5 | 1.28 | 2 | 0.51 | 206 | 2 | 0.97 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 50 | mohdfarhan@mavixmarketingpro.com | mavixmarketingpro.com | 163 | 1 | 0.61 | 1 | 0.61 | 0 | 0.00 | 163 | 1 | 0.61 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 51 | mdfarhan@mavixmarketingplus.com | mavixmarketingplus.com | 162 | 1 | 0.62 | 2 | 1.23 | 1 | 0.62 | 162 | 1 | 0.62 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 52 | farhanmohd@mavixmarketingpartners.com | mavixmarketingpartners.com | 159 | 1 | 0.63 | 3 | 1.89 | 0 | 0.00 | 159 | 1 | 0.63 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 53 | farhan@mavixmarketingworks.com | mavixmarketingworks.com | 157 | 1 | 0.64 | 2 | 1.27 | 0 | 0.00 | 157 | 1 | 0.64 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 54 | mohdfarhan@mavixmarketingpartners.com | mavixmarketingpartners.com | 153 | 1 | 0.65 | 0 | 0.00 | 2 | 1.31 | 153 | 1 | 0.65 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 55 | mdfarhan@mavixmarketingservices.com | mavixmarketingservices.com | 153 | 1 | 0.65 | 1 | 0.65 | 2 | 1.31 | 153 | 1 | 0.65 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 56 | mfarhan@mavixmarketingsolutions.com | mavixmarketingsolutions.com | 152 | 1 | 0.66 | 1 | 0.66 | 2 | 1.32 | 152 | 1 | 0.66 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 57 | mdfarhan@mavixmarketingworks.com | mavixmarketingworks.com | 152 | 1 | 0.66 | 3 | 1.97 | 1 | 0.66 | 152 | 1 | 0.66 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 58 | mdfarhan@mavixmarketings.com | mavixmarketings.com | 454 | 3 | 0.66 | 6 | 1.32 | 6 | 1.32 | 247 | 1 | 0.40 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 59 | mdfarhan@mavixmarketinghub.com | mavixmarketinghub.com | 150 | 1 | 0.67 | 1 | 0.67 | 2 | 1.33 | 150 | 1 | 0.67 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 60 | farhan@mavixmarketingteam.com | mavixmarketingteam.com | 150 | 1 | 0.67 | 1 | 0.67 | 0 | 0.00 | 150 | 1 | 0.67 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 61 | mfarhan@mavixmarketingteam.com | mavixmarketingteam.com | 150 | 1 | 0.67 | 0 | 0.00 | 2 | 1.33 | 150 | 1 | 0.67 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 62 | mohdfarhan@mavixmarketinglab.com | mavixmarketinglab.com | 149 | 1 | 0.67 | 1 | 0.67 | 1 | 0.67 | 149 | 1 | 0.67 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 63 | farhan@mavixmarketingsolutions.com | mavixmarketingsolutions.com | 144 | 1 | 0.69 | 1 | 0.69 | 2 | 1.39 | 144 | 1 | 0.69 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 64 | mohdfarhan@mavixmarketingservices.com | mavixmarketingservices.com | 141 | 1 | 0.71 | 2 | 1.42 | 2 | 1.42 | 141 | 1 | 0.71 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 65 | mohdfarhan@mavixmarketingteam.com | mavixmarketingteam.com | 141 | 1 | 0.71 | 2 | 1.42 | 2 | 1.42 | 141 | 1 | 0.71 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 66 | mohdfarhan@mavixmaketing.com | mavixmaketing.com | 422 | 3 | 0.71 | 4 | 0.95 | 4 | 0.95 | 224 | 2 | 0.89 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 67 | mfarhan@mavixmarkting.com | mavixmarkting.com | 421 | 3 | 0.71 | 6 | 1.43 | 4 | 0.95 | 223 | 1 | 0.45 | 80 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 68 | mfarhan@mavixmarketingpro.com | mavixmarketingpro.com | 140 | 1 | 0.71 | 1 | 0.71 | 1 | 0.71 | 140 | 1 | 0.71 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 69 | farhan@mavixmarketingagency.com | mavixmarketingagency.com | 417 | 3 | 0.72 | 4 | 0.96 | 4 | 0.96 | 221 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 70 | farhanmohd@maviksmarketing.com | maviksmarketing.com | 416 | 3 | 0.72 | 2 | 0.48 | 2 | 0.48 | 215 | 2 | 0.93 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 71 | farhan@mavixmarketinghq.com | mavixmarketinghq.com | 415 | 3 | 0.72 | 5 | 1.20 | 4 | 0.96 | 211 | 1 | 0.47 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 72 | mdfarhan@mavixmarketingsolutions.com | mavixmarketingsolutions.com | 138 | 1 | 0.72 | 1 | 0.72 | 2 | 1.45 | 138 | 1 | 0.72 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 73 | farhanmohd@mavvixmarketing.com | mavvixmarketing.com | 413 | 3 | 0.73 | 4 | 0.97 | 3 | 0.73 | 214 | 1 | 0.47 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 74 | mohdfarhan@mavixmarketinghq.com | mavixmarketinghq.com | 411 | 3 | 0.73 | 6 | 1.46 | 3 | 0.73 | 218 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 75 | farhanmohd@mavixmarketting.com | mavixmarketting.com | 408 | 3 | 0.74 | 2 | 0.49 | 1 | 0.25 | 214 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 76 | mohdfarhan@maavixmarketing.com | maavixmarketing.com | 407 | 3 | 0.74 | 2 | 0.49 | 1 | 0.25 | 205 | 1 | 0.49 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 77 | mohdfarhan@mavicmarketing.com | mavicmarketing.com | 403 | 3 | 0.74 | 1 | 0.25 | 0 | 0.00 | 204 | 1 | 0.49 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 78 | farhanmohd@mavixmaketing.com | mavixmaketing.com | 379 | 3 | 0.79 | 6 | 1.58 | 7 | 1.85 | 196 | 2 | 1.02 | 80 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 79 | farhanmohd@mavixgrowth.com | mavixgrowth.com | 124 | 1 | 0.81 | 2 | 1.61 | 1 | 0.81 | 124 | 1 | 0.81 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 80 | mfarhan@mavixxmarketing.com | mavixxmarketing.com | 454 | 4 | 0.88 | 4 | 0.88 | 3 | 0.66 | 246 | 1 | 0.41 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 81 | mfarhan@mavixmarkeeting.com | mavixmarkeeting.com | 676 | 6 | 0.89 | 2 | 0.30 | 3 | 0.44 | 234 | 2 | 0.85 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 82 | farhan@mavixxmarketing.com | mavixxmarketing.com | 445 | 4 | 0.90 | 4 | 0.90 | 6 | 1.35 | 240 | 1 | 0.42 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 83 | farhanmohd@maavixmarketing.com | maavixmarketing.com | 651 | 6 | 0.92 | 6 | 0.92 | 2 | 0.31 | 213 | 3 | 1.41 | 80 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 84 | farhanmohd@mavixmarketings.com | mavixmarketings.com | 646 | 6 | 0.93 | 2 | 0.31 | 7 | 1.08 | 223 | 1 | 0.45 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 85 | mohdfarhan@mavixmarketings.com | mavixmarketings.com | 645 | 6 | 0.93 | 4 | 0.62 | 7 | 1.09 | 220 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 86 | mfarhan@mavvixmarketing.com | mavvixmarketing.com | 425 | 4 | 0.94 | 2 | 0.47 | 0 | 0.00 | 225 | 1 | 0.44 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 87 | farhan@maviksmarketing.com | maviksmarketing.com | 422 | 4 | 0.95 | 5 | 1.18 | 1 | 0.24 | 226 | 3 | 1.33 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 88 | farhan@mavicmarketing.com | mavicmarketing.com | 418 | 4 | 0.96 | 2 | 0.48 | 4 | 0.96 | 221 | 2 | 0.90 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 89 | mfarhan@maviksmarketing.com | maviksmarketing.com | 415 | 4 | 0.96 | 1 | 0.24 | 0 | 0.00 | 215 | 3 | 1.40 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 90 | mohdfarhan@mavixmarkeeting.com | mavixmarkeeting.com | 415 | 4 | 0.96 | 6 | 1.45 | 8 | 1.93 | 226 | 2 | 0.88 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 91 | mohdfarhan@mavixmarketingco.com | mavixmarketingco.com | 413 | 4 | 0.97 | 1 | 0.24 | 2 | 0.48 | 214 | 1 | 0.47 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 92 | mdfarhan@mavixmarketingco.com | mavixmarketingco.com | 403 | 4 | 0.99 | 6 | 1.49 | 4 | 0.99 | 218 | 2 | 0.92 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 93 | farhanmohd@mavixmarketingg.com | mavixmarketingg.com | 398 | 4 | 1.01 | 4 | 1.01 | 6 | 1.51 | 198 | 2 | 1.01 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 94 | mohdfarhan@mavixmarketingagency.com | mavixmarketingagency.com | 398 | 4 | 1.01 | 3 | 0.75 | 4 | 1.01 | 208 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 95 | mohdfarhan@mavixmarketingg.com | mavixmarketingg.com | 397 | 4 | 1.01 | 4 | 1.01 | 6 | 1.51 | 209 | 3 | 1.44 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 96 | mohdfarhan@mavvixmarketing.com | mavvixmarketing.com | 397 | 4 | 1.01 | 5 | 1.26 | 6 | 1.51 | 200 | 2 | 1.00 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 97 | mdfarhan@mavixmaketing.com | mavixmaketing.com | 395 | 4 | 1.01 | 2 | 0.51 | 2 | 0.51 | 207 | 3 | 1.45 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 98 | farhanmohd@mavixmarkeeting.com | mavixmarkeeting.com | 678 | 7 | 1.03 | 5 | 0.74 | 6 | 0.88 | 246 | 0 | 0.00 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 99 | farhanmohd@mavixxmarketing.com | mavixxmarketing.com | 471 | 5 | 1.06 | 0 | 0.00 | 1 | 0.21 | 266 | 3 | 1.13 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 100 | mdfarhan@mavixmarkeeting.com | mavixmarkeeting.com | 464 | 5 | 1.08 | 4 | 0.86 | 5 | 1.08 | 254 | 2 | 0.79 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 101 | mfarhan@maavixmarketing.com | maavixmarketing.com | 630 | 7 | 1.11 | 2 | 0.32 | 2 | 0.32 | 204 | 2 | 0.98 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 102 | mfarhan@mavixmarketings.com | mavixmarketings.com | 449 | 5 | 1.11 | 5 | 1.11 | 4 | 0.89 | 240 | 2 | 0.83 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 103 | mdfarhan@maavixmarketing.com | maavixmarketing.com | 421 | 5 | 1.19 | 5 | 1.19 | 4 | 0.95 | 212 | 1 | 0.47 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 104 | mohdfarhan@mavixmarkting.com | mavixmarkting.com | 416 | 5 | 1.20 | 1 | 0.24 | 1 | 0.24 | 214 | 5 | 2.34 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 105 | mfarhan@mavixmarketingco.com | mavixmarketingco.com | 415 | 5 | 1.20 | 1 | 0.24 | 0 | 0.00 | 216 | 2 | 0.93 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 106 | farhanmohd@mavixmarketinghq.com | mavixmarketinghq.com | 414 | 5 | 1.21 | 6 | 1.45 | 6 | 1.45 | 224 | 3 | 1.34 | 80 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 107 | farhanmohd@mavixmarketingco.com | mavixmarketingco.com | 396 | 5 | 1.26 | 4 | 1.01 | 4 | 1.01 | 213 | 2 | 0.94 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 108 | farhanmohd@mavixmarketingworks.com | mavixmarketingworks.com | 155 | 2 | 1.29 | 3 | 1.94 | 1 | 0.65 | 155 | 2 | 1.29 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 109 | mfarhan@mavexmarketing.com | mavexmarketing.com | 460 | 6 | 1.30 | 5 | 1.09 | 7 | 1.52 | 246 | 4 | 1.63 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 110 | mohdfarhan@mavexmarketing.com | mavexmarketing.com | 441 | 6 | 1.36 | 4 | 0.91 | 6 | 1.36 | 238 | 4 | 1.68 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 111 | mfarhan@mavixmarketinglab.com | mavixmarketinglab.com | 147 | 2 | 1.36 | 2 | 1.36 | 2 | 1.36 | 147 | 2 | 1.36 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 112 | mohdfarhan@maviksmarketing.com | maviksmarketing.com | 434 | 6 | 1.38 | 3 | 0.69 | 2 | 0.46 | 233 | 3 | 1.29 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 113 | farhan@mavixmarketingpartners.com | mavixmarketingpartners.com | 144 | 2 | 1.39 | 0 | 0.00 | 1 | 0.69 | 144 | 2 | 1.39 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 114 | farhan@maavixmarketing.com | maavixmarketing.com | 421 | 6 | 1.43 | 3 | 0.71 | 4 | 0.95 | 215 | 3 | 1.40 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 115 | mdfarhan@mavicmarketing.com | mavicmarketing.com | 416 | 6 | 1.44 | 2 | 0.48 | 5 | 1.20 | 210 | 3 | 1.43 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 116 | mfarhan@mavixmaketing.com | mavixmaketing.com | 412 | 6 | 1.46 | 2 | 0.49 | 2 | 0.49 | 215 | 2 | 0.93 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 117 | farhan@mavvixmarketing.com | mavvixmarketing.com | 398 | 6 | 1.51 | 3 | 0.75 | 2 | 0.50 | 212 | 3 | 1.42 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 118 | farhan@mavixmaketing.com | mavixmaketing.com | 397 | 6 | 1.51 | 2 | 0.50 | 4 | 1.01 | 204 | 3 | 1.47 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 119 | farhan@mavixmarketings.com | mavixmarketings.com | 462 | 7 | 1.52 | 9 | 1.95 | 6 | 1.30 | 236 | 1 | 0.42 | 80 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 120 | mfarhan@mavixmarketingagency.com | mavixmarketingagency.com | 396 | 6 | 1.52 | 3 | 0.76 | 4 | 1.01 | 206 | 3 | 1.46 | 80 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 121 | mdfarhan@mavixgrowth.com | mavixgrowth.com | 128 | 2 | 1.56 | 1 | 0.78 | 0 | 0.00 | 128 | 2 | 1.56 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 122 | mdfarhan@mavixmarkting.com | mavixmarkting.com | 419 | 7 | 1.67 | 2 | 0.48 | 1 | 0.24 | 224 | 4 | 1.79 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 123 | farhanmohd@mavixmarketingagency.com | mavixmarketingagency.com | 416 | 7 | 1.68 | 3 | 0.72 | 0 | 0.00 | 213 | 5 | 2.35 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 124 | mdfarhan@mavixmarketinggroup.com | mavixmarketinggroup.com | 117 | 2 | 1.71 | 2 | 1.71 | 2 | 1.71 | 117 | 2 | 1.71 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 125 | farhanmohd@mavexmarketing.com | mavexmarketing.com | 467 | 8 | 1.71 | 3 | 0.64 | 2 | 0.43 | 259 | 3 | 1.16 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 126 | mfarhan@mavixmarketingg.com | mavixmarketingg.com | 408 | 7 | 1.72 | 4 | 0.98 | 5 | 1.23 | 216 | 1 | 0.46 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 127 | farhan@mavexmarketing.com | mavexmarketing.com | 458 | 8 | 1.75 | 3 | 0.66 | 5 | 1.09 | 252 | 4 | 1.59 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 128 | mfarhan@mavixmarketingplus.com | mavixmarketingplus.com | 150 | 3 | 2.00 | 0 | 0.00 | 1 | 0.67 | 150 | 3 | 2.00 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 129 | farhanmohd@mavicmarketing.com | mavicmarketing.com | 391 | 8 | 2.05 | 2 | 0.51 | 1 | 0.26 | 203 | 4 | 1.97 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |
| 130 | mohdfarhan@mavixgrowth.com | mavixgrowth.com | 112 | 3 | 2.68 | 1 | 0.89 | 1 | 0.89 | 112 | 3 | 2.68 | 100 | none | off | n/c | n/c | n/c | n/c | ok | - |

## Senders in 90-day stats that are no longer in the sender list (13)
The tool returned these with email = null (deleted or disconnected mailboxes). Last activity for all is around 2026-08-11/12.

| sender_id | 90d sent | replies | bounces | unsubs |
|---|---|---|---|---|
| c84d273d-423c-464e-b71c-eb64fb38e327 | 234 | 0 | 0 | 0 |
| 4e3fa1dc-5809-4ba1-9720-5164ada63b3c | 233 | 5 | 1 | 2 |
| eaa45664-a730-4bf7-bbd5-b9864f86cd51 | 230 | 2 | 0 | 0 |
| 4e63692c-f0dc-4752-85b9-44811c4493fe | 228 | 2 | 1 | 0 |
| 1660be6a-9a79-4649-baf1-a6f304c8c553 | 227 | 2 | 1 | 0 |
| 9b8606d7-9a44-4725-99c1-b1e658a17c63 | 222 | 1 | 0 | 1 |
| f902c83f-2fac-46f2-bd36-93a083f977a8 | 221 | 0 | 3 | 2 |
| 4a59fe8a-986f-40da-8c3d-da34e0254393 | 220 | 4 | 0 | 0 |
| 1dc3e5ab-ce75-49dd-b74f-21b2aa4eec86 | 218 | 2 | 0 | 1 |
| 4c0b543f-3aa9-470d-adae-7519320fa7e5 | 15 | 0 | 0 | 0 |
| eab3e361-20ac-457b-9484-d65c67ac54ce | 15 | 0 | 0 | 0 |
| 420f41f5-e129-48fe-834d-53772a92ef8b | 15 | 0 | 0 | 0 |
| 0c480058-176a-4ff4-bb12-4bb452424c5f | 12 | 0 | 0 | 0 |
