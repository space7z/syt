// 定义用户相关的仓库
import { defineStore } from 'pinia';
import { reqCode, reqLogin } from '@/api/hospital/index'
import { LoginData, UserInfo, UserLoginResponseData } from '@/api/hospital/type'
import { UserState } from './interface/index'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/user';

// pinia仓库写法：组合式API、选择式API写法

const useDetailStore = defineStore('User', {
    state: (): UserState => {
        return {
            // 用于控制登录组件的dialog显示与隐藏
            visiable: false,
            code: '',
            userInfo: JSON.parse(GET_TOKEN() as string) || {}
        }
    },
    actions: {
        async getCode(phone: string) {
            const res = await reqCode(phone);
            if (res.code === 200) {
                this.code = res.data
                return res.data;
            } else {
                return Promise.reject(new Error(res.message))
            }
        },
        async userLogin(loginData: LoginData) {
            let res: UserLoginResponseData = await reqLogin(loginData);
            if (res.code == 200) {
                this.userInfo = res.data;
                SET_TOKEN(JSON.stringify(this.userInfo));
                return 'ok';
            } else {
                return Promise.reject(new Error(res.message));
            }

        },
        // 退出登录按钮的回调
        logout() {
            console.log(123);
            this.userInfo = { name: '', token: '' }
            REMOVE_TOKEN()
        }
    },
    getters: {}
});

// 获取仓库的方法对外暴露

export default useDetailStore;