<template>
  <template v-if="!item.hidden">
    <template v-if="hasChildren(item.children)">
      <tabbar-item v-for="child in item.children" :key="child.path"
        :item="child" :base-path="resolvePath(child.path)">
      </tabbar-item>
    </template>
    <template v-else>
      <van-tabbar-item :icon="item.meta?.icon" :url="basePath">
        {{ generateTitle(item.meta?.title) || basePath }}
      </van-tabbar-item>
    </template>
  </template>
</template>

<script>
import path from 'path-browserify'
import { generateTitle } from '@/utils/i18n'
import { isExternal } from '@/utils/validate'

export default {
  name: 'TabbarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    generateTitle,
    hasChildren(children) {
      return children && children.length;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style>

</style>
