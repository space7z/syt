<template>
  <div class="notice">
    <div class="title">
      {{ hospitalStore.hospitalInfo.hospital?.hosname }}预约挂号须知
    </div>
    <div class="content">
      <span>为方便您早日就医康复，请您认真阅读预约挂号须知:</span>
      <div>—、预约实名制:</div>
      <span>统一平台电话预约和网上预约挂号均采取实名制注册预约，请您如实提供就诊人员的真实姓名、有效证件号（身份证、护照)、性别、手机号码社保卡号等基本信息。</span>
      <div>二、预约挂号:</div>
      <span>按照北京市卫健委统一平台要求，预约挂号规则如下:</span>
      <ul>
        <li>
          在同一自然日，同—医院，同一科室，同—就诊单元，同—就诊人，可以预约最多1个号源;
        </li>
        <li>在同一自然周，同—就诊人，可以预约最多8个号源;</li>
        <li>在同一自然月，同—就诊人，可以预约最多12个号源;</li>
        <li>在同—自然季度，同—就诊人，可以预约最多24个号源。</li>
      </ul>

      <div>三、取消预约:</div>
      <span>已完成预约的号源，如需办理退号，至少在就诊前一工作日14:0O前通过网站、微信公众号、114电话等平台预约渠道进行取消预约.</span>
      <div>四、爽约处理:</div>
      <ul>
        <li>如预约成功后患者未能按时就诊且不办理取消预约号视为爽约，同一患者在自然年内爽约规则如下;</li>
        <li>累计爽约3次，自3次爽约日起，90天内不允许通过114平台进行预约挂号;</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDetailStore from "@/store/modules/hospitalDetail";
let hospitalStore = useDetailStore();
</script>

<style scoped lang="scss">
.notice {
  .title {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .content {
    div {
      margin: 20px 0;
    }
    li,span{
        margin: 10px 0;
        font-size: 14px;
        color: #7f7f7f;
    }
  }
}
</style>