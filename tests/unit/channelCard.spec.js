import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { shallowMount } from '@vue/test-utils'
import ChannelCard from '@/components/ChannelCard.vue'

Vue.filter('formatNumber', () => 'formatNumber')
Vue.filter('formatLargeText', () => 'formatLargeText')
Vue.use(VueAxios, axios)

const channelItem = {
  "id":{
   "channelId":"UCba9w4PBBv1ntFMC88SuGkA"
  },
  "snippet":{
     "channelId":"UCba9w4PBBv1ntFMC88SuGkA",
     "title":"EZRY PRO",
     "thumbnails":{
      "medium":{
        "url":"https://yt3.ggpht.com/-Yy-i9CHlQJw/AAAAAAAAAAI/AAAAAAAAAAA/9Ee-fxEooUE/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
      }
     }
  }
}
describe('Channel Card is an instance', () => {
  it('ChannelCard is an instance', () => {
    const wrapper = shallowMount(ChannelCard, {
      stubs: ['router-link'],
      propsData: { channelItem }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('Image Source is rendered correctly', () => {
    
    const wrapper = shallowMount(ChannelCard, {
      stubs: ['router-link'],
      propsData: { channelItem }
    })
    expect(wrapper.find('img').attributes('src')).toEqual(channelItem.snippet.thumbnails.medium.url)
  })

  it('Channel Title is rendered correctly', () => {
    
    const wrapper = shallowMount(ChannelCard, {
      stubs: ['router-link'],
      propsData: { channelItem }
    })
    expect(wrapper.find('h3').text()).toBe(channelItem.snippet.title)
  })

})
