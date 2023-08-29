<script setup lang="ts">
// @ts-ignore
import request from '@/utils/request'
// @ts-ignore
import { onMounted } from 'vue';

</script>

<template>
    <div class="container">
        <HospitalTop/>
        <div class="content">
            <router-view></router-view>
        </div>
        <HospitalBottom/>

        <!-- 登录 -->
        <Login/>
    </div>
</template>

<style scoped lang="scss">
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    .content{
        margin-top: 30px;
        width: 1200px;
    }
}
</style>
@/utils/request