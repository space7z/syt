<template>
  <div class="search">
    <el-autocomplete @select="goDetail" :trigger-on-focus="true" :fetch-suggestions="fetchData" v-model="hostname" clearable class="form" placeholder="请你输入医院名称" />

    <el-button type="primary" size="" @click="search"
      ><el-icon><Search /></el-icon>&nbsp;搜索</el-button
    >
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import {ref} from 'vue'
import { useRouter } from 'vue-router';
import { reqHospitalInfo } from '@/api/home';
import type { HospitalInfo,Content } from '@/api/home/type';

const $router = useRouter();

// 收集搜索的关键字
let hostname =ref<string>('')

const search = () => {

};

// 点击进入详情页面
const goDetail=(item)=>{
  $router.push({path:'/hospital/register'})
}

const fetchData= async(keyword:string,cb:any)=>{
  const res:HospitalInfo = await reqHospitalInfo(keyword)
  const showData=res.data.map(item=>{
    return {
      // @ts-ignore，展示医院的名字
      value:item.hosname,
      // @ts-ignore，存储医院的编码
      hoscode:item.hoscode,
    }
  })
  cb(showData)
}

</script>

<style scoped lang="scss">
.search {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  // 深度选择题修改
  // :deep()
  :deep(.el-input__wrapper) {
    width: 600px;
    margin-right: 10px;
  }
}
</style>