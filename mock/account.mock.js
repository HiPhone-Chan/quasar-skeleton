const data = require("./data/account.data.json");

module.exports = [
  {
    url: `${process.env.VUE_APP_BASE_API}/api/account`,
    method: "GET",
    response: ({ headers }) => {
      const token = headers.authorization.replace("Bearer ", "");
      for (let i = 0; i < data.length; i++) {
        if (token === data[i].token.id_token) {
          return data[i].account;
        }
      }
      return null;
    },
  },
];
