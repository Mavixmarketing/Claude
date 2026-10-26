// PLATFORM: tells the shared Settings code (ra_settings.js in the reply agent, fu_settings.js in the follow-ups)
// that this is the Instantly workflow, so it only works on log rows with platform "instantly".
return [{ json: { PLATFORM: 'instantly' } }];
