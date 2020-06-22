<template>
  <div class="playlist-details">
    <main-header />
    <section class="playlist-videos container mt-2 p-2 bg-white">
      <div v-for="item in playlistItems" :key="item.id">
        <video-card :videoItem="item" class="mb-2"/>
      </div>
    </section><!--End Channel Videos-->
  </div>
</template>


<script>
// @ is an alias to /src
import mainHeader from '@/components/Header.vue'
import VideoCard from '@/components/VideoCard.vue'
export default {
  name: 'PlaylistDetails',
  components: {
    mainHeader,
    VideoCard
  },
  data() {
    return {
      playlistItems: []
    }
  },
  medthods: {
  },
  mounted() {
    const path = this.$route.path
    const playlistId = path?.split('/')[2]
    const playlistURL = `${this.$BASE_URL}playlistItems?part=snippet,contentDetails&key=${this.$API_KEY}&playlistId=${playlistId}`;
    this.axios.get(playlistURL)
    .then(response => {
      this.playlistItems = response?.data?.items
    })
  }
}
</script>
<style lang="scss" scoped >
@import 'src/assets/styles/styles.scss';

</style>