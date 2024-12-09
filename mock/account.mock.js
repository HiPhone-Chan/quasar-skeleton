import { getAccount } from './utils/user.js'

export default [
  {
    url: `${process.env.VUE_APP_API_BASE}/api/account`,
    method: 'GET',
    response: ({ headers }) => {
      return getAccount(headers)
    },
  },
  {
    url: `${process.env.VUE_APP_API_BASE}/api/account`,
    method: 'POST',
    response: ({ body, headers }) => {
      const account = getAccount(headers)
      if (account) {
        account.nickName = body.nickName
        account.mobile = body.mobile
      }
    },
  },
]
