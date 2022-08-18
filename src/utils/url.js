

export function getFileName(file) {
  let slashIndex = file.lastIndexOf('/')
  if (slashIndex < 0) {
    slashIndex = 0
  } else {
    slashIndex++
  }
  let dotIndex = file.lastIndexOf('.')
  if (dotIndex < 0) {
    dotIndex = file.length - 1
  }
  let result = file.substring(slashIndex, dotIndex)
  return result;
}
