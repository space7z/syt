// 路由鉴权：路由能不能被访问到权限设置 -> 全局守卫完成

// 引入路由器
import router from '@/router/index';

// 仓库
import useUserStore from "@/store/modules/user";

// 引入进度条
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const whiteList = ['/home', '/hospital/register', '/hospital/detail', '/hospital/notice', '/hospital/close', '/hospital/search'];



// 加载小球不要
Nprogress.configure({ showSpinner: false });

// 添加相应的全局守卫
// 前置守卫
router.beforeEach((to, from, next) => {

    let userStore = useUserStore();
    
    let token = localStorage.getItem("USERINFO");

    if (token || userStore.userInfo.token) {
        next();
    } else {
        console.log(to.fullPath)
        // 用户未登录
        if (whiteList.includes(to.path)) {
            next();
        } else {
            userStore.visiable = true;
            next({ path: '/home', query: { redirect: to.fullPath } });
        }


    }
    // 访问路由组件之前，进度条开始行动
    Nprogress.start();
    next();

});

// 后置路由
router.afterEach((to, from) => {

    document.title = `商医通-${to.meta.title}`

    // 访问路由组件之后，进度条结束
    Nprogress.done();
});