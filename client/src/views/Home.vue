<template>
  <div class="container">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="inputSearch">
    <button class="btn btn-outline-success my-2 my-sm-0" @click="search">Search</button>
    <div class="row">
      
      <div class="col-sm-5" style="border:1px solid grey; min-height:50px;">

        <List v-for="(video,index) in listVideos" :key="index" :video="video"></List>

      </div>
      <div class="col-sm-6" style="border:1px solid grey; min-height:50px;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import List from '@/components/List.vue'
export default {
  name: 'home',
  components: {
    List
  },
  data(){
    return {
      inputSearch: '',
      listVideos: []
    }
  },
  created(){
    this.search()
  },
  methods: {
    search(){
      let self = this
      axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDPOF3F_1zxIxLJbRQLUvHgM0vrZEIIuGE&part=snippet&maxResults=10&q=${self.inputSearch}`)
          .then(response => {
            console.log(response.data.items)
            this.listVideos = response.data.items
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
}
</script>
