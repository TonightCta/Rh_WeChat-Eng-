<!-- 我的认证 -->
<template lang="html">
  <div class="mine_auth">
    <WorkHeader>
      <p>我的认证</p>
    </WorkHeader>
    <div class="auth_con">
      <p>实名认证
        <span class="public_text">已认证</span>
      </p>
      <p>我的证书
        <span class="public_text icon">
          <van-icon name="arrow" size="22"/>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  components:{WorkHeader}
}
</script>

<style lang="scss" scoped>
.mine_auth{
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 1rem;
  .auth_con{
    width: $tem-width;
    margin:0 auto;
    p{
      width: 100%;
      height: 5rem;
      box-shadow: 0px 0px 5px #ccc;
      margin-top: 1rem;
      border-radius: 8px;
      font-size: 1.4rem;
      line-height: 5rem;
      box-sizing: border-box;
      padding-left: 1rem;
      position: relative;
      .public_text{
        position: absolute;
        right:2rem;
        font-size: 1.3rem;
        color:#666;
      }
      .icon{
        top:.5rem;
      }
    }
  }

}
</style>
