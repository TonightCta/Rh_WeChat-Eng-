<!-- 申请接单 -->
<template lang="html">
  <div class="pro_apply">
    <WorkHeader>
      <p>申请接单</p>
    </WorkHeader>
    <div class="apply_con">
      <ul>
        <li>
          <p>发送您的项目优势,更容易被选中哦！</p>
          <p>
            <van-uploader v-model="fileList" multiple :after-read="turnLoca" class="showPic"/>
          </p>
        </li>
        <li>
          <button type="button" name="button" @click="subApply()">立即接单</button>
        </li>
      </ul>
      <div class="mustknow">
        <van-dialog
          v-model="mustKnow"
          title="申请需知"
          @confirm="turnSub"
          confirmButtonColor="#C93625"
        >
          <!-- <img src="https://img.yzcdn.cn/vant/apple-3.jpg"> -->
          <div class="nodeKnow">
            <p>一、我完成了一个任务可以拿到多少赏金？</p>
            <span>1.雇主要求开具发票，接单工程师可提供相应发票，任务完成后工程师可以获得90%的项目赏金，“犀牛小哥”提供开票信息，工程师需按照雇主要求开具相应类型的发票。</span>
            <span>2.雇主要求开具发票，工程师不能提供相应发票，项目完成后工程师可获得85%的项目赏金。</span>
            <span>3.雇主不要求开具发票，任务完成后工程师可以获得90%的任务赏金。</span>
            <p style="marginTop:1rem;">二、任务的价格和时间是雇主根据其行业特点和专业需求确定的，提倡专业的工程师申请专业的任务；在工程师申请并入围之后通过此功能与平台项目经理协商确定。若双方没有达成共识，工程师主动放弃了这次任务，将不会影响其在平台的信用值。</p>
            <p style="marginTop:1rem;">三、申请接单后，平台通过了审核，工程师需第一时间和平台方达成服务共识；尽快按照要求到达指定地点完成指定任务。</p>
          </div>
          <!-- <p class="noAnswer">
            <van-radio-group v-model="isAgain" checked-color="#C93625" icon-size="18">
              <van-radio name="1">不再提示</van-radio>
            </van-radio-group>
          </p> -->
        </van-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {mapState} from 'vuex'
export default {
  data(){
    return{
      fileList: [
        { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
      ],
      mustKnow:false,//申请需知
      isAgain:2,
    }
  },
  computed:{
    ...mapState(['token','proMesV'])
  },
  methods:{
    turnLoca(file){//选择文件
      console.log(file);
      console.log(this.fileList)
    },
    subApply(){//上传申请
      this.mustKnow=true;
    },
    turnSub(){//提交申请
      let _this=this;
      let formdata=new FormData();
      formdata.append('demandId',_this.proMesV.id);
      _this.$axios.post(_this.url+'/ict/applyRecord/apply',formdata,{headers:{
        'Authorization':_this.token
      }}).then((res)=>{
        if(res.data.code==0){
          _this.$dialog.alert({
            message: '申请提交成功,等待平台审核！上传资质认证及相关证书提高成功率吧',
            confirmButtonColor:'#C93625',
            showCancelButton:true,
          }).then(()=>{
            _this.$router.push('/mineAuth')
          }).catch(()=>{
            _this.$router.push('/')
          })
        }else{
          _this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        _this.$toast('未知错误,请联系客服')
      })
    },
  },
  components:{
    WorkHeader
  }
}
</script>

<style lang="scss" scoped>
.pro_apply{
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 2rem;
  .apply_con{
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
      }
      li:last-child{
        position: fixed;
        width: $tem-width;
        bottom:0;
        box-shadow: none;
        button{
          width: 97%;
          height: 3.5rem;
          border-radius: 20px;
          background: $btn-color;
          font-size: 1.5rem;
          line-height: 3.5rem;
          color:white;
        }
      }
    }
  }
  .mustknow{
    p{
      font-size: 1.5rem;
      width: 90%;
      margin:0 auto;
    }
    span{
      width: 80%;
      margin-left:4rem;
      margin-top: 1rem;
      word-wrap:break-word;
    }
    .nodeKnow{
      height: 12rem;
      overflow-y: auto;
      span{
        font-size: 1.3rem;
      }
    }
    .noAnswer{
      margin-top: 2rem;
      margin-left: 2rem;
      margin-bottom: 1rem;
    }
  }
}
</style>
