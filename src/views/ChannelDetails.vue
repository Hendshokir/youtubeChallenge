<template>
  <div class="channel-details">
    <main-header />

    <div class="container p-0 mt-2" v-if="channelItem !== undefined && channelItem.snippet !== undefined ">
      <div class="channel-intro p-relative">
        <div class="banner d-flex mw-100">
          <img class="desktop w-100 mx-100" :src="bannerDesktop" alt="Channel Banner"/>
          <img class="mobile w-100 mx-100" :src="bannerMobile" alt="Channel Banner" />
        </div> <!-- End Banner-->
          
        <img :src="channelItem.snippet.thumbnails.medium.url" class="logo m-auto p-absolute" alt="Channel Logo" />
        <div class="bg-light channel-info d-flex flex-column justify-content-center">
          <h3 class="my-0 py-2">
            {{channelItem.snippet.title}}
          </h3>
          <div class="pb-2">
            <button class="border-0 cursor-pointer text-uppercase text-primary bg-inherit size-12"> 
              <i class="fab fa-youtube"></i>
              subscribe
            </button>
            <span class="text-secondary size-12"> {{subscriberCount | formatNumber }}</span>
          </div> <!-- Subscription-->
        </div>
      </div> <!-- End Channel intro-->

      <section class="channel-videos p-2 bg-white">
        <div v-for="item in videosList" :key="item.id">
          <video-card :videoItem="item"/>
        </div>
      </section><!--End Channel Videos-->
    </div><!-- End Container-->
  </div>
</template>


<script>
// @ is an alias to /src
import mainHeader from '@/components/Header.vue'
import VideoCard from '@/components/VideoCard.vue'
export default {
  name: 'ChannelDetails',
  components: {
    mainHeader,
    VideoCard
  },
  data() {
    return {
      channelItem: {},
      subscriberCount: 0,
      bannerDesktop: '',
      bannerMobile: '',
      videosList: [],
      duration: null
    }
  },
  medthods: {
    getChannelVidos() {
      const playlistURL = `${this.$BASE_URL}playlistItems?part=snippet,contentDetails&key=${this.$API_KEY}&playlistId=${this.channelItem?.contentDetails?.relatedPlaylists?.uploads}`;
      this.axios.get(playlistURL)
      .then(response => {
        this.videosList = response?.data?.items
      })
    }
  },
  mounted() {
    const path = this.$route.path
    const channelId = path?.split('/')[2]
    // get channel info
    const url = `${this.$BASE_URL}channels?part=snippet,statistics,contentDetails,brandingSettings&key=${this.$API_KEY}&id=${channelId}`;
    this.axios.get(url)
    .then(response => {
      this.channelItem = response?.data?.items[0]
      this.subscriberCount = this.channelItem?.statistics?.subscriberCount
      this.bannerDesktop = this.channelItem?.brandingSettings?.image?.bannerImageUrl
      this.bannerMobile = this.channelItem?.brandingSettings?.image?.bannerMobileImageUrl
      
      // get channel videos
      this.getChannelVidos()
    })
  }
}
</script>
<style lang="scss" scoped >
@import 'src/assets/styles/styles.scss';

.channel-details {
  .banner {
    max-height: 80px;
    min-height: 80px;

    @media(min-width: 776px) {
      max-height: 120px;
      min-height: 120px;
    }
    overflow-x: hidden ;
    img {
      object-fit: cover;
    }
  }

  .logo {
    border-radius: 50%;
    border: 1px solid;
    width: 50px;
    height: 50px;
    top: 0;
    bottom: 0;
    left: 10px;
  }

  .channel-info {
    min-height: 80px;
    @media(min-width: 776px) {
      min-height: 120px;
    }
  }
}
</style>