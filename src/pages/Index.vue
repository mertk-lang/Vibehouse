<template>
  <q-page class="flex flex-center">
    <VibeCard v-for="(vibe, key) in getVibes"
              :key="key"
              :vibe="vibe"
              :id="key"></VibeCard>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VibeCard from '../components/VibeCard.vue'
export default {
  name: 'PageIndex',
  created() {
    this.fetchVibes();
  },
  components: {
   VibeCard
  },
  computed: {
    ...mapGetters('vibe', ['getVibes'])
  },
  methods: {
    ...mapActions('vibe', ['fetchVibes'])
  }
}
</script>
