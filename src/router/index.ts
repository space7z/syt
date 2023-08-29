import {  createRouter, createWebHistory} from "vue-router";

// 创建路由器示例，管理多个路由
export default createRouter({
    // 路由模式的设置
    history: createWebHistory(),
    // 管理路由
    routes:[
        {
            path:'/home',
            component:()=>import('@/page/home/index.vue')
        },{
            path:'/hospital',
            component:()=>import('@/page/hospital/index.vue'),
            children:[
                {
                    // 医院挂号
                    path:'register',
                    component:()=>import('@/page/hospital/register/index.vue'),
                    meta:{
                        title:'预约挂号'
                    }
                },
                {
                    // 医院详情
                    path:'detail',
                    component:()=>import('@/page/hospital/detail/index.vue'),
                    meta:{
                        title:'医院详情'
                    }
                },
                {
                    // 预约通知
                    path:'notice',
                    component:()=>import('@/page/hospital/notice/index.vue'),
                    meta:{
                        title:'预约预约通知'
                    }
                },
                {
                    // 停诊信息
                    path:'close',
                    component:()=>import('@/page/hospital/close/index.vue'),
                    meta:{
                        title:'停诊信息'
                    }
                    
                },
                {
                    // 查询/取消
                    path:'search',
                    component:()=>import('@/page/hospital/search/index.vue'),
                    meta:{
                        title:'查询'
                    }
                },
                {
                    // 预约挂号步骤1
                    path:'register_step1',
                    component:()=>import('@/page/hospital/register/register_step1.vue'),
                    meta:{
                        title:'预约第一步'
                    }
                },
                {
                    // 预约挂号步骤1
                    path:'register_step2',
                    component:()=>import('@/page/hospital/register/register_step2.vue'),
                    meta:{
                        title:'预约第二步'
                    }
                },
            ]
        },{
            path:'/',
            redirect:'/home'
        },{
            path:'/user',
            component:()=>import('@/page/user/index.vue'),
            children:[
                {
                    path:'/user/certification',
                    component:import('@/page/user/certification/index.vue'),
                    meta:{
                        title:'实名认证'
                    }
                },{
                    path:'/user/order',
                    component:import('@/page/user/order/index.vue'),
                    meta:{
                        title:'挂号订单'
                    }
                },{
                    path:'/user/patient',
                    component:import('@/page/user/patient/index.vue'),
                    meta:{
                        title:'就诊人管理'
                    }
                },{
                    path:'/user/profile',
                    component:import('@/page/user/profile/index.vue'),
                    meta:{
                        title:'账号信息'
                    }
                },{
                    path:'/user/feedback',
                    component:import('@/page/user/feedback/index.vue'),
                    meta:{
                        title:'意见反馈'
                    }
                }

            ]
        }
    ],
    scrollBehavior(){
        return{
            left:0,
            top:0
        }
    }
})