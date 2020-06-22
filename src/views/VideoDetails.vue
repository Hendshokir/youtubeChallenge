<template>
  <div class="video-details">
    <main-header />

    hi from details video
  </div>
</template>


<script>
// @ is an alias to /src
import mainHeader from '@/components/Header.vue'

export default {
  name: 'VideoDetails',
  components: {
    mainHeader
  }
}
</script>
