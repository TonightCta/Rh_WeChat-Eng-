<!-- 项目交付 -->
<template lang="html">
  <div class="mine_nliver">
    <WorkHeader>
      <p>项目交付</p>
    </WorkHeader>
    <div class="nliver_con">
      <ul>
        <li>
          完成时间:&nbsp;
          <input type="text" name="" value=""v-model="endTime" placeholder="请选择完成时间">
          <span @click="choseDate()"></span>
        </li>
        <li>
          <p>请上传任务图片或视频</p>
          <p>
            <van-uploader v-model="fileList" multiple :after-read="turnLoca" class="showPic"/>
          </p>
        </li>
      </ul>
    </div>
    <van-popup
      v-model="dateChose"
      position="bottom"
      :style="{ height: '33%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="turnDate"
        :min-date="minDate"
      />
    </van-popup>
    <div class="sub_btn">
      <button type="button" name="button" @click="subDeliver()">立即上传</button>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {mapState,mapMutations} from 'vuex'
export default {
  components:{WorkHeader},
  data(){
    return{
      currentDate:null,//初始化日期组件
      minDate:new Date(),//最小选择日期
      dateChose:false,//日期选择器
      endTime:null,//完成时间
      fileList: [],//回显列表
    }
  },
  computed:{
    ...mapState(['proMesV','token'])
  },
  created(){
    console.log(this.proMesV)
  },
  methods:{
    ...mapMutations(['proMes_fn']),
    choseDate(){//选择时间
      this.dateChose=true;
    },
    turnDate(value){//选择完工日期
      let year=value.getFullYear();
      let month=value.getMonth()+1;
      let day=value.getDate();
      this.endTime=year+'-'+month+'-'+day;
      this.dateChose=false;
    },
    turnLoca(file){//选择文件
      console.log(file);
      console.log(this.fileList)
    },
    subDeliver(){//提交交付
      let _this=this;
      console.log(this.fileList);
      console.log(_this.proMesV)
      if (_this.endTime==null){
        _this.$toast('请选择完工时间')
      }else if(_this.fileList.length<1){
        _this.$toast('请上传至少一张完工报告')
      }else{
        let formdata=new FormData();
        formdata.append('demandId',_this.proMesV.ictDemandVO.id);
        formdata.append('finishTime',_this.endTime);
        _this.fileList.forEach((e)=>{
          formdata.append('files',e.file);
        });
        _this.$axios.post(_this.url+'/ict/demand/finish',formdata,{
          headers:{
            'Authorization':_this.token
          }
        }).then((res)=>{
          if(res.data.code==0){
            console.log(res);
            _this.proMes_fn(res.data.data);
            _this.$toast('项目交付成功,等待客户付款');
            _this.$router.go(-1);
          }else{
            _this.$toast(res.data.msg)
          }
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.mine_nliver{
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 5rem;
  .nliver_con{
    width: $tem-width;
    margin:0 auto;
    ul{
      li{
        width: 100%;
        line-height: 5rem;
        font-size: 1.5rem;
        box-shadow: 0px 0px 5px #ccc;
        margin-top: 1rem;
        border-radius: 8px;
        box-sizing: border-box;
        padding-left: 1rem;
        position: relative;
        input{
          position: absolute;
          left:8rem;
          top:.1rem;
          width: 15rem;
          height: 3rem;
          line-height: 3rem;
        }
        span{
          width: 100%;
          height: 100%;
          left:0;
          top:0;
          position: absolute;
          background: red;
          opacity: 0;
        }
        // .showPic{
        //   display: flex;
        //   justify-content: space-around;
        // }
      }
    }
  }
  .sub_btn{
    width: $tem-width;
    position: fixed;
    left:2.5%;
    bottom:1rem;
    button{
      width: 100%;
      height: 4rem;
      border-radius: 20px;

      background: $btn-color;
      color:white;
      font-size: 1.5rem;
    }
  }
}
</style>
