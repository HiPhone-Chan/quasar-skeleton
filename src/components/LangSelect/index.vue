<template>
  <el-dropdown trigger="click" class="international" @command="setLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in languageOptions"
          :key="item.value"
          :disabled="language === item.value"
          :command="item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useAppStore } from '@/stores/app-store'

export default {
  name: 'LangSelectIndex',
  data() {
    return {
      languageOptions: [
        {
          value: 'zh-CN',
          label: '中文',
        },
        {
          value: 'en-US',
          label: 'English',
        },
      ],
    }
  },
  computed: {
    ...mapState(useAppStore, ['language']),
  },
  watch: {
    language() {
      this.$message({
        message: this.$t('login.switchLang'),
        type: 'success',
      })
    },
  },
  methods: {
    ...mapActions(useAppStore, ['setLanguage']),
  },
}
</script>
