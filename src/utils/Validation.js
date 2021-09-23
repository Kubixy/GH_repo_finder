export function validateUsername(Username) {
  // eslint-disable-next-line no-useless-escape
  var re = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  return re.test(String(Username).toLowerCase());
}
