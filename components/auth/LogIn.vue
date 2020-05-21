<template>
<v-card class="elevation-12">
  <v-toolbar
    color="primary"
    dark
    flat
  >
    <v-toolbar-title>Вход</v-toolbar-title>
  </v-toolbar>
  
  <v-card-text>
    <v-card>
      <v-card-text v-for="error in errors" :key="error">
        {{error}}
      </v-card-text>
    </v-card>
   
    <v-form>
      <v-text-field
        v-model="email"
        label="Email"
        name="email"
        type="email"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        name="password"
        type="password"
        required
      ></v-text-field>

    </v-form>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn @click="login" class="primary">Войти</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
import Auth from '@/firebase/auth';
import validate from '../services/validation-module';

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: [],
    };
  },
  methods: {
    login(event) {
      this.errors = [];
      if (!validate.email(this.email)) {
        this.errors.push('Please enter a valid email address');
        
      }
      if (!this.errors.length) {
        event.target.classList.add('was-validated');
        Auth.signInWithEmailAndPassword(this.email, this.password)
          .then(() => this.$router.push('/dashboard'))
          .catch(err => this.errors.push(err.message));
      }
    },
  },
}
</script>
<style>

</style>