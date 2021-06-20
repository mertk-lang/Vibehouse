<template>
  <q-layout view="lHh Lpr lFf">
     <q-header v-if="!this.$q.dark.isActive" class="bg-white text-grey-10" bordered>
      <q-toolbar class="container">
         <div class="flex row" v-if="this.getUser">
          <q-avatar>
            <img class="small-screen" v-bind:src="getUser.image.url">
          </q-avatar>
          <q-btn @click="signUserOut()" text-color="#1b0275" class="small-screen q-ml-md" flat round color="primary" size="18px" icon="eva-log-out-outline" dense/>
         </div>
        <q-btn class="large-screen text-grey-10 q-ml-md" to="/" flat round color="primary" size="18px" icon="eva-home-outline" dense/>
        <q-separator  inset />
        <q-toolbar-title class="text-permanent text-bold">
          Vibehouse
        </q-toolbar-title>
        <q-btn class="large-screen text-grey-10 q-mr-md" to="/vibe" flat round color="primary" size="18px" icon="eva-camera-outline" dense/>
        <q-btn @click="toggleDarkMode" class="text-grey-10 q-mr-md" flat round color="primary" size="18px" icon="eva-moon-outline" dense/>
      </q-toolbar>
    </q-header>

    <q-header v-if="this.$q.dark.isActive" class="bg-dark text-white" bordered>
      <q-toolbar class="container">
        <div v-if="this.getUser" class="flex row">
          <q-avatar>
            <img class="small-screen" v-bind:src="getUser.image.url">
          </q-avatar>
          <q-btn @click="signUserOut()" class="small-screen text-white q-ml-md" flat round color="primary" size="18px" icon="eva-log-out-outline" dense/>
        </div>
        <q-btn class="large-screen text-white q-ml-md" to="/" flat round color="primary" size="18px" icon="eva-home-outline" dense/>
        <q-separator  inset />
        <q-toolbar-title class="text-permanent text-bold">
          Vibehouse
        </q-toolbar-title>
        <q-btn class="large-screen text-white q-mr-md" to="/vibe" flat round color="primary" size="18px" icon="eva-camera-outline" dense/>
        <q-btn @click="toggleDarkMode" class=" text-white q-mr-md" flat round color="primary" size="18px" icon="eva-moon-outline" dense/>
      </q-toolbar>
    </q-header>

    <q-footer v-if="!this.$q.dark.isActive" class="bg-white small-screen" bordered>
      <q-tabs class="text-grey-10" active-color="primary" indicator-color="transparent">
        <q-route-tab to="/"  icon="eva-home-outline"  />
        <q-route-tab to="/vibe"  icon="eva-camera-outline"  />
      </q-tabs>
    </q-footer>

    <q-footer v-if="this.$q.dark.isActive" class="bg-dark small-screen" bordered>
     <q-tabs class="text-white" active-color="deep-purple-7" indicator-color="transparent">
        <q-route-tab to="/"  icon="eva-home-outline"  />
        <q-route-tab to="/vibe"  icon="eva-camera-outline"  />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainLayout',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters('user', ['getUser'])
  },
  methods: {
    ...mapActions('user', ['signOut']),

    toggleDarkMode() {
      this.$q.dark.toggle()
    },

    signUserOut() {
      this.signOut()
      .then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="sass">
   .q-toolbar__title
    font-size: 25px
    @media (max-width: $breakpoint-xs-max)
     text-align: center

    .q-footer
    .q-tab__icon
      font-size: 30px
</style>
