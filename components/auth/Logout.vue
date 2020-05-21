<template>

<div>

    <v-btn @click.prevent="login" v-if="!user">LogIn</v-btn>
    <v-btn @click.prevent="logout" v-else>LogOut</v-btn>

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