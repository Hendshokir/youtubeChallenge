<template>
  <section class="search-result">
    <div v-if="getSearchLoading" class="d-flex flex-column align-items-center py-5">
      <!-- <span class="fas fa-spinner mb-3"></span> -->
      <span>Loading</span>
    </div><!-- End Search Loading-->
    <div v-if="!getSearchLoading && getSearchResult !== ''" class="container">
      <div v-for="item in getSearchResult" :key="item.etag">
        <div v-if="item.id.kind === 'youtube#channel'">
          <channel-card :channelItem="item" class="my-3"/>
        </div>

        <div v-else-if="item.id.kind === 'youtube#video'">
          <video-card :videoItem="item" class="my-3"/>
        </div>
      </div>
    </div><!-- End Search Result-->

    <!-- TODO to fix this bug -->
    <div v-if="!getSearchRequestStatus && getSearchResult === ''" class="no-result d-flex flex-column align-items-center py-5">
      <span class="size-20"> No results found </span>
    </div><!--End No Result-->
  </section>
</template>


<script>
import {mapGetters} from 'vuex'
import ChannelCard from './ChannelCard.vue'
import VideoCard from './VideoCard.vue'

export default {
  name: 'search-result',
  components: {
    ChannelCard,
    VideoCard
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
}
</style>
