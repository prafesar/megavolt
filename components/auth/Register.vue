<template>
<v-card class="elevation-12">
  <v-toolbar
    color="primary"
    dark
    flat
  >
    <v-toolbar-title>Регистрация</v-toolbar-title>
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
        type="email"
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        type="password"
      ></v-text-field>

      <v-text-field
        v-model="confirmPassword"
        label="Confirm Password"
        type="password"
      ></v-text-field>

    </v-form>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
      @click="submit"
      color="primary">Зарегистрироваться</v-btn>
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
      confirmPassword: '',
      errors: [],
    };
  },
  methods: {
    submit(event) {
      this.errors = [];
      if (!validate.email(this.email)) {
        this.errors.push('Please enter a valid email address');
      }
      // if (!validate.password(this.password)) {
      //   this.errors.push('Your password is not strong enough!');
      // }
      if (this.password !== this.confirmPassword) {
        this.errors.push('Password do not match');
      }

      if (!this.errors.length) {
        event.target.classList.add('was-validated');
        Auth.createUserWithEmailAndPassword(this.email, this.password)
          .then((created) => {
            created.user.sendEmailVerification().then(() => {
              this.$router.push('/user/profile');
            });
          }).catch((error) => {
            this.errors.push(error.message);
          });
      }
    },
  },
}
</script>
<style>

</style>