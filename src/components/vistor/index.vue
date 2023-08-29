<template>
  <!-- 添加就诊人 -->
  <el-divider content-position="left">就诊人信息</el-divider>
  <el-form
    label-width="80px"
    style="max-width: 460px; margin: 0 auto"
    :model="params"
    :rules="rules"
    ref="formRef"
  >
    <el-form-item label="用户姓名" prop="name">
      <el-input v-model="params.name" />
    </el-form-item>

    <el-form-item label="证件类型" prop="certificatesType">
      <el-select v-model="params.certificatesType" placeholder="请选择组件类型">
        <el-option
          v-for="(item, index) in certificatesTypeArr"
          :key="index"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="证件号码" prop="certificatesNo">
      <el-input v-model="params.certificatesNo" />
    </el-form-item>

    <el-form-item label="用户性别" prop="sex">
      <el-radio-group v-model="params.sex">
        <el-radio :label="0" >男</el-radio>
        <el-radio :label="1" >女</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="出生日期" prop="birthdate">
      <el-date-picker
        v-model="params.birthdate"
        type="date"
        label="Pick a date"
        placeholder="Pick a date"
        style="width: 100%"
      />
    </el-form-item>

    <el-form-item label="手机号码" prop="phone">
      <el-input v-model="params.phone" />
    </el-form-item>

    <el-divider content-position="left"
      >建档信息（完善后部分医院首次就诊不排队建档）</el-divider
    >

    <el-form-item label="婚姻状况" prop="isMarry">
      <el-radio-group v-model="params.isMarry">
        <el-radio :label="0">未婚</el-radio>
        <el-radio :label="1">已婚</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="自费/医保" prop="isInsure">
      <el-radio-group v-model="params.isInsure">
        <el-radio :label="0">自费</el-radio>
        <el-radio :label="1">医保</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="当前住址" prop="addressSelected">
      <el-cascader :props="props" v-model="params.addressSelected" />
    </el-form-item>

    <el-form-item label="详细地址" prop="address">
      <el-input v-model="params.address" placeholder=""></el-input>
    </el-form-item>

    <el-divider content-position="left">联系人信息（选填）</el-divider>

    <el-form-item label="用户姓名" prop="contactsName">
      <el-input v-model="params.contactsName" />
    </el-form-item>

    <el-form-item label="证件类型" prop="contactsCertificatesType">
      <el-select
        v-model="params.contactsCertificatesType"
        placeholder="请选择组件类型"
      >
        <el-option
          v-for="(item, index) in certificatesTypeArr"
          :key="index"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="证件号码" prop="contactsCertificatesNo">
      <el-input v-model="params.contactsCertificatesNo" />
    </el-form-item>

    <el-form-item label="手机号码" prop="contactsPhone">
      <el-input v-model="params.contactsPhone" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit(params)">提交</el-button>
      <el-button @click="reset">重写</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, onMounted } from "vue";

onMounted(() => {});

const $props = defineProps([
  "params",
  "props",
  "scene",
  "rules",
  "certificatesTypeArr",
]);
const $emit = defineEmits(["submit", "reset"]);

const submit = (params) => {
    console.log(params);
    
  $emit("submit");
};
const reset = () => {
  $emit("reset");
};
</script>

<style scoped lang="scss">
</style>