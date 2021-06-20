<template>
  <div class="q-pa-md">
    <div class="" style="width: 100%; max-width: 400px">
      <q-item class="q-mb-sm">
        <div class="">
          <q-item-section class="">
           <div class="flex row">
                <div class="q-mr-md">
                  <q-avatar>
                  <img :src="comment.author.image.url">
                  </q-avatar>
                </div>
                <div>
                  <q-item-label class="text-bold">{{ comment.author.username }}</q-item-label>
                  <q-item-label class="black">{{ comment.caption }}</q-item-label>
                </div>
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
