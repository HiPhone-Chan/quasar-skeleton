import data from '../data/user.data.json'

export const getToken = (headers) => {
  return headers.authorization.replace('Bearer ', '')
}

export const getAccount = (headers) => {
  const token = getToken(headers)
  for (const item of data) {
    if (token === item.token.id_token) {
      return item.info
    }
  }
}
