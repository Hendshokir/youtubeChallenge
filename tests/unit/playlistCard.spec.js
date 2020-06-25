import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { shallowMount } from '@vue/test-utils'
import PlaylistCard from '@/components/PlaylistCard.vue'

Vue.filter('formatLargeText', () => 'formatLargeText')
Vue.use(VueAxios, axios)
const playlistItem = {
  "kind":"youtube#searchResult",
  "etag":"lxgCY8P2o5m4vYNHGpZtS6q3Pso",
  "id":{
     "kind":"youtube#playlist",
     "playlistId":"PLRdw3IjKY2gkyjVE1qqT4pY5cWAQpjYlN"
  },
  "snippet":{
     "publishedAt":"2017-01-27T01:53:21Z",
     "channelId":"UCDVYQ4Zhbm3S2dlz7P1GBDg",
     "title":"2017 Pro Bowl Skills Showdown | NFL",
     "description":"this is description",
     "thumbnails":{
        "default":{
           "url":"https://i.ytimg.com/vi/3U-XDF9TvNM/default.jpg",
           "width":120,
           "height":90
        },
        "medium":{
           "url":"https://i.ytimg.com/vi/3U-XDF9TvNM/mqdefault.jpg",
           "width":320,
           "height":180
        },
        "high":{
           "url":"https://i.ytimg.com/vi/3U-XDF9TvNM/hqdefault.jpg",
           "width":480,
           "height":360
        }
     },
     "channelTitle":"NFL",
     "liveBroadcastContent":"none",
     "publishTime":"2017-01-27T01:53:21Z"
  }
}
describe('Playlist Card', () => {
  it('PlaylistCard is an instance', () => {
    const wrapper = shallowMount(PlaylistCard, {
      stubs: ['router-link'],
      propsData: { playlistItem }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('Image Source is rendered correctly', () => {
    
    const wrapper = shallowMount(PlaylistCard, {
      stubs: ['router-link'],
      propsData: { playlistItem }
    })
    expect(wrapper.find('img').attributes('src')).toEqual(playlistItem.snippet.thumbnails.medium.url)
  })

  it('Playlist Title is rendered correctly', () => {
    
    const wrapper = shallowMount(PlaylistCard, {
      stubs: ['router-link'],
      propsData: { playlistItem }
    })
    expect(wrapper.find('h5').text()).toBe(playlistItem.snippet.title)
  })

})
