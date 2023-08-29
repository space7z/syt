// 仓库数据返回的类型
import type { HosPitalDetail, DepartmentArr, UserInfo } from '@/hospital/type';

export interface DetailState {
    hospitalInfo: HosPitalDetail,
    departmentArr: DepartmentArr
}

// 用户仓库相关state数据的ts类型定义
export interface UserState {
    // 用于控制登录组件的dialog显示与隐藏
    visiable: boolean,
    // 存储用户的验证码
    code: string,
    // 用户登录信息
    userInfo: UserInfo
}