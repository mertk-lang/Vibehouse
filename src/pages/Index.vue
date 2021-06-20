<template>
  <q-page class="container">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="!this.loading">
          <VibeCard v-for="(vibe, key) in getVibes"
              :key="vibe.id"
              :vibe="vibe"
              :id="key"></VibeCard>
        </template>
        <template v-else>
          <Skeleton></Skeleton>
        </template>
      </div>
      <div class="col-4">
    <q-item class="fixed q-py-lg">
        <q-item-section avatar>
          <q-avatar size="60px">
            <img v-bind:src="getUser.image.url">
          </q-avatar>
        </q-item-section>



          <q-item-section v-if="!this.$q.dark.isActive">
            <q-item-label class="text-dark">
              {{ getUser.username }}
              <q-btn @click="nullifyToken()" flat rounded style="color: #0a0078" label="Sign Out" />
            </q-item-label>
          </q-item-section>
        <q-item-section v-if="this.$q.dark.isActive">
          <q-item-label class="text-white">
            {{ getUser.username }}
            <q-btn @click="nullifyToken()" flat style="color: #7653a3" label="Sign Out" />
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
import Avatar from '../components/Avatar.vue';
import Skeleton from '../components/Skeleton.vue';
export default {
  name: 'PageIndex',
  data () {
    return {
      loading: false
    }
  },
  created() {
    this.loading = true
    this.fetchVibes()
    this.loading = false
  },
  components: {
   VibeCard,
   Skeleton
  },
  computed: {
    ...mapGetters('vibe', ['getVibes']),
    ...mapGetters('user', ['getUser']),
  },
  methods: {
    ...mapActions('vibe', ['fetchVibes']),
    ...mapActions('user', ['signOut']),

    nullifyToken() {
      this.signOut()
      .then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
