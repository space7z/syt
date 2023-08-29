import { createApp } from 'vue'
import App from './App.vue'
import '@/style/reset.scss'
// 引入全局组件
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
import Login from '@/components/login/index.vue'

// 引入vue-router核心插件并安装
import router from '@/router'

// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 国际化
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'


// pinia 仓库
import pinia from '@/store'

// 全局路由守卫
import '@/permisstion';

const app = createApp(App)

app.use(router)

// 使用elementplus组件
app.use(ElementPlus, {
    locale: zhCn,
  })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 使用pinia仓库
app.use(pinia);

app.component("HospitalTop", HospitalTop)
app.component("HospitalBottom", HospitalBottom)
app.component("Login", Login)
app.mount('#app')
