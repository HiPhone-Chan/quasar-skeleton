import dotenv from 'dotenv'
import path from 'path'

const appEnv = process.env.APP_ENV ?? 'development'

const defaultConfig = {
  publicPath: '/',
  mock: true,
}

const envConfig = dotenv.config({ path: path.join(__dirname, getEnvFile(appEnv)) }).parsed

const projectConfig = {}
for (const key in defaultConfig) {
  projectConfig[key] = transfer(envConfig[key]) ?? defaultConfig[key]
}

export default projectConfig

function envFilter(originalEnv) {
  const newEnv = {}
  for (const key in originalEnv) {
    if (key.startsWith('VUE_APP_')) {
      newEnv[key] = originalEnv[key]
    }
  }

  return newEnv
}

export { envFilter }

function getEnvFile(appEnv) {
  if (appEnv === 'development') {
    return `.env.dev`
  } else if (appEnv === 'production') {
    return `.env.prod`
  }
  return `.env.${appEnv}`
}

function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

function transfer(value) {
  if (isNumber(value)) {
    return Number(value)
  } else if (value === 'true') {
    return true
  } else if (value === 'false') {
    return false
  }
  return value
}
