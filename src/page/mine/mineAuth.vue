<!-- 我的认证 -->
<template lang="html">
  <div class="mine_auth">
    <WorkHeader>
      <p>我的认证</p>
    </WorkHeader>
    <div class="auth_con">
      <p class="mine_level">平台一级工程师</p>
      <p class="mine_mes">
        <span>项目完成数量:&nbsp;8</span>
        <span>信用值:&nbsp;1000</span>
      </p>
      <ul>
        <router-link to="/mineCard" tag="li">
          实名认证
            <span class="public_text">{{engCardText}}</span>
            <span class="public_text icon">
              <van-icon name="arrow" size="22"/>
            </span>
        </router-link>
        <router-link to="/skillList" tag="li">
          技能认证
            <span class="public_text">未认证</span>
            <span class="public_text icon">
              <van-icon name="arrow" size="22"/>
            </span>
        </router-link>
        <router-link to="/alipayAuth" tag="li">
          支付宝认证
            <span class="public_text">未认证</span>
            <span class="public_text icon">
              <van-icon name="arrow" size="22"/>
            </span>
        </router-link>
        <li>
          工程师认证
            <span class="public_text">{{engAuthText}}</span>
            <router-link to="/engAuth" tag="span" class="stopMask" v-if="stopMask"></router-link>
            <span class="public_text icon">
              <van-icon name="arrow" size="22"/>
            </span>
        </li>
        <router-link to="/mineFirstFeild" tag="li">
          擅长领域
            <span class="public_text" style="color:#C93625;">{{userMes.ictEngineerVO.industry}}</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {mapState} from 'vuex'
export default {
  data(){
    return{
      engAuthText:'未认证',//工程师认证状态
      stopMask:false,//根据状态进入认证界面
      engCardText:'未认证',//实名认证状态
    }
  },
  components:{WorkHeader},
  computed:{
    ...mapState(['userMes'])
  },
  created(){
    if(this.userMes.ictEngineerVO.state==0){
      this.engAuthText='未认证'
      this.stopMask=true;
    }else if(this.userMes.ictEngineerVO.state==-1){
      this.engAuthText='认证驳回'
      this.stopMask=true;
    }else if(this.userMes.ictEngineerVO.state==1){
      this.engAuthText='已申请';
    }else if(this.userMes.ictEngineerVO.state==2){
      this.engAuthText='已认证'
    };
    if(this.userMes.ictEngineerVO.idCard!=null){
      this.engCardText='已认证'
    }
  },
}
</script>

<style lang="scss" scoped>
.mine_auth{
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 1rem;
  .auth_con{
    width: $tem-width;
    margin:0 auto;
    ul{
      li{
        width: 100%;
        height: 5rem;
        box-shadow: 0px 0px 5px #ccc;
        margin-top: 1rem;
        border-radius: 8px;
        font-size: 1.4rem;
        line-height: 5rem;
        box-sizing: border-box;
        padding-left: 1rem;
        position: relative;
        .public_text{
          position: absolute;
          right:4rem;
          font-size: 1.3rem;
          color:#666;
        }
        .icon{
          top:.6rem;
          right: 1rem;
        }
      }
      .stopMask{
        position: absolute;
        background: red;
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
        opacity: 0;
      }
    }
    p{
      width: 100%;
      text-align: center;
      color:$tem-color;
      line-height: 5rem;
    }
    .mine_level{
      font-size: 1.8rem;
    }
    .mine_mes{
      display: flex;
      span{
        width: 50%;
        font-size: 1.5rem;
      }
    }
  }

}
</style>
