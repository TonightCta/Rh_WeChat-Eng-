<template lang="html">
  <div class="pro_list">
    <van-tabs @click="changeData" title-active-color="#C93625" color="#C93625">
      <van-tab v-for="index in tableList" :title="index" :key="index" sticky>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            class="pro_list"
          >
            <van-cell  v-for="(pro,indexPro) in proList" :key="indexPro" class="list_con">
              <span class="pro_name">{{pro.projectName}}</span><br>
              <van-icon name="location" />
              <span class="pro_address pro_public">{{pro.place}}</span><br>
              <span class="pro_date pro_public">执行时间:{{pro.startTime}}至{{pro.createTime}}</span>
              <span class="pro_count">￥{{parseInt(pro.maxBudget)}}</span>
              <span class="pro_status">
                <van-button round type="info" size="small" color="#404040" @click="proApply(indexPro)">立即申请</van-button>
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
export default {
  data(){
    return{
      tableList:['推荐','故障处理','安装调试','设备巡检','售前支持','信息化管理','咨询服务','视频监控'],
      count: 0,
      isLoading: false,
      loading: false,
      finished: false,
      proList:[
        {
          name:'北京XX集团视频监控项目',
          place:'北京  东城',
          beginTime:'2019-09-08',
          endTime:'2019-12-28',
          count:20001,
          state:1,
          code:'联调割接'
        },
      ],
      page:0,
    }
  },
  computed:{
    ...mapState(['token'])
  },
  mounted(){
    this.getProList()
  },
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
     setTimeout(() => {
         this.$toast('刷新成功');
         this.isLoading = false;
         this.count++;
       }, 500);
    },
    proApply(indexPro){
      if(this.token==null||this.token==''){
        this.$toast('您还未登录, 请您进行登录')
      }else{
        this.proMes_fn(this.proList[indexPro])
        this.$router.push({
          name:'ProDetials'
        })
      }
    },
    getProList(type){
      let _this=this;
      let formdata=new FormData();
      formdata.append('page',_this.page);
      if(type!=undefined&&type!=='推荐'){
        formdata.append('type',type);
      }
      _this.$axios.post(_this.url+'/ict/public/demand/findListByCondition',formdata,{
        headers:{
          'Authorization':_this.token
        }
      }).then((res)=>{
        // console.log(res);
        if(res.data.code==0){
          _this.proList=res.data.data.content;
        }else{
          _this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        _this.$toast('获取数据异常,请联系客服')
      })
    },
    changeData(name,title){
      this.getProList(title);
      this.onLoad()
      // console.log(title)
    }
  }
}
</script>

<style lang="scss" scoped>
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
      right:.2rem;
      bottom:.6rem;
      // margin-left: 3rem;
    }
  }
}
</style>
