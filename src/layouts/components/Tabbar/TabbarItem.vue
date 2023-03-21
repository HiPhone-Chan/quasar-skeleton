<template>
  <template v-if="!item.hidden">
    <template v-if="hasChildren(item.children)">
      <tabbar-item v-for="child in item.children" :key="child.path" :item="child" :base-path="resolvePath(child.path)">
      </tabbar-item>
    </template>
    <template v-else>
      <nut-tabbar-item :icon="item.meta?.icon" :name="item.name" :tab-title="generateTitle(item.meta?.title) || basePath"
        :to="isExternal(basePath) ? '' : basePath" :href="isExternal(basePath) ? basePath : ''">
      </nut-tabbar-item>
    </template>
  </template>
</template>
<script>
import path from 'path-browserify'
import { generateTitle } from '@/utils/i18n'
import { isExternal } from '@/utils/url'

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
    isExternal,
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
<style></style>
