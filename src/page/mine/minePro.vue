<!-- 个人接单 -->
<template lang="html">
  <div class="mine_pro">
    <WorkHeader>
      <p>我的接单</p>
    </WorkHeader>
    <van-tabs  title-active-color="#C93625" color="#C93625" @click="changeState">
      <van-tab v-for="index in tableList" :title="index" :key="index">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            class="pro_list"
          >
            <van-cell  v-for="(pro,indexPro) in proList" :key="indexPro" class="list_con" @click="mineDetails(indexPro)">
              <span class="pro_name">{{pro.ictDemandVO.projectName}}</span><br>
              <van-icon name="location" />
              <span class="pro_address pro_public">{{pro.ictDemandVO.address}}</span><br>
              <span class="pro_date pro_public">执行时间:&nbsp;{{pro.ictDemandVO.startTime}}至{{pro.ictDemandVO.createTime}}</span>
              <!--  -->
              <span class="pro_count">￥{{parseInt(pro.ictDemandVO.maxBudget)}}</span>
              <span class="pro_status">
                <!--
                <span v-if="pro.state==4" class="public_tate" style="color:#666;">已完成</span>
                <span v-if="pro.state==1" class="public_tate" style="color:red;">进行中</span>
                <span v-if="pro.state==0" class="public_tate" style="color:#ccc;">已申请</span> -->
                <p v-if="pro.state==0" style="color:#999;">已申请</p>
                <!-- <p v-if="pro.ictDemandVO.state==3&&pro.choose==null" style="color:#666;">已开工</p> -->
                <p v-if="pro.ictDemandVO.state==4" style="color:#C93625;">已完工</p>
                <p v-if="pro.ictDemandVO.state==5" style="color:#C93625;">已付款</p>
                <p v-if="pro.choose!=null&&pro.ictDemandVO.state==3">
                  <van-button round type="info" size="small" color="#404040" v-if="pro.choose">未交付</van-button>
                  <span v-else style="color:#666;">未入选</span>
                </p>
              </span>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import WorkHeader from '@/components/work_header'
export default {
  data(){
    return{
      tableList:['全部','已申请','未交付','已交付','已完成'],
      count: 0,
      isLoading: false,
      loading: false,
      finished: false,
      proList:[
        {
          ictDemandVO:{
            projectName:'北京XX集团视频监控项目',
            place:'北京  东城',
            beginTime:'2019-09-08',
            endTime:'2019-12-28',
            count:20001,
            state:1,
            code:'联调割接'
          }
        },
      ],
    }
  },
  computed:{
    ...mapState(['userMes','token'])
  },
  created(){
    this.getOrderList()
  },
  components:{WorkHeader},
  methods:{
    ...mapMutations(['proMes_fn']),
    onLoad() {   //下拉加载
      setTimeout(() => {
        this.loading = false;
        setTimeout(()=>{
          this.finished=true;
        },500)
      }, 500);
    },
    onRefresh() {   //下拉刷新
      this.getOrderList()
     setTimeout(() => {
         this.$toast('刷新成功');
         this.isLoading = false;
         this.count++;
       }, 500);
    },
    mineDetails(index){//接单详情
      this.proMes_fn(this.proList[index])
      this.$router.push({
        name:'MineProDe'
      })
    },
    getOrderList(type,choose){//获取接单列表
      let _this=this;
      let formdata=new FormData();
      formdata.append('engineerId',_this.userMes.ictEngineerVO.id);
      if(type!=undefined){
        if(type!=1){
          formdata.append('demandState',type);
          formdata.append('choose',choose);
        }else if(typeof(type)==Array){
          type.forEach((e)=>{
            formdata.append('demandState',e);
          })
          formdata.append('choose',choose);
        }else{
          formdata.append('demandState',type);
        }
      }
      _this.$axios.post(_this.url+'/ict/applyRecord/findListByCondition',formdata,{headers:{
        'Authorization':_this.token
      }}).then((res)=>{
        console.log(res)
        if(res.data.code==0){
          _this.proList=res.data.data.content;
        }else {
          _this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        _this.$toast('未知错误,请联系客服')
      })
    },
    changeState(name,title){
      this.onLoad()
      // console.log(title);
      // console.log(name);
      if(title==='全部'){
        this.getOrderList()
      }else if(title==='已申请'){
        this.getOrderList(1)
      }else if(title==='未交付'){
        this.getOrderList([2,3],true)
      }else if(title==='已交付'){
        this.getOrderList(4,true)
      }else if(title==='已完成'){
        this.getOrderList(5,true)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.mine_pro{
  width: 100%;
  padding-top: 5rem;
  .pro_list{
    width: 100%;
    height: 100%;
    overflow: auto;
    .list_con{
      width: 95%;
      margin:0 auto;
      margin-top:1rem;
      height: 12rem;
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
      position: relative;
      .pro_name{
        font-weight: bold;
        font-size: 1.5rem;
      }
      .pro_public{
        color:#666;
        margin-top:1rem;
      }
      .pro_count{
        color:$tem-color;
        font-weight: bold;
        position: absolute;
        top:.2rem;
        right:.5rem;
      }
      .pro_status{
        position: absolute;
        right:1rem;
        bottom: 1rem;
        // marginrem-left: 2.5rem;
        .public_tate{
          margin-left: 1rem;
          font-size: 1.3rem;
        }
      }
    }
  }
}
</style>
