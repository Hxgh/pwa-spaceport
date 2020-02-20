<template>
  <button @click="handleLogin">登录</button>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  mounted() {
    this.stopBack()
  },
  methods: {
    ...mapActions(['login']),
    handleLogin() {
      this.login({ login: 'login' }).then(() => {
        this.$router.push({ name: 'home' })
      })
    },
    stopBack() {
      //防止页面后退
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', () => {
        history.pushState(null, null, document.URL)
      })
    }
  }
}
</script>
