<!-- 添加技能认证 -->
<template lang="html">
  <div class="mine_addskill">
    <WorkHeader>
      <p>身份认证</p>
    </WorkHeader>
    <div class="skill_con">
      <ul>
        <li>证书名称:&nbsp;<input type="text" name="" value="" placeholder="请输入持有证书名称"></li>
        <li>所属行业:&nbsp;<input type="text" name="" value="" placeholder="请输入所属行业"></li>
        <li>
          <p>请上传证书图片</p>
          <van-uploader v-model="fileList" multiple preview-size="130"/>
        </li>
      </ul>

    </div>
    <p class="upCard_btn">
      <button type="button" name="button">立即上传</button>
    </p>
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

  },
  components:{WorkHeader}
}
</script>

<style lang="scss" scoped>
.mine_addskill{
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 5rem;
  .skill_con{
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
