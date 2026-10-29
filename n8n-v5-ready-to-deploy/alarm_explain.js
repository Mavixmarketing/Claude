var allItems = $input.all();
var src = {};
if (allItems && allItems.length > 0 && allItems[0] && allItems[0].json) {
  src = allItems[0].json;
}
if (!src || typeof src !== 'object') {
  src = {};
}

var execution = (src.execution && typeof src.execution === 'object') ? src.execution : {};
var wf = (src.workflow && typeof src.workflow === 'object') ? src.workflow : {};
var errObj = (execution.error && typeof execution.error === 'object') ? execution.error : {};

var wfName = '';
if (typeof wf.name === 'string' && wf.name.length > 0) {
  wfName = wf.name;
} else if (typeof wf.id === 'string' && wf.id.length > 0) {
  wfName = wf.id;
} else {
  wfName = 'An unnamed engine';
}

var errMsg = '';
if (typeof errObj.message === 'string' && errObj.message.length > 0) {
  errMsg = errObj.message;
} else if (typeof src.message === 'string' && src.message.length > 0) {
  errMsg = src.message;
}

var lastNode = '';
if (typeof execution.lastNodeExecuted === 'string' && execution.lastNodeExecuted.length > 0) {
  lastNode = execution.lastNodeExecuted;
}

var runUrl = '';
if (typeof execution.url === 'string' && execution.url.length > 0) {
  runUrl = execution.url;
}

var msg = '';
function addLine(line) {
  if (msg !== '') {
    msg += '\n';
  }
  msg += line;
}

addLine('"' + wfName + '" stopped with an error.');

if (lastNode !== '') {
  addLine('Broke at: ' + lastNode);
}

if (errMsg !== '') {
  var shortMsg = errMsg;
  if (shortMsg.length > 400) {
    shortMsg = shortMsg.substring(0, 400);
  }
  addLine('What it said: ' + shortMsg);

  var lower = errMsg.toLowerCase();
  function mentions(needle) {
    return lower.indexOf(needle) !== -1;
  }

  var hint = '';
  if (mentions('401') || mentions('unauthorized') || mentions('invalid api key') || mentions('authentication')) {
    hint = 'Most likely: a key or password has stopped working. Check the credential for this engine.';
  } else if (mentions('402') || mentions('payment required') || mentions('insufficient') || (mentions('credit') && !mentions('not a credit')) || mentions('quota exceeded') || mentions('balance')) {
    hint = 'Most likely: an account has run out of credit or the plan has expired. Top it up.';
  } else if (mentions('429') || mentions('rate limit') || mentions('too many requests')) {
    hint = 'Most likely: we asked a service faster than it allows. It usually fixes itself, but if it keeps happening the batching needs slowing down.';
  } else if (mentions('timeout') || mentions('etimedout') || mentions('econnreset') || mentions('socket hang up')) {
    hint = 'Most likely: a website or service was too slow or dropped the connection. Usually temporary.';
  } else if (mentions('enotfound') || mentions('econnrefused')) {
    hint = 'Most likely: a service could not be reached at all. It may be down.';
  } else if (mentions('permission') || mentions('403') || mentions('forbidden')) {
    hint = 'Most likely: the account is not allowed to do that any more. Check the plan and the access settings.';
  } else {
    hint = 'No obvious cause. The message above is the raw one from the service.';
  }
  addLine(hint);
}

if (runUrl !== '') {
  addLine('Run: ' + runUrl);
}

return [{ json: { text: msg } }];
