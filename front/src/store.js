import Vue from 'vue';
import Vuex from 'vuex';
import citiesModule from './vuex/cities';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ...citiesModule,
    },
});
