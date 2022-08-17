const data = require("./data/user.data.json");
const { getAccount } = require("./utils/user.js");

module.exports = [
  {
    url: `${process.env.API_CONTEXT}/api/account`,
    method: "GET",
    response: ({ headers }) => {
      return getAccount(headers);
    }
  },
  {
    url: `${process.env.API_CONTEXT}/api/account`,
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
