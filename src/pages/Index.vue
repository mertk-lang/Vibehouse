<template>
  <q-page class="container">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <VibeCard v-for="(vibe, key) in getVibes"
              :key="vibe.id"
              :vibe="vibe"
              :id="key"></VibeCard>
      </div>
      <div class="col-4">
    <q-item class="fixed q-py-lg">
        <q-item-section avatar>
          <q-avatar size="50px">
            <img src="https://i.pinimg.com/originals/55/55/87/555587aa4cd4a2822dc7a06e70ca998f.jpg">
          </q-avatar>
        </q-item-section>



        <q-item-section>
          <q-item-label caption>
            {{ getUser.username }}
          </q-item-label>
        </q-item-section>
      </q-item>
  </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VibeCard from '../components/VibeCard.vue';
export default {
  name: 'PageIndex',
  created() {
    this.fetchVibes();
  },
  components: {
   VibeCard,
  },
  computed: {
    ...mapGetters('vibe', ['getVibes']),
    ...mapGetters('user', ['getUser']),
  },
  methods: {
    ...mapActions('vibe', ['fetchVibes'])
  }
}
</script>
