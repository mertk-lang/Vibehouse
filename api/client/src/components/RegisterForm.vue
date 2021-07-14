<template>
 <div class="q-pa-md" style="max-width: 400px">
    <q-banner v-if="this.getError" dense inline-actions class="text-white bg-red q-my-lg">
      {{ getError }}
    </q-banner>
     <q-form
      @submit.prevent="signUser"
      class="q-gutter-md"
    >
      <Avatar @input="getFile" v-model="form.avatar"></Avatar>
      <q-input
        v-model="form.username"
        label="username"
      />

      <q-input
        type="password"
        v-model="form.password"
        label="password"
      />

      <div class="row justify-center">
        <q-btn class="q-mt-lg" label="Sign Up" type="submit" color="deep-purple-10"/>
      </div>
    </q-form>

    <div class="row justify-center q-mt-lg"> 
        <q-btn @click="nullifyError" to="/login" class="q-mt-lg" q-mx-md label="Login" type="button" color="blue"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Avatar from './Avatar.vue'

export default {
  components: {
    Avatar
  },
  data() {
    return {
      form: {
        
      },
    }
  },
  computed: {
    ...mapGetters('user', ['getError']),
  },
  created() {

  },
  methods: {
    ...mapActions('user', ['signNewUser']),
    ...mapActions('user', ['emptyError']),

    signUser() {
      this.$q.loading.show();
      
      this.signNewUser(this.form)
      .then(() => {
        this.$q.loading.hide();
      })
    }
   ,

   getFile(file) {
     this.form.avatar = file
   },

    nullifyError() {
      this.emptyError();
    }
    }

}
</script>

<style lang="sass">
  a
   text-decoration: none
</style>
