<template>
    <div class="register-container">
      <h2>Register</h2>
      
      <!-- Google Registration Button -->
      <div class="g-signin2" data-onsuccess="onGoogleRegister" :data-clientid="GOOGLE_CLIENT_ID"></div>
      
      <!-- Regular Registration Form -->
      <form @submit.prevent="register">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
    };
  },
  methods: {
    async onGoogleRegister(googleUser) {
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
          // TODO: Store the user data in FaunaDB (or another database) after successful Google registration
          console.log("Google registration successful:", data.user);
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    async register() {
      // TODO: Implement the logic for regular registration using email and password
    }
  }
};
</script>