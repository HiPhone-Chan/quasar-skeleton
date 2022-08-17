const data = require("./data/user.data.json");

module.exports = [
  {
    url: `${process.env.API_CONTEXT}/api/authenticate`,
    method: "POST",
    response: ({ body }) => {
      for (const item of data) {
        if (body.username === item.info.login) {
          return item.token;
        }
      }
      return null;
    }
  }
];
