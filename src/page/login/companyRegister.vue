<!-- 企业注册 -->
<template lang="html">
  <div class="company_register">
    <LoginHeader/>
    <div class="register_con">
      <p>
        <input type="number" name="" value="" placeholder="请输入手机号" v-model="userPhone">
      </p>
      <p>
        <input type="password" name="" value="" placeholder="请输入密码" v-model="userPass">
      </p>
      <p>
        <input type="number" name="" value="" placeholder="请输入公司全称" v-model="companyName">
      </p>
      <p  style="display:flex;">
        <input type="number" name="" value="" placeholder="请输入验证码" v-model="msgcode">
        <button type="button" name="button" @click="sendCode()" :disabled="senCodeBtn" ref="codeBtn">{{codeText}}</button>
      </p>
      <p class="register_text">
        注册即同意
        <span>
          <<企业注册协议>>
        </span>
      </p>
      <span>
        <button type="button" name="button">注册</button>
      </span>
    </div>
  </div>
</template>

<script>
import LoginHeader from '@/components/login_header'
export default {
  components:{
    LoginHeader
  },
  data(){
    return{
      codeText:'发送验证码',//发送验证码按钮文本
      codeTime:60,//验证码倒计时
      senCodeBtn:false,//是否禁用按钮
      timer:null,
      radio:1,
      userPhone:null,//用户手机号
      userPass:null,//用户密码
      companyName:null,//公司名称
      msgcode:null,//短信验证码
      phoneCode:null,//回执验证码
    }
  },
  methods:{
    sendCode(){//发送验证码
      alert(1)
      if(this.userPhone==null||this.userPhone==''){
        this.$toast('请输入手机号')
      }else if(!(/^1[3456789]\d{9}$/.test(this.userPhone))){
        this.$toast('请输入正确的手机号')
      }else{
        let Num=null;
        Num+=Math.round(900000*Math.random()+100000);
        this.phoneCode=Num;
        let formdata=new FormData();
        formdata.append('mobile',this.userPhone)
        formdata.append('code',Num);
        // this.$axios.post(this.url+'/ict/sms/sendSms',formdata).then((res)=>{
        //   if(res.data.code==0){
        //     this.$toast('验证码发送成功');
        //     this.$refs.codeBtn.style.background="#eee"
        //     this.$refs.codeBtn.style.color="#666"
        //     this.senCodeBtn=true;
        //     this.codeText='接收验证码'+'('+this.codeTime--+')'
        //     const TIME_COUNT = 59;
        //      if (!this.timer) {
        //        this.codeTime = TIME_COUNT;
        //        this.timer = setInterval(() => {
        //          if (this.codeTime > 0 && this.codeTime <= TIME_COUNT) {
        //            this.codeText='接收验证码'+'('+this.codeTime--+')'
        //           } else {
        //            clearInterval(this.timer);
        //            this.timer = null;
        //            this.$refs.codeBtn.style.background="red"
        //            this.$refs.codeBtn.style.color="white"
        //            this.senCodeBtn=false;
        //            this.codeText='发送验证码';
        //            this.codeTime=60;
        //           }
        //        }, 1000)
        //     }
        //   }else{
        //     this.$toast(res.data.msg)
        //   }
        // }).catch((err)=>{
        //   this.$toast('未知错误,请联系客服')
        //   // console.log(err)
        // })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.register_con{
  width: 75%;
  margin:0 auto;
  padding-top: 1rem;
  p{
    width: 100%;
    input{
      border-bottom:1px solid #ccc;
      width: 100%;
      height: 4rem;
      line-height: 4rem;
      font-size: 1.4rem;
    }
    .code_inp{
      width: 60%;
    }
    button{
      width: 50%;
      height: 3rem;
      margin-top: .5rem;
      background: $btn-color;
      color:white;
      border-radius: 5px;
    }
  }
  .register_text{
    line-height: 5rem;
    span{
      color:$tem-color;
      display: inline;
    }
  }
  span{
    width: 100%;
    margin-top: 2rem;
    button{
      margin:0 auto;
      width: 100%;
      height: 3.5rem;
      font-size: 1.5rem;
      background: $btn-color;
      color:white;
      border-radius: 20px;
    }
  }
  .company_re{
    margin-top: 2rem;
    font-size: 1.5rem;
    color:$tem-color;
  }
}
</style>
