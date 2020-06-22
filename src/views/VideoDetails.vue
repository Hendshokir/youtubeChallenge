<template>
  <div class="video-details">
    <main-header />

    <div class="container p-0 mt-2" v-if="videoItem !== undefined && videoItem.snippet !== undefined">
      <div class="video-intro bg-white">
        <div class="play-video d-flex justify-content-center mw-100" v-html="videoItem.player.embedHtml" />

        <div class="mobile video-info text-left p-2">
          <span class="size-14">{{videoItem.snippet.title}}</span>
          <div class="d-flex align-items-center size-10 mt-2">
            <span class="mb-1 mr-2"> {{videoItem.snippet.channelTitle}}</span>
            <span class="text-secondary"> {{videoItem.statistics.viewCount | formatNumber}} views</span>
          </div>

          <div class="d-flex justify-content-between text-secondary size-10 pt-2">
            <div>
              <span><i class="fa fa-thumbs-up pr-1"></i>{{videoItem.statistics.likeCount | transformKandM}}</span>
              <span class="mx-3"><i class="fa fa-thumbs-down pr-1"></i>{{videoItem.statistics.dislikeCount | transformKandM}}</span>
            </div>

            <div>
              <span><i class="fas fa-plus"></i></span>
              <span class="mx-2 text-uppercase"><i class="fas fa-share"></i></span>
              <span><i class="fas fa-flag"></i></span>
            </div><!-- End operations -->
          </div>
        </div><!-- End Mobile Video info-->

        <div class="desktop video-info text-left p-2">
          <span class="size-14">{{videoItem.snippet.title}}</span>
          <div class="d-flex justify-content-between text-secondary size-10 pt-2">
            <span> {{videoItem.statistics.viewCount | formatNumber}} views</span>
            <div>
              <span><i class="fa fa-thumbs-up pr-1"></i>{{videoItem.statistics.likeCount | transformKandM}}</span>
              <span class="mx-3"><i class="fa fa-thumbs-down pr-1"></i>{{videoItem.statistics.dislikeCount | transformKandM}}</span>
              <span class="text-uppercase"><i class="fas fa-share"></i> share</span>
              <span class="mx-3"><i class="fas fa-tasks"></i></span>
              <span><i class="fas fa-ellipsis-h"></i></span>
            </div><!-- End operations -->
          </div>

          <div class="channel-info my-3 py-3 d-flex align-items-center">
            <img :src="channelItem.snippet.thumbnails.medium.url" alt="Channel Logo" />
            <div class="d-flex flex-column ml-2">
              <span class="size-12 mb-1"> {{videoItem.snippet.channelTitle}}</span>
              <span class="size-8 text-secondary">Published on {{publishedAt}}</span>
            </div>
          </div><!-- End Channel Info-->
        </div><!-- End Desktop Video info-->
      </div> <!-- End video intro-->

       <section class="related-videos p-2 bg-white">
        <div v-for="item in relatedVideos" :key="item.id.videoId">
          <video-card :videoItem="item" class="mb-2"/>
        </div>
      </section><!--End Channel Videos-->

    </div><!-- End Container-->
  </div>
</template>


<script>
// @ is an alias to /src
import moment from 'moment';
import mainHeader from '@/components/Header.vue'
import VideoCard from '@/components/VideoCard.vue'
export default {
  name: 'videoDetails',
  components: {
    mainHeader,
    VideoCard
  },
  data() {
    return {
      videoItem: {},
      videoId: null,
      relatedVideos: [],
      channelItem: {},
      publishedAt: ''
    }
  },
  methods: {
    getChannelInfo() {
      const channelURL = `${this.$BASE_URL}channels?part=snippet,brandingSettings&key=${this.$API_KEY}&id=${this.videoItem.snippet.channelId}`;
      this.axios.get(channelURL)
      .then(response => {
        this.channelItem = response?.data?.items[0]
        this.publishedAt = moment(this.channelItem.publishedAt).format('DD MMM YYYY')
      })
    },
    getRelatedVideos() {
      const videosURL = `${this.$BASE_URL}search?part=snippet&key=${this.$API_KEY}&relatedToVideoId=${this.videoId}&type=video`;
      this.axios.get(videosURL)
      .then(response => {
      this.relatedVideos = response?.data?.items
      })
    },
  },
  mounted() {
    const path = this.$route.path
    this.videoId = path?.split('/')[2]
    // get video info
    const url = `${this.$BASE_URL}videos?part=snippet,statistics,contentDetails,player&key=${this.$API_KEY}&id=${this.videoId}`;
    this.axios.get(url)
    .then(response => {
      this.videoItem = response?.data?.items[0]

      this.getChannelInfo()
      this.getRelatedVideos()
    })
  }
}
</script>
<style lang="scss" scoped >
@import 'src/assets/styles/styles.scss';

.video-details {
  .video-intro {
    .play-video  {
      overflow-x: hidden;
      .iframe {
        max-width: 100%;
        width: 100%;
      }
    }
    .video-info {
      &.desktop {
        .channel-info {
          border-top: 1px solid $light;
          border-bottom: 1px solid $light;

          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>