const data = require("./data/user.data.json");
const { getAccount } = require("./utils/user.js");

module.exports = [
  {
    url: `${process.env.VUE_APP_API_BASE}/api/account`,
    method: "GET",
    response: ({ headers }) => {
      return getAccount(headers);
    }
  },
  {
    url: `${process.env.VUE_APP_API_BASE}/api/account`,
    method: "POST",
    response: ({ body, headers }) => {
      const account = getAccount(headers);
      if (account) {
        account.nickName = body.nickName
        account.mobile = body.mobile
      }
    }
  }
];
