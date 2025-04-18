<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item of sizeOptions"
          :key="item.value"
          :disabled="size === item.value"
          :command="item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { mapState } from 'pinia'
import { useAppStore } from '@/stores/app-store'
import { useTagsViewStore } from '@/stores/tags-view-store'

export default {
  name: 'SizeSelect',
  data() {
    return {
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Small', value: 'small' },
        { label: 'Large', value: 'large' },
      ],
    }
  },
  computed: {
    ...mapState(useAppStore, ['size']),
  },
  methods: {
    handleSetSize(size) {
      useAppStore().setSize(size)
      this.refreshView()
      this.$message({
        message: 'Switch Size Success',
        type: 'success',
      })
    },
    refreshView() {
      // In order to make the cached page re-rendered
      useTagsViewStore().delAllCachedViews(this.$route)

      const { fullPath } = this.$route

      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath,
        })
      })
    },
  },
}
</script>

<style scoped>
.el-dropdown {
  line-height: unset;
}
</style>
