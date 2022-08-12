const data = require('./data/account.data.json')

module.exports = [
  {
    url: `${process.env.API_CONTEXT}/api/authenticate`,
    method: 'POST',
    response: () => {
      return data.token
    }
  }
]
