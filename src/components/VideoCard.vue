<template>
   <div class="video-card d-flex justify-content-between">
    <img :src="videoItem.snippet.thumbnails.medium.url" />
    <div class="d-flex flex-column text-left mr-auto px-4">
      <h5 class="my-2">{{videoItem.snippet.title}}</h5>
      <div class="video-statistics d-flex flex-row">
        <span class="statistics mb-2 size-8 text-secondary"> {{videoItem.snippet.channelTitle}}</span>
        <span class="statistics mb-2 mx-2 size-8 text-secondary">{{formatViews(viewCount)}} views</span>
        <!-- TODO calculate Date-->
      </div>
      <span class="desktop size-10 text-secondary">{{videoItem.snippet.description}}</span>
    </div>
  </div>
</template>


<script>
export default {
  name: 'video-card',
  props: {
    videoItem: Object
  },
  data() {
    return {
      viewCount: null,
    }
  },
  methods: {
    formatViews(num) {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
      }
    }
  },
  mounted() {
    const url = `${this.$BASE_URL}videos?part=statistics&key=${this.$API_KEY}&id=${this.videoItem.id.videoId}`;
    this.axios.get(url)
    .then(response => {
      console.log(response.data);
      this.viewCount = response?.data?.items[0]?.statistics?.viewCount


    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/styles.scss';
.video-card {
  img {
    @media(max-width: 776px) {
      width: 125px;
    }

    @media(min-width: 776px) {
      width: 250px;
    }
  }

  h5 {
    @media(max-width: 776px) {
      font-size: 12px;
      margin: 4px 0;
    }
  }

  .video-statistics {
    @media(max-width: 776px) {
      flex-direction: column;
    }
    span {
      &.statistics {
        @media(max-width: 776px) {
          margin: 0 0 2px 0;
        }
      }
    }
  }
}
</style>
