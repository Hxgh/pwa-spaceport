//事件中心
let Bus = {}
Bus.install = function(Vue, options) {
  Vue.prototype.$Bus = new Vue()
}
module.exports = Bus
