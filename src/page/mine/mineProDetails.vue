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
          <span>{{proMes.ictDemandVO.projectName}}</span></br>
          <span class="pro_count">￥{{parseInt(proMes.ictDemandVO.minBudget)}}-{{parseInt(proMes.ictDemandVO.maxBudget)}}</span>
          <!-- <span>报名中</span> -->
        </p>
      </div>
      <div class="" style="marginBottom:1rem;borderBottom:12px solid #eee;boxSizing:border-box;paddingLeft:1rem;">
        <van-steps direction="vertical" :active="proMes.ictDemandVO.state-1" active-color="#C93625">
          <van-step>
            <p>提交申请,等待审核</p>
            <p>{{proMes.ictDemandVO.startTime}}</p>
          </van-step>
          <van-step>
            <p>接单成功</p>
            <p v-if="proMes.ictDemandVO.approveTime!=null">{{proMes.ictDemandVO.approveTime}}</p>
          </van-step>
          <van-step>
            <p>等待交付</p>
            <p v-if="proMes.ictDemandVO.workTime!=null">{{proMes.ictDemandVO.workTime}}</p>
          </van-step>
          <van-step>
            <p>等待付款</p>
            <p v-if="proMes.ictDemandVO.payTime!=null"> {{proMes.ictDemandVO.payTime}}</p>
          </van-step>
        </van-steps>
      </div>
      <div class="con_place">
        <p>时间:&nbsp;{{proMes.ictDemandVO.startTime}}</p>
        <p>地点:&nbsp;{{proMes.ictDemandVO.address}}</p>
      </div>
      <div class="con_mes">
        <p class="mes_title">服务内容和要求:</p>
        <p class="mes_message">
          <span v-if="proMes.content!=null">{{proMes.content}}</span>
          <span v-else>-</span>
        </p>
        <p class="mes_title">所需技能和方向:</p>
        <p class="mes_message">{{proMes.ictDemandVO.category}}</p>

      </div>
    </div>
    <!-- 立即接单 -->
    <div class="pro_state">
      <p v-if="proMes.state==0" style="color:#999;">已申请</p>
      <!-- <p v-if="proMes.ictDemandVO.state==3" style="color:#666;">已完成</p> -->
      <p v-if="proMes.ictDemandVO.state==4" style="color:#C93625;">已完工</p>
      <p v-if="proMes.ictDemandVO.state==5" style="color:#C93625;">已付款</p>
      <p v-if="proMes.choose!=null">
        <button type="button" name="button" @click="liverPro()"  v-if="proMes.choose">立即交付</button>
        <span v-else style="color:#666;">未入选</span>
      </p>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {mapState} from 'vuex'
export default {
  data(){
    return{
      proMes:{},
    }
  },
  components:{WorkHeader},
  created(){
    this.proMes=this.proMesV;
    console.log(this.proMes)

  },
  computed:{
    ...mapState(['proMesV'])
  },
  methods:{
    liverPro(){
      this.$router.push({
        path:'/mineLiver'
      })
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
  .pro_state{
    width: 100%;
    height: 5rem;
    position: fixed;
    bottom:0;
    left:0;
    background: #eee;
    display: flex;
    box-sizing: border-box;
    p{
      text-align: center;
      line-height: 5rem;
      width: 100%;
      font-size: 1.5rem;
      button{
        width: 95%;
        height: 4rem;
        line-height: 4rem;
        margin-top: .5rem;
        border-radius: 8px;
        color:white;
        background: $btn-color;
      }
    }
  }
}
</style>
