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
                <nuxt-link to="/">MegaVolt</nuxt-link>
              </v-toolbar-title>
              <v-spacer></v-spacer>
                <nuxt-link to='/cables'>КЛ</nuxt-link>
                <logout></logout>
           
            </v-app-bar>
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Logout from '@/components/auth/Logout';

export default {
  components: {
    Logout
  }
}
</script>