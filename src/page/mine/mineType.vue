<!-- 服务类别 -->
<template lang="html">
  <div class="mine_type">
    <WorkHeader>
      <p>服务类型</p>
    </WorkHeader>
    <div class="type_con">
      <ul>
        <li v-for="(filed,indexFe) in typeList" ref="typeDom" @click="choseFeild(indexFe)">
          <span ref="typeBack" @click.stop="backFeild(indexFe)"></span>
          {{filed}}</li>
      </ul>
      <p class="manual_add">
        <input type="text" name="" value="" placeholder="自行添加服务类型" v-model="manualText">
        <button type="button" name="button" v-show="isText" @click="addType()">确定</button>
      </p>
    </div>
    <p class="saveBtn">
      <button type="button" name="button" @click="saveType()">保存</button>
    </p>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  components:{WorkHeader},
  data(){
    return{
      typeList:['故障处理','安装调试','设备巡检','售前支持','信息化管理软件','咨询服务','视频监控','其他'],
      manualText:null,//自编辑技能
      isText:false,//添加按钮
      turnList:[],//需求类型列表
      typeText:null,//需求类型文本
    }
  },
  methods:{
    choseFeild(index){//选中需求类型
      this.$refs.typeDom[index].style.background="#C93625"
      this.$refs.typeDom[index].style.color="white";
      this.$refs.typeBack[index].style.display="block";
      this.turnList.push(this.typeList[index]);
      console.log(this.turnList)
    },
    backFeild(index){//取消选择
      this.$refs.typeDom[index].style.background="white";
      this.$refs.typeDom[index].style.color="black";
      this.$refs.typeBack[index].style.display="none";
      this.turnList.splice(this.turnList.indexOf(this.typeList[index]),1)
      console.log(this.turnList)
    },
    addType(){//自定义需求类型
      this.typeList.push(this.manualText);
      this.manualText=null;
    },
    saveType(){//保存选择
      if(this.turnList.length<5){
        this.$toast('请选择至少五项服务类型')
      }else{
        this.$router.push({
          name:'EngAuth',
          params:{
            typeText:this.turnList.join('/')
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
.mine_type{
  width: 100%;
  padding-top: 5rem;
  .type_con{
    width: $tem-width;
    margin:0 auto;
    ul{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li{
        padding-left: .4rem;
        padding-right: .4rem;
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
