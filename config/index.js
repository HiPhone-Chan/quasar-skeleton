import dotenv from 'dotenv'
import path from 'node:path'
import fs from 'node:fs'

export function envFilter(originalEnv) {
  const newEnv = {}
  for (const key in originalEnv) {
    if (key.startsWith('VUE_APP_')) {
      newEnv[key] = originalEnv[key]
    }
  }
  return newEnv
}

// load env for quasar.config.js to use
export default function loadEnv(appEnv) {
  const envFiles = [...getEnvFiles()]

  if (process.env.NODE_ENV === 'development') {
    envFiles.push(...getEnvFiles('dev'))
  } else if (process.env.NODE_ENV === 'production') {
    envFiles.push(...getEnvFiles('prod'))
  }

  envFiles.push(...getAppEnvFiles(appEnv))
  for (const envFile of envFiles) {
    const filePath = path.join(__dirname, envFile)
    if (fs.existsSync(filePath)) {
      dotenv.config({ path: filePath, override: true })
    }
  }
}

export function getAppEnvFiles(appEnv) {
  const appEnvFiles = []
  const envFiles = getEnvFiles(appEnv)
  for (const envFile of envFiles) {
    const appEnvFile = `./app/${envFile}`
    const filePath = path.join(__dirname, appEnvFile)

    if (fs.existsSync(filePath)) {
      appEnvFiles.push(appEnvFile)
    }
  }
  return appEnvFiles
}

export function isTrue(value) {
  return value === 'true'
}

// get env and local env filename from env suffix
function getEnvFiles(envSuffix) {
  if (envSuffix) {
    return [`.env.${envSuffix}`, `.env.local.${envSuffix}`]
  }
  return [`.env`, `.env.local`]
}
