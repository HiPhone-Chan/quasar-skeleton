<template>
  <div>
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="click" />
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import { useFullscreen } from '@vueuse/core'

const instance = getCurrentInstance();
const app = instance.appContext.config.globalProperties;
const { isFullscreen, isSupported, toggle } = useFullscreen()

const click = () => {
  if (!isSupported) {
    app.$message({
      message: 'you browser can not work',
      type: 'warning'
    })
    return false
  }
  toggle()
}
</script>


<script>
export default {
  name: 'ScreenfullIndex'
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
