const data = require("../data/user.data.json");

const getToken = (headers) => {
  return headers.authorization.replace("Bearer ", "");
}

module.exports.getToken = getToken

module.exports.getAccount = (headers) => {
  const token = getToken(headers);
  for (const item of data) {
    if (token === item.token.id_token) {
      return item.info;
    }
  }
}
