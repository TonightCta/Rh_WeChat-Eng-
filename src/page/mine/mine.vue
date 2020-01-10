<!-- 个人中心 -->
<template lang="html">
  <div class="mine">
    <WorkHeader>
      <p>个人信息</p>
    </WorkHeader>
    <div class="mine_con">
      <div class="con_card">
        <p class="user_pic">
          头像
          <img src="../../../static/img/dont.jpg" alt="">
        </p>
        <p class="user_nickname">
          昵称:&nbsp;{{nickName}}
          <input type="text" name="" value="" v-if="editNick" placeholder="请输入您的昵称" v-model="nickName">
          <span v-else @click="editNick=true;saveBtn=true"></span>
        </p>
      </div>
      <div class="con_mes">
        <ul>
          <li>手机号:&nbsp;{{engPhone}}
          <!-- <input type="text" name="" value="" v-if="editPhone" placeholder="请输入您的昵称" v-model="engPhone"> -->
          <!-- <span v-else @click="editPhone=true;saveBtn=true;"></span> -->
          </li>
          <router-link to="/mineIndu" tag="li">擅长行业:&nbsp;{{induText}}</router-link>
          <router-link to="/mineFirstFeild" tag="li">擅长领域:&nbsp;{{feildText}}</router-link>
          <li>所在地区:&nbsp;北京-海淀区</li>
          <router-link to="/mineAuth" tag="li">
            我的认证&nbsp;
              <span class="right_oper icon">
                <van-icon name="arrow" size="22" />
              </span>
          </router-link>
          <!-- <router-link to="/authInfo" tag="li" v-if="userMes.ictEngineerVO.state==1||userMes.ictEngineerVO.state==2">
            认证信息&nbsp;
              <span class="right_oper icon">
                <van-icon name="arrow" size="22" />
              </span>
          </router-link> -->
          <li>我的信用分:&nbsp;
            <span class="right_oper">100</span>
          </li>
        </ul>
      </div>
    </div>
    <p class="save_btn" v-if="saveBtn">
      <button type="button" name="button" @click="saveNick()">保存</button>
    </p>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {mapState,mapMutations} from 'vuex'
export default {
  data(){
    return{
      nickName:'海绵宝宝',//工程师昵称
      engPhone:null,//工程师手机号
      editNick:false,//编辑昵称
      editPhone:false,//更改手机号
      saveBtn:false,//保存按钮
      feildText:null,//擅长领域
      induText:null,//擅长行业
    }
  },
  components:{
    WorkHeader
  },
  computed:{
    ...mapState(['userMes','token'])
  },
  created(){
    console.log(this.userMes)
    this.engPhone=this.userMes.mobile;
    this.nickName=this.userMes.ictEngineerVO.name;
    this.feildText=this.userMes.ictEngineerVO.expert;
    if(this.userMes.ictEngineerVO.industry!=null){
      this.induText=this.userMes.ictEngineerVO.industry;
    }else{
      this.induText='-'
    }
  },
  methods:{
    ...mapMutations(['userMes_fn']),
    saveNick(){
      let _this=this;
      if(_this.nickName==null||_this.nickName==''){
        _this.$toast('请输入昵称')
      }else{
        let formdata=new FormData();
        formdata.append('name',_this.nickName);
        _this.$axios.post(_this.url+'/ict/engineer/savePersonalCenter',formdata,{
          headers:{
            'Authorization':_this.token
          }
        }).then((res)=>{
          console.log(res);
          if(res.data.code==0){
            _this.editNick=false;
            _this.saveBtn=false;
            _this.$toast('修改昵称成功');
            _this.userMes_fn(res.data.data.ictOperatorVO)
            // _this.nickName=res.data.data.name;
          }else{
            _this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          _this.$toast('未知错误,请联系客服')
          // console.log(err)
          _this.editNick=false;
          _this.saveBtn=false;
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.mine{
  width: 100%;
  padding-top:5rem;
  padding-bottom: 1rem;
  .mine_con{
    width: $tem-width;
    margin:0 auto;
    .con_card{
      height: 15rem;
      width: 100%;
      margin-top: 1rem;
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 5px;
      p{
        box-sizing: border-box;
        padding-left: 1rem;
        font-size: 1.4rem;
      }
      .user_pic{
        height: 10rem;
        line-height: 10rem;
        position: relative;
        border-bottom: 1px solid #eee;
        img{
          width: 8rem;
          height: 8rem;
          border-radius: 50%;
          position: absolute;
          right:2rem;
          top:1rem;
        }
      }
      .user_nickname{
        line-height: 5rem;
        position: relative;
        overflow: hidden;
        input{
          width: 100%;
          height: 3rem;
          line-height: 3rem;
          border-bottom:1px solid #ccc;
          position: absolute;
          left:4.5rem;
          top:0rem;
        }
        span{
          width: 100%;
          height: 100%;
          position: absolute;
          left:0;
          right:0;
          opacity: 0;
        }
      }
    }
    .con_mes{
      width: 100%;
      margin-top: 1rem;
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 5px;
      overflow: hidden;
      ul{
        li{
          height: 7rem;
          line-height: 7rem;
          box-sizing: border-box;
          padding-left: 1rem;
          font-size: 1.4rem;
          border-bottom:1px solid #eee;
          overflow: hidden;
          position: relative;
          .right_oper{
            position: absolute;
            right:2rem;
          }
          .icon{
            top:.5rem;
          }
        }
        li:first-child{
          position: relative;
          overflow: hidden;
          input{
            width: 100%;
            height: 3rem;
            border-bottom:1px solid #ccc;
            position: absolute;
            left:6rem;
            top:2rem;
          }
          span{
            width: 100%;
            height: 100%;
            position: absolute;
            left:0;
            right:0;
            opacity: 0;
          }
        }
      }
    }
  }
  .save_btn{
    width: 100%;
    position: fixed;
    bottom:0;
    left:0;
    padding-bottom: 1rem;
    text-align: center;
    button{
      width: $tem-width;
      background: $btn-color;
      color:white;
      height: 3.5rem;
      font-size: 1.5rem;
      border-radius:20px;
    }
  }
}
</style>
