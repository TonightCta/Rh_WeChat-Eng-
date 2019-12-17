<!-- 登录 -->
<template lang="html">
  <div class="login">
    <img src="../../../static/img/bg.jpg" alt="">
    <span class="closeLogin" @click="backPage()">
      <van-icon name="arrow-left" color="white" size="28" />
    </span>
    <div class="login_con">
      <van-tabs v-model="active">
        <van-tab title="短信登录">
          <div class="code_login public_login">
            <p>
              <input type="number" name="" value="" placeholder="请输入账号">
            </p>
            <p style="display:flex;">
              <input type="number" name="" value="" placeholder="请输入验证码" class="code_inp">
              <button type="button" name="button" @click="sendCode()" :disabled="senCodeBtn" ref="codeBtn">{{codeText}}</button>
            </p>
            <span>
              <button type="button" name="button">快速登录</button>
            </span>
          </div>
        </van-tab>
        <van-tab title="密码登录">
          <div class="pass_login public_login">

          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      active:0,
      codeText:'发送验证码',//发送验证码按钮文本
      codeTime:60,//验证码倒计时
      senCodeBtn:false,//是否禁用按钮
      timer:null,
    }
  },
  watch:{
    // codeTime(val,oldVal){
    //   if(val==0){
    //     this.$refs.codeBtn.style.background="red"
    //     this.$refs.codeBtn.style.color="white"
    //     this.senCodeBtn=false;
    //   }else{
    //     this.$refs.codeBtn.style.background="#eee"
    //     this.$refs.codeBtn.style.color="#666"
    //     this.senCodeBtn=true;
    //   }
    // }
  },
  methods:{
    backPage(){//返回
      window.history.back()
    },
    sendCode(){//发送验证码
      this.$refs.codeBtn.style.background="#eee"
      this.$refs.codeBtn.style.color="#666"
      this.senCodeBtn=true;
      this.codeText='接受验证码'+'('+this.codeTime--+')'
      const TIME_COUNT = 59;
       if (!this.timer) {
         this.codeTime = TIME_COUNT;
         this.timer = setInterval(() => {
           if (this.codeTime > 0 && this.codeTime <= TIME_COUNT) {
             this.codeText='接受验证码'+'('+this.codeTime--+')'
            } else {
             clearInterval(this.timer);
             this.timer = null;
             this.$refs.codeBtn.style.background="red"
             this.$refs.codeBtn.style.color="white"
             this.senCodeBtn=false;
             this.codeText='发送验证码';
             this.codeTime=60;
            }
         }, 1000)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.login{
  width: 100%;
  position: relative;
  img{
    width: 100%;
    height: 15rem;
  }
  .closeLogin{
    position: absolute;
    left:1rem;
    top:1rem;
  }
  .public_login{
    width: 75%;
    margin:0 auto;
    margin-top: 2rem;
  }
  .code_login{
    p{
      width: 100%;
      border-bottom:1px solid #ccc;
      input{
        width: 100%;
        height: 4rem;
        line-height: 4rem;
      }
      .code_inp{
        width: 60%;
      }
      button{
        width: 40%;
        height: 3rem;
        margin-top: .5rem;
        background: $tem-color;
        color:white;
        border-radius: 5px;
      }
    }
    span{
      width: 100%;
      margin-top: 2rem;
      button{
        margin:0 auto;
        width: 100%;
        height: 4rem;
        font-size: 1.5rem;
        background: $tem-color;
        color:white;
        border-radius: 5px;
      }
    }
  }
}
</style>
