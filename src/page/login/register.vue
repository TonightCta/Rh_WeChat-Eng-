<!-- 注册 -->
<template lang="html">
  <div class="register">
    <LoginHeader>
      <p>注册</p>
    </LoginHeader>
    <div class="register_con">
      <!-- <p>
        <van-radio-group v-model="radio">
          <p style="display:flex;marginTop:1rem;justify-content: space-around;marginBottom:1rem;">
            <van-radio name="1" checked-color="red" icon-size="16">兼职</van-radio>
            <van-radio name="2" checked-color="red" icon-size="16">全职</van-radio>
          </p>
        </van-radio-group>
      </p> -->
      <p>
        <input type="number" name="" value="" placeholder="请输入手机号" v-model="userPhone">
      </p>
      <p>
        <input type="password" name="" value="" placeholder="请输入密码" v-model="userPass">
      </p>
      <p>
        <input type="number" name="" value="" placeholder="请输入推荐人手机号(选填)" v-model="recode">
      </p>
      <p  style="display:flex;">
        <input type="number" name="" value="" placeholder="请输入验证码" v-model="msgcode">
        <button type="button" name="button" @click="sendCode()" :disabled="senCodeBtn" ref="codeBtn">{{codeText}}</button>
      </p>

      <p class="register_text">
        注册即同意
        <span>
          <<用户注册协议>>
        </span>
      </p>
      <span>
        <button type="button" name="button" @click="regisEng()">注册</button>
      </span>
      <!-- <router-link to="/companyRe" tag="p" class="company_re">临时企业注册入口>></router-link> -->
      <!-- <p class="company_re">>></p> -->
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
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
      recode:null,//推荐码
      msgcode:null,//短信验证码
      phoneCode:null,//回执验证码
    }
  },
  methods:{
    ...mapMutations(['token_fn']),
    sendCode(){//发送验证码
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
        this.$axios.post(this.url+'/ict/sms/sendSms',formdata).then((res)=>{
          if(res.data.code==0){
            this.$toast('验证码发送成功');
            this.$refs.codeBtn.style.background="#eee"
            this.$refs.codeBtn.style.color="#666"
            this.senCodeBtn=true;
            this.codeText='接收验证码'+'('+this.codeTime--+')'
            const TIME_COUNT = 59;
             if (!this.timer) {
               this.codeTime = TIME_COUNT;
               this.timer = setInterval(() => {
                 if (this.codeTime > 0 && this.codeTime <= TIME_COUNT) {
                   this.codeText='接收验证码'+'('+this.codeTime--+')'
                  } else {
                   clearInterval(this.timer);
                   this.timer = null;
                   this.$refs.codeBtn.style.background="#404040"
                   this.$refs.codeBtn.style.color="white"
                   this.senCodeBtn=false;
                   this.codeText='发送验证码';
                   this.codeTime=60;
                  }
               }, 1000)
            }
          }else{
            this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          this.$toast('未知错误,请联系客服')
          // console.log(err)
        })
      }
    },
    regisEng(){
      // if(!(/^1[3456789]\d{9}$/.test(phone)))
      let _this=this;
      if(_this.userPhone==null||_this.userPhone==''){
        _this.$toast('请输入手机号');
      }else if(!(/^1[3456789]\d{9}$/.test(_this.userPhone))){
        _this.$toast('请输入正确的手机号')
      }else if(_this.userPass==null||_this.userPass==''){
        _this.$toast('请输入密码')
      }else if(_this.msgcode==null||_this.msgcode==''){
        _this.$toast('请输入验证码')
      }else if(_this.msgcode.length!=6){
        _this.$toast('请输入六位数的验证码')
      }else if(_this.msgcode!=this.phoneCode){
        _this.$toast('您输入的验证码有误')
      }else{
        let formdata=new FormData();
        formdata.append('mobile',_this.userPhone)
        formdata.append('password',_this.userPass)
        if(_this.recode==null||_this.recode==''){
          if(!(/^1[3456789]\d{9}$/.test(_this.recode))){
            _this.$toast('请输入正确的推荐人手机号')
          }else{
            formdata.append('recommendCode',_this.recode)
          }
        }
        // formdata.append('openId','231231')
        _this.$axios.post(_this.url+'/ict/operator/register_engineer',formdata).then((res)=>{
          if(res.data.code==0){
            _this.$toast('注册成功!');
            _this.token_fn(res.data.token);
            _this.$router.push('/')
          }else{
            _this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          _this.$toast('未知错误,请联系客服')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register{
  width: 100%;
  padding-bottom: 1rem;
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
}
</style>
