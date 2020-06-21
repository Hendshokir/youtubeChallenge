<template>
  <div class="home">
    <main-header />
    <search-result />
  </div>
</template>

<script>
// @ is an alias to /src
import mainHeader from '@/components/Header.vue'
import SearchResult from '@/components/SearchResult.vue'

export default {
  name: 'Home',
  components: {
    mainHeader,
    SearchResult
  }
}
</script>
