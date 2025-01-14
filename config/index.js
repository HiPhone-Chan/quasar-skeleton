const defaultConfig = {
  publicPath: '/',
  mock: true,
}

const projectConfig = {}
for (const key in defaultConfig) {
  projectConfig[key] = transfer(process.env[key]) ?? defaultConfig[key]
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

const envFiles = []
const appEnv = process.env.APP_ENV ?? 'development'
if (appEnv !== 'development' && appEnv !== 'production') {
  envFiles.push(`./config/.env.${appEnv}`)
}
export { envFilter, envFiles }

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
