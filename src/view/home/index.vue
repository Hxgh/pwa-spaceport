<template>
  <button @click="handle">退出</button>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Logout',
  methods: {
    ...mapActions(['logout']),
    handle() {
      this.logout()
    }
  }
}
</script>
