<template>
   <div class="video-card d-flex justify-content-between">
    <div class="img-container p-relative">
      <img :src="videoItem.snippet.thumbnails.medium.url" />
      <span class="duration p-absolute bg-dark text-white size-10">{{ formatDuration(duration) }}</span>
    </div>
    <div class="d-flex flex-column text-left mr-auto px-4">
      <h5 class="my-2">{{videoItem.snippet.title}}</h5>
      <div class="video-statistics d-flex flex-row">
        <span class="statistics mb-2 size-8 text-secondary"> {{videoItem.snippet.channelTitle}}</span>
        <span class="statistics mb-2 mx-2 size-8 text-secondary">{{formatViews(viewCount)}} views</span>
        <span class="desktop statistics mb-2 size-8 text-secondary">{{formatDate(videoItem.snippet.publishedAt)}}</span>
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
      duration: null
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
    },
    formatDuration(duration) {
      if(duration !== null && duration !== undefined) {
        duration = duration.substring(2)
        duration = duration.split('H').join(':').split('M').join(':').split('S').join('')
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
  mounted() {
    const url = `${this.$BASE_URL}videos?part=statistics,contentDetails&key=${this.$API_KEY}&id=${this.videoItem.id.videoId}`;
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
