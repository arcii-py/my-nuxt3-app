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
import { supabase } from '~/plugins/supabase';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      loading: false
    };
  },
  methods: {
    async login() {
      this.loading = true; // Start loading

      const { user, error } = await supabase.auth.signIn({
        email: this.email,
        password: this.password,
      });

      this.loading = false; // End loading

      if (error) {
        this.error = error.message;
        console.error('Error logging in:', error.message);
      } else {
        console.log('Login successful:', user);
        this.$router.push('/'); // Redirect to home or dashboard
      }
    }
  }
};
</script>
