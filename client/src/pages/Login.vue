<template>
 <q-page>
   <div class="q-pa-md flex flex-center">
       <LoginForm class="col self-center"></LoginForm>
   </div>
 </q-page>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
export default {
  components: {
    LoginForm
  },
  created() {

  },
  methods: {

  }
 }
</script>


<style lang="sass">
  a
   text-decoration: none

</style>
