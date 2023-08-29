<template>
  <div class="login_container">
    <el-dialog v-model="userStore.visiable" title="用户登录">
      <el-row>
        <el-col :span="12">
          <div class="login" v-show="scene === 0">
            <el-form :model="loginParam" :rules="rules" ref="ruleFormRef">
              <el-form-item prop="phone">
                <el-input
                  :prefix-icon="User"
                  placeholder="请输入手机号码"
                  v-model="loginParam.phone"
                ></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input
                  :prefix-icon="Lock"
                  placeholder="请输入手机验证码"
                  v-model="loginParam.code"
                ></el-input>
              </el-form-item>
              <ul-form-item>
                <el-button
                  :disabled="!isPhone ? true : false || !flag"
                  @click="getCode"
                >
                  <span v-if="flag">获取验证码</span>
                  <CountDown :flag="flag" @getFlag="getFlag" v-else />
                </el-button>
              </ul-form-item>
            </el-form>

            <div class="bottom">
              <el-button
                style="width: 90%"
                type="primary"
                size="default"
                @click="loginHander"
                >用户登录</el-button
              >

              <div class="vxlogin" @click="vxLogin">
                <p>微信扫码登录</p>
                <svg
                  t="1690376946651"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2333"
                  width="32"
                  height="32"
                >
                  <path
                    d="M704 397.92c-15.04-140.96-151.04-251.36-316.48-251.36-176 0-317.92 124.16-317.92 277.28a267.36 267.36 0 0 0 129.12 224c8.8 5.6-29.12 85.28-19.68 90.08s28.48-11.2 48.8-26.56 39.52-29.76 48-26.88a362.56 362.56 0 0 0 112 17.44 376.16 376.16 0 0 0 57.44-4.48c36.96 84.8 133.44 145.44 246.56 145.44a305.12 305.12 0 0 0 88.16-12.96c4.48-1.28 21.76 11.36 39.2 24.16s35.36 25.76 39.68 24c13.76-5.76-25.44-69.92-12.96-77.44 65.76-40.48 108.48-105.92 108.48-180-0.16-120-111.04-217.12-250.4-222.72z m-109.12 167.2a28 28 0 1 1 27.68-28 27.84 27.84 0 0 1-27.68 28z m-165.76 54.72a204.64 204.64 0 0 0 1.44 24.32 314.72 314.72 0 0 1-42.88 2.88 302.08 302.08 0 0 1-103.36-17.76c-3.2-1.12-14.4-4.64-20.48 0a265.28 265.28 0 0 0-32 32 142.4 142.4 0 0 0 8.96-38.4c1.12-10.24-14.56-17.6-17.76-19.68a220 220 0 0 1-98.08-178.4c0-122.88 117.6-222.4 262.72-222.4 135.36 0 246.88 86.72 260.96 198.24-124.48 17.44-219.52 108.96-219.52 219.2z m331.68-54.72a28 28 0 1 1 27.68-28 27.68 27.68 0 0 1-27.68 28z"
                    fill="#8DC81B"
                    p-id="2334"
                  ></path>
                  <path
                    d="M498.24 286.08a41.92 41.92 0 1 0 41.44 41.92 41.76 41.76 0 0 0-41.44-41.92zM276.96 286.08a41.92 41.92 0 1 0 41.6 41.92 41.6 41.6 0 0 0-41.6-41.92z"
                    fill="#8DC81B"
                    p-id="2335"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="webchat" v-show="scene === 1">
            <h1>微信登录</h1>
            <div class="vxImg">
              <img src="@/assets/images/code_login_wechat.png" alt="" />
            </div>
            <div class="text">使用微信扫一扫登录</div>
            <div class="phoneLogin">
              <div @click="scene = 0">手机短信验证码登录</div>
              <div @click="scene = 0">
                <svg
                  t="1690378690320"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3987"
                  width="32"
                  height="32"
                >
                  <path
                    d="M759.3984 29.7984 246.272 29.7984c-48.2304 0-87.3472 39.1168-87.3472 87.3472l0 791.552c0 48.2304 39.1168 87.3472 87.3472 87.3472l215.6544 0 119.9104 0 177.5616 0c48.2304 0 87.3472-39.1168 87.3472-87.3472l0-791.552C846.7456 68.9152 807.6288 29.7984 759.3984 29.7984zM418.304 92.0576l169.0624 0c8.3968 0 15.2576 6.8608 15.2576 15.2576s-6.8608 15.2576-15.2576 15.2576L418.304 122.5728c-8.3968 0-15.2576-6.8608-15.2576-15.2576S409.9072 92.0576 418.304 92.0576zM502.8864 894.6688c-33.9968 0-61.5424-27.5456-61.5424-61.5424 0-33.9968 27.5456-61.5424 61.5424-61.5424 33.9968 0 61.5424 27.5456 61.5424 61.5424C564.3264 867.1232 536.7808 894.6688 502.8864 894.6688zM782.848 667.0336c0 12.0832-9.728 21.8112-21.8112 21.8112L244.6336 688.8448c-12.0832 0-21.8112-9.728-21.8112-21.8112l0-464.896c0-12.0832 9.728-21.8112 21.8112-21.8112l516.3008 0c12.0832 0 21.8112 9.728 21.8112 21.8112L782.7456 667.0336z"
                    fill="#FF9000"
                    p-id="3988"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="right">
            <div class="top">
              <div class="left">
                <img src="@/assets/images/code_app.png" alt="" />
                <svg
                  t="1690377340282"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2573"
                  width="16"
                  height="16"
                >
                  <path
                    d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                    fill="#5D5D5D"
                    p-id="2574"
                  ></path>
                </svg>
                <span>微信扫一扫关注</span>
                <span>“快速预约挂号”</span>
              </div>

              <div class="right">
                <img src="@/assets/images/code_app.png" alt="" />
                <svg
                  t="1690377409594"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3748"
                  width="16"
                  height="16"
                >
                  <path
                    d="M341.333333 896H298.666667V170.666667h469.333333v725.333333H341.333333z m0-42.666667h384V213.333333H341.333333v640z m128-42.666666v-42.666667h128v42.666667h-128z"
                    fill="#444444"
                    p-id="3749"
                  ></path>
                </svg>
                <span>微信扫一扫关注</span>
                <span>“快速预约挂号”</span>
              </div>
            </div>
            <div class="bottom">
              <h1>xxx官方指定平台</h1>
              <h1>快速挂号 安全放心</h1>
            </div>
          </div>
        </el-col>
      </el-row>

      <template #footer>
        <div>
          <el-button type="primary" size="default" @click="close"
            >关闭窗口</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>
  
