<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="text-white" height-hint="98">
      <!-- 开启顶部安全区适配 -->
      <van-nav-bar safe-area-inset-top />
    </q-header>

    <q-page-container>
      <router-view />
      <log />
    </q-page-container>

    <q-footer class="text-white">
      <tabbar></tabbar>
    </q-footer>

    <!-- 开启底部安全区适配 -->
    <van-number-keyboard safe-area-inset-bottom />
  </q-layout>
</template>


<script>
import { defineComponent } from 'vue'
import Log from '@/components/Log/index.vue'
import Tabbar from './components/Tabbar/index.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    Log, Tabbar
  }
})
</script>
