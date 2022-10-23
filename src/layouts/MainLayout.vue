<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="text-white" height-hint="98">
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="text-white">
      <tabbar></tabbar>
    </q-footer>

  </q-layout>
</template>


<script>
import { defineComponent } from 'vue'
import Tabbar from './components/Tabbar/index.vue';

export default defineComponent({
  name: 'MainLayout',
  components: { Tabbar }
})
</script>
