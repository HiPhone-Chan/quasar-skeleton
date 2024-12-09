import data from './data/user.data.json'

export default [
  {
    url: `${process.env.VUE_APP_API_BASE}/api/authenticate`,
    method: 'POST',
    response: ({ body }) => {
      for (const item of data) {
        if (body.username === item.info.login) {
          return item.token
        }
      }
      return null
    },
  },
]
