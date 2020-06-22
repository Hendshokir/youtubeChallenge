<template>
  <section class="filter-section py-2">
    <div class="mobile d-flex mx-2">
      <select class="form-control mr-2" id="type" @change="updateFilter($event)">
        <option value="all">All</option>
        <option v-for="item in typeLabels" :key="item.id" :value="item.id"> {{ item.name }}</option>

      </select>

      <select class="form-control" id="date" @change="updateFilter($event)">
        <option value="any_time">Any time</option>
        <option v-for="item in dateLabels" :key="item.id" :value="item.id"> {{ item.name }}</option>
      </select>
    </div><!-- End Filter Mobile-->

    <div class="desktop container my-2">
      <div class="handle-filter d-flex justify-content-between mr-5">
        <span class="size-12">About {{formatNumbers(getSearchResult.pageInfo.totalResults)}} results</span>
        <span :class="{'font-weight-bold' : toggleFilter}" class="size-14 cursor-pointer" @click="toggoleFilterSection">
          <i class="fas fa-filter size-10"></i> Filter
        </span>
       </div>

      <div v-if="toggleFilter" class="row text-left mx-0 mt-3">
        <div class="col-md-3 px-0">
          <span class="filter-label d-block pb-3 size-10">upload date</span>
          <ul class="p-0 mb-0">
            <li v-for="item in dateLabels" :key=item.id>
              <span @click="updateFilter(item)" :class="{'font-weight-bold': item.selected}">{{item.name}}</span> 
              <span v-if="item.selected" @click="removeFilter(item)">
                <i class="fas fa-times mx-3 mx-3"></i>
              </span>
            </li>
          </ul>
        </div>
        <div class="col-md-3">
          <span class="filter-label d-block pb-3 size-10">type</span>
          <ul class="p-0 mb-0">
             <li v-for="item in typeLabels" :key=item.id>
              <span @click="updateFilter(item)" :class="{'font-weight-bold': item.selected}">{{item.name}}</span> 
              <span v-if="item.selected">
                <i class="fas fa-times mx-3 mx-3"></i>
              </span>
            </li>
          </ul>
        </div>
        <div class="col-md-3 px-0">
          <span class="filter-label d-block pb-3 size-10">sort by</span>
          <ul class="p-0 mb-0">
            <li v-for="item in orderLabels" :key=item.id>
              <span @click="updateFilter(item)" :class="{'font-weight-bold': item.selected}">{{item.name}}</span> 
              <span v-if="item.selected" @click="removeFilter(item)">
                <i class="fas fa-times mx-3 mx-3"></i>
              </span>
            </li>
          </ul>
        </div>
      </div><!-- End Row -->
    </div><!-- End Filter Desktop-->
  </section>
</template>

<script>
import {mapGetters} from 'vuex'
import moment from 'moment'
export default {
  name: 'filter-section',
  data() {
    return {
      toggleFilter: false,
      dateLabels: [
        {id:'today', name: 'Today', selected: false},
        {id:'this_week', name: 'This week', selected: false},
        {id:'this_month', name: 'This month', selected: false }
      ],
      typeLabels: [
        {id:'video', name: 'Video', selected: false, label: 'type'},
        {id:'channel', name: 'Channel', selected: false, label: 'type'},
        {id:'playlist', name: 'Playlist', selected: false, label: 'type'}
      ],
      orderLabels: [
        {id:'relevance', name: 'Relevance', selected: true, label: 'order'},
        {id:'date', name: 'Upload date', selected: false, label: 'order'},
        {id:'viewCount', name: 'View count', selected: false, label: 'order'},
        {id:'rating', name: 'Rating', selected: false, label: 'order'}
      ]
    }
  },
  methods: {
    removeFilter(item) {
      item.selected = false
    },
    updateFilter(event) {  
      // not restting in case of sorting
      if (event?.label !== 'order')  {
        this.dateLabels.forEach(item => item.selected = false)
        this.typeLabels.forEach(item => item.selected = false)
      }

      event.selected = true
      // handle date filter
      if (event?.id === 'today' || event?.target?.value === 'today') {
        const publishedAfter =  moment().utcOffset(0).startOf('day')
        this.$store.commit('updateSearchFilter',{...this.getSearchFilter, publishedAfter: publishedAfter.toISOString(), date: 'today'})
        document.getElementById('type').value = 'all'
      } 
      else if (event?.id === 'this_week' || event?.target?.value === 'this_week') {
        const publishedAfter = moment().utcOffset(0).startOf('week')
        this.$store.commit('updateSearchFilter',{...this.getSearchFilter,publishedAfter: publishedAfter.toISOString(), date: 'this_week'})
        document.getElementById('type').value = 'all'
      }
      else if (event?.id === 'this_month' || event?.target?.value === 'this_month') {
        const publishedAfter = moment().utcOffset(0).startOf('month')
        this.$store.commit('updateSearchFilter',{...this.getSearchFilter,publishedAfter: publishedAfter.toISOString(), date: 'this_month'})
        document.getElementById('type').value = 'all'
      } 
      // handle sort by filter
      else if (event?.label === 'order') {
        this.$store.commit('updateSearchFilter',{...this.getSearchFilter, order: event?.id})
        this.orderLabels.forEach(item => {
          if(item.id !== event?.id)
            item.selected = false
          else
            item.selected = true
        })
      }
      // handle type filter
      else {
        event.label === 'type' ?      
          this.$store.commit('updateSearchFilter',{...this.getSearchFilter,type: event?.id}) :
          this.$store.commit('updateSearchFilter',{...this.getSearchFilter,type: event.target.value})
        document.getElementById('date').value = 'any_time'
      }
    },
    formatNumbers(num) {
      if (num !== undefined && num !== null) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    toggoleFilterSection() {
      this.toggleFilter = !this.toggleFilter
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
    ...mapGetters(['getSearchResult','getSearchFilter']),
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

  .filter-label {
    text-transform: uppercase;
    border-bottom:  1px solid $light;
  }

  ul {
    list-style: none;

    li {
      font-size: 10px;
      color: $grey;
      margin-bottom: 4px;

      span {
        cursor: pointer;
      }
    }
  }
}
</style>
