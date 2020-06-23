<template>
  <section class="search-result">
    <div v-if="getSearchLoading" class="d-flex flex-column align-items-center py-5">
      <img class="mb-3 icon" src="../assets/images/loading.gif" alt="Loading">
      <span>Loading</span>
    </div><!-- End Search Loading -->

    <filter-section v-if="!getSearchLoading && getSearchKey !== ''" />
    <!--End Filte --> 
    <div v-if="!getSearchLoading && getSearchResult !== ''" class="container p-1">      
      <div v-for="item in getSearchResult.items" :key="item.etag">
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

      <section class="load-more">
        <div pa class="mobile p-2">
          Show more items 
        </div> <!--End Mobile load more-->
        <div class="desktop">
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </div> <!--End Desktop load more-->
      </section> <!-- Load more-->

    </div><!-- End Search Result-->

    <div v-if="!getSearchRequestStatus" class="no-result d-flex flex-column align-items-center py-5">
      <img class="mb-3 icon" src="../assets/images/not-found.svg">
      <span class="size-20"> No results found </span>
    </div><!--End No Result-->
  </section>
</template>


<script>
import {mapGetters} from 'vuex'
import FilterSection from './FilterSection.vue'
import ChannelCard from './ChannelCard.vue'
import VideoCard from './VideoCard.vue'
import PlaylistCard from './PlaylistCard.vue'
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: 'search-result',
  components: {
    FilterSection,
    ChannelCard,
    VideoCard,
    PlaylistCard,
    InfiniteLoading
  },
  methods: {
    infiniteHandler($state) {
      this.axios.get(this.getRequestURL, {
        params: {
          pageToken: this.getNextPageToken,
        },
      }).then( response  => {
        console.log(response.data.items)
        if (response.data.items.length) {
          console.log(this.getSearchResult.items)
          console.log(this.getSearchResult.items.push(...response.data.items))
          this.$store.commit('updateNextPageToken',response.data.nextPageToken)
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    }
  },
  computed: {
    ...mapGetters(['getSearchKey','getSearchLoading','getSearchResult','getSearchRequestStatus','getNextPageToken','getRequestURL']),
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/styles.scss';

.search-result {
   @media(max-width: 776px) {
    background-color: $white;
  }

  .icon {
    width: 30px;
  }

  .load-more {
     @media(max-width: 776px) {
       border-top: 1px solid $light;
       border-bottom: 1px solid $light;
    }
  }
}
</style>
