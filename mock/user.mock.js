const data = require('./data/user.data.json')

module.exports = [
  {
    url: `${process.env.VUE_APP_BASE_API}/api/admin/user`,
    method: 'POST',
    response: () => {
    }
  },
  {
    url: `${process.env.VUE_APP_BASE_API}/api/admin/user`,
    method: 'PUT',
    response: () => {
    }
  },
  {
    url: `${process.env.VUE_APP_BASE_API}/api/admin/user/:login`,
    method: 'DELETE',
    response: () => {
    }
  },
  {
    url: `${process.env.VUE_APP_BASE_API}/api/admin/users`,
    method: 'GET',
    response: () => {
      return data.users
    }
  },
  {
    url: `${process.env.VUE_APP_BASE_API}/api/admin/user/check/:login`,
    method: 'GET',
    response: () => {
      return true
    }
  },
  {
    url: `${process.env.VUE_APP_BASE_API}/api/admin/user/change-password/:login`,
    method: 'POST',
    response: () => {
    }
  }
]
