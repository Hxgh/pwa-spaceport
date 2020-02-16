<template>
  <div class="layout">
    <AppMain class="main"></AppMain>
  </div>
</template>
<script>
import AppMain from './components/AppMain.vue'
export default {
  name: 'Layout',
  components: {
    AppMain
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  position: relative;
  .main {
    flex: 1;
    box-sizing: border-box;
    overflow: auto;
  }
}
</style>