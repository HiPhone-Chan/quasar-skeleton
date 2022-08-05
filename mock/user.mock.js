const data = require("./data/user.data.json");
const accountData = require("./data/account.data.json");
const fs = require("fs");

module.exports = [
  {
    url: `${process.env.VUE_APP_BASE_API}/api/admin/user`,
    method: "POST",
    response: (req) => {
      const body = req.body;
      const token = req.headers.authorization.replace("Bearer ", "");
      let createdBy = "";
      for (let i = 0; i < accountData.length; i++) {
        if (token === accountData[i].token.id_token) {
          createdBy = accountData[i].account.login;
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
    url: `${process.env.VUE_APP_BASE_API}/api/admin/user`,
    method: "PUT",
    response: ({ body }) => {
      for (let i = 0; i < data.users.length; i++) {
        const id = data.users[i].id;
        if (body.id === id) {
          data.users[i] = body;
        }
      }
    },
  },
  {
    url: `${process.env.VUE_APP_BASE_API}/api/admin/user/:login`,
    method: "DELETE",
    response: ({ query }) => {
      for (let i = 0; i < data.users.length; i++) {
        const login = data.users[i].login;
        if (query.login === login) {
          data.users.splice(i);
        }
      }
    },
  },
  {
    url: `${process.env.VUE_APP_BASE_API}/api/admin/users`,
    method: "GET",
    rawResponse: (req, resp) => {
      const userData = data.users;
      resp.setHeader("x-total-count", userData.length);
      resp.end(JSON.stringify(userData));
    },
  },
  {
    url: `${process.env.VUE_APP_BASE_API}/api/admin/user/check/:login`,
    method: "GET",
    response: ({ query }) => {
      for (let i = 0; i < data.users.length; i++) {
        const login = data.users[i].login;
        if (query.login === login) {
          return true;
        }
      }
      return false;
    },
  },
  {
    url: `${process.env.VUE_APP_BASE_API}/api/admin/user/change-password/:login`,
    method: "POST",
    response: () => {},
  },
];
