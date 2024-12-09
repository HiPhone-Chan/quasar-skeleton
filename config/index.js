const dev = {
  publicPath: '/',
  mock: true,
}

const prod = {
  publicPath: '/app/admin',
  mock: false,
}

export default process.env.APP_ENV == 'development' ? dev : prod
