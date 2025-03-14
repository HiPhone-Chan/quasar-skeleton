<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <router-view />
      <log />
    </q-page-container>

    <q-footer style="background-color: transparent;">
      <tabbar></tabbar>
    </q-footer>
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
