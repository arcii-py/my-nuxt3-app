<template>
    <div>
      <h1>Login</h1>
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button :disabled="loading" @click="login">Login</button>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        loading: false,
        error: null,
      };
    },
    methods: {
      async login() {
        this.loading = true;
        this.error = null;
        try {
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password,
            },
          });
          this.$router.push('/');
        } catch (error) {
          console.error('An error occurred:', error);
          this.error = error.message || 'An error occurred during login.';
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  