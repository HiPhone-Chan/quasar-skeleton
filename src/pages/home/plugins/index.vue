<template>
  <div>
    <q-list>
      <q-item clickable v-ripple v-for="item in list" :key="item.index" @click="navigateTo(item.path)">
        <q-item-section>{{ item.title }}</q-item-section>
        <q-item-section avatar>
          <q-icon name="navigate_next" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'PluginsIndex',
  data() {
    return {
      list: [
        {
          title: "文件",
          path: "/plugins/file-system"
        }, {
          title: "串口",
          path: "/plugins/serial-port"
        }, {
          title: "应用",
          path: "/plugins/app"
        }
      ]
    }
  },
  methods: {
    navigateTo(page) {
      this.$router.push({ path: page })
    }
  }
}
</script>

<style></style>
