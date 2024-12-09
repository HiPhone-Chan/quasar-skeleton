import { formatArrayOption } from './index'
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  if (str) {
    return true
  }
  return false
}

// roles to be create user
export const createRoleOptions = [
  {
    value: 'ROLE_MANAGER',
    label: '管理员',
  },
  {
    value: 'ROLE_USER',
    label: '普通用户',
  },
]

export const updateRoleOptions = [
  {
    value: 'ROLE_ADMIN',
    label: '超级管理员',
    disabled: true,
  },
  ...createRoleOptions,
]

// all roles
export const roleOptions = [
  {
    value: 'ROLE_ADMIN',
    label: '超级管理员',
  },
  ...createRoleOptions,
]

export const LOGIN_VALID_CHARACTER = {
  pattern: /^[a-zA-Z0-9_'.@]{4,50}$/,
  message: `英文大小写,数字,以及 _'.@,长度4-50`,
}

export function formatAuthorities(arr) {
  return formatArrayOption(roleOptions, arr)
}
