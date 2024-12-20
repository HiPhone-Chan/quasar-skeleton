const projectConfig = {
  development: {
    publicPath: '/',
    mock: true,
  },
  production: {
    publicPath: '/',
    mock: false,
  },
}

const appEnv = process.env.APP_ENV ?? 'development'

export default projectConfig[appEnv]
