<template>
  <div class="home">
    <main-header />
  </div>
</template>

<script>
// @ is an alias to /src
import mainHeader from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    mainHeader
  }
}
</script>
