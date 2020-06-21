<template>
  <section class="filter-section py-2">
    <div class="mobile d-flex mx-2">
      <select class="form-control mr-2" id="type" @change="updateFilter($event)">
        <option value="all">All</option>
        <option value="video">Video</option>
        <option value="channel">Channel</option>
        <option value="playlist">Playlist</option>
      </select>

      <select class="form-control" id="date" @change="updateFilter($event)">
        <option value="any_time">Any time</option>
        <option value="today">Today</option>
        <option value="this_week">This week</option>
        <option value="this_month">This month</option>
      </select>
    </div><!-- End Filter Mobile-->
  </section>
</template>

<script>
import {mapGetters} from 'vuex'
import moment from 'moment'
export default {
  name: 'filter-section',
  data() {
    return {
    }
  },
  methods: {
    updateFilter(event) {  
      if (event.target.value === 'today') {
        const publishedAfter =  moment().utcOffset(0).startOf('day')
        this.$store.commit('updateSearchFilter',{publishedAfter: publishedAfter.toISOString(), date: 'today'})
        document.getElementById('type').value = 'all'
      } 
      else if (event.target.value === 'this_week') {
        const publishedAfter = moment().utcOffset(0).startOf('week')
        this.$store.commit('updateSearchFilter',{publishedAfter: publishedAfter.toISOString(), date: 'this_week'})
        document.getElementById('type').value = 'all'
      }
      else if (event.target.value === 'this_month') {
        const publishedAfter = moment().utcOffset(0).startOf('month')
        this.$store.commit('updateSearchFilter',{publishedAfter: publishedAfter.toISOString(), date: 'this_month'})
        document.getElementById('type').value = 'all'
      } else {
        this.$store.commit('updateSearchFilter',{type: event.target.value})
        document.getElementById('date').value = 'any_time'
      }
    }
  },
  mounted() {
    if(this.getSearchFilter.type !== undefined ) {
      document.getElementById('type').value = this.getSearchFilter.type;
    }
    else {
      document.getElementById('type').value = 'all'
    }

    if(this.getSearchFilter.publishedAfter !== undefined ) {
      document.getElementById('date').value = this.getSearchFilter.date;
    }
    else {
      document.getElementById('date').value = 'any_time'
    }
  },
  computed: {
    ...mapGetters(['getSearchFilter']),
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/styles.scss';
.filter-section {
  border-bottom: 1px solid $light;

  .form-control {
    width: auto;
    background-color: $light;
  }
}
</style>
