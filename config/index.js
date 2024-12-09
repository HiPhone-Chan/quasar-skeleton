const dev = {
  publicPath: '/',
  mock: true,
}

const prod = {
  publicPath: '/',
  mock: false,
}

export default process.env.APP_ENV == 'development' ? dev : prod
