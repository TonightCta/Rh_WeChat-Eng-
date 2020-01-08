<!-- 擅长领域 -->
<template lang="html">
  <div class="mine_feild">
    <WorkHeader>
      <p>擅长领域</p>
    </WorkHeader>
    <div class="feild_con">
      <ul>
        <li v-for="(filed,indexFe) in felidList" ref="feildDom" @click="choseFeild(indexFe)">
          <span ref="feildBack" @click.stop="backFeild(indexFe)"></span>
          {{filed}}</li>
      </ul>
      <p class="manual_add">
        <input type="text" name="" value="" placeholder="自行添加擅长技能" v-model="manualText">
        <button type="button" name="button" v-show="isText" @click="pushSkill">确定</button>
      </p>
    </div>
    <p class="saveBtn">
      <button type="button" name="button" @click="saveFiled()">保存</button>
    </p>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {mapState} from 'vuex'
export default {
  components:{WorkHeader},
  data(){
    return{
      felidList:['数通安全','云计算','数据中心能源','软件开发','传输接入','大数据','企业无线','信息化应用软件','IT储存','企业云通信','专业服务','智能计算','其他'],
      manualText:null,//自编辑技能
      isText:false,//添加按钮
      feildList:[],//选中领域
    }
  },
  computed:{
    ...mapState(['userMes'])
  },
  mounted(){
    // this.feildList=this.userMes.ictEngineerVO.expert.split('/');
    // for(let i in this.feildList){
    //   this.$refs.feildDom[this.felidList.indexOf(this.feildList[i])].style.background="#C93625";
    //   this.$refs.feildDom[this.felidList.indexOf(this.feildList[i])].style.color="white";
    //   this.$refs.feildBack[this.felidList.indexOf(this.feildList[i])].style.display="block";
    // }
  },
  methods:{
    choseFeild(index){//选中标签
      this.$refs.feildDom[index].style.background="#C93625"
      this.$refs.feildDom[index].style.color="white";
      this.$refs.feildBack[index].style.display="block";
      this.feildList.push(this.felidList[index]);
    },
    backFeild(index){//取消选中
      this.$refs.feildDom[index].style.background="white";
      this.$refs.feildDom[index].style.color="black";
      this.$refs.feildBack[index].style.display="none";
      this.feildList.splice(this.feildList.indexOf(this.felidList[index]),1);
    },
    pushSkill(){//自定义添加标签
      this.felidList.push(this.manualText);
      this.manualText=null;
    },
    saveFiled(){//保存擅长领域
      if(this.feildList.length<5){
        this.$toast('请选择至少五项擅长领域')
      }else{
        this.$router.push({
          path:'/engAuth',
          query:{
            feildText:this.feildList.join('/')
          }
        })
      }
    },
  },
  watch:{
    manualText(val,old){
      if(val!=null&&val!=''){
        this.isText=true;
      }else{
        this.isText=false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mine_feild{
  width: 100%;
  padding-top: 5rem;
  .feild_con{
    width: $tem-width;
    margin:0 auto;
    ul{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li{
        // width: 5rem;
        padding-left:.4rem;
        padding-right:.4rem;
        height: 3rem;
        text-align: center;
        border-radius: 5px;
        line-height: 3rem;
        color:black;
        font-size: 1.4rem;
        border:1px solid $tem-color;
        margin-left: 1rem;
        margin-top: 2rem;
        position: relative;
        span{
          display: inline-block;
          width: 100%;
          height:100%;
          position: absolute;
          left:0;
          top:0;
          background: red;
          display: none;
          opacity: 0;
        }
      }
    }
    .manual_add{
      width: 100%;
      margin-top:3rem;
      position: relative;
      line-height: 4rem;
      input{
        width: 100%;
        font-size: 1.5rem;
        border-bottom:1px solid #ccc;
      }
      button{
        width: 4rem;
        height: 2.4rem;
        line-height: 2.4rem;
        font-size: 1.4rem;
        border-radius: 3px;
        background: $btn-color;
        color:white;
        position: absolute;
        right:.5rem;
        top:1rem;
      }
    }
  }
  .saveBtn{
    position: fixed;
    width: 100%;
    padding-bottom: 1rem;
    text-align: center;
    bottom:0;
    button{
      width:$tem-width;
      background: $btn-color;
      color:white;
      height: 3.5rem;
      font-size: 1.5rem;
      border-radius: 20px;
    }
  }
}
</style>
