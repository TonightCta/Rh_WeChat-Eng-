<!-- 首页头部 -->
<template lang="html">
  <div class="home_header">
    <p class="iconBox">
      <span><van-icon name="wap-nav" color="white" size="3rem"  @click="show=true"/></span>
      <router-link to="/mineMessages" tag="span"><van-icon name="bell" color="white" size="3rem"/></router-link>
    </p>
    <div class="user_list">
      <van-popup v-model="show"  position="left" :style="{width:'50%',height:'100%'}">
        <p class="user_icon">
          <img :src="userMes.headImgUrl" alt="" @click="goLogin()"/>
        </p>
        <ul class="list_toute">
          <li>昵称:  {{userName}}</li>
          <li>手机号:  {{userPhone}}</li>
          <li @click="goLogin()">个人信息>></li>
          <li @click="goOrder()">我的接单>></li>
          <!-- <router-link to="/minePro" tag="li">我的接单>></router-link> -->
          <!-- <router-link to="/mineMessages" tag="li">我的消息>></router-link> -->
          <!-- <li @click="outLogin()">退出登录>></li> -->
        </ul>
      </van-popup>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {getUrlParams} from '@/assets/getAuth'
export default {
  data(){
    return{
      show:false,
      userName:null,//用户昵称
      userPhone:null,//用户手机号
      openID:getUrlParams('openid').split('#'),
    }
  },
  computed:{
    ...mapState(['token','userMes','isLogin'])
  },
  created(){
    // let url='http://www.ictwork.cn/mobile_eng/?openid=oPxh3wUTMQQ7HFAq2S2z9Z4Kn9fs/hom';
    // console.log(funcUrlDel('openid'))
    if(!this.isLogin){
      this.getLogin()
    }
  },
  mounted(){
    setTimeout(()=>{
      this.userName=this.userMes.ictEngineerVO.name;
      if(this.userMes.ictEngineerVO.phone!=null){
        this.userPhone=this.userMes.ictEngineerVO.phone;
      }else{
        this.userPhone='未绑定';
      }
    },200)
  },
  methods:{
    ...mapMutations(['userMes_fn','token_fn','isLogin_fn']),
    goLogin(){//登录
      if(this.token!=null){
        this.$router.push('/mine')
      }else{
        this.$router.push('/login')
      }
    },
    goOrder(){//我的接单
      // if(this.token!=null){
        this.$router.push('/minePro')
      // }else{
      //   this.$toast('请先登录');
      //   setTimeout(()=>{
      //     this.$router.push('/login')
      //   },1000)
      // }
    },
    getLogin(){
      // alert(this.openID[0])
      let _this=this;
      // if(_this.token==null){
        let formdata=new FormData();
        formdata.append('openId',this.openID[0]);
        _this.$axios.post(_this.url+'/ict/operator/login_openId',formdata).then((res)=>{
          console.log(res)
          if(res.data.code==0){
            // alert(1)
            _this.token_fn(res.data.data.token)
            _this.userMes_fn(res.data.data.ictOperatorVO)
            _this.isLogin_fn(true)
          }else{
            _this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          console.log(err)
          _this.$toast('授权登录失败,请返回后再试')
        })
      // }

    },
    outLogin(){//退出登录
      this.userMes_fn({});
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
        setTimeout(()=>{
          window.open('http://www.ictwork.cn/mobile/')
        },500)
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
  .iconBox{
    width: 100%;
    display: flex;
    span{
      width: 50%;
    }
    span:last-child{
      text-align: right;
      padding-right: 1rem;
    }
  }
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
