const plugins = {}

export function registerPlugin(pluginName) {
  return plugins[pluginName]
}
