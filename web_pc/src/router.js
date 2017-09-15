import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Login = resolve => require(['@/views/admin/global/login'], resolve);
const FrontHome = resolve => require(['@/views/front/global/Home'], resolve);
const Work = resolve => require(['@/views/front/work/home'], resolve);
let routes = [{
        path: '/admin/login',
        name: 'adminlogin',
        component: Login
    },
    {
        path: "/",
        name: "frontHome",
        component: FrontHome,
        children: [
            { path: "work", name: "work", component: Work },
        ]
    }

];
const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        // savedPosition is only available for popstate navigations.
        return savedPosition
    } else {
        const position = {}
            // new navigation.
            // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0
            position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position
    }
}
export default new VueRouter({
    // mode: 'history',
    scrollBehavior,
    base: __dirname,
    routes: routes
});