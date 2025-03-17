<template>
  <div v-if="logNumber > 0">
    <el-badge :is-dot="true" style="line-height: 25px; margin-top: -5px" @click="dialogTableVisible = true">
      <el-button style="padding: 8px 10px" size="small" type="danger">
        <svg-icon icon-class="bug" />
      </el-button>
    </el-badge>
    <el-dialog v-model="dialogTableVisible" width="80%" append-to-body>
      <template #header>
        <div>
          <span style="padding-right: 10px">Logs</span>
          <el-button size="small" type="primary" icon="el-icon-delete" @click="clearAll">Clear All</el-button>
        </div>
      </template>
      <el-table :data="logs" border>
        <el-table-column label="Message">
          <template v-slot="{ row }">
            <div>
              <span class="message-title" style="padding-right: 10px">Info: </span>
              <el-tag type="warning"> {{ row.tag }} error in {{ row.msg }} </el-tag>
            </div>
            <br />
            <div>
              <span class="message-title" style="padding-right: 16px">time: </span>
              <el-tag type="success">
                {{ formatTime(row.time) }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Stack">
          <template v-slot="scope">
            {{ scope.row.stack }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapStores } from 'pinia'
import { formatTime } from '@/utils'
import { useLogStore } from '@/stores/log-store'

export default {
  name: 'LogIndex',
  data() {
    return {
      dialogTableVisible: false,
    }
  },
  computed: {
    ...mapState(useLogStore, ['logs']),
    ...mapStores(useLogStore),
    logNumber() {
      return this.logs.length
    },
  },
  methods: {
    formatTime,
    clearAll() {
      this.dialogTableVisible = false
      this.logStore.clear()
    },
  },
}
</script>

<style scoped>
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
</style>
