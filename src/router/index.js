import Vue from 'vue'
import Router from 'vue-router'
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)
const router=new Router({
  routes:[
    {
      path:'/',
      redirect:'/home',
    },
    {
      path:'/home',
      name:'Home',
      component:resolve=>require(['@/page/home/home'],resolve),
      meta:{
        title:'首页'
      }
    },
  ]
});
export default router;
