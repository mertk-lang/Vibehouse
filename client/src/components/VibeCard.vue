 <template>
   <div>
     <q-card class="my-card q-my-lg" flat bordered>
       <q-item>
          <q-item-section avatar>
           <q-avatar>
            <img :src="vibe.author.image.url">
           </q-avatar>
           </q-item-section>

          <q-item-section>
           <q-item-label class="text-bold">{{ vibe.author.username }}</q-item-label>
           <q-item-label caption>
            {{vibe.location}}
           </q-item-label>
          </q-item-section>
           <q-btn v-if="vibe.author.username === getUser.username" color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section @click="deleteVibe()">Delete</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
        </q-item>

          <q-separator />
      <img
        v-bind:src="vibe.image.url"
      />
      <q-card-section class="">

        <div class="q-mb-sm text-weight-regular">
          {{ vibe.caption }}
        </div>
        <div class="q-mb-sm text-subtitle2 text-grey-7">
          {{vibe.date | convertDate}}
          </div>
        <q-btn v-if="!this.$q.dark.isActive"  @click="toggleComments" class="text-grey-10 q-mr-md" flat round color="primary" size="14px" icon="eva-message-circle-outline" dense/>
        <q-btn v-if="this.$q.dark.isActive" @click="toggleComments" class="text-white q-mr-md" flat round color="primary" size="14px" icon="eva-message-circle-outline" dense/>
      </q-card-section>
      <q-card-section v-if="showComments">
        <Comment v-for="comment in comments"
                 :key="comment._id"
                 :comment="comment">
        </Comment>
        <q-form
          @submit.prevent="submit"
          class="q-gutter-md"
        >
        <q-input v-model="credentials.comment" class="q-mt-md" color="purple-12" label="Vibe your toughts" dense />
       </q-form>
      </q-card-section>

    </q-card>


   </div>
 </template>

 <script>
  import { date } from 'quasar'

  import axios from 'axios';

   import Comment from '../components/Comment.vue'

   import { mapGetters, mapActions } from 'vuex'
   export default {
     components: {
       Comment,
     },
     props: [
      'vibe', 'id'
     ],
     data () {
       return {
         showComments: false,
         comments: {},
         credentials: {
           vibe: this.vibe,
           comment: ''
         }
       }
     },
     computed: {
       ...mapGetters('vibe', ['getVibes']),
       ...mapGetters('user', ['getUser']),
       ...mapGetters('comment', ['getComments']),

     },
     methods: {
       ...mapActions(
         'comment', ['fetchComments']
       ),

       deleteVibe(id) {
          let url = `https://vibehouse-backend.herokuapp.com/posts/${this.vibe._id}/delete`;
          axios.delete(url).then(() => {
            this.$q.notify({
          message: 'Vibe successfully removed',
          color: 'negative',
          actions: [
            { label: 'Dismiss', color: 'white',}
          ]
          })
          this.getVibes.splice(this.getVibes.indexOf(this.vibe), 1);
      });
       },
       toggleComments() {
         this.showComments = !this.showComments
         axios.get(`https://vibehouse-backend.herokuapp.com/posts/${this.vibe._id}/comments`, {
          headers: {
            authorization: `Bearer ${localStorage.token}`
          }
        })
        .then((res) => {
          this.comments = res.data
        })
       },
       submit() {
        axios.post(`https://vibehouse-backend.herokuapp.com/posts/${this.vibe._id}/comments/new`, this.credentials, {
        headers: {
          authorization: `Bearer ${localStorage.token}`
        }
       })
        .then((response) => {
            this.comments.push(response.data)
            this.credentials.comment = ''
        })
        .catch((err) => {
        console.log(err)
        })
       }
     },
      filters: {
        convertDate(value) {
          return date.formatDate(value, 'MMMM D h:mmA')
        }
      },
   }
 </script>

 <style lang="sass">

 </style>
