<!-- 首页头部 -->
<template lang="html">
  <div class="home_header">
    <van-icon name="wap-nav" color="white" size="3rem"  @click="show=true"/>
    <div class="user_list">
      <van-popup v-model="show"  position="left" :style="{width:'50%',height:'100%'}">
        <p class="user_icon">
          <img src="../../static/img/dont.jpg" alt="" @click="goLogin()"/>
        </p>
        <ul class="list_toute">
          <li>昵称:  {{userName}}</li>
          <li>手机号:  {{userPhone}}</li>
          <li @click="goLogin()">个人信息>></li>
          <router-link to="/minePro" tag="li">我的接单>></router-link>
          <router-link to="/mineMessages" tag="li">我的消息>></router-link>
          <li @click="outLogin()">退出登录>></li>
        </ul>
      </van-popup>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  data(){
    return{
      show:false,
      userName:null,//用户昵称
      userPhone:null,//用户手机号
    }
  },
  computed:{
    ...mapState(['token','userMes'])
  },
  created(){
    if(this.userMes.ictEngineerVO!=null){
      this.userName=this.userMes.ictEngineerVO.name;
      this.userPhone=this.userMes.ictEngineerVO.phone;
    }else{
      this.userName='未登录';
      this.userPhone='未登录';
    }
  },
  methods:{
    ...mapMutations(['userMes_fn','token_fn']),
    goLogin(){//登录
      if(this.token!=null){
        this.$router.push('/mine')
      }else{
        this.$router.push('/login')
      }
    },
    outLogin(){//退出登录
      this.userMes_fn(null);
      this.token_fn(null);
      this.$toast.loading({
        message: '注销中...',
        forbidClick: true,
        loadingType: 'spinner'
      });
      setTimeout(()=>{
        this.$toast('注销成功');
        this.show=false;
        this.userName='未登录';
        this.userPhone='未登录';
      },2000)
    },
  }
}
</script>

<style lang="scss" scoped>
.home_header{
  height: 5rem;
  box-sizing: border-box;
  padding-left: 1.5rem;
  padding-top: 1rem;
  width: 100%;
  background: #333;
  position: fixed;
  top:0;
  left:0;
  z-index: 999;
  .user_list{
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    .user_icon{
      width: 8rem;
      height: 8rem;
      margin:0 auto;
      margin-top:4rem;
      img{
        border-radius:50%;
        width: 100%;
        height:100%;
      }
    }
    .list_toute{
      margin-top: 2rem;
      width: 100%;
      li{
        text-align: left;
        line-height: 6rem;
        font-size: 1.4rem;
        box-sizing: border-box;
        padding-left: 2rem;
      }
    }
  }
}
</style>
