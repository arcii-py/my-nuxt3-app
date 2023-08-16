<template>
    <div class="login-container">
      <h2>Login</h2>
      <!-- Google Sign-In Button -->
      <div class="g-signin2" data-onsuccess="onSignIn"></div>
      <!-- Regular Login Form (Optional) -->
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      onSignIn(googleUser) {
        const profile = googleUser.getBasicProfile();
        // Handle Google login logic here
      },
      login() {
        // Handle regular login logic here
      }
    }
  }
  </script>
  