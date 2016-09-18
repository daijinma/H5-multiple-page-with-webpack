'use strict'

import Vue from 'vue';
import Vuex from 'vuex';
const PRE_NAME = "DJM_VUEZHD";
Vue.use(Vuex);


export default new Vuex.Store({
  state : {
    stories:get('stories',[]),
    topStories:get('topStories',[])
  },
  mutations:{
    SETKEYVALUE(state, key, value){
      state[key] = value;
      localStorage.setItem(PRE_NAME+key,JSON.stringify(value))
    }
  },
  actions : {
    setKeyValue(store, key, args){
      store.dispatch('SETKEYVALUE', key, args);
    },
  }
})

function get(key,defaultValue){
  JSON.parse(localStorage.getItem(PRE_NAME+key)) || defaultValue;
}
