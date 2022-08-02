const data = require('./data/account.data.json')

module.exports = [
  {
    url: `${process.env.VUE_APP_BASE_API}/api/authenticate`,
    method: 'POST',
    response: () => {
      return data.token
    }
  }
]
