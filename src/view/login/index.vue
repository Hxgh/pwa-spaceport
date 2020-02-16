<template>
  <button @click="handleLogin">登录</button>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  methods: {
    ...mapActions(['login']),
    handleLogin() {
      this.login({}).then(r => {
        console.log(r)
      })
    }
  }
}
</script>
