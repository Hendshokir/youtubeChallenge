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
  },
  updateSearchFilter(state, newSearchFilter) {
    state.searchFilter = newSearchFilter
  },
  updateNextPageToken(state, newNextPageToken) {
    state.nextPageToken = newNextPageToken
  },
  updateRequestURL(state, newURL) {
    state.requestURL = newURL
  }
};
  