// READ INBOX (Instantly): empty on purpose. The shared Pick New Replies code (ra_pick_new_replies.js) also reads a
// SalesBlink inbox list; in Instantly every received email is already in "Read Reply Events", so this list is empty.
return [{ json: { data: { result: [] } } }];
