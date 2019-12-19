<!-- 身份认证 -->
<template lang="html">
  <div class="mine_card">
    <WorkHeader>
      <p>身份认证</p>
    </WorkHeader>
    <div class="card_con">
      <ul>
        <li>真实姓名:&nbsp;<input type="text" name="" value="" placeholder="请输入您的真实姓名"></li>
        <li>证件号码:&nbsp;<input type="text" name="" value="" placeholder="请输入您的真实姓名"></li>
        <li>
          请上传本人有效二代身份证件
          <div class="" style="display:flex;">
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
      <p class="upCard_btn">
        <button type="button" name="button">立即上传</button>
      </p>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  data(){
    return{
      isPic:[],//身份证正面照片
      thePic:[],//身份证反面照片
      isUpPic:true,//正面上传按钮
      enlPic:false,//查看大图
      theUpPic:true,//反面上传按钮
      enlPicThe:false,//反面查看大图
    }
  },
  methods:{
    choseIS(e){//上传正面图
      let _this=this;
      let file=e.target.files[0];
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
     choseThe(e){
       let _this=this;
       let file=e.target.files[0];
       let reader=new FileReader();
       reader.readAsDataURL(file);
       reader.onload=function(){
         _this.thePic.push(this.result);
         _this.theUpPic=false;
       };
     },
     delThePic(){
       this.thePic=[];
       this.theUpPic=true;
     }
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
