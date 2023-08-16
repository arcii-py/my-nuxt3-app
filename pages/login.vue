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
        error: null,
        loading: false,
      };
    },
    methods: {
      async login() {
        this.loading = true;
        const { user, error } = await this.$supabase.auth.signIn({
          email: this.email,
          password: this.password,
        });
        this.loading = false;
  
        if (error) {
          console.error('Error logging in:', error.message);
          this.error = error.message;
        } else {
          console.log('Login successful:', user);
          this.$router.push('/'); // Redirect to home or dashboard
        }
      },
    },
  };
  </script>
  