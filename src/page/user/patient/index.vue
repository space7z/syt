<template>
  <div class="container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h1>就诊人管理</h1>
          <el-button
            v-if="scene == '0'"
            @click="addItem"
            type="success"
            class="button"
            ><el-icon class="user-icon"><User /></el-icon>添加就诊人</el-button
          >
          <el-button
            v-if="scene == '1' || scene == '2'"
            @click="back"
            type="primary"
            class="button"
            >返回</el-button
          >
        </div>
      </template>
      <div class="item-popel" v-if="scene == '0'">
        <el-card class="item" v-for="(user, index) in userArr" :key="user.id">
          <template #header>
            <div class="card-header">
              <div class="left">
                <span class="type">{{
                  user.isInsure === 1 ? "医保" : "自费"
                }}</span>
                <span>{{ user.name }}</span>
              </div>

              <div class="operate">
                <el-button
                  @click="editHandler(user)"
                  type="primary"
                  :icon="Edit"
                  circle
                />
                <el-button
                  @click="delHandler(user.id)"
                  type="danger"
                  :icon="Delete"
                  circle
                />
              </div>
            </div>
          </template>
          <div class="info" @click="changeSelectedIndex(index)">
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
      <!-- 添加就诊人 -->
      <div class="form" v-if="scene == '1'">
        <Vistor
          :params="params"
          :props="props"
          @submit="submit"
          @reset="reset"
          :rules="rules"
          :certificatesTypeArr="certificatesTypeArr"
        />
      </div>

      <!-- 编辑就诊人信息 -->
      <div class="form" v-if="scene == '2'">
        <Vistor
          :params="params"
          :props="props"
          @submit="submit"
          @reset="reset"
          :rules="rules"
          :certificatesTypeArr="certificatesTypeArr"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type {
  CertationTypeArr,
  UserArr,
  AddOrUpdateUser,
  User,
} from "@/api/user/type";
import { reqUser, reqDoctor } from "@/api/hospital/index";
import { onMounted, reactive, ref,watch } from "vue";
import Vistor from "@/components/vistor/index.vue";

import { Edit, Delete } from "@element-plus/icons-vue";
import {
  reqAddOrUpdateUser,
  reqCertificatesType,
  reqCity,
  reqDeleteUser,
} from "@/api/user/index";
import { ElMessage } from "element-plus";

import { useRoute } from "vue-router";
const $route = useRoute();

let userArr = ref<UserArr>([]);
// 存储用户选择的就诊信息的索引
let selectedIndex = ref<number>(-1);

// 待添加的就诊人信息
let patientInfo = ref<User>();

// 场景切换（编辑 or 添加 or 信息展示）
let scene = ref<string>($route.query.scene?$route.query.scene:'0');

let params = reactive<AddOrUpdateUser>({
  id: "",
  address: "",
  birthdate: "",
  certificatesNo: "",
  certificatesType: "",
  cityCode: "",
  contactsCertificatesNo: "",
  contactsCertificatesType: "",
  contactsName: "",
  contactsPhone: "",
  isInsure: -1,
  isMarry: -1,
  name: "",
  phone: "",
  sex: -1,
  addressSelected: [],
});

const certificatesTypeArr = ref<CertationTypeArr>();

let rules = [{}];

// 级联选择器数据，加载组件时自动调用
let props = {
  lazy: true,
  lazyLoad: async (node: any, resolve: any) => {

    const res = await reqCity(node.value || "86");

    // 整理数据
    let showData = res.data.map((item: any) => {
      return {
        label: item.name,
        value: item.value,
        leaf: !item.hasChildren,
      };
    });

    resolve(showData);
  },
};

onMounted(() => {
  fetchUserData();
  getCertificatesType();

  if($route.query.type=='add'){
    scene.value='1';
  }
});

watch(
  () => userArr.value,
  () => {
    if ($route.query.type === "edit") {
      scene.value=2;
      console.log(userArr.value);
      
      const user = userArr.value.find((item: any) => {
        console.log(item.id,$route.query.id);
        
        return item.id == $route.query.id;
      });
      console.log(user);
      
      Object.assign(params, user);
    }
  }
);

const getCertificatesType = async () => {
  const res = await reqCertificatesType("certificatesType");
  if (res.code === 200) {
    certificatesTypeArr.value = res.data;
  }
};

// 获取就诊人信息
const fetchUserData = async () => {
  let res = await reqUser();
  if (res.code === 200) {
    userArr.value = res.data;
  }
};

const changeSelectedIndex = (index: number) => {
  selectedIndex.value = index;
};

// 添加就诊人
const addItem = () => {
  scene.value = 1;
};

// 编辑
const editHandler = (user: any) => {
  scene.value = 2;
  Object.assign(params,user);
};

const delHandler = async (id: any) => {
  const res = await reqDeleteUser(id);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
  } else {
    ElMessage({
      type: "success",
      message: res.message,
    });
  }
  fetchUserData();
};

const back = () => {
  if ($route.query.type === "add" || $route.query.type === "edit") {
    window.history.back();
  } else {
    scene.value = 0;
  }
};

// 添加就诊人信息
const submit = async () => {
  const res = await reqAddOrUpdateUser(params);

  if (res.code === 200) {
    fetchUserData();
    ElMessage({
      type: "success",
      message: "添加成功",
    });
    back();
  } else {
    ElMessage({
      type: "error",
      message: "添加失败",
    });
  }
};

const reset = () => {
  Object.assign(params, {
    id: "",
    address: "",
    birthdate: "",
    certificatesNo: "",
    certificatesType: "",
    cityCode: "",
    contactsCertificatesNo: "",
    contactsCertificatesType: "",
    contactsName: "",
    contactsPhone: "",
    isInsure: 0,
    isMarry: 0,
    name: "",
    phone: "",
    sex: 0,
    addressSelected: [],
  });
};
</script>

<style scoped lang="scss">
.container {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-icon {
      margin-right: 5px;
    }

    h1 {
      font-size: 22px;
      font-weight: 700;
    }
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

  .item-popel {
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
}
</style>