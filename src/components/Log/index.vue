<template>
  <div>
    <q-btn icon="bug_report" @click="showDialog = true">
      <q-badge color="red">{{ logNumber }}</q-badge>
    </q-btn>

    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Logs</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p v-for="(log, index) in logs" :key="index">{{ log }}</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Trigger Error" color="red" @click="triggerError" />
          <q-btn flat label="Log Some" color="primary" @click="logStore.log('log test.')" />
          <q-btn flat label="Clear" color="primary" @click="logStore.clear()" />
          <q-btn flat label="Close" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapStores } from 'pinia'
import { useLogStore } from '@/stores/log-store'

export default defineComponent({
  name: 'LogIndex',

  data() {
    return {
      showDialog: false
    }
  },
  computed: {
    ...mapState(useLogStore, ['logs']),
    ...mapStores(useLogStore),
    logNumber() {
      return this.logs.length;
    }
  },
  methods: {
    triggerError() {
      throw new Error("Log test error")
    }
  }
})
</script>
