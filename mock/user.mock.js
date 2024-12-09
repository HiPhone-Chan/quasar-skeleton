import data from './data/user.data.json'
import { getToken } from './utils/user.js'

export default [
  {
    url: `${process.env.VUE_APP_API_BASE}/api/admin/user`,
    method: 'POST',
    response: (req) => {
      const body = req.body
      const token = getToken(req.headers)
      let createdBy = ''
      for (const item of data) {
        if (token === item.token.id_token) {
          createdBy = item.info.login
        }
      }
      const user = Object.assign(body, {
        id: data.length + 1,
        createdBy: createdBy,
      })
      data.push({
        token: {
          id_token: `mock_${body.login}_token`,
        },
        info: user,
      })
    },
  },
  {
    url: `${process.env.VUE_APP_API_BASE}/api/admin/user`,
    method: 'PUT',
    response: ({ body }) => {
      for (const { info: user } of data) {
        if (body.id === user.id) {
          user.nickName = body.nickName
          user.mobile = body.mobile
        }
      }
    },
  },
  {
    url: `${process.env.VUE_APP_API_BASE}/api/admin/user/:login`,
    method: 'DELETE',
    response: ({ query }) => {
      for (let i = 0; i < data.length; i++) {
        const login = data[i].info.login
        if (query.login === login) {
          data.splice(i, 1)
          break
        }
      }
    },
  },
  {
    url: `${process.env.VUE_APP_API_BASE}/api/admin/users`,
    method: 'GET',
    rawResponse: (req, resp) => {
      resp.setHeader('x-total-count', data.length)
      resp.end(JSON.stringify(data.map((item) => item.info)))
    },
  },
  {
    url: `${process.env.VUE_APP_API_BASE}/api/admin/user/check/:login`,
    method: 'GET',
    response: ({ query }) => {
      for (const user of data) {
        if (query.login === user.info.login) {
          return true
        }
      }
      return false
    },
  },
  {
    url: `${process.env.VUE_APP_API_BASE}/api/admin/user/change-password/:login`,
    method: 'POST',
    response: () => {},
  },
]
