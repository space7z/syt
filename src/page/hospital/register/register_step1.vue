<template>
  <div class="wrap">
    <div class="top">
      <div class="hasname">{{ workData.baseMap?.hosname }}</div>
      <div class="line"></div>
      <div>{{ workData.baseMap?.bigname }}</div>
      <div class="dot">.</div>
      <div class="hosdeparment">{{ workData.baseMap?.depname }}</div>
    </div>
    <div class="center">
      <h1 class="time">{{ workData.baseMap?.workDateString }}</h1>
      <div class="container">
        <div
          class="item"
          :class="{
            active: item.status == -1 || item.availableNumber == -1,
            selected: index === selectedIndex,
          }"
          v-for="(item, index) in workData.bookingScheduleList"
          :key="item"
          @click="changeTime(item, index)"
        >
          <div class="item-top">{{ item.workDate }} {{ item.dayOfWeek }}</div>
          <div class="bottom">
            <div v-if="item.status == -1">停止挂号</div>
            <div v-if="item.status == 0">
              {{
                item.availableNumber === -1
                  ? "无号"
                  : `有号(${item.availableNumber})`
              }}
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="total"
        class="mt-4"
        style="margin-top: 20px"
        @current-change="fetchWorkData"
        v-model:current-page="pageNo"
      />
    </div>

    <div class="bottom">
      <!-- 展示即将放号的时间 -->
      <div class="will" v-if="workTime.status == 1">
        <span class="time">2023年6月3日08:30</span>
        <span>放号</span>
      </div>

      <!-- 展示医生的结构 上午、下午 -->
      <div class="doctor">
        <div class="morning">
          <div class="tip">
            <svg
              t="1690895460882"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2640"
              width="32"
              height="32"
            >
              <path
                d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                fill="#1296db"
                p-id="2641"
              ></path>
            </svg>
            <span>上午号源</span>
          </div>
          <div class="doc_info" v-for="doctor in morningArr" :key="doctor.id">
            <div class="left">
              <div class="name">{{ doctor.title }} | {{ doctor.docname }}</div>
              <div class="info">{{ doctor.skill }}</div>
            </div>
            <div class="right">
              <div class="price">￥{{ doctor.amount }}</div>
              <div class="num" @click="goStep2(doctor)">
                <span>剩余{{ doctor.availableNumber }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="after">
          <div class="tip">
            <svg
              t="1690895460882"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2640"
              width="32"
              height="32"
            >
              <path
                d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                fill="#1296db"
                p-id="2641"
              ></path>
            </svg>
            <span>下午号源</span>
          </div>
          <div class="doc_info" v-for="doctor in afterArr" :key="doctor.id">
            <div class="left">
              <div class="name">{{ doctor.title }} | {{ doctor.docname }}</div>
              <div class="info">{{ doctor.skill }}</div>
            </div>
            <div class="right">
              <div class="price">￥{{ doctor.amount }}</div>
              <div class="num" @click="goStep2(doctor)">
                <span>剩余{{ doctor.availableNumber }}</span>
              </div>
              <!-- <el-button @click="goStep2(doctor)" type="primary">剩余{{ doctor.availableNumber }}</el-button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqHospitalWork, reqHospitalDoctor } from "@/api/hospital/index";
import { ref, onMounted, computed } from "vue";
import { useRoute,useRouter } from "vue-router";
import type { DoctorData, Doctor, HospitalWorkData } from "@/api/hospital/type";
const $route = useRoute();
const $router = useRouter();

let pageNo = ref<number>(1);
let limit = ref<number>(6);

let total = ref<number>(0);

// 医院科室挂号的数据
let workData = ref<any>({});

// 排班日期：当前数据的第一个
let workTime: any = ref({});

let selectedIndex = ref<number>(0);

// 排班医生的数据
let docArr = ref();
let docArrFlag = ref(false);

const fetchWorkData = async () => {
  const res: HospitalWorkData = await reqHospitalWork(
    pageNo.value,
    limit.value,
    $route.query.hoscode as string,
    $route.query.depcode as string
  );
  if (res.code === 200) {
    workData.value = res.data;
    total.value = res.data.total;
  }
};

onMounted(() => {
  fetchWorkData();
});

// 获取某一天医生排班的数据
const getDoctorWorkData = async () => {
  // 医院的编号
  let hoscode: string = $route.query.hoscode as string;
  // 科室的编号
  let depcode: string = $route.query.depcode as string;
  // 时间
  let wTime: string = workTime.value.workDate;

  let res: DoctorData = await reqHospitalDoctor(hoscode, depcode, wTime);
  if (res.code === 200) {
    docArr.value = res.data;
    docArrFlag.value = true;
  }
};

const changeTime = (item: {}, index: number) => {
  selectedIndex.value = index;
  workTime.value = item;
  getDoctorWorkData();
};

// 计算出上午排班的医生数据
let morningArr = computed(() => {
  if (!docArr.value) return;
  return docArr.value.filter((doc: Doctor) => {
    return doc.workTime == 0;
  });
});

// 计算出下午排班的医生数据
let afterArr = computed(() => {
  if (!docArr.value) return;
  return docArr.value.filter((doc: Doctor) => {
    return doc.workTime == 1;
  });
});

// 路由跳转到选择就诊人页面
const goStep2 = (doctor: Doctor) => {
  $router.push({path:'/hospital/register_step2',query:{docId:doctor.id}});
};
</script>

<style scoped lang="scss">
.wrap {
  .top {
    display: flex;
    color: #7f7f7f;
    .line {
      width: 2px;
      height: 18px;
      background: #7c7c7c;
      margin: 0 5px;
    }
    .dot {
      margin: 0 5px;
    }
  }
  .center {
    margin: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .time {
    font-weight: 900;
  }
  .container {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;

    .active {
      border-color: #7f7f7f;
      color: #7f7f7f;
      .item-top {
        background: #ccc !important;
      }
    }
    .item {
      border: 1px solid #7f7f7f;
      width: 140px;
      transition: all 1s;
      .item-top {
        height: 25px;
        line-height: 25px;
        text-align: center;
        background-color: skyblue;
      }
      .bottom {
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
    }
  }
  .bottom {
    .will {
      text-align: center;
      font-size: 30px;
      font-weight: 900;
      .time {
        color: red;
      }
      span {
      }
    }
    .doctor {
      .morning,
      .after {
        margin-bottom: 20px;
        .tip {
          display: flex;
          align-items: center;
          font-weight: 700;
        }
        .doc_info {
          width: 100%;
          display: flex;
          border-bottom: 1px solid #ccc;

          .left {
            margin: 20px 0;

            flex: 8;
            display: flex;
            flex-direction: column;
            // background: #7c7c7c;
            justify-content: space-between;
            height: 50px;
            .name {
              color: #90c6f5;
              font-weight: 900;
            }
            .info {
              font-size: 14px;
              color: #ccc;
            }
          }
          .right {
            margin-top: 20px;
            height: 100%;
            flex: 3;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .price {
              line-height: 50px;
            }
            .num {
              span {
                display: block;
                width: 100px;
                line-height: 40px;
                color: #fff;
                background: #389cff;
                border-radius: 5px;
                text-align: center;
                &:hover {
                  opacity: 0.8;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }
}
.selected {
  transform: scale(1.1);
}
</style>