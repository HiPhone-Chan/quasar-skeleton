const data = require('./data/account.data.json')

module.exports = [
  {
    url: `${process.env.API_CONTEXT}/api/account`,
    method: 'GET',
    response: () => {
      return data.account
    }
  }
]
