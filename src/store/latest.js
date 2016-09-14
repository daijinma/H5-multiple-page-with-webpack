'use strict'

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state : {
    stories:[],
    topStories:[]
  },
  mutations:{
    SETKEYVALUE(state, key, value){
      state[key] = value;
    }
  },
  actions : {
    setKeyValue(store, key, args){
      store.dispatch('SETKEYVALUE', key, args);
    }
  }
})