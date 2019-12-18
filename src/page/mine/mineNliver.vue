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
          <input type="text" name="" value="" @click="choseDate()" v-model="endTime" placeholder="请选择完成时间">
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
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  components:{WorkHeader},
  data(){
    return{
      currentDate:null,//初始化日期组件
      minDate:new Date(),//最小选择日期
      dateChose:false,//日期选择器
      endTime:null,//完成时间
      fileList: [
        { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
      ]
    }
  },
  methods:{
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
          right:.5rem;
          top:.1rem;
          width: 77%;
          height: 90%;
        }
        // .showPic{
        //   display: flex;
        //   justify-content: space-around;
        // }
      }
    }
  }
}
</style>
