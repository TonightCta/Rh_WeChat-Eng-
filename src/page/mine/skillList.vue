<!-- 技能列表0 -->
<template lang="html">
  <div class="skill_list">
    <WorkHeader>
      <p>技能列表</p>
    </WorkHeader>
    <div class="skill_con">
      <router-link to="addSkill" tag="span" class="addSkill">添加</router-link>
      <!-- <span class="addSkill">添加</span> -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          class="pro_list"
        >
          <van-cell  v-for="(skill,indexSkill) in skillList" :key="indexSkill" class="list_con">
            <p>
              <span>{{skill.name}}</span>
              <span class="code_text" style="color:#C93625;" v-show="skill.code==1">已提交</span>
              <span class="code_text" style="color:#333;" v-show="skill.code==2">审核中</span>
              <span class="code_text" style="color:green;" v-show="skill.code==3">已通过</span>
              <span class="code_text" style="color:#666;" v-show="skill.code==4">未通过</span>
            </p>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  components:{WorkHeader},
  data(){
    return{
      skillList:[
        {name:'数通高级工程师',code:1},
        {name:'IT初级工程师',code:3},
        {name:'UCC高级工程师',code:2},
        {name:'HCIE中级工程师',code:4},
      ],
      isLoading: false,
      loading: false,
      finished: false,
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
  }
}
</script>

<style lang="scss" scoped>
.skill_list{
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 2rem;
  .skill_con{
    position: relative;
    .pro_list{
      padding-bottom: 15rem;
    }
    .list_con{
      line-height: 5rem;
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
      width: $tem-width;
      margin:0 auto;
      margin-top: 1rem;
      p{
        width: 100%;
        display: flex;
        span:first-child{
          width: 80%;
        }
        span:last-child{
          width: 20%;
          text-align: left;
        }
      }
    }
    .addSkill{
      position: absolute;
      top:-3.5rem;
      font-size: 1.6rem;
      color: white;
      right:1.5rem;
    }
  }
}
</style>
