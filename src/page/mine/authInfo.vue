<!-- 用户认证信息 -->
<template lang="html">
  <div class="auth_info">
    <WorkHeader>
      <p>认证信息</p>
      <router-link to="/addSkill" tag="span" class="addSkill">添加</router-link>
      <!-- <span class="addSkill">添加</span> -->
    </WorkHeader>
    <div class="info_con">
      <ul class="auth_mes">
        <li>所在地区:&nbsp;&nbsp;{{userMes.ictEngineerVO.livePlace}}</li>
        <li>擅长领域:&nbsp;&nbsp;{{userMes.ictEngineerVO.expert}}</li>
        <li>服务类型:&nbsp;&nbsp;{{userMes.ictEngineerVO.serviceType}}</li>
      </ul>
      <ul  class="auth_card" v-for="(skillMes,indexSk) in userMes.ictEngineerVO.certificateVOList">
        <li>证书类型:&nbsp;&nbsp;{{skillMes.name}}</li>
        <li>所属行业:&nbsp;&nbsp;{{skillMes.industry}}</li>
        <li>证书图片:&nbsp;&nbsp;
          <p>
            <img v-for="(picDe,indexPic) in skillMes.fileList" :src="url+'/'+picDe" alt="" @click="perView(indexSk)">
          </p>
        </li>
      </ul>
    </div>
    <!-- 图片预览盒子 -->
    <div class="">
      <van-image-preview
        v-model="skillPicBox"
        :images="images"
      />
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {mapState} from 'vuex'
export default {
  data(){
    return{
      skillPicBox:false,//图片预览盒子
      images:[],//图片列表
    }
  },
  watch:{
    skillPicBox(val,oldVal){
      if(!val){
        this.images=[];
      }
    }
  },
  methods:{
    perView(index){
      this.userMes.ictEngineerVO.certificateVOList[index].fileList.forEach((e)=>{
        this.images.push(this.url+'/'+e)
      });
      this.skillPicBox=true;
    },
  },
  components:{
    WorkHeader
  },
  computed:{
    ...mapState(['userMes'])
  },
  created(){
    for(let i in this.userMes.ictEngineerVO.certificateVOList){
      this.$set(this.userMes.ictEngineerVO.certificateVOList[i],'fileList',this.userMes.ictEngineerVO.certificateVOList[i].fileName.split(','))
    }
  },
}
</script>

<style lang="scss" scoped>
.auth_info{
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 5rem;
  .addSkill{
    position: fixed;
    color:white;
    right:2rem;
    top:0;
    font-size: 1.5rem;
  }
  .info_con{
    width: $tem-width;
    margin:0 auto;
    .auth_mes{
      width: 100%;
      li{
        height: 6rem;
        line-height: 6rem;
        font-size: 1.4rem;
        overflow: hidden;
        margin-top: 1rem;
        border-radius: 10px;
        box-sizing: border-box;
        padding-left: 1.5rem;
        box-shadow: 0px 0px 5px #ccc;
      }
    }
    .auth_card{
      width:100%;
      margin:0 auto;
      margin-top: 1rem;
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 10px;
      padding-bottom: 10px;
      li{
        line-height: 5rem;
        font-size: 1.4rem;
        box-sizing: border-box;
        padding-left: 1.5rem;
        overflow: hidden;
        p{
          display: flex;
          flex-wrap: wrap;
        }
        img{
          width: 40%;
          height: 8rem;
          margin-bottom: 1rem;
          margin-left: 2rem;
          border-radius: 5px;
          border:1px solid $tem-color;
        }
      }
    }
  }
}
</style>
