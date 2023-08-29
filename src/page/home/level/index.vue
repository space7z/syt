<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级：</div>
      <ul class="hospital">
        <li :class="{ active: activeFlagLevel === ''}" @click="changeLevel('')">全部</li>
        <li
          :class="{ active: activeFlagLevel === item.value }"
          v-for="item in levelArr"
          :key="item.id"
          @click="changeLevel(item.value)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
  <div class="region">
    <div class="content">
      <div class="left">地区：</div>
      <ul class="category">
        <li :class="{ active: activeFlagRegion === ''}" @click="changeRegion('')">全部</li>
        <li
          :class="{ active: activeFlagRegion === item.value }"
          v-for="item in regionArr"
          :key="item.id"
          @click="changeRegion(item.value)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>



<script setup lang="ts">
import { HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr } from "@/api/home/type";
import { reqHospitalLevelAndRegion } from "@/api/home/index";
//@ts-ignore
import { onMounted, ref,defineEmits } from "vue";

const levelArr = ref<HospitalLevelAndRegionArr>([]);
const regionArr = ref<HospitalLevelAndRegionArr>([]);
let activeFlagLevel = ref("");
let activeFlagRegion = ref("");



onMounted(() => {
  getLevel();
  getRegion();
});


const getLevel = async () => {
  const res:HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion("HosType");
  levelArr.value = res.data;
};

const getRegion = async () => {
  const res:HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion("Beijin");
  regionArr.value = res.data;
  console.log(regionArr.value);
};

// 医院等级类型改变
const changeLevel = (level: string) => {
  activeFlagLevel.value = level;
  
  $emit('getLevel',level)
};
const changeRegion = (level: string) => {
  activeFlagRegion.value = level;
  $emit('getRegion',level)
};


let $emit = defineEmits(['getLevel','getRegion','getAllLevel','getAllRegion'])
</script>

<style scoped lang="scss">
.level {
  color: #7f7f7f;
  h1 {
    font-weight: 900;
    margin: 10px 0;
  }
  .content {
    display: flex;
    .left {
      margin-right: 10px;
      width: 52px;
    }
    .hospital {
      display: flex;
      li {
        margin-right: 10px;
        &:hover {
          color: #55a6fe;
          cursor: pointer;
        }
      }
    }
  }
}

.region {
  margin-top: 20px;
  color: #7f7f7f;
  .content {
    display: flex;
    .left {
      margin-right: 10px;
      width: 55px;
    }
    .category {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: 10px;
        margin-bottom: 5px;
        &:hover{
          cursor: pointer;
        }
      }
    }
  }
}

.active {
  color: #55a6fe;
}
</style>