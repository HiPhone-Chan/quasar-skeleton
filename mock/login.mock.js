const data = require('./data/account.data.json')

module.exports = [
  {
    url: `${process.env.VUE_APP_API_BASE}/api/authenticate`,
    method: 'POST',
    response: () => {
      return data.token
    }
  }
]
