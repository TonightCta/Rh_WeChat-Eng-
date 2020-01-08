<!-- 项目详情 -->
<template lang="html">
  <div class="pro_details">
    <WorkHeader>
      <p>项目详情</p>
    </WorkHeader>
    <div class="details_con">
      <div class="con_title">
        <p class="pro_pic">
          <img src="../../../static/img/dont.jpg" alt="">
        </p>
        <p class="pro_title">
          <span>{{proMes.category}}</span></br>
          <span class="pro_count">￥{{parseInt(proMes.minBudget)}}-{{parseInt(proMes.maxBudget)}}</span>
          <span v-if="proMes.state==0">报名中</span>
        </p>
      </div>
      <div class="con_place">
        <p>时间:&nbsp;{{proMes.startTime}}</p>
        <p>地点:&nbsp;{{proMes.place}}</p>
      </div>
      <div class="con_mes">
        <p class="mes_title">服务内容和要求:</p>
        <p class="mes_message">{{proMes.type}}</p>
        <p class="mes_title">所需技能和方向:</p>
        <p class="mes_message">{{proMes.category}}</p>
        <!-- <p class="mes_title">涉及到的设备:</p> -->
      </div>
    </div>
    <!-- 立即接单 -->
    <div class="pro_apply">
      <p>
        <van-icon name="phone" color="#C93625" size="26" /><br>
        客服
      </p>
      <p>
        <!-- <router-link to="/proApply" tag="button">申请接单</router-link> -->
        <button type="button" name="button" @click="applyPro()">立即接单</button>
      </p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import WorkHeader from '@/components/work_header'
export default {
  data(){
    return{
      proMes:{},
    }
  },
  components:{WorkHeader},
  computed:{
    ...mapState(['proMesV','userMes'])
  },
  created(){
    this.proMes=this.proMesV;
  },
  methods:{
    applyPro(){
      console.log(this.userMes);
      if(this.userMes.ictEngineerVO.state==0){
        this.$toast('您还未进行工程师认证！');
        setTimeout(()=>{
          this.$router.push('/mineAuth')
        },300)
      }else if(this.userMes.ictEngineerVO.state==1){
        this.$toast('您的认证信息正在审核中，请稍后再试！');
      }else if(this.userMes.ictEngineerVO.state==-1){
        this.$toast('您的认证被驳回，请更新认证后再试！');
      }else{
        this.$router.push('/proApply')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// @import ''
.pro_details{
  padding-top: 5rem;
  width: 100%;
  padding-bottom: 5rem;
  .details_con{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    .con_title{
      width: 100%;
      height: 10rem;
      display: flex;
      box-sizing: border-box;
      padding-top: 1rem;
      border-bottom:12px solid #eee;
      .pro_pic{
        width: 35%;
        text-align: center;
        img{
          width: 10rem;
          height:7rem;
        }
      }
      .pro_title{
        width: 65%;
        position: relative;
        span:first-child{
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 1rem;
        }
        .pro_count{
          color:$tem-color;
          margin-top: 1rem;
          font-size: 1.5rem;
        }
        span:last-child{
          position: absolute;
          color:$tem-color;
          font-size: 1.4rem;
          right:1rem;
          top:1.2rem;
        }
      }
    }
    .con_place{
      border-bottom:12px solid #eee;
      p{
        height: 3.5rem;
        line-height: 3.5rem;
        font-size: 1.5rem;
        box-sizing: border-box;
        padding-left: 2rem;
      }
    }
    .con_mes{
      width: 100%;
      box-sizing: border-box;
      padding-left: 2rem;
      .mes_title{
        font-size: 1.5rem;
        line-height: 3rem;
      }
      .mes_message{
        min-height: 3rem;
        box-sizing: border-box;
        padding-left: 1rem;
        color:#666;
        font-size: 1.4rem;
        margin-top: .5rem;
      }
    }
  }
  .pro_apply{
    width: 100%;
    height: 5rem;
    position: fixed;
    bottom:0;
    left:0;
    background: #eee;
    display: flex;
    box-sizing: border-box;
    padding-top: .5rem;
    p:first-child{
      width: 20%;
      text-align: center;
    }
    p:last-child{
      width: 80%;
      button{
        width: 96%;
        height: 90%;
        background: $btn-color;
        color:white;
        font-size: 1.5rem;
        border-radius: 5px;
      }
    }
  }
}
</style>
