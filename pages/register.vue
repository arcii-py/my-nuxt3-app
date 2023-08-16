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
      async onSignIn(googleUser) {
        const id_token = googleUser.getAuthResponse().id_token;
  
        try {
          const response = await fetch("/.netlify/functions/verify-google-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ id_token })
          });
  
          const data = await response.json();
  
          if (data.success) {
            // Handle successful login, e.g., redirecting to a dashboard or setting a user state
            console.log("User data:", data.user);
          } else {
            console.error("Error:", data.error);
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      },
      login() {
        // Handle regular login logic here
      }
    }
  };
  </script>
  