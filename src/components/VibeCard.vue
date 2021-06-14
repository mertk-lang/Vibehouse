 <template>
   <div>
     <q-card class="my-card q-my-lg" flat bordered>
       <q-item>
          <q-item-section avatar>
           <q-avatar>
            <img src="https://i.pinimg.com/originals/55/55/87/555587aa4cd4a2822dc7a06e70ca998f.jpg">
           </q-avatar>
           </q-item-section>

          <q-item-section>
           <q-item-label class="text-bold">{{ vibe.author.username }}</q-item-label>
           <q-item-label caption>
            {{vibe.location}}
           </q-item-label>
          </q-item-section>
           <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section @click="deleteVibe(vibe._id)">Delete</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
        </q-item>

          <q-separator />
      <q-img
        v-bind:src="vibe.image.url"
      />
      <q-card-section class="">
        <div class="text-overline text-orange-9">{{ vibe.location }}</div>
        <div class="text-caption text-grey">
          {{ vibe.caption }}
        </div>
        <q-btn @click="toggleComments" class="large-screen text-grey-10 q-mr-md" flat round color="primary" size="14px" icon="eva-message-square-outline" dense/>
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
         comments: '',
         credentials: {
           vibe: this.vibe,
           comment: ''
         }
       }
     },
     computed: {
       ...mapGetters('vibe', ['getVibes']),
       ...mapGetters('comment', ['getComments']),
    
     },
     methods: {
       ...mapActions(
         'comment', ['fetchComments']
       ),

       deleteVibe(id, vibe) {
          let url = `http://localhost:4000/posts/delete/${id}`;
          this.axios.delete(url).then(() => {
          this.getVibes.splice(this.getVibes.indexOf(vibe), 1);
      });
       },
       toggleComments() {
         this.showComments = !this.showComments
         axios.get(`http://localhost:4000/posts/${this.vibe._id}/comments`, {
          headers: {
            authorization: `Bearer ${localStorage.token}`
          } 
        })
        .then((res) => {
          this.comments = res.data
        })
       },
       submit() {
        axios.post(`http://localhost:4000/posts/${this.credentials.vibe._id}/comments/new`, this.credentials, {
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
   }
 </script>

 <style lang="sass">

 </style>
