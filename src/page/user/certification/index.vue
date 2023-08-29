<template>
  <div class="certification">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h1>实名信息</h1>
        </div>
      </template>
      <!-- 实名认证结构提示 -->
      <div class="tip">
        <el-icon><Warning /></el-icon>
        <span
          >完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</span
        >
      </div>
      <div class="info">
        <el-descriptions
          v-if="userInfo?.authStatus === 1"
          class="margin-top"
          :column="1"
          border
        >
          <el-descriptions-item label-align="center" :width="20">
            <template #label>
              <div class="cell-item">用户姓名</div>
            </template>
            {{ userInfo.name }}
          </el-descriptions-item>

          <el-descriptions-item label-align="center">
            <template #label>
              <div class="cell-item">证件类型</div>
            </template>
            {{ userInfo.certificatesType === 10 ? "身份证" : "户口本" }}
          </el-descriptions-item>

          <el-descriptions-item label-align="center">
            <template #label>
              <div class="cell-item">证件号码</div>
            </template>
            {{ userInfo.certificatesNo }}
          </el-descriptions-item>
        </el-descriptions>

        <el-form
          v-else
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
            <el-select
              v-model="params.certificatesType"
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

          <el-form-item label="证件号码" prop="certificatesNo">
            <el-input v-model="params.certificatesNo" />
          </el-form-item>
          <el-form-item label="上传文件" prop="certificatesUrl">
            <el-upload
              ref="uploadFile"
              action="/api/oss/file/fileUpload?fileHost=userAuah"
              list-type="picture-card"
              v-model="params.certificatesUrl"
              limit="1"
              :on-exceed="exceedHandler"
              :on-success="successHandler"
              :on-preview="showDialog"
            >
              <img
                style="width: 100%; height: 100%"
                src="@/assets/images/auth_example.png"
                alt=""
              />
            </el-upload>
            <el-dialog v-model="dialogVisible">
              <img
                style="width: 100%; height: 100%"
                :src="params.certificatesUrl"
                w-full
                alt="xxx"
              />
            </el-dialog>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="reset">重写</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import {
  reqUserInfo,
  reqCertificatesType,
  reqUserAuth,
} from "@/api/user/index";
import { CertationTypeArr } from "@/api/user/type";
import { ElMessage } from "element-plus";

const userInfo = ref();

const certificatesTypeArr = ref<CertationTypeArr>();

let params = reactive({
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: "",
});

let dialogVisible = ref(false);

const uploadFile = ref();

const formRef=ref();

onMounted(() => {
  getUserInfo();
  getCertificatesType();
});

const validatorName = (rule: any, value: any, callBack: any) => {
  // rule：当前检验字段的检验规则对象
  // value：文本内容
  const reg =
    /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/;

  if (reg.test(value)) {

    callBack();
  } else {
    callBack(new Error("请输入正确的中国人名字"));
  }
};

// 校验身份校验类型
const validatorType = (rule: any, value: any, callBack: any) => {
  if (value !== "10" || value !== "20") {
    callBack();
  } else {
    callBack(new Error("请输入正确的类型"));
  }
};

// 校验身份证件
const validatorNo = (rule: any, value: any, callBack: any) => {

  if (params.certificatesType == "10") {
    // 校验身份证
    const regSfz = /(^\\d15$)|(^\\d18$)|(^\\d17(\\d|X|x)$)/;
    if (regSfz.test(value)) {
      callBack();
    }else{
      callBack('请输入正确的身份证号码');
    }
  }else{
    // 校验户口本
    const regHkb = /^[a-zA-Z0-9]{3,21}$/;
    if (regHkb.test(value)) {
      callBack();
    }else{
      callBack('请输入正确的户口本号码');
    }
  }
};

// 校验图片地址
const validatorUrl=(rule: any, value: any, callBack: any)=>{
  if(value.length>0){
    callBack();
  }else{
    callBack('请上传证件图片');
  }
  
}

const rules = {
  name: [
    {
      required: true,
      validator: validatorName,
    },
  ],
  certificatesType: [
    {
      required: true,
      validator: validatorType,
    },
  ],
  certificatesNo: [
    {
      required: true,
      validator: validatorNo,
    },
  ],certificatesUrl: [
    {
      required: true,
      validator: validatorUrl,
    },
  ],
};

const showDialog = () => {
  dialogVisible.value = true;
};

const getUserInfo = async () => {
  const res = await reqUserInfo();
  if (res.code === 200) {
    userInfo.value = res.data;
  }
};

const getCertificatesType = async () => {
  const res = await reqCertificatesType("certificatesType");
  if (res.code === 200) {
    certificatesTypeArr.value = res.data;
  }
};

const exceedHandler = () => {
  ElMessage({
    type: "error",
    message: "只能上传一张图片",
  });
};

// 上传成功的
const successHandler = (response: any, uploadFile: any, uploadFiles: any) => {
  params.certificatesUrl = response.data;
};

// 重写
const reset = () => {
  Object.assign(params, {
    certificatesNo: "",
    certificatesType: "",
    certificatesUrl: "",
    name: "",
  });

  uploadFile.value.clearFiles();
};

// 提交
const submit = async () => {

  // 全部表单的校验
  await formRef.value.validate();
  
  try {
    const res = await reqUserAuth(params);
    console.log(res);
    
    if (res !== 200) {
      ElMessage({
        type: "error",
        message: "不可重复认证",
      });
      return;
    }
    ElMessage({
      type: "success",
      message: "认证成功",
    });
  } catch (error) {
    ElMessage({
      type: "error",
      message: "认证失败",
    });
  }
};
</script>

<style scoped lang="scss">
.tip {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  color: #7f7f7f;
  span {
    font-weight: 700;
    font-size: 13px;
  }
}
</style>