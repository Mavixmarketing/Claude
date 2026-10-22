// DUE LIST: only the people who get a follow-up now go on to the writer. Skip Archived also passes along
// people marked drop: true, only so that the log learns about Farhan's hand-sent messages (Log Hand-sent)
// and Farhan hears about replies the reply agent cannot see (Unseen Reply?).
return $('Skip Archived').all().filter(it => !it.json.drop).map(it => ({ json: it.json }));
