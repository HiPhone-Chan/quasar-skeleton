<template>
  <el-dropdown trigger="click" class="international"
    @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in languageOptions" :key="item.value"
          :disabled="language === item.value" :command="item.value">
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { mapState } from 'pinia'
import { useAppStore } from '@/stores/app-store'

export default {
  name: 'LangSelectIndex',
  data() {
    return {
      languageOptions: [{
        value: 'zh-CN',
        label: '中文'
      }, {
        value: 'en-US',
        label: 'English'
      }]
    }
  },
  computed: {
    ...mapState(useAppStore, ['language'])
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      useAppStore().setLanguage(lang)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    }
  }
}
</script>
