<template>
  <div class="allOrder">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>挂号订单</span>
        </div>
      </template>
      <div class="search">
        <div class="people">
          就诊人
          <el-select placeholder="请选择就诊人" @change="patientChange" v-model="patientId">
            <el-option v-for="item in allUser" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </div>
        <div class="orderSta">
          订单状态
          <el-select @change="orderStatusChange" placeholder="请选择订单状态" v-model="orderStatus">
            <el-option v-for="item in statusList" :key="item.status" :label="item.comment" :value="item.status" />
          </el-select>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%;margin: 10px auto;">
        <el-table-column prop="reserveDate" label="就诊时间" />
        <el-table-column prop="hosname" label="医院" />
        <el-table-column prop="depname" label="科室" />
        <el-table-column prop="title" label="医生" />
        <el-table-column prop="amount" label="医事服务费" />
        <el-table-column prop="patientName" label="就诊人" />
        <el-table-column prop="param.orderStatusString" label="订单状态" />
        <el-table-column label="操作">
          <template #="{row}">
            <el-button type="text" @click="showDetail(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10,20,30,50]"
        layout="sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="currentChange"
        @size-change="sizeChange"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import {ref, onMounted} from 'vue';
import { reqUserOrderInfoPage } from "@/api/user";
import { OrderStatusList, UserArr } from "@/api/user/type";
import { reqAllUser, reqUOrderStatus } from "@/api/user/index";

let $useRouter = useRouter();

let pageNo=ref<number>(1);
let pageSize=ref<number>(10);
let patientId=ref<string>('');
let orderStatus=ref<string>('');
let total = ref();

// 订单状态列表
let statusList=ref<OrderStatusList>([])

// 所有就诊人
let allUser = ref<UserArr>([]);

let tableData = ref([]);

onMounted(()=>{
  // getUserInfo();
  getUserOrderList();
  getStatusList();
  getAllUser();
});

// 获取订单列表
const getUserOrderList=async()=>{
  const res = await reqUserOrderInfoPage(pageNo.value,pageSize.value,patientId.value,orderStatus.value);
  total.value = res.data.total;
  
  tableData.value = res.data.records;
  
}

// 获取就诊人列表
const getAllUser= async ()=>{
  const res = await reqAllUser();
  allUser.value = res.data;

}

const showDetail=(row:any)=>{
  $useRouter.push({path:`/user/order`,query:{orderId: row.id}})

}

const orderStatusChange=()=>{
  getUserOrderList();
}
const currentChange=()=>{
  getUserOrderList();
}

const sizeChange=()=>{
  getUserOrderList();
}

// 就诊人改变
const patientChange=()=>{
  getUserOrderList();
}

// 订单列表
const getStatusList=async()=>{
  const res= await reqUOrderStatus();
  statusList.value=res.data;
}
</script>

<style scoped lang="scss">
.search {
  display: flex;
  font-size: 14px;
  .people {
    margin-right: 50px;
  }
}
</style>