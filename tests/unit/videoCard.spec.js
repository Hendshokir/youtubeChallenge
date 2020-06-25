import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { shallowMount } from '@vue/test-utils'
import VideoCard from '@/components/VideoCard.vue'

Vue.filter('formatLargeText', () => 'formatLargeText')
Vue.filter('transformKandM', () => 'transformKandM')

Vue.use(VueAxios, axios)

const videoItem = {
  "kind":"youtube#searchResult",
  "etag":"2O7SibQI_z02gJRCKO3GEe2Rcig",
  "id":{
    "kind":"youtube#video",
    "videoId":"qxYM0VHSFsg"
  },
  "snippet":{
    "publishedAt":"2020-02-25T12:17:27Z",
    "channelId":"UCspBdT0UySegWYJpEBO4YYg",
    "title":"NOOB vs PRO vs HACKER - Slap Kings",
    "description":"SUBSCRIBE! https://www.youtube.com/channel/UCspBdT0UySegWYJpEBO4YYg?sub_confirmation=1 NOOB vs PRO vs HACKER - Slap Kings Hack, Mod Apk, ...",
    "thumbnails":{
      "default":{
          "url":"https://i.ytimg.com/vi/qxYM0VHSFsg/default.jpg",
          "width":120,
          "height":90
      },
      "medium":{
          "url":"https://i.ytimg.com/vi/qxYM0VHSFsg/mqdefault.jpg",
          "width":320,
          "height":180
      },
      "high":{
          "url":"https://i.ytimg.com/vi/qxYM0VHSFsg/hqdefault.jpg",
          "width":480,
          "height":360
      }
    },
    "channelTitle":"KuGo",
    "liveBroadcastContent":"none",
    "publishTime":"2020-02-25T12:17:27Z"
  }
 }

describe('Video Card', () => {
  it('VideoCard is an instance', () => {
    const wrapper = shallowMount(VideoCard, {
      stubs: ['router-link'],
      propsData: { videoItem }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('Image Source is rendered correctly', () => {
    
    const wrapper = shallowMount(VideoCard, {
      stubs: ['router-link'],
      propsData: { videoItem }
    })
    expect(wrapper.find('img').attributes('src')).toEqual(videoItem.snippet.thumbnails.medium.url)
  })

  it('Video Title is rendered correctly', () => {
    
    const wrapper = shallowMount(VideoCard, {
      stubs: ['router-link'],
      propsData: { videoItem }
    })
    expect(wrapper.find('h5').text()).toBe(videoItem.snippet.title)
  })

})
