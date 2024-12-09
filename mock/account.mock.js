import data from './data/account.data.json'

export default [
  {
    url: `${process.env.VUE_APP_API_BASE}/api/account`,
    method: 'GET',
    response: () => {
      return data.account
    },
  },
]
