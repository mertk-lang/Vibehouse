<template>
   <q-page class="container-2 q-pa-md">
    <div class="camera-frame q-pa-md">
      <video v-if="!imageCaptured" ref="video" class="full-width" autoplay/>
      <canvas
        v-show="imageCaptured"
        ref="canvas"
        class="full-width"
        height="240"
      />
    </div>
    <q-banner v-if="this.errorMessage" dense inline-actions class="text-white bg-red q-mt-lg q-pa-md">
      {{ errorMessage }}
    </q-banner>
    <div class="text-center q-pa-md">
      <q-btn v-if="hasCamera" @click="capturePhoto" :disable="imageCaptured" round color="grey-10" size="16px" icon="eva-camera" />
      <div class="row justify-center q-ma-md">
          <q-file @input="grabImage" accept=".jpg,.png,image/*" class="col col-sm-6" color="blue-10" v-model="imageUpload" label="Choose an image">
            <template v-slot:prepend>
              <q-icon name="eva-image" />
            </template>
          </q-file>
      </div>
      <div class="row justify-center q-ma-md">
        <q-input v-model="post.caption" class="col col-sm-6" label="Caption" dense/>
      </div>
      <div class="row justify-center q-ma-md">
        <q-input :loading="loadingState" v-model="post.location" class="col col-sm-6" label="Location" dense>
          <template v-slot:append>
            <q-btn v-if="!loadingState || locationSupport" @click="getLocation" round dense flat icon="place" />
          </template>
        </q-input>
      </div>
      <div class="row justify-center q-mt-lg">
        <q-btn :disable="!imageCaptured" @click="addPost()" unelevated rounded color="primary" label="Share" />
      </div>
    </div>
  </q-page>
</template>

<script>
  const url = `https://lit-citadel-51863.herokuapp.com/posts/add`;

  import { mapGetters, mapActions } from "vuex";

  require('md-gum-polyfill')

export default {
  name: 'Camera',
  data () {
    return {
      post: {
        caption: '',
        location: '',
        image: null,
        date: Date.now()
      },
      imageCaptured: false,
      imageUpload: [],
      hasCamera: true,
      errorMessage: '',
      loadingState: false
    }
  },
  computed: {
    ...mapGetters('user', ['getToken']),

    locationSupport() {
      if('geolocation' in navigator) return
      true
      return false
    }
  },
  methods: {
    initCamera() {
      navigator.mediaDevices.getUserMedia({
        video: true,
      })
      .then((stream) => {
        this.$refs.video.srcObject = stream;
      })
      .catch(() => {
        this.hasCamera = false;
      })
    },
    capturePhoto() {
     let video = this.$refs.video
     let canvas = this.$refs.canvas
     canvas.width = video.getBoundingClientRect().width
     canvas.height = video.getBoundingClientRect().height
     let context = canvas.getContext('2d')
     context.drawImage(video, 0, 0, canvas.width, canvas.height)
     this.imageCaptured = true
     this.post.image = this.dataURItoBlob(canvas.toDataUrl())
     this.disableCamera();
    },
    grabImage(file) {
      this.post.image = file
      let canvas = this.$refs.canvas
      let context = canvas.getContext('2d')
       var reader = new FileReader();
        reader.onload = (event) => {
        var img = new Image();
        img.onload = () =>{
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img,0,0);
            this.imageCaptured = true;
            this.disableCamera();
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach((track) => {
        track.stop();
      })
    },
    dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
     // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    // create a view into the buffer
    var ia = new Uint8Array(ab);
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
    },
    getLocation() {
      this.loadingState = true;
      navigator.geolocation.getCurrentPosition((position) => {
        this.getExactLocation(position);
      }, (error) => {
        this.errorMessage = error.message;
        this.loadingState = false;
      }, { timeout: 8000})
    },
    getExactLocation(position) {
      let apiUrl = `https://geocode.xyz/${ position.coords.latitude },${ position.coords.longitude }?json=1`
      this.$axios.get(apiUrl)
      .then((response) => {
        this.getLocationFromApi(response);
      }).catch((error) => {
        this.errorMessage = error.message;
        this.loadingState = false;
      })
    },
    getLocationFromApi(response) {
      this.post.location = response.data.city
      if(response.data.country) {
        this.post.location += `, ${ response.data.country }`
      }
      this.loadingState = false;
    },
    ...mapActions(
      'vibe', ['fetchVibes']
    ),
    addPost() {
      this.$q.loading.show()
      let fd = new FormData();
      fd.append('caption', this.post.caption)
      fd.append('date', this.post.date)
      fd.append('location', this.post.location)
      fd.append('image', this.post.image)
      this.$axios.post(url, fd, {
        headers: {
          authorization :  `Bearer ${localStorage.token}`
        }
      })
      .then((res) => {
        this.$router.push('/')
        this.$q.notify({
        message: 'Successful, redirecting...',
        color: 'positive',
        actions: [
          { label: 'Dismiss', color: 'white',}
        ]
        })
      this.$q.loading.hide()
      })
      .catch((err) => {
        console.log(err.response)
        this.errorMessage = 'Unable to create the vibe';
        this.$q.loading.hide()
      })
    }
  },
  mounted() {
    this.initCamera()
  },
  beforeDestroy() {
    if(this.hasCamera) {
      this.disableCamera();
    }
  }
  }
</script>

<style lang="sass">
   .camera-frame
    border: 2px solid $grey-10
    border-radius: 10px

</style>