<script setup lang="ts">
import useUserStore from "@/store/modules/user";
// 引入elementplus图标
// @ts-ignore
import { User, Lock } from "@element-plus/icons-vue";

// 倒计时组件
//@ts-ignore
import CountDown from "@/components/countdown/index.vue";

// @ts-ignore
import { ref, reactive, computed } from "vue";
import { ElMessage } from "element-plus";
import {useRoute,useRouter} from 'vue-router';

const $route = useRoute();
const $router = useRouter();


const ruleFormRef=ref<any>();

let userStore = useUserStore();
// 0：手机号码登录 1：微信扫码登录
let scene = ref<number>(0);

// 倒计时组件的显示与隐藏
let flag = ref<boolean>(true);

// 获取表单数据
let loginParam = reactive({
  phone: "",
  code: "",
});

// 计算当前表单元素收集的内容是否手机号格式
let isPhone = computed(() => {
  const reg =
    /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;

  // 返回布尔值：true：是手机号码格式
  return reg.test(loginParam.phone);
});

// 登录回调
const loginHander = async () => {
  let res = await ruleFormRef.value.validate()
  console.log(res);
  if(!res){
    return;
  }
  // if(!formEl) return

  // formEl.validate((valid:any)=>{
  //   console.log(valid);
  //   if(valid){
  //     console.log('submit!')
  //   } else {
  //     console.log('error submit!')
  //     return false
  //   }
    

  // })
  // 用户登录成功
  try {
    await userStore.userLogin(loginParam);
    // 关闭对话框
    userStore.visiable = false;
    let redirect = $route.query.redirect;
    if(redirect!=null || redirect!=''){
      console.log($route.query.redirect);
      
      $router.push(redirect as string);
      
    }else{

      $router.push('/home')
    }
  } catch (error) {
    ElMessage({
      type: "error",
      message: (error as Error).message,
    });
  }
};

const close = () => {
  userStore.visiable = false;
};

const vxLogin = () => {
  scene.value = 1;
};

// 获取验证码
const getCode = async () => {
  flag.value = false;
  const res = await userStore.getCode(loginParam.phone);
  loginParam.code = res;
};

// 子组件通知父组件让button显示
const getFlag = (val: boolean = true) => {
  flag.value = val;
};

// 表单校验的规则对象
const rules={
  // 手机号码的校验规则
  phone:[
    { required: true, message: 'phone is required', trigger: 'blur' },
    { min:11, message: '手机号必须是11位', trigger: 'blur' },
  ],
  code:[
  { required: true, message: 'code is required', trigger: 'blur' },
  ]
}

</script>
  
<style scoped lang="scss">
.login_container {
  :deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .login {
    padding: 20px;
    border: 1px solid #ccc;
    .bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
      .vxlogin {
        display: flex;
        flex-direction: column;
        align-items: center;
        &:hover {
          cursor: pointer;
        }
      }
      p {
        margin-top: 10px;
      }
    }
  }

  .webchat {
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      margin-bottom: 20px;
      font-size: 24px;
    }
    .vxImg {
      padding: 10px;
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      img {
        width: 100%;
      }
    }
    .text {
      margin: 20px 0;
    }
    .phoneLogin {
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        margin-top: 5px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    .top {
      display: flex;
      justify-content: space-around;
      .left,
      .right {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      img {
        width: 60%;
      }
    }
    .bottom {
      font-size: 24px;

      height: 140px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
}
</style>