const data = require('./data/account.data.json')

module.exports = [
  {
    url: `${process.env.VUE_APP_BASE_API}/api/account`,
    method: 'GET',
    response: () => {
      return data.account
    }
  }
]
