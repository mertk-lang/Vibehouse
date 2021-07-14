<template>
 <div class="q-pa-md" style="max-width: 400px">
    <q-banner v-if="this.getError" dense inline-actions class="text-white bg-red q-my-lg">
      {{ getError }}
    </q-banner>
    <q-form
      @submit.prevent="submit"
      class="q-gutter-md"
    >
      <q-input
        v-model="form.username"
        label="username"
      />

      <q-input
        v-model="form.password"
        label="password"
        type="password"
      />

      <div class="row justify-center">
        <q-btn class="q-mt-lg" q-mx-md label="Login" type="submit" color="deep-purple-10"/>
      </div>
    </q-form>
    <div class="row justify-center q-mt-lg">
        <q-btn @click="nullifyError" to="/register" class="q-mt-lg" q-mx-md label="Sign Up" type="button" color="blue"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    }
  },
  computed: {
    ...mapGetters('user', ['getError'])
  },
  created() {

  },
  methods: {
    ...mapActions('user', ['authenticateUser']),
    ...mapActions('user', ['emptyError']),

    submit() {
       this.$q.loading.show()
       this.authenticateUser(this.form).then(() => {
         this.$q.loading.hide()
        this.$router.push('/')
      })
    },

    nullifyError() {
      this.emptyError();
    }
    }

}
</script>

<style lang="sass">

</style>
