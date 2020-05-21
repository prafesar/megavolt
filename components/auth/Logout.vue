<template>

<div>

    <v-btn @click.prevent="login" v-if="!user" text >
      <v-icon left>mdi-login</v-icon>LogIn
    </v-btn>
    <v-btn @click.prevent="logout" v-else text >
      <v-icon left>mdi-logout</v-icon>LogOut
    </v-btn>

</div>

</template>

<script>

import Auth from '@/firebase/auth';

export default {
  data() {
    return {
      user: null,

    };
  },
  created() {
    Auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logout() {
      Auth.signOut().then(() => {
        Auth.onAuthStateChanged(() => {
          this.$router.push('/');
        });
      });
    },
    login() {
      this.$router.push('/login')
    },
  },
}
</script>

<style>

</style>