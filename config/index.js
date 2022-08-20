const dotenv = require('dotenv');
const path = require('path');

const config = dotenv.config({ path: path.join(__dirname, `.env.${process.env.APP_ENV}`) }).parsed
const vueAppConfig = {}

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

Object.keys(config).map(key => {
  const value = transfer(config[key]);
  config[key] = value
  if (key.startsWith('VUE_APP_')) {
    vueAppConfig[key] = value;
  }

})

module.exports = {
  config,
  vueAppConfig
}
