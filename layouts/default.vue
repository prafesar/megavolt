<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        
        fluid
      >
        <v-row
          align="start"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-app-bar app primary>
              <v-toolbar-title>
                MegaVolt
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <logout></logout>
           
            </v-app-bar>
            
            <nuxt v-if="user" />
            <div v-else>
              <v-card>
                <v-card-text>Для  пользования сайтом необходима регистрация</v-card-text>
              </v-card>
              <log-in></log-in>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Logout from '~/components/auth/Logout';
import LogIn from '~/components/auth/LogIn';
import auth from '~/firebase/auth';

export default {
  components: {
    Logout, LogIn
  },
  data() {
    return {
      user: null,

    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
}
</script>