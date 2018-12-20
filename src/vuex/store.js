import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        foodImg: '',
        foodType:'',
        tipmsg:'',
        activeId:'',
        apdId:'',
        aprId:'',
        linkurl:'',
        foodName:'',
        foodNum:'',
        foodDesc:'',
        foodTip:''
    },
})
export{
    store
}
