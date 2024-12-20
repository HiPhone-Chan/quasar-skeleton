<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer style="background-color: transparent;">
      <tabbar></tabbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import Tabbar from './components/Tabbar/index.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    Tabbar
  }
})
</script>
