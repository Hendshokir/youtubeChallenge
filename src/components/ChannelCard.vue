<template>
  <div class="channel-card d-flex align-items-center">
    <div class="img-container">
      <router-link :to="{ path: '/channel/' + channelItem.id.channelId}">
        <img :src="channelItem.snippet.thumbnails.medium.url" alt="Channel Logo" />
      </router-link>
    </div>
    <div class="channel-info d-flex flex-column text-left px-4">
      <h3 class="my-2">
        <router-link :to="{ path: '/channel/' + channelItem.id.channelId}">{{channelItem.snippet.title}}</router-link>
      </h3>
      <span class="statistics mb-2 size-8 text-secondary mobile"> {{videoCount | formatNumber}} videos</span>
      <span class="statistics mb-2 size-8 text-secondary">{{subscriberCount | formatNumber}} subscribers</span>
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
      min-width: 250px;
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

  span {
    &.statistics {
      @media(max-width: 776px) {
        margin-bottom: 2px;
      }
    }
  }
}
</style>
