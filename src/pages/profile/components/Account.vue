<template>
  <el-form>
    <el-form-item :label="$tm('login.nickname')">
      <el-input v-model.trim="user.nickname" />
    </el-form-item>
    <el-form-item :label="$tm('login.mobile')">
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
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
