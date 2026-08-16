/**
 * Run in browser console after loading the site, or open via test-notify.html
 */
(function runNotifyTests() {
  const n = window.portfolioNotify;
  const results = [];

  function assert(name, condition) {
    results.push({ name, pass: !!condition });
  }

  // Unit tests
  assert('normalizePhone strips spaces', n.normalizePhone('+65 9123 4567') === '+6591234567');
  assert('valid phone accepted', n.isValidVisitorPhone('+6591234567'));
  assert('invalid phone rejected', !n.isValidVisitorPhone('123'));
  assert('message includes visitor name', n.buildNotifyMessage({
    name: 'Test User',
    phone: '+6591234567',
    message: 'Hello'
  }).includes('Test User'));

  // Page must not expose owner phone
  const pageText = document.body.innerText;
  assert('owner phone hidden from page', !pageText.includes('9275 5920') && !pageText.includes('92755920'));

  return results;
})();
