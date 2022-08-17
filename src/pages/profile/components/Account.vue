<template>
  <el-form>
    <el-form-item :label="$t('user.nickname')">
      <el-input v-model.trim="user.nickname" />
    </el-form-item>
    <el-form-item :label="$t('user.mobile')">
      <el-input v-model.trim="user.mobile" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "ProfileAccount",
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {
          nickname: '',
          mobile: '',
          avatar: ''
        }
      }
    }
  },
  data() {
    return {
      user: { ...this.modelValue }
    }
  },
  watch: {
    user: {
      handler(val, oldVal) {
        this.$emit("update:modelValue", val)
      },
      deep: true
    }
  },
  methods: {
    submit() {
      this.$emit('on-change', this.user)
    }
  }
}
</script>
