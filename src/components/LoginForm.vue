<template>
    <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="submit"
      class="q-gutter-md"
    >
      <q-input
        v-model="form.username"
        label="username"
      />

      <q-input
        v-model="form.password"
        label="password"
      />

      <div class="relative-position">
        <q-btn class="absolute-center q-mt-lg" q-mx-md label="Submit" type="submit" color="deep-purple-10"/>
      </div>
    </q-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      }
    }
  },
  methods: {
    submit() {

    }
  }
}
</script>

<style lang="sass">

</style>
