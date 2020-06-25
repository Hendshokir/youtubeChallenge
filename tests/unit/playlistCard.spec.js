import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { shallowMount } from '@vue/test-utils'
import PlaylistCard from '@/components/PlaylistCard.vue'

Vue.filter('formatLargeText', () => 'formatLargeText')
Vue.use(VueAxios, axios)
const playlistItem = {
  "id":{
    "playlistId":"PLRdw3IjKY2gkyjVE1qqT4pY5cWAQpjYlN"
  },
  "snippet":{
    "title":"2017 Pro Bowl Skills Showdown | NFL",
    "thumbnails":{
      "medium":{
          "url":"https://i.ytimg.com/vi/3U-XDF9TvNM/mqdefault.jpg",
          "width":320,
          "height":180
      },
    },
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
