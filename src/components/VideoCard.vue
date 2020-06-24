<template>
   <div class="video-card d-flex justify-content-between">
    <div class="img-container p-relative">
      <router-link :to="{ path: '/video/' + videoId}">
        <img :src="videoLogo" alt="Video Logo" />
      </router-link>
      <span class="duration p-absolute bg-dark text-white size-10">{{ formatDuration(duration) }}</span>
    </div>
    <div class="d-flex flex-column text-left mr-auto px-4">
      <h5 class="my-2">
        <router-link :to="{ path: '/video/' + videoId}">{{videoItem.snippet.title}}</router-link>
      </h5>
      <div class="video-statistics d-flex flex-row">
        <span class="statistics mb-2 size-8 text-secondary"> {{videoItem.snippet.channelTitle}}</span>
        <span class="statistics mb-2 mx-2 size-8 text-secondary">{{viewCount | transformKandM }} views</span>
        <span class="desktop statistics mb-2 size-8 text-secondary">{{formatDate(videoItem.snippet.publishedAt)}}</span>
      </div>
      <span class="desktop size-10 text-secondary">{{videoItem.snippet.description | formatLargeText}}</span>
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
      duration: null,
      videoId: null,
      videoLogo: ''
    }
  },
  methods: {
    formatDuration(duration) {
      if(duration !== null && duration !== undefined) {
        duration = duration.substring(2)
        duration = duration.split('H').join(':').split('M').join(':').split('S').join('')
        // justify no minutes
        if(duration.indexOf(':') === -1) duration = `00:${duration}`
        // justify no seconds
        if(duration.endsWith(':'))  duration = `${duration}00`
        return duration
      }
    },
    formatDate(publishDate) {
      let result = ''
      const currentDate = new Date()
      publishDate = new Date(publishDate)
      const diffYear = currentDate.getYear() - publishDate.getYear()
      const diffMonth = Math.abs(currentDate.getMonth() - publishDate.getMonth())
      const diffDay = Math.abs(currentDate.getDay() - publishDate.getDay())
      const diffHour = Math.abs(currentDate.getHours() - publishDate.getHours())

      if(diffYear !== 0) {
        result = diffYear === 1? `${diffYear} year ago` : `${diffYear} years ago`
      } else if(diffMonth !== 0) {
        result = diffMonth === 1? `${diffMonth} month ago` : `${diffMonth} months ago`
      } else if(diffDay !== 0){
        result = diffDay === 1? `${diffDay} day ago` : `${diffDay} days ago` 
      } if(diffHour !== 0) {
        result = diffHour === 1? `${diffHour} hour ago` : `${diffHour} hours ago`
      } else {
        const diffMinutes = Math.abs(currentDate.getMinutes() - publishDate.getMinutes())
        result = diffMinutes === 1? `${diffMinutes} minute ago` : `${diffMinutes} minutes ago`
      }
      return result
    }
  },
  created() {
    this.videoLogo = this.videoItem?.snippet?.thumbnails?.medium?.url
  },
  mounted() {
    if(this.$route.path.includes('channel') || this.$route.path.includes('playlist')  ) {
      this.videoId = this.videoItem?.contentDetails?.videoId
    } else if(this.$route.path.includes('video')) {
      this.videoId = this.videoItem?.id?.videoId
    } else {
      this.videoId =  this.videoItem?.id?.videoId
    }
    // this.videoId =  (this.$route.path === '/') ? this.videoItem?.id?.videoId :  this.videoItem?.contentDetails?.videoId
    const url = `${this.$BASE_URL}videos?part=statistics,contentDetails&key=${this.$API_KEY}&id=${this.videoId}`;
    this.axios.get(url)
    .then(response => {
      this.viewCount = response?.data?.items[0]?.statistics?.viewCount
      this.duration = response?.data?.items[0]?.contentDetails.duration
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/styles.scss';
.video-card {
  .img-container {
    @media(max-width: 776px) {
      max-height: 70px;
    }
    img {
      @media(max-width: 776px) {
        width: 125px;
      }
      @media(min-width: 776px) {
        width: 250px;
      }
    }
  }

  .duration {
    right: 5px;
    bottom: 5px;
    z-index: 9;
    padding: 2px;
    border-radius: 2px;;
  }

  h5 {
    @media(max-width: 776px) {
      text-overflow: ellipsis;
      font-size: 10px;
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
