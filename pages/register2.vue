<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { supabase } from '~/services/supabase';
  
  const email = ref('');
  const password = ref('');
  
  const registerUser = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
      });
  
      if (error) {
        console.error('Error registering user:', error.message);
      } else {
        console.log('User registered successfully:', user);
        // You might want to navigate to a different page after successful registration
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error.message);
    }
  };
  </script>
  