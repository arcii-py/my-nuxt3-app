<template>
    <div>
      <h1>Register</h1>
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="register">Register</button>
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
      async register() {
        try {
          await this.$http.post('/register', {
            email: this.email,
            password: this.password,
          })
          this.$router.push('/login')
        } catch (error) {
          console.error('An error occurred:', error)
        }
      },
    },
  }
  </script>
  