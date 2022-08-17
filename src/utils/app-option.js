// roles to be create user
export const createRoleOptions = [
  {
    value: 'ROLE_MANAGER',
    label: '管理员'
  }, {
    value: 'ROLE_USER',
    label: '普通用户'
  }
]

export const updateRoleOptions = [
  {
    value: 'ROLE_ADMIN',
    label: '超级管理员',
    disabled: true
  },
  ...createRoleOptions
]

// all roles
export const roleOptions = [
  {
    value: 'ROLE_ADMIN',
    label: '超级管理员'
  },
  ...createRoleOptions
]

export function formatAuthorities(arr) {
  return formatArrayOption(roleOptions, arr)
}

export function formatOption(options, val) {
  for (const option of options) {
    if (option.value === val) {
      return option.label
    }
  }
  return val
}

export function formatArrayOption(options, arr) {
  return arr.map(item => {
    return formatOption(options, item)
  }).join(',')
}
