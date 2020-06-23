export default {
  getSearchKey (state) {
    return state.searchKey
  },
  getSearchLoading (state) {
    return state.searchLoading
  },
  getSearchResult(state) {
    return state.searchResult
  },
  getSearchRequestStatus(state) {
    return state.searchRequestStatus
  },
  getSearchFilter(state) {
    return state.searchFilter
  },
  getNextPageToken(state) {
    return state.nextPageToken
  },
  getRequestURL(state) {
    return state.requestURL
  }
};
