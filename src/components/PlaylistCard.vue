<template>
  <div class="playlist-card d-flex justify-content-between">
    <div class="img-container p-relative">
      <router-link :to="{ path: '/playlist/' + playlistItem.id.playlistId}">
        <img :src="playlistItem.snippet.thumbnails.medium.url" alt="Playlist Logo" />
      
        <span class="videos-count d-flex flex-column justify-content-center align-items-center p-absolute bg-darkness text-white size-12">
          {{itemCount }}
          <i class="fas fa-indent mt-1"></i>
        </span>
      </router-link>
    </div>
    <div class="d-flex flex-column text-left mr-auto px-4">
      <h5 class="my-2">
        <router-link :to="{ path: '/playlist/' + playlistItem.id.playlistId}">{{playlistItem.snippet.title}}</router-link>
      </h5>
      <span class="mb-2 size-8 text-secondary"> {{playlistItem.snippet.channelTitle}}</span>
      <span class="desktop size-12 text-secondary">{{playlistItem.snippet.description | formatLargeText}}</span>
    </div>
  </div>
</template>


<script>
export default {
  name: 'playlist-card',
  props: {
    playlistItem: Object
  },
  data() {
    return {
      itemCount: null
    }
  },
  methods: {

  },
  mounted() {
    const url = `${this.$BASE_URL}playlists?part=contentDetails&key=${this.$API_KEY}&id=${this.playlistItem.id.playlistId}`;
    this.axios.get(url)
    .then(response => {
      this.itemCount = response?.data?.items[0]?.contentDetails?.itemCount
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/styles.scss';

.playlist-card {
  .img-container {
    max-height: 70px;
    
    @media(min-width: 776px) {
      max-height: 140px;
    }
    img {
      width: 125px;

      @media(min-width: 776px) {
        width: 250px;
      }
    }
  }

  .videos-count {
    right: 0;
    bottom: 0;
    z-index: 9;
    width: 35%;
    height: 100%;
  }

  h5 {
    @media(max-width: 776px) {
      text-overflow: ellipsis;
      font-size: 10px;
      margin: 4px 0;
    }
  }

  span:not(.videos-count) {
    @media(max-width: 776px) {
      margin: 0 0 2px 0;
    }
  }
}
</style>
