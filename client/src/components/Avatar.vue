<template>
    <div>
        <input type="file" accept="image/*" class="hidden" ref="file" @change="change">
        <div class="img-container">
            <q-img
            :src=src
            placeholder-src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
            spinner-color="white"
            style="height: 140px; max-width: 150px"
            />
            <div class="btn-container">
                <q-btn @click="browse()" class="text-white q-mr-md" flat round color="white" size="18px" icon="eva-image-outline" dense/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: File
        },
        data() {
            return {
                src: null,
                file: null
            }
        },
        methods: {
            browse() {
                this.$refs.file.click();
            },
            
            change(e) {
                this.file = e.target.files[0]
                this.$emit('input', this.file);
                let reader = new FileReader();
                reader.readAsDataURL(this.file);
                reader.onload = (e) => {
                    this.src = e.target.result
                }
            }
        }
    }
</script>

<style lang="sass">
    .q-img
        border-radius: 80px
        object-fit: cover
        opacity: 0.7

    .btn-container 
         right: 18.30em
         top: 4em
         display: block
         position: absolute        

    .img-container
         position: relative
         left: 8em
    
</style>