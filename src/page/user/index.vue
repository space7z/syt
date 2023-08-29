<template>
  <div class="user">
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span> / 会员中心</span>
      </div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
        <el-menu-item
          index="/user/certification"
          @click="changeActive('/user/certification')"
        >
          <el-icon><Clock /></el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item
          index="/user/order"
          @click="changeActive('/user/order')"
        >
          <el-icon><document /></el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item
          index="/user/patient"
          @click="changeActive('/user/patient')"
        >
          <el-icon><Bell /></el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item
          index="/user/profile"
          @click="changeActive('/user/profile')"
        >
          <el-icon><InfoFilled /></el-icon>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item
          index="/user/feedback"
          @click="changeActive('/user/feedback')"
        >
          <el-icon><Search /></el-icon>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 右侧内容展示区:路由组件展示位置 -->
    <div class="content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script setup lang="ts">

import { onMounted } from "vue";
import { useRouter,useRoute } from "vue-router";

// 引入仓库
import useDetailStore from '@/store/modules/hospitalDetail';


// 获取仓库对象
let detailStore = useDetailStore()

// 获取当前路由信息

const $router=useRouter()
const $route=useRoute()

onMounted(()=>{
  detailStore.getHospital($route.query.hoscode as string);
  detailStore.getDepartment($route.query.hoscode as string)
})

const changeActive=(path:string)=>{
  $router.push({path,
    query:{
    hoscode:$route.query.hoscode
  }})
}

</script>

<style scoped lang="scss">
.user {
  display: flex;

  .menu {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top {
      color: #7f7f7f;
    }
  }

  .content {
    flex: 8;
  }
}
</style>