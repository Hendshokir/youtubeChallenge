import Vue from 'vue'

Vue.filter('formatNumber', function (num) {
  if (num !== undefined && num !== null) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
})
  
Vue.filter('formatLargeText', function (string) {
  if (string !== undefined && string !== null && string !== '') {
    return `${string.substring(0,500)} ...`;
  }
})

Vue.filter('transformKandM', function (num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    return num
  }
})