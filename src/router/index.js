import Vue from 'vue'
import Router from 'vue-router'
const routerPush = Router.prototype.push
import NProgress from 'nprogress'
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
        title:'犀牛小哥'
      }
    },
    {
      path:'/register',//注册
      name:'Regisiter',
      component:resolve=>require(['@/page/login/register'],resolve)
    },
    {
      path:'/login',
      name:'Login',
      component:resolve=>require(['@/page/login/login'],resolve),
      meta:{
        title:'登录'
      }
    },
    {
      path:'/proDetials',//项目详情,
      name:'ProDetials',
      component:resolve=>require(['@/page/proAbout/pro_details'],resolve)
    },
    {
      path:'/mine',//个人中心
      name:'Mine',
      component:resolve=>require(['@/page/mine/mine'],resolve)
    },
    {
      path:'/mineMessages',//消息中心
      name:'MineMessages',
      component:resolve=>require(['@/page/mine/mineMessages'],resolve)
    },
    {
      path:'/minePro',//个人接单
      name:'MinePro',
      component:resolve=>require(['@/page/mine/minePro'],resolve)
    },
    {
      path:'/mineProDe',//个人接单详情
      name:'MineProDe',
      component:resolve=>require(['@/page/mine/mineProDetails'],resolve)
    },
    {
      path:'/mineAuth',//我的认证
      name:'MineAuth',
      component:resolve=>require(['@/page/mine/mineAuth'],resolve)
    }
  ]
});
router.beforeEach((to,from,next)=>{
  NProgress.start();
  next()
})
router.afterEach(() => {
    NProgress.done()
})
export default router;
