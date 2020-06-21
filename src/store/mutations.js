export default {
  updateSearchKey(state, newSearchKey) {
    state.searchKey = newSearchKey
  },
  updateSearchLoading(state, newSearchLoading) {
    state.searchLoading = newSearchLoading
  },
  updateSearchResult(state, newSearchResult) {
    state.searchResult = newSearchResult
  },
  updateSearchRequstStats(state, newSearchStatus) {
    state.searchRequestStatus = newSearchStatus
  }
};
  