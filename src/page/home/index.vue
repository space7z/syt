<script setup lang="ts">
//@ts-ignore
import { ref, onMounted } from "vue";
//@ts-ignore
import Carousel from "./carousel/index.vue";
//@ts-ignore
import Search from "./search/index.vue";
//@ts-ignore
import Level from "./level/index.vue";
//@ts-ignore
import Card from "./card/index.vue";

// 右侧组件
// @ts-ignore
import Tip from "./tip/index.vue"

import { reqHospital } from "@/api/home/index";
import { HospitalResponseData,Content } from "@/api/home/type";

const pageNo = ref<number>(1);
const pageSize = ref<number>(10);
const hospitalArr = ref<Content>([]);
const total = ref<number>(0);

// 医院类型
let hostype = ref<string>('')
// 地区编号
let districtCode=ref<string>('')

// 获取医院信息
const geHospitalInfo = async () => {
  let res: HospitalResponseData = await reqHospital(pageNo.value, pageSize.value,hostype.value,districtCode.value);

  if(res.code===200){
    // 存储已有的医院诗句
    console.log(res);
    
    hospitalArr.value=res.data.content;
    total.value=res.data.totalElements;
  }
};

const handleSizeChange = () => {
  geHospitalInfo()
};

const handleCurrentChange = () => {
  geHospitalInfo()
};

onMounted(() => {
  geHospitalInfo()
});

// 获取医院等级类型
const getLevel=(level:string)=>{
  hostype.value=level
  geHospitalInfo()
}

// 获取医院地区
const getRegion=(level:string)=>{
  districtCode.value=level
  geHospitalInfo()
}

</script>

<template>
  <Carousel />
  <Search />
  <el-row gutter="20">
    <el-col :span="20">
      <Level @getLevel="getLevel" @getRegion="getRegion" />
      <div class="hospital" v-if="hospitalArr.length>0">
        <Card class="card-item" v-for="(item) in hospitalArr" :key="item.id" :hosp="item" />
      </div>
      <div v-else>
        <el-empty description="没有医院" />
      </div>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-col>
    <el-col :span="4">
      <Tip/>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.hospital {
  display: flex;
  flex-wrap: wrap;
  margin: 30px 0;
  .card-item {
    display: block;
    width: 48%;
    &:nth-child(odd) {
      margin-right: 10px;
    }
  }
}
</style>