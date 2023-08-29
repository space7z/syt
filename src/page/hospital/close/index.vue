<template>
    <div class="register">
        <h1>{{hospitalStore.hospitalInfo.hospital?.hosname}}停诊信息</h1>
        <el-empty description="description" />
    </div>
  
</template>

<script setup lang="ts">
import useDetailStore from "@/store/modules/hospitalDetail";
let hospitalStore = useDetailStore();

</script>

<style scoped lang="scss">

h1{
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 50px;
}

</style>