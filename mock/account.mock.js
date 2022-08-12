const data = require("./data/account.data.json");

module.exports = [
  {
    url: `${process.env.API_CONTEXT}/api/account`,
    method: "GET",
    response: ({ headers }) => {
      const token = headers.authorization.replace("Bearer ", "");
      for (const item of data) {
        if (token === item.token.id_token) {
          return item.account;
        }
      }
      return null;
    }
  }
];
