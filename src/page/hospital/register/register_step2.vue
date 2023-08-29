<template>
  <div class="container">
    <h1>确认挂号信息</h1>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>请点击选择就诊人</span>
          <el-button type="primary" class="button" text @click="$router.push({path:'/user/patient',query:{type:'add',scene:1}})">添加就诊人</el-button>
        </div>
      </template>

      <div class="item-people">
        <el-card
          class="item"
          v-for="(user, index) in userArr"
          :key="user.id"
          @click="changeSelectedIndex(index)"
        >
          <template #header>
            <div class="card-header">
              <div class="left">
                <span class="type">{{
                  user.isInsure === 1 ? "医保" : "自费"
                }}</span>
                <span>{{ user.name }}</span>
              </div>

              <el-button type="primary" :icon="Edit" circle @click="toEdit(user)"/>
            </div>
          </template>
          <div class="info">
            <ul>
              <li>证件类型：{{ user.param.certificatesTypeString }}</li>
              <li>证件号码：{{ user.certificatesNo }}</li>
              <li>用户性别：{{ user.sex === 1 ? "男" : "女" }}</li>
              <li>出生日期：{{ user.birthdate }}</li>
              <li>手机号码：{{ user.phone }}</li>
              <li>婚姻状况：{{ user.isMarry === 1 ? "已婚" : "未婚" }}</li>
              <li>当前住址：{{ user.param.cityString }}</li>

              <transition name="confirm">
                <div
                  v-if="index === selectedIndex"
                  :class="{ confirm: selectedIndex === index }"
                >
                  已选择
                </div>
              </transition>
            </ul>
          </div>
        </el-card>
      </div>
    </el-card>

    <el-card class="register-info">
      <template #header>
        <div class="card-header">挂号信息</div>
      </template>

      <el-descriptions
        class="margin-top"
        title="With border"
        :column="2"
        border
      >
        <template #extra>
          <el-button type="primary">Operation</el-button>
        </template>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊日期</div>
          </template>
          {{ docInfo?.workDate }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊医院</div>
          </template>
          {{ docInfo?.param.hosname }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊科室</div>
          </template>
          {{ docInfo?.param.depname }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生名称</div>
          </template>
          {{ docInfo?.docname }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生职称</div>
          </template>
          {{ docInfo?.title }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生专长</div>
          </template>
          {{ docInfo?.skill }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生服务器</div>
          </template>
          {{ docInfo?.amount }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <div class="submit">
      <el-button
        @click="submitOrder"
        type="primary"
        size="large"
        :disabled="selectedIndex === -1"
        >确认挂号</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";

import { onMounted, ref } from "vue";
import { reqUser, reqDoctor } from "@/api/hospital/index";
import { useRoute,useRouter } from "vue-router";
import { Doctor, DoctorData } from "@/api/hospital/type";
import { reqSubmitOrder } from "@/api/user/index";
import type { User, UserArr } from "@/api/user/type";
import { ElMessage } from "element-plus";

const $route = useRoute();
const $router = useRouter();

let userArr = ref<UserArr>();
let docInfo = ref<Doctor>();

// 存储用户选择的就诊信息的索引
let selectedIndex = ref<number>(-1);

onMounted(() => {
  fetchUserData();
  fetchDoctorData();
});

// 获取就诊人信息
const fetchUserData = async () => {
  let res = await reqUser();
  if (res.code === 200) {
    userArr.value = res.data;
  }
};

// 获取排班医生信息
const fetchDoctorData = async () => {
  let res: DoctorData = await reqDoctor($route.query.docId as string);

  if (res.code === 200) {
    docInfo.value = res.data;
  }
};

const changeSelectedIndex = (index: number) => {
  selectedIndex.value = index;
};

// 提交订单
const submitOrder = async () => {
  // 医院编号
  let hoscode = ref(docInfo.value?.hoscode);
  // 科室id
  let scheduleId = ref(docInfo.value?.id);
  // 就诊人id
  let patientId = ref(userArr.value[selectedIndex.value].id);
  console.log(hoscode.value,scheduleId.value,patientId.value);
  

  const res = await reqSubmitOrder(
    hoscode.value as string,
    scheduleId.value as string,
    patientId.value as number
  );
  console.log(res);
  
  if (res.code === 200) {
    ElMessage({
      type:'success',
      message:'创建订单成功'
    })
    $router.push({path:'/user/order',query:{orderId:res.data}});
  }else{
    ElMessage({
      type:'error',
      message:'创建订单失败'
    })
  }
};

const toEdit=(user:User)=>{
  $router.push({path:'/user/patient',query:{type:'edit',id:user.id,scene:2}})
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  .submit {
    margin-top: 30px;
    text-align: center;
  }

  h1 {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 30px;
  }
  .item-people {
    display: flex;
    flex-wrap: wrap;

    .item {
      width: 32%;
      margin-right: 1%;
      .info {
        position: relative;
        cursor: pointer;
        li {
          margin-bottom: 10px;
          font-size: 14px;
          font-weight: 600;
        }
        .confirm {
          position: absolute;
          width: 150px;
          height: 150px;
          color: red;
          border: 1px dashed red;
          border-radius: 50%;
          line-height: 150px;
          text-align: center;
          top: 10%;
          left: 20%;
          opacity: 0.5;
          transform: rotate(35deg);
          font-weight: 900;
        }
        .confirm-enter-from {
          transform: scale(1);
        }
        .confirm-enter-active {
          transition: all 0.2s;
        }

        .confirm-enter-to {
          transform: scale(1.2);
        }
      }
    }
  }

  .register-info {
    margin-top: 30px;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    .type {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 3px;
      background: #409eff;
      font-size: 10px;
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
      margin-right: 5px;
      color: #fff;
    }
  }
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
}
</style>