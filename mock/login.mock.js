const data = require("./data/account.data.json");

module.exports = [
  {
    url: `${process.env.VUE_APP_BASE_API}/api/authenticate`,
    method: "POST",
    response: ({ body }) => {
      for (let i = 0; i < data.length; i++) {
        const login = data[i].account.login;
        if (body.username === login) {
          return data[i].token;
        }
      }
      return null;
    }
  }
];
