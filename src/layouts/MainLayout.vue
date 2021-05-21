<template>
  <q-layout view="lHh Lpr lFf">
      <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="container">
        <q-btn class="large-screen text-grey-10 q-ml-md" to="/" flat round color="primary" size="18px" icon="eva-home-outline" dense/>
        <q-separator  inset />
        <q-toolbar-title class="text-permanent text-bold">
          Vibehouse
        </q-toolbar-title>
        <q-btn class="large-screen text-grey-10 q-mr-md" to="/vibe" flat round color="primary" size="18px" icon="eva-camera-outline" dense/>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {

    }
  }
}
</script>
