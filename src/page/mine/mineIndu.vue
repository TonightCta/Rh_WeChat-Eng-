<!-- 擅长行业 -->
<template lang="html">
  <div class="mine_indu">
    <WorkHeader>
      <p>擅长行业</p>
    </WorkHeader>
    <div class="indu_con">
      <ul>
        <li v-for="(filed,indexFe) in felidList" ref="feildDom" @click="choseFeild(indexFe)">
          <span ref="feildBack" @click.stop="backFeild(indexFe)"></span>
          {{filed}}</li>
      </ul>
      <p class="manual_add">
        <input type="text" name="" value="" placeholder="自行添加擅长行业" v-model="manualText">
        <button type="button" name="button" v-show="isText">确定</button>
      </p>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  components:{WorkHeader},
  data(){
    return{
      felidList:['Ucc','数通','IT'],
      manualText:null,//自编辑技能
      isText:false,//添加按钮
    }
  },
  methods:{
    choseFeild(index){
      this.$refs.feildDom[index].style.background="#C93625"
      this.$refs.feildDom[index].style.color="white";
      this.$refs.feildBack[index].style.display="block";
    },
    backFeild(index){
      this.$refs.feildDom[index].style.background="white";
      this.$refs.feildDom[index].style.color="black";
      this.$refs.feildBack[index].style.display="none";
    }
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
.mine_indu{
  width: 100%;
  padding-top: 5rem;
  .indu_con{
    width: $tem-width;
    margin:0 auto;
    ul{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li{
        width: 5rem;
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
}
</style>
