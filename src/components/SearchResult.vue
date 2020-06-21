<template>
  <section class="search-result">
    <div v-if="getSearchLoading" class="d-flex flex-column align-items-center py-5">
      <img class="mb-3 loading" src="../assets/images/loading.gif">
      <span>Loading</span>
    </div><!-- End Search Loading-->
    <div v-if="!getSearchLoading && getSearchResult !== ''" class="container p-1">
      <div v-for="item in getSearchResult" :key="item.etag">
        <div v-if="item.id.kind === 'youtube#channel'">
          <channel-card :channelItem="item" class="my-3"/>
        </div>

        <div v-else-if="item.id.kind === 'youtube#video'">
          <video-card :videoItem="item" class="my-3"/>
        </div>
        <div v-else-if="item.id.kind === 'youtube#playlist'">
          <playlist-card :playlistItem="item" class="my-3"/>
        </div>
      </div>
    </div><!-- End Search Result-->

    <div v-if="!getSearchRequestStatus" class="no-result d-flex flex-column align-items-center py-5">
      <img class="mb-3 loading" src="../assets/images/not-found.svg">
      <span class="size-20"> No results found </span>
    </div><!--End No Result-->
  </section>
</template>


<script>
import {mapGetters} from 'vuex'
import ChannelCard from './ChannelCard.vue'
import VideoCard from './VideoCard.vue'
import PlaylistCard from './PlaylistCard.vue'

export default {
  name: 'search-result',
  components: {
    ChannelCard,
    VideoCard,
    PlaylistCard
  },
  computed: {
    ...mapGetters(['getSearchKey','getSearchLoading','getSearchResult','getSearchRequestStatus']),
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/styles.scss';

.search-result {
   @media(max-width: 776px) {
    background-color: $white;
  }

  .loading {
    width: 30px;
  }
}
</style>
