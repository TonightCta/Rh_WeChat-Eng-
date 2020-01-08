<!-- 身份认证 -->
<template lang="html">
  <div class="mine_card">
    <WorkHeader>
      <p>身份认证</p>
    </WorkHeader>
    <div class="card_con">
      <ul>
        <li>真实姓名:&nbsp;<input type="text" name="" value="" placeholder="请输入您的真实姓名" v-model="cardName"></li>
        <li>证件号码:&nbsp;<input type="text" name="" value="" placeholder="请输入您的真实姓名" v-model="cardID"></li>
        <li>
          请上传本人有效二代身份证件
          <div class="" style="display:flex;" v-if="isHasUp">
            <p>
              <span>
                <img :src="isPicB" alt="" v-for="(isPicB,index) in isPic" @click="enlPic=true">
                <input type="file" Accept="image/*" name="" value="" @change="choseIS" v-if="isUpPic">
                <i v-else>
                  <van-icon name="clear" size="20" @click="delLocaPic()"/>
                </i>
              </span>
            </p>
            <p>
              <span>
                <img :src="thePicT" alt="" v-for="thePicT in thePic" @click="enlPicThe=true">
                <input type="file" Accept="image/*" name="" value="" @change="choseThe" v-if="theUpPic">
                <i v-else>
                  <van-icon name="clear" size="20" @click="delThePic()"/>
                </i>
              </span>
            </p>
          </div>
          <div class="" style="display:flex;" v-else>
            <p v-for="upPic in userMes.ictEngineerVO.identityVOList">
              <span>
                <img :src="url+'/'+upPic.fileName" alt="" @click="backPic=true">
              </span>
            </p>
          </div>
        </li>
      </ul>
      <div class="">
        <van-image-preview
          v-model="enlPic"
          :images="isPic"
        >
        </van-image-preview>
      </div>
      <div class="">
        <van-image-preview
          v-model="enlPicThe"
          :images="thePic"
        >
        </van-image-preview>
      </div>
      <div class="">
        <van-image-preview
          v-model="backPic"
          :images="backPicList"
        >
        </van-image-preview>
      </div>
      <p class="upCard_btn" v-if="upCardBtn">
        <button type="button" name="button" @click="subCard()">立即上传</button>
      </p>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {mapState,mapMutations} from 'vuex'
export default {
  data(){
    return{
      isPic:[],//身份证正面照片
      thePic:[],//身份证反面照片
      upIsPic:[],//上传正面图文件
      upThePic:[],//上传正面图文件
      isUpPic:true,//正面上传按钮
      enlPic:false,//查看大图
      theUpPic:true,//反面上传按钮
      enlPicThe:false,//反面查看大图
      cardName:null,//真实姓名
      cardID:null,//身份证号
      isHasUp:true,//是否已上传身份证
      backPic:false,//回显预览
      backPicList:[],//回显列表数据
      upCardBtn:true,//是否已通过认证
    }
  },
  computed:{
    ...mapState(['token','userMes'])
  },
  created(){
    if(this.userMes.ictEngineerVO.realName!=null){
      this.cardName=this.userMes.ictEngineerVO.realName;
    };
    if(this.userMes.ictEngineerVO.idCard!=null){
      this.cardID=this.userMes.ictEngineerVO.idCard;
    };
    if(this.userMes.ictEngineerVO.identityVOList!=null){
      this.isHasUp=false;
      this.userMes.ictEngineerVO.identityVOList.forEach((e)=>{
        this.backPicList.push(this.url+'/'+e.fileName)
      });
      this.upCardBtn=false;
    }
  },
  methods:{
    ...mapMutations(['userMes_fn']),
    choseIS(e){//上传正面图
      let _this=this;
      let file=e.target.files[0];
      _this.upIsPic.push(file)
      let reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload=function(){
        _this.isPic.push(this.result);
       _this.isUpPic=false;
      };
     },
     delLocaPic(){//删除正面图
       this.isPic=[];
       this.isUpPic=true;
     },
     choseThe(e){//上传反面图
       let _this=this;
       let file=e.target.files[0];
       _this.upThePic.push(file)
       let reader=new FileReader();
       reader.readAsDataURL(file);
       reader.onload=function(){
         _this.thePic.push(this.result);
         _this.theUpPic=false;
       };
     },
     delThePic(){//删除反面图
       this.thePic=[];
       this.theUpPic=true;
     },
     subCard(){//上传身份证信息
       let _this=this;
       if(_this.cardName==null||_this.cardName==''){
         _this.$toast('请输入您的真实姓名')
       }else if(_this.cardID==null||_this.cardID==''){
         _this.$toast('请输入您的身份证号码')
       }else if(_this.cardID.length != 18 && !(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(_this.cardID))){
         _this.$toast('请输入正确的身份证号码')
       }else if(_this.upIsPic.length<1){
         _this.$toast('请上传身份证正面图')
       }else if(_this.upThePic.length<1){
         _this.$toast('请上传身份证反面图')
       }else{
         let formdata=new FormData();
         formdata.append('realName',_this.cardName)
         formdata.append('idCard',_this.cardID)
         formdata.append('files',_this.upIsPic[0])
         formdata.append('files',_this.upThePic[0]);
         _this.$axios.post(_this.url+'/ict/engineer/saveIdentity',formdata,{
           headers:{
             'Authorization':_this.token
           }
         }).then((res)=>{
           if(res.data.code==0) {
             _this.userMes_fn(res.data.data.ictOperatorVO);
             _this.$toast('上传实名信息成功,请耐心等待等待审核')
           }else{
             _this.$toast(res.data.msg)
           }
         }).catch((err)=>{
           _this.$toast('未知错误,请联系客服')
         })
       }
     },
  },
  components:{WorkHeader}
}
</script>

<style lang="scss" scoped>
.mine_card{
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 5rem;
  .card_con{
    width: $tem-width;
    margin:0 auto;
    ul{
      li{
        line-height: 5rem;
        box-shadow: 0px 0px 5px #ccc;
        margin-top: 1rem;
        box-sizing: border-box;
        border-radius: 8px;
        padding-left: 1rem;
        font-size: 1.5rem;
        input{
          font-size: 1.4rem;
          margin-top: .2rem;
          width: 78%;
        }
      }
      li:last-child{
        p{
          width: 50%;
          text-align: center;
          position: relative;
          span{
            width: 15rem;
            height: 9rem;
            border-radius: 8px;
            background: url('../../../static/img/bg.jpg');
            background-size: 100% 100%;
            input{
              width:15rem;
              height: 10rem;
              position: absolute;
              background: red;
              top:-.2rem;
              left:1.2rem;
              opacity:0;
              border-radius: 8px;
            }
            img{
              width: 15rem;
              height: 9rem;
              border-radius: 8px;
            }
            i{
              position: absolute;
              right:0;
              top:-.5rem;
            }
          }
        }
      }
    }
  }
  .upCard_btn{
    position: fixed;
    bottom:1rem;
    left:0;
    width: 100%;
    text-align: center;
    button{
      width: $tem-width;
      background: $btn-color;
      color:white;
      height: 3.5rem;
      border-radius: 20px;
    }
  }
}
</style>
