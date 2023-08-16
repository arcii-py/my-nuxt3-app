<template>
    <div>
      <h1>Login</h1>
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="login">Login</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      async login() {
        try {
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password,
            },
          })
          this.$router.push('/')
        } catch (error) {
          console.error('An error occurred:', error)
        }
      },
    },
  }
  </script>
  