<template>
  <div class="q-pa-md">
    <div class="" style="width: 100%; max-width: 400px">
      <q-item class="q-mb-sm">
        <div class="">
          <q-item-section class="">
           <div class="">
                <q-item-label>{{ comment.author.username }}</q-item-label>
                <q-item-label caption class="black">{{ comment.caption }}</q-item-label>
            </div>
          </q-item-section>
        </div>
      </q-item>
    </div>
  </div>
</template>

<script>
export default{
  components: {

  },
  data () {
    return {
    }
  },
  props: [
    'comment'
  ]
}
</script>

<style lang="sass">

</style>
