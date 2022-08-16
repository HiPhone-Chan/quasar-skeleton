const data = require("./data/user.data.json");
const accountData = require("./data/account.data.json");

module.exports = [
  {
    url: `${process.env.API_CONTEXT}/api/admin/user`,
    method: "POST",
    response: (req) => {
      const body = req.body;
      const token = req.headers.authorization.replace("Bearer ", "");
      let createdBy = "";
      for (const item of accountData) {
        if (token === item.token.id_token) {
          createdBy = item.account.login;
        }
      }
      const object = {
        id: data.users.length + 1,
        createdBy: createdBy,
      };
      const user = Object.assign(body, object);
      data.users.push(user);
    },
  },
  {
    url: `${process.env.API_CONTEXT}/api/admin/user`,
    method: "PUT",
    response: ({ body }) => {
      for (let user of data.users) {
        if (body.id === user.id) {
          user = body;
        }
      }
    },
  },
  {
    url: `${process.env.API_CONTEXT}/api/admin/user/:login`,
    method: "DELETE",
    response: ({ query }) => {
      for (let i = 0; i < data.users.length; i++) {
        const login = data.users[i].login;
        if (query.login === login) {
          data.users.splice(i);
          break;
        }
      }
    },
  },
  {
    url: `${process.env.API_CONTEXT}/api/admin/users`,
    method: "GET",
    rawResponse: (req, resp) => {
      const userData = data.users;
      resp.setHeader("x-total-count", userData.length);
      resp.end(JSON.stringify(userData));
    },
  },
  {
    url: `${process.env.API_CONTEXT}/api/admin/user/check/:login`,
    method: "GET",
    response: ({ query }) => {
      for (const user of data.users) {
        if (query.login === user.login) {
          return true;
        }
      }
      return false;
    },
  },
  {
    url: `${process.env.API_CONTEXT}/api/admin/user/change-password/:login`,
    method: "POST",
    response: () => { },
  }
];
