<!-- 支付宝认证 -->
<template lang="html">
  <div class="alipay_auth">
    <WorkHeader>
      <p>支付宝认证</p>
    </WorkHeader>
    <div class="alipay_con">
      <ul>
        <li>
          <span>真实姓名:</span>
          <input type="text" name="" value="" placeholder="请输入您的真实姓名">
        </li>
        <li>
          <span>支付宝账号:</span>
          <input type="text" name="" value="" placeholder="请输入您的支付宝账号">
        </li>
        <li>
          <span>确认支付账号:</span>
          <input type="text" name="" value="" placeholder="请再次输入您的支付宝账号">
        </li>
      </ul>
    </div>
    <p class="tips">
      <span>温馨提示:</span>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;敬请您填写正确的支付宝账号以及账户名,填写之后进行仔细核对无误再进行提交。</span>
    </p>
    <p class="alipay_btn">
      <button type="button" name="button">立即认证</button>
    </p>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  components:{WorkHeader}
}
</script>

<style lang="scss" scoped>
.alipay_auth{
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 5rem;
  .alipay_con{
    width: $tem-width;
    margin:0 auto;
    ul{
      width: 100%;
      li{
        height: 5rem;
        border-radius: 8px;
        box-shadow: 0px 0px 5px #ccc;
        box-sizing: border-box;
        padding-left: 1rem;
        line-height: 5rem;
        font-size: 1.4rem;
        margin-top: 1rem;
        input{
          width: 70%;
          height: 4.5rem;
          margin-left:.5rem;
        }
      }
    }
  }
  .tips{
    width: $tem-width;
    margin:0 auto;
    margin-top: 2rem;
    color:red;
    span:last-child{
      margin-top: 1rem;
    }
  }
  .alipay_btn{
    width: 100%;
    position: fixed;
    bottom: 1rem;
    text-align: center;
    button{
      width: $tem-width;
      height: 3.5rem;
      font-size: 1.4rem;
      background: $btn-color;
      color:white;
      border-radius: 20px;
    }
  }
}
</style>
