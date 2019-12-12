<!-- 首页头部 -->
<template lang="html">
  <div class="home_header">
    <button type="button" name="button" @click="show=true">123</button>
    <van-popup v-model="show"  position="left" :style="{width:'50%',height:'100%'}">
      <ul>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
export default {
  data(){
    return{
      show:false
    }
  }
}
</script>

<style lang="scss" scoped>
.home_header{
  height: 5rem;
  width: 100%;
  background: #5277cc;
  position: fixed;
  top:0;
  left:0;
}
</style>
