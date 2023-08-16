<template>
    <div>
      <form @submit.prevent="register">
        <input v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async register() {
        try {
          const response = await this.$http.$post('/.netlify/functions/register', {
            email: this.email,
            password: this.password
          });
  
          // Handle successful registration, e.g., redirect to login or dashboard
          this.$router.push('/login');
        } catch (error) {
          // Handle errors, e.g., show an error message
          this.errorMessage = error.response.data.message || 'Registration failed';
        }
      }
    }
  };
  </script>
  