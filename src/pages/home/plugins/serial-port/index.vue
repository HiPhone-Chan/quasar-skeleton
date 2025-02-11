<template>
  <div class="m-2">
    <div class="q-gutter-md row">
      <q-select v-model="path" :options="pathOptions" label="串口" style="width: 250px" />
      <q-select v-model="baudrate" :options="baudrateOptions" label="波特率" style="width: 250px" />
    </div>
    <q-btn @click="close" color="red" v-if="isOpen">关闭</q-btn>
    <q-btn @click="open" color="primary" v-else>打开</q-btn>

    <div class="q-gutter-md row">
      <div>
        <p>接收</p>
        <q-input v-model="receivedData" filled type="textarea" style="width: 250px" />
      </div>
      <div>
        <q-btn @click="send">发送</q-btn>
        <q-input v-model="sendInput" filled type="textarea" style="width: 250px" />
      </div>

    </div>
  </div>
</template>

<script>
import { SerialPort } from '@/api/app-plugin';

export default {
  name: 'SerialPort',
  data() {
    return {
      isOpen: false,
      path: "",
      pathOptions: [],
      baudrate: 115200,
      baudrateOptions: [],
      serialPortParam: {
        baudrate: 115200, // 波特率
        dataBits: 8, // 数据位
        stopBits: 1, // 停止位
        parity: 0,   // 校验位
      },
      sendInput: null,
      receivedBytes: [],
      listener: null
    }
  },
  mounted() {
    this.getPathOptions()
  },
  computed: {
    receivedData() {
      let result = ""
      if (this.receivedBytes && this.receivedBytes.length) {
        for (const b of this.receivedBytes) {
          result += b + " "
        }
      }
      return result
    }
  },
  methods: {
    async open() {
      const resp = await SerialPort.open({ path: this.path, ...this.serialPortParam })
      if (resp.result == 0) {
        this.isOpen = true
        this.listener = SerialPort.addListener('onDataReceived', this.onSerialPortDataReceived)
        this.$notify({ type: "positive", message: '打开成功' })
      } else {
        this.$notify({ type: "nagative", message: '打开失败' })
      }
    },
    async close() {
      const resp = await SerialPort.close({ path: this.path })
      if (resp.result == 0) {
        this.isOpen = false
        this.listener.remove()
      }
    },
    async getPathOptions() {
      const resp = await SerialPort.list()
      this.pathOptions = resp.result
    },
    async send() {
      if (this.sendInput != null && this.sendInput.length) {
        const sendBytes = Array.from(this.sendInput).map(char => char.charCodeAt(0));
        const resp = await SerialPort.write({
          path: this.path,
          value: sendBytes
        })
        if (resp.result == sendBytes.length) {
          this.$notify({ type: "positive", message: '写入成功' })
        }
      }
    },
    onSerialPortDataReceived(resp) {
      if (resp.path == this.path) {
        this.receivedBytes.push(...resp.data)
      }
    }
  }

}
</script>

<style></style>
