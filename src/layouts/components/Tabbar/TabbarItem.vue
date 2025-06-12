<template>
  <template v-if="!item.hidden">
    <template v-if="hasChildren(item.children)">
      <tabbar-item v-for="child in item.children" :key="child.path" :item="child" :base-path="resolvePath(child.path)">
      </tabbar-item>
    </template>
    <template v-else>
      <van-tabbar-item
        replace
        :icon="item.meta?.icon"
        :to="isExternal(basePath) ? '' : basePath"
        :url="isExternal(basePath) ? basePath : ''"
      >
        {{ generateTitle(this.item.meta?.title) || this.basePath }}
      </van-tabbar-item>
    </template>
  </template>
</template>

<script>
import path from 'path-browserify'
import { mapActions } from 'pinia'
import { isExternal } from '@/utils/url'
import { useI18nStore } from '@/stores/i18n-store'

export default {
  name: 'TabbarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  methods: {
    ...mapActions(useI18nStore, ['generateTitle']),
    isExternal,
    hasChildren(children) {
      return children && children.length
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
