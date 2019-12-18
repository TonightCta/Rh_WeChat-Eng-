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
          <button type="button" name="button">立即接单</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  data(){
    return{
      fileList: [
        { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
      ]
    }
  },
  methods:{
    turnLoca(file){//选择文件
      console.log(file);
      console.log(this.fileList)
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

}
</style>
