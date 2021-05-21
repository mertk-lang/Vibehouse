 <template>
   <div>
     <q-card class="my-card" flat bordered>
      <q-img
        src="vibe.img"
      />
      <q-card-section>
        <div class="text-overline text-orange-9">{{ vibe.title }}</div>
        <div class="text-caption text-grey">
          {{ vibe.body }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="dark" label="Share" />
        <q-btn flat color="primary" label="Book" />
      </q-card-actions>
    </q-card>
   </div>
 </template>

 <script>
   export default {
     props: [
      'vibe', 'id'
     ],
   }
 </script>

 <style lang="sass">

 </style>
