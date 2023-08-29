<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="detail">挂号详情</div>
      </template>
      <!-- 展示身体结构 -->
      <div class="top">
        <!-- 左侧标签 -->
        <el-tag class="el-2" type="success" v-if="orderInfo?.orderStatus==0">
          <div class="tag" >
            <svg
              t="1691403965566"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4060"
              width="16"
              height="16"
            >
              <path
                d="M392.533333 806.4L85.333333 503.466667l59.733334-59.733334 247.466666 247.466667L866.133333 213.333333l59.733334 59.733334L392.533333 806.4z"
                fill="#67C23A"
                p-id="4061"
              ></path>
            </svg>
            <span>预约成功,待支付</span>
          </div>
        </el-tag>

        <el-tag class="el-2" type="success" v-if="orderInfo?.orderStatus==1">
          <div class="tag">
            <svg
              t="1691403965566"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4060"
              width="16"
              height="16"
            >
              <path
                d="M392.533333 806.4L85.333333 503.466667l59.733334-59.733334 247.466666 247.466667L866.133333 213.333333l59.733334 59.733334L392.533333 806.4z"
                fill="#67C23A"
                p-id="4061"
              ></path>
            </svg>
            <span>已支付</span>
          </div>
        </el-tag>

        <el-tag class="el-2" type="error" v-if="orderInfo?.orderStatus==-1">
          <div class="tag">
            <span>取消预约</span>
          </div>
        </el-tag>
        <!-- 右侧 -->
        <div class="right_info">
          <img src="@/assets/images/code_app.png" alt="" />
          <div class="text">
            <span>微信关注"北京114预约挂号"</span>
            <span>"快速预约挂号"</span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="left_info">
          <el-descriptions class="margin-top" :column="1" border>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊人信息</div>
              </template>
              {{ orderInfo?.patientName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊日期</div>
              </template>
              {{ orderInfo?.reserveDate }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊医院</div>
              </template>
              {{ orderInfo?.hosname }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊科室</div>
              </template>
              {{ orderInfo?.depname }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <div class="cell-item">医生职称</div>
              </template>
              {{ orderInfo?.title }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">医事服务费</div>
              </template>
              {{ orderInfo?.amount }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号单号</div>
              </template>
              {{ orderInfo?.id }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号时间</div>
              </template>
              {{ orderInfo?.createTime }}
            </el-descriptions-item>
          </el-descriptions>
          <div
            class="submit"
            v-if="orderInfo?.orderStatus == 0 || orderInfo?.orderStatus == 1"
          >
            <el-popconfirm title="确定取消预约吗?" @confirm="cancel">
              <template #reference>
                <el-button>取消预约</el-button>
              </template>
            </el-popconfirm>

            <el-button
              type="primary"
              v-if="orderInfo?.orderStatus == 0"
              @click="pay"
              >支付</el-button
            >
          </div>
        </div>
        <div class="right_info">
          <el-card>
            <template #header> 注意事项 </template>
            <p>
              1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担;
            </p>
            <p class="color-red">
              2.【取号】就诊当天需在{{
                orderInfo?.fetchTime
              }}在医院取号，未取号视为爽约，该号不退不换;
            </p>
            <p>
              3.【退号】在2023-06-09 15:30前可在线退号，逾期将不可办理退号退费;
            </p>
            <p>
              4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号;
            </p>
            <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
          </el-card>
        </div>
      </div>
    </el-card>

    <el-dialog v-model="dialogVisible" title="微信支付" @close="closedialog()">
      <div class="pay">
        <img :src="imgUrl" alt="" />
        <p>请使用微信扫一扫</p>
        <p>扫码二维码支付</p>
      </div>
      <template #footer>
        <el-button type="primary" @click="closedialog"
          >关闭窗口</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  orderInfo,
  orderInfoData,
  payInfoData,
  payInfo,
  PayResult,
} from "@/api/user/type";
import {
  reqGetOrderInfo,
  reqCancelOrder,
  reqQrCode,
  reqPayResult,
} from "@/api/user";
import { ElMessage } from "element-plus";
import QRCode from "qrcode";

let $route = useRoute();
let orderInfo = ref<orderInfo>();
let dialogVisible = ref(false);
let payInfo = ref<payInfo>();
let imgUrl = ref();
let timer = ref<any>();

onMounted(() => {
  // 获取订单信息
  getOrderInfo();
});

// 获取订单详情
const getOrderInfo = async () => {
  const res: orderInfoData = await reqGetOrderInfo($route.query.orderId);
  console.log(res);
  
  if (res.code === 200) {
    orderInfo.value = res.data;
  }
};

// 取消预约
const cancel = async () => {
  try {
    const res = await reqCancelOrder($route.query.orderId);
    if (res.code === 200) {
      console.log(res);

      ElMessage({
        type: "success",
        message: "取消预约成功",
      });
    } else {
      ElMessage({
        type: "error",
        message: res.message,
      });
    }
  } catch (error) {
    ElMessage({
      type: "error",
      message: error.message,
    });
  }
};

// 生成二维码
const qrcode = async () => {
  const res: payInfoData = await reqQrCode($route.query.orderId);
  if (res.code === 200) {
    payInfo.value = res.data;
    let cur_imgUrl = await QRCode.toDataURL(res.data.codeUrl);
    imgUrl.value = cur_imgUrl;
  }
};

// 支付
const pay = () => {
  // 打开对话窗口
  dialogVisible.value = true;
  // 生成微信支付二维码
  qrcode();
  // 查询支付结果
  timer.value = setInterval(async () => {
    let res: PayResult = await reqPayResult($route.query.orderId);
    console.log(res);

    if (res.data == true) {
      clearInterval(timer.value);
      // 再次获取订单详情
      getOrderInfo();
    }
  }, 5000);
};

// 关闭窗口
const closedialog=()=>{
  dialogVisible.value=false;
  clearInterval(timer.value);

}
</script>

<style scoped lang="scss">
.box-card {
  .detail {
    color: #7f7f7f;
    font-weight: 900;
  }
  .top {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
    .tag {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin-left: 5px;
      }
    }

    .right_info {
      display: flex;
      img {
        width: 40px;
      }
      .text {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 12px;
      }
    }
  }
  .bottom {
    color: #ccc;
    display: flex;
    margin-top: 20px;
    .left_info {
      flex: 4;
      margin-right: 20px;
      .submit {
        margin-top: 10px;
      }
    }

    .right_info {
      flex: 6;
      p {
        line-height: 20px;
        margin-bottom: 5px;
      }
    }
  }
}
.color-red {
  color: red;
}

.pay {
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    line-height: 30px;
    font-weight: 800;
  }
}

::v-deep(.el-dialog__body) {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
</style>