<template>
  <header class="header">
    <div class="mobile-header mobile d-flex bg-primary justify-content-between align-items-center p-2">
      <div class="d-flex align-items-center">
        <router-link :to="{ path: '/'}"><i class="fab fa-youtube text-white size-36"></i></router-link>
        <div class="form-container p-relative text-left mx-2" v-if="isEnabledSearch || getSearchKey === ''">
          <input 
            class="form-control text-dark w-100"
            type="text"
            @change="updateSearchKey"
            v-model="searchKey" />
          <span @click="clearSearch" v-if="searchKey !== ''">
            <i
            class="fas fa-times clear-search cursor-pointer bg-white h-94 text-secondary p-absolute px-2 size-10"></i>
          </span>
        </div>
        <span @click="toggleSearch" v-else class="mx-2 text-white">{{getSearchKey}}</span>
      </div> <!-- End Logo, Search Form/text-->
      <span @click="updateSearch(getSearchKey)">
        <i class="fas fa-search text-white cursor-pointer"></i>
      </span>
    </div><!-- End Mobile Header-->

    <div class="desktop-header desktop bg-white p-fixed">
      <div class="container d-flex p-2">
        <div class="row justify-content-between align-items-center">
          <div class="d-flex col-sm-2" >
            <router-link :to="{ path: '/'}"><img class="logo mw-100" src="../assets/images/youtube-logo.png" alt="Youtube Logo" /></router-link>
            <sup class="text-secondary size-10">EG</sup>
          </div><!-- End Logo--->
          <div class="d-flex col-sm-8 align-items-center px-0">
            <div class="form-container p-relative w-100 px-0">
              <input 
                class="form-control text-dark w-90"
                type="text"
                @change="updateSearchKey"
                v-model="searchKey" />
              <span @click="updateSearch(getSearchKey)">
                <i
                class="fas fa-search search-icon cursor-pointer text-secondary bg-light h-94 p-absolute px-4 size-10"></i>
              </span>
            </div>
          </div><!-- End Search Form/text-->
        </div> <!-- End Row-->
      </div><!-- End Container -->
    </div><!-- End desktop Header-->
  </header>
</template>


<script>
import {mapGetters} from 'vuex'
export default {
  
  name: 'main-header',
  data() {
    return {
      isEnabledSearch: true,
      searchKey: this.$store.state.searchKey,
      url: ''
    }
  },
  methods: {
    clearSearch() {
      this.searchKey = ''
      this.$store.commit('updateSearchKey',this.searchKey)
      this.$store.commit('updateSearchResult','')
    },
    toggleSearch() {
      this.isEnabledSearch = !this.isEnabledSearch;
    },
    updateSearchKey(){
      this.$store.commit('updateSearchKey',this.searchKey)
    },
    updateSearch(searchKey){
      if (this.$route.path !== '/')
        this.$router.push('/')
      this.$store.commit('updateSearchLoading',true)

      const commonURl = `part=snippet&q=${searchKey}&order=${this.getSearchFilter.order}&key=${this.$API_KEY}&pageToken=${this.getNextPageToken}`
      if (this.getSearchFilter.type !== undefined && this.getSearchFilter.type !== null) {
        this.url = `${this.$BASE_URL}search?${commonURl}&type=${this.getSearchFilter.type}&maxResults=${this.$ITEM_PER_PAGE}`;
      } 
      else if (this.getSearchFilter.publishedAfter !== undefined && this.getSearchFilter.publishedAfter !== null) {
        this.url = `${this.$BASE_URL}search?${commonURl}&publishedAfter=${this.getSearchFilter.publishedAfter}&maxResults=${this.$ITEM_PER_PAGE}`;
      } else {
        this.url = `${this.$BASE_URL}search?${commonURl}&maxResults=${this.$ITEM_PER_PAGE}`
      }
      
      this.$store.commit('updateRequestURL',this.url)

      this.axios.get(this.url)
      .then(response => {
        this.$store.commit('updateSearchLoading',false)
        this.$store.commit('updateSearchResult',response.data)
        this.getSearchResult === [] ? 
        this.$store.commit('updateSearchRequstStats',false) :
        this.$store.commit('updateSearchRequstStats',true) 
        this.$store.commit('updateSearchFilter',{order: 'relevance'}) // reset filter 
        this.$store.commit('updateNextPageToken',response.data.nextPageToken)
        this.isEnabledSearch = false
      })
      .catch(() => {
        this.$store.commit('updateSearchLoading',false)
        this.$store.commit('updateSearchResult','')
        this.$store.commit('updateSearchRequstStats',false)
        this.$store.commit('updateSearchFilter',{order: 'relevance'}) // reset filter 
      })
    },
  },
  computed: {
    ...mapGetters(['getSearchKey','getSearchLoading','getSearchResult','getSearchFilter','getNextPageToken','getRequestURL'])
  },
  mounted() {
    if (this.$route?.path === '/')
      this.updateSearch('')
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/styles.scss';
.header {
  height: 45px;
  @media(min-width: 776px) {
    background-color: $white;
  }

  .clear-search,
  .search-icon {
    top: 0;
    bottom: 0;
    margin: auto 0;
    z-index: 3;
    border-radius: 0 3px 3px 0;
    border: 1px solid #ccc;
    border-left: 0;
  }

  .mobile-header {
    input {
      border-radius: 3px;
    }
    .clear-search {
      right: 0;
    }
  }

  .desktop-header {
    right: 0;
    left: 0;
    z-index: 99;

    .logo {
      width: 80px;
    }
  }
}
</style>
