<template>
  <div class="channel-card d-flex align-items-center">
    <div class="img-container">
      <img :src="channelItem.snippet.thumbnails.medium.url" />
    </div>
    <div class="channel-info d-flex flex-column text-left m-auto px-4">
      <h3 class="my-2">{{channelItem.snippet.title}}</h3>
      <span class="statistics mb-2 size-8 text-secondary mobile"> {{formatNumbers(videoCount)}} videos</span>
      <span class="statistics mb-2 size-8 text-secondary">{{formatNumbers(subscriberCount)}} subscribers</span>
      <span class="desktop size-10 text-secondary">{{channelItem.snippet.description}}</span>
    </div>
  </div>
</template>


<script>
export default {
  name: 'channel-card',
  props: {
    channelItem: Object
  },
  data() {
    return {
      videoCount: null,
      subscriberCount: null
    }
  },
  methods: {
    formatNumbers(num) {
      if (num !== undefined && num !== null) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
  },
  mounted() {
    const url = `${this.$BASE_URL}channels?part=statistics&key=${this.$API_KEY}&id=${this.channelItem.id.channelId}`;
    this.axios.get(url)
    .then(response => {
      this.subscriberCount = response?.data?.items[0]?.statistics?.subscriberCount
      this.videoCount = response?.data?.items[0]?.statistics?.videoCount

    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/styles.scss';

.channel-card {
  @media(max-width: 776px) {
    background-color: $white;
  }

  .img-container {
    @media(min-width: 776px) {
      width: 370px;
    }
    img {
      border-radius: 50%;
      @media(max-width: 776px) {
        width: 75px;
        height: 75px;
      }

      @media(min-width: 776px) {
        width: 125px;
        height: 125px;
      }
    }
  }

  h3 {
    @media(max-width: 776px) {
      font-size: 12px;
      margin: 4px 0;
    }
  }
  span {
    &.statistics {
      @media(max-width: 776px) {
        margin-bottom: 2px;
      }
    }
  }
}
</style>
