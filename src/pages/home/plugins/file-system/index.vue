<template>
  <div>
    <p>文件路径: {{ path }}</p>
    <p>文件总大小: {{ totalLength }}</p>
    <p>已下载大小: {{ downloadedLength }}</p>
    <p>下载状态: {{ downloadStatus }}</p>
    <q-btn @click="download">下载</q-btn>
    <q-btn @click="length">文件大小</q-btn>
  </div>
</template>

<script>

import { FileSystem } from '@/api/app-plugin';

export default {
  name: "FileSystem",
  data() {
    return {
      path: "",
      totalLength: 0,
      downloadedLength: 0,
      downloadStatus: ""
    }
  },
  mounted() {
    FileSystem.addListener("onProgressChange", this.onProgressChange)
  },
  methods: {
    async download() {
      const resp = await FileSystem.download(
        {
          url: "https://search-operate.cdn.bcebos.com/4466f881476a1ee804b4a32aee790675.gif",
          progress: true
        }
      )
      this.path = resp.downloadFilePath
    },
    async length() {
      const resp = await FileSystem.length({ path: this.path })
      this.totalLength = resp.length
    },
    onProgressChange(resp) {
      this.totalLength = resp.totalLength
      this.downloadedLength = resp.currentLength

      if (resp.finished) {
        if (resp.success) {
          this.downloadStatus = "下载成功"
        } else {
          this.downloadStatus = "下载失败"
        }
      } else {
        this.downloadStatus = "下载中"
      }
    }
  }
}
</script>

<style></style>
