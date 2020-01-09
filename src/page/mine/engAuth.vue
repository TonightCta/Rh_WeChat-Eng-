<!-- 工程师认证 -->
<template lang="html">
  <div class="eng_auth">
    <WorkHeader>
      <p>工程师认证</p>
    </WorkHeader>
    <div class="eng_con">
      <ul>
        <li>
          <span>所在地区:</span>
          <input type="text" name="" value="" placeholder="请选择所在地区" v-model="upMes.cityText">
          <span class="domMask" @click="placeChose=true"></span>
        </li>
        <router-link to="/mineFeild" tag="li">
          <span>擅长领域:</span>
          <input type="text" name="" value="" placeholder="请选择至少五项擅长领域" disabled="disabled" v-model="upMes.feildText">
        </router-link>
        <router-link to='/mineType' tag="li">
          <span>服务类型:</span>
          <input type="text" name="" value="" placeholder="请选择至少五项服务类型" disabled="disabled" v-model="upMes.typeText">
        </router-link>
        <li>
          <span>可接受服务区域:</span>
          <input type="text" name="" value="" placeholder="请选择至少五项服务区域" disabled="disabled" v-model="upMes.workText">
          <span class="domMask" @click="workChose=true"></span>
        </li>
      </ul>
    </div>
    <!-- 所在地区选择 -->
    <div class="">
      <van-popup
        v-model="placeChose"
        position="bottom"
        :style="{ height: '40%' }"
      >
      <p class="place_title">
        <span>取消</span>
        <span @click="turnCity()">确定</span>
      </p>
        <van-tree-select
          :items="placeList"
          :active-id.sync="cityList"
          :main-active-index.sync="activeIndex"
          :click-item="choseCity"
        />
      </van-popup>
    </div>
    <!-- 服务区域选择 -->
    <div class="">
      <van-popup
        v-model="workChose"
        position="bottom"
        :style="{ height: '40%' }"
      >
      <p class="place_title">
        <span>取消</span>
        <span @click="turnWork()">确定</span>
      </p>
        <van-tree-select
          :items="placeList"
          :active-id.sync="workList"
          :main-active-index.sync="activeIndex"
          :click-item="choseWork"
        />
      </van-popup>
    </div>
    <p class="next_eng">
      <button type="button" name="button" @click="nextStep()">下一步</button>
    </p>
  </div>
</template>

<script>
import PlaceData from '../../../static/data/place.json'
import WorkHeader from '@/components/work_header'
import {mapMutations,mapState} from 'vuex'
export default {
  components:{WorkHeader},
  data(){
    return{
      cityList:[],//选择城市列表
      activeIndex:0,
      placeChose:false,//地址选择
      placeList:[],//地点列表
      workChose:false,//服务区域选择
      workList:['北京市','邯郸市','天津市','郑州市','秦皇岛市'],//服务区域列表
      upMes:{
        cityText:null,//所在地区文本
        workText:null,//服务区域文本
        feildText:null,//擅长领域文本
        typeText:null,//服务类型文本
      },
    }
  },
  computed:{
    ...mapState(['engAuth','userMes'])
  },
  created(){
    this.placeList=PlaceData.data;
    if(this.engAuth.workText!=null){
      this.upMes.workText=this.engAuth.workText
    }
    if(this.engAuth.cityText!=null){
      this.upMes.cityText=this.engAuth.cityText
    };
    if(this.$route.query.feildText){
      this.upMes.feildText=this.$route.query.feildText;
    }else{
      this.upMes.feildText=this.engAuth.feildText;
    }
    if(this.$route.params.typeText){
      this.upMes.typeText=this.$route.params.typeText;
    }else{
      this.upMes.typeText=this.engAuth.typeText;
    }
  },
  methods:{
    ...mapMutations(['engAuth_fn']),
    choseCity(city){//选择城市
      if(this.cityList.indexOf(city.text)>-1){
        this.cityList.splice(this.cityList.indexOf(city.text),1)
      }else{
        this.cityList.push(city.text)
      };

    },
    choseWork(city){//选择城市
      if(this.workList.indexOf(city.text)>-1){
        this.workList.splice(this.workList.indexOf(city.text),1)
      }else{
        this.workList.push(city.text)
      };
    },
    turnCity(){//确认选中城市
      this.placeChose=false;
      if(this.cityList.length>0){
        this.upMes.cityText=this.cityList.join(',');
      }else{
        this.cityText=null;
      }
    },
    turnWork(){//确认选中服务区域
      this.workChose=false;
      if(this.workList.length>0&&this.workList.length>4){
        this.upMes.workText=this.workList.join(',');
      }else{
        this.$toast('请选择至少五项服务区域')
        this.workText=null;
      };
    },
    nextStep(){//下一步资质认证
      if(this.upMes.cityText==null){
        this.$toast('请选择所在地区')
      }else if(this.upMes.feildText==null){
        this.$toast('请选择擅长领域')
      }else if(this.upMes.typeText==null){
        this.$toast('请选择服务类型')
      }else if(this.upMes.workText==null){
        this.$toast('请选择服务区域')
      }else{
        this.$router.push('/engCard')
      }
    },
  },
  beforeRouteLeave(to,form,next){
    this.engAuth_fn(this.upMes)
    next()
  },
}
</script>

<style lang="scss" scoped>
input[disabled]{color:#000;opacity:1}
.eng_auth{
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 5rem;
  .eng_con{
    width: $tem-width;
    margin:0 auto;
    ul{
      width: 100%;
      li{
        height: 5rem;
        box-shadow: 0px 0px 5px #ccc;
        margin-top: 1rem;
        border-radius: 8px;
        font-size: 1.5rem;
        line-height: 5rem;
        box-sizing: border-box;
        padding-left: 1rem;
        position: relative;
        overflow: hidden;
        input{
          width: 75%;
          height: 4.5rem;
          position: absolute;
          right:0;
          top:.1rem;
          border-radius: 8px;
        }
        .domMask{
          position: absolute;
          width: 100%;
          height: 100%;
          background: red;
          opacity: 0;

        }
      }
      li:last-child{
        input{
          width: 60%;
        }
      }
    }
  }
  .place_title{
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    font-size: 1.5rem;
    display: flex;
    border-bottom:1px solid #eee;
    span{
      width: 50%;
      box-sizing: border-box;
    }
    span:first-child{
      padding-left: 1rem;
    }
    span:last-child{
      text-align: right;
      padding-right: 1rem;
      color:$tem-color;
    }
  }
  .next_eng{
    width: 100%;
    text-align: center;
    position: fixed;
    bottom:1rem;
    left:0;
    button{
      background: $btn-color;
      width: $tem-width;
      border-radius: 20px;
      color:white;
      height: 3.5rem;
    }
  }
}
</style>
