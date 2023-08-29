<template>
  <div class="top">
    <div class="content">
      <!-- 左侧 -->
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.png" alt="" />
        <p>尚医通 预约挂号统一平台</p>
      </div>
      <div class="right">
        <p class="help">帮助中心</p>
        <p v-if="!userStore.userInfo.name" class="login" @click="goLogin">
          登录/注册
        </p>
        <el-dropdown v-else>
          <span class="el-dropdown-link">
            {{ userStore.userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push('/user/certification')">实名认证</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/user/order')">挂号订单</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/user/patient')">就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import useUserStore from "@/store/modules/user";

let userStore = useUserStore();
const $router = useRouter();

const goHome = () => {
  $router.push({ path: "/" });
};

const goLogin = () => {
  userStore.visiable = true;
  console.log(userStore.visiable);
};

const logout=()=>{
  userStore.logout();
  $router.push('/home')
}
</script>
  
<style scoped lang="scss">
.top {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  z-index: 999;
  .content {
    width: 1200px;
    height: 70px;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        cursor: pointer;
      }

      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      p {
        font-size: 20px;
        color: #55a6fe;
      }
    }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      .help {
        margin-right: 10px;
        &:hover {
          cursor: pointer;
        }
      }
      .login {
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>