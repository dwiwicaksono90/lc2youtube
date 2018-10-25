<template>
    <div class="container" style="border:1px solid grey; min-height:50px; margin:5px;">
        <table>
            <tr>
                <td>
                    <img :src="video.snippet.thumbnails.default.url">
                </td>
                <td>
                    
                    <!-- <p>{{video.snippet.channelTitle}}</p> -->
                    <router-link :data="video" :to="{ path: `/${video.snippet.channelId}`}">
                    <p>Title: {{video.snippet.title}}</p>
                    </router-link>
                    <button class="btn btn-primary" v-if="!like" @click="getLike">Like</button>
                    <button class="btn btn-primary" v-if="like" @click="getLike">Unlike</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'List',
    props: ['video'],
    data(){
        return{
            like: false
        }
    },
    methods: {
        getLike(){
            this.like = !this.like
        }
    }
}
</script>

<style>

</style>
