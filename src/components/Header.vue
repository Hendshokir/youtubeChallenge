<template>
  <header class="header">
    <div class="mobile-header d-flex bg-primary justify-content-between align-items-center p-2">
      <div class="d-flex align-items-center">
        <i class="fab fa-youtube text-white size-36"></i>
        <div class="form-container p-relative mx-2" v-if="isEnabledSearch">
          <input 
            class="form-input text-dark"
            type="text"
            v-model="searchText" />
          <span @click="clearSearch" v-if="searchText !== ''">
            <i
            class="fas fa-times clear-search cursor-pointer text-secondary p-absolute px-2 size-10"></i>
          </span>
        </div>
        <span @click="toggleSearch" v-else class="mx-2 text-white">Search Text</span>
        <!-- TODO: youtube text in video details page-->
      </div> <!-- End Logo, Search Form/text-->
      <i class="fas fa-search text-white cursor-pointer"></i>
    </div><!-- End Mobile Header-->

    <div class="desktop-header bg-white p-fixed">
      <div class="container d-flex p-2">
        <div class="row justify-content-between align-items-center">
          <div class="d-flex col-sm-2">
            <img class="logo" src="../assets/images/youtube-logo.png" alt="logo" />
            <sup class="text-secondary size-10">EG</sup>
          </div><!-- End Logo--->
          <div class="d-flex col-sm-8 align-items-center px-0">
            <div class="form-container p-relative w-100 px-0">
              <input 
                class="form-input text-dark"
                type="text"
                v-model="searchText" />
              <span>
                <i
                class="fas fa-search search-icon cursor-pointer text-secondary bg-light h-93 p-absolute px-4 size-10"></i>
              </span>
            </div>
          </div><!-- End Search Form/text-->
        </div> <!-- End Row-->
      </div><!-- End Container -->
    </div><!-- End desktop Header-->
  </header>
</template>


<script>
export default {
  name: 'main-header',
  data() {
    return {
      isEnabledSearch: true,
      searchText: 'test'
    }
  },
  methods: {
    clearSearch: function() {
     this.searchText = ''
    },
    toggleSearch() {
      this.isEnabledSearch = !this.isEnabledSearch;
    }
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
    right: 0;
    margin: auto 0;
    z-index: 3;
  }

  .mobile-header{
    @media(min-width: 776px) {
      display: none;
    }
  }
  .desktop-header {
    right: 0;
    left: 0;

    .logo {
      width: 80px;
      max-width: 100%;
    }

    .search-icon {
      border-radius: 0 3px 3px 0;
    }

    @media(max-width: 776px) {
      display: none;
    }
  }
}
</style>
