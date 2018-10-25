<template>
    <div class="container">
        <!-- <img src="" alt=""> -->
        <p>Title: </p>
        <p>description:</p>
        <p>{{this.$route.params.id}}</p>
    </div>
</template>

<script>
export default {
    name: 'DetailVideo',
    props: [],
    methods: {
        getDetail(){
            console.log('masuk');
            axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDPOF3F_1zxIxLJbRQLUvHgM0vrZEIIuGE&part=snippet&channelId=${this.$route.params.id}`)
            .then(response => {
                console.log(response.data);
                
            })
            .catch(err => {
                console.log(err.response)
            })
            },
            getData(){
                let obj = this.$route.params
            }
        },
        created() {
            // console.log(this.data);
            
            // this.getDetail()
        },
}
</script>

<style>

</style>
