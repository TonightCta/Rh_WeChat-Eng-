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
          <input type="text" name="" value="" placeholder="请选择所在地区" v-model="cityText" @click="placeChose=true">
        </li>
        <router-link to="/mineFeild" tag="li">
          <span>擅长领域:</span>
          <input type="text" name="" value="" placeholder="请选择至少五项擅长领域" disabled="disabled">
        </router-link>
        <router-link to='/mineType' tag="li">
          <span>服务类型:</span>
          <input type="text" name="" value="" placeholder="请选择至少五项服务类型" disabled="disabled">
        </router-link>
        <li>
          <span>可接受服务区域:</span>
          <input type="text" name="" value="" placeholder="请选择至少五项服务区域" disabled="disabled">
        </li>
      </ul>
    </div>
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
          @click-item="choseCity"
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
export default {
  components:{WorkHeader},
  data(){
    return{
      cityText:null,
      cityList:[],//选择城市列表
      activeIndex:0,
      placeChose:false,//地址选择
      placeList:[],//地点列表
    }
  },
  created(){
    this.placeList=PlaceData.data;
  },
  methods:{
    choseCity(city){//选择城市
      if(this.cityList.indexOf(city.text)>-1){
        this.cityList.splice(this.cityList.indexOf(city.text),1)
      }else{
        this.cityList.push(city.text)
      };
    },
    turnCity(){//确认选中城市
      this.placeChose=false;
      if(this.cityList.length>0){
        this.cityText=this.cityList.join(',');
      }else{
        this.cityText=null;
      }
    },
    nextStep(){//下一步资质认证
      this.$router.push('/engCard')
    },
  }

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
        input{
          width: 75%;
          height: 4.5rem;
          position: absolute;
          right:0;
          top:.1rem;
          border-radius: 8px;
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
