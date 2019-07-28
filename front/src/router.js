import IndexPage from './pages/Index';
import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: IndexPage,
        },
    ],
})