<template>
  <div class="">
    <q-form
      @submit.prevent="submit"
      class="q-gutter-md"
    >
    <q-input v-model="credentials.comment" class="q-mt-md" color="purple-12" label="Vibe your toughts" dense />
    </q-form>
  </div>
</template>

<script>
import axios from 'axios';

import { mapActions } from 'vuex';
export default {
  data() {
    return {
      credentials: {
        comment: '',
        vibe: this.vibe,
        errorMessage: ''
      }
    }
  },
  props: [
    'vibe'
  ],
  methods: {
    ...mapActions('comment', ['createComment']),
    ...mapActions('comment', ['fetchComment']),

    submit() {
      axios.post(`https://lit-citadel-51863.herokuapp.com/posts/${this.credentials.vibe._id}/comments/new`, this.credentials, {
    headers: {
      authorization: `Bearer ${localStorage.token}`
    }
  })
  .then(() => {
    this.credentials.comment = ''
  })
  .catch((err) => {
    console.log(err)
  })
    }
  }
}
</script>

<style lang="sass">

</style>
