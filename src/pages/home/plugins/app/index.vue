<template>
  <div>
    <p>管理员权限: {{ isAdmin }}</p>
    <p>info: {{ info }}</p>
    <q-btn @click="installApp()">安装App</q-btn>
    <q-btn @click="fullscreen()">全屏</q-btn>
    <q-btn @click="fullscreen(true)">取消全屏</q-btn>
    <q-btn @click="requestAdmin">请求admin权限</q-btn>
    <q-btn @click="removeAdmin">取消admin权限</q-btn>
    <q-btn @click="enableKioskMode">启用Kiosk模式</q-btn>
    <q-btn @click="handleOnBackPressed">监听后退键</q-btn>
    <q-btn @click="cancelOnBackPressed">取消监听后退键</q-btn>
    <q-btn @click="exitApp">退出App</q-btn>
  </div>
</template>

<script>
import { App, MyApp } from '@/api/app-plugin'

export default {
  name: 'AppFunctionIndex',
  data() {
    return {
      isAdmin: false,
      info: '',
      onPermissionResponseListener: null,
      onBackPressedListener: null,
    }
  },
  mounted() {
    App.removeAllListeners()
    this.isAdminActive()
    this.onPermissionResponseListener = MyApp.addListener('onPermissionResponse', this.onPermissionResponse)
  },
  methods: {
    async installApp() {
      await MyApp.install({
        downloadFilePath: '',
        authority: 'tech.hiphone.app.file_provider',
      })
    },
    async fullscreen(cancel = false) {
      if (cancel) {
        await MyApp.exitFullscreen()
      } else {
        await MyApp.enterFullscreen()
      }
    },
    async isAdminActive() {
      await MyApp.setDeviceAdminReceiver({
        deviceAdminReceiverClassName: 'tech.hiphone.app.receiver.MyDeviceAdminReceiver',
      })
      const { result } = await MyApp.isAdminActive()
      this.isAdmin = result
    },
    async requestAdmin() {
      await MyApp.requestAdmin()
    },
    async removeAdmin() {
      await MyApp.removeAdmin()
    },
    enableKioskMode() {
      MyApp.enableKioskMode()
    },
    async handleOnBackPressed() {
      if (this.onBackPressedListener) {
        return
      }
      this.onBackPressedListener = await App.addListener('backButton', ({ canGoBack }) => {
        this.info = 'onBackPressed canGoBack: ' + canGoBack
      })
    },
    cancelOnBackPressed() {
      if (this.onBackPressedListener) {
        this.onBackPressedListener.remove()
        this.onBackPressedListener = null
      }
    },
    onPermissionResponse(resp) {
      this.info = resp
    },
    exitApp() {
      App.exitApp()
    },
  },
  errorCaptured(err) {
    this.info = err

    return false
  },
  unmounted() {
    App.removeAllListeners()
  },
}
</script>

<style></style>
