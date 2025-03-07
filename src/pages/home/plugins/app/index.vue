<template>
  <div>
    <p>管理员权限: {{ isAdmin }}</p>
    <p>info: {{ info }}</p>
    <q-btn @click="fullscreen()">全屏</q-btn>
    <q-btn @click="fullscreen(true)">取消全屏</q-btn>
    <q-btn @click="requestAdmin">请求admin权限</q-btn>
    <q-btn @click="enableKioskMode">启用Kiosk模式</q-btn>
  </div>
</template>

<script>
import { MyApp } from '@/api/app-plugin';

export default {
  name: 'AppFunctionIndex',
  data() {
    return {
      isAdmin: false,
      info: "",
      onPermissionResponseListener: null,
      onBackPressedListener: null
    }
  },
  mounted() {
    this.isAdminActive()
    this.onPermissionResponseListener = MyApp.addListener('onPermissionResponse', this.onPermissionResponse)
    this.onBackPressedListener = MyApp.addListener('onBackPressed', this.onBackPressed)
  },
  methods: {
    async fullscreen(cancel = false) {
      if (cancel) {
        await MyApp.exitFullscreen()
      } else {
        await MyApp.enterFullscreen()
      }
    },
    async isAdminActive() {
      const { result } = await MyApp.isAdminActive()
      this.isAdmin = result
    },
    async requestAdmin() {
      await MyApp.requestAdmin()
    },
    enableKioskMode() {
      MyApp.enableKioskMode()
    },
    onPermissionResponse(resp) {
      this.info = resp
    },
    onBackPressed() {
      this.info = "onBackPressed"
    }
  },
  errorCaptured(err) {
    this.info = err

    return false
  }
}
</script>

<style></style>
