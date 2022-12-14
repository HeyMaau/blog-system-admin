import Vue from 'vue'
import App from './App.vue'
import router from "@/routers";
import "./plugins/element"
import "./assets/css/global.css"

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
