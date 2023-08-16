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
import { supabase } from '~/plugins/supabase';

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
      const { user, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
      });

      if (error) {
        this.errorMessage = error.message;
        console.error('Error registering:', error.message);
      } else {
        console.log('Registration successful:', user);
        // Optionally, you can redirect the user to another page after successful registration
        // this.$router.push('/dashboard');
      }
    }
  }
};
</script>
