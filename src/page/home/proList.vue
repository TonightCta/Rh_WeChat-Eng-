<template lang="html">
  <div class="pro_list">
    <van-tabs>
      <van-tab v-for="index in tableList" :title="index" :key="index" title-active-color="red">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            class="pro_list"
          >
            <van-cell  v-for="(pro,indexPro) in proList" :key="indexPro" class="list_con">
              <span class="pro_name">{{pro.name}}</span><br>
              <van-icon name="location" />
              <span class="pro_address pro_public">{{pro.place}}</span><br>
              <span class="pro_date pro_public">执行时间:{{pro.beginTime}}至{{pro.endTime}}</span>
              <span class="pro_count">￥{{pro.count}}</span>
              <span class="pro_status">
                <van-button round type="info" size="small" color="red" @click="proApply(indexPro)">立即申请</van-button>
              </span>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data(){
    return{
      tableList:['推荐','数据通信','IT实施','视频监控','UC&C','HCIE'],
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
        {
          name:'山东集团有限公司',
          place:'山东  聊城',
          beginTime:'2019-09-08',
          endTime:'2019-12-28',
          count:16850,
          state:3,
          code:'进场开工'
        },
        {
          name:'天津项目',
          place:'天津  滨海新区',
          beginTime:'2019-09-08',
          endTime:'2019-12-28',
          count:78000,
          state:4,
          code:'驻场维护'
        },
        {
          name:'济南控股有限公司',
          place:'济南  区',
          beginTime:'2019-09-08',
          endTime:'2019-12-28',
          count:6988,
          state:2,
          code:'加电单调'
        },
        {
          name:'北京XX集团视频监控项目',
          place:'北京  东城',
          beginTime:'2019-09-08',
          endTime:'2019-12-28',
          count:20001,
          state:2,
          code:'硬件安装'
        }
      ],
    }
  },
  methods:{
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
      this.$router.push({
        name:'ProDetials',
        params:{
          proMes:this.proList[indexPro]
        }
      })
    },
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
      margin-left: 2.5rem;
    }
  }
}
</style>
