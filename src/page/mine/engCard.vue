<!-- 工程师认证 -->
<template lang="html">
  <div class="eng_addskill">
    <WorkHeader>
      <p>工程师认证</p>
    </WorkHeader>
    <div class="skill_eng">
      <ul>
        <li>证书名称:&nbsp;<input type="text" name="" value="" placeholder="请输入持有证书名称" v-model="cerName"/></li>
        <li>所属行业:&nbsp;<input type="text" name="" value="" placeholder="请输入所属行业" v-model="cerType"/></li>
        <li>
          <p>请上传证书图片</p>
          <van-uploader v-model="fileList" multiple preview-size="130"/>
        </li>
      </ul>

    </div>
    <p class="upCard_btn">
      <button type="button" name="button" @click="subAuth()">立即上传</button>
    </p>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import WorkHeader from '@/components/work_header'
export default {
  data(){
    return{
      fileList: [],//上传文件列表
      cerName:null,//证书名称
      cerType:null,//所属行业
    }
  },
  computed:{
    ...mapState(['engAuth','token'])
  },
  methods:{
    ...mapMutations(['userMes_fn']),
    subAuth(){//上传认证
      let _this=this;
      if(_this.cerName==null||_this.cerName==''){
        _this.$toast('请输入证书名称')
      }else if(_this.cerType==null||_this.cerType==''){
        _this.$toast('请输入所属行业')
      }else if(_this.fileList.length<1){
        _this.$toast('请上传至少一张证书')
      }else{
        let formdata=new FormData();
        formdata.append('livePlace',_this.engAuth.cityText)
        formdata.append('expert',_this.engAuth.feildText)
        formdata.append('serviceType',_this.engAuth.typeText)
        formdata.append('receivingPlace',_this.engAuth.workText);
        formdata.append('phone',_this.engAuth.phone);
        formdata.append('email',_this.engAuth.email);
        let formdataCer=new FormData();
        formdataCer.append('name',_this.cerName)
        formdataCer.append('industry',_this.cerType)
        _this.fileList.forEach((e)=>{
          formdataCer.append('files',e.file)
        })
        _this.$axios.post(_this.url+'/ict/engineer/saveInfo',formdata,{
          headers:{
            'Authorization':_this.token
          }
        }).then((res)=>{
          let formdataT=new FormData();

          if(res.data.code==0){
            _this.$axios.post(_this.url+'/ict/engineer/saveCertificate',formdataCer,{
              headers:{
                'Authorization':_this.token
              }
            }).then((res)=>{
              console.log(res);
              if(res.data.code==0){
                _this.userMes_fn(res.data.data);
                _this.$toast('您的认证信息已提交,请耐心等待系统审核');
                _this.$router.push('/mine')
              }else{
                _this.$toast(res.data.msg)
              }
            }).catch((err)=>{
              console.log(err)
              _this.$toast('未知错误,请联系客服')
              // console.log(err)
            })
          }else{
            _this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          console.log(err)
        })
      }
      console.log(this.fileList)
    },
  },
  components:{WorkHeader}
}
</script>

<style lang="scss" scoped>
.eng_addskill{
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 5rem;
  .skill_eng{
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
