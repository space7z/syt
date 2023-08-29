import request from "@/utils/request";
import type { HospitalDetail,HospitalWorkData, DepartmentResponseData, UserLoginResponseData } from "./type";

enum API {
    // 获取医院详情的url
    HOSPITALDETAIL_URL = '/hosp/hospital/',
    HOSPITALDEPARTMENT_URL = '/hosp/hospital/department/',
    // 获取手机号验证码
    GETUSERCODE_URL = '/sms/send/',
    // 登录接口
    USERLOGIN_URL = '/user/login',
    // 获取某个医院的某一个科室预约挂号数据
    HOSPITALWORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
    HOSPITALDOCTOR_URL='/hosp/hospital/auth/findScheduleList/',

    // 获取一个账号下就诊人信息
    GETUSER_URL='/user/patient/auth/findAll/',
    GETDOCTOR='/hosp/hospital/getSchedule/'
}


// 根据id查询医院详情的数据
export const reqHospitalDetail = (hosCode: string) => {
    return request.get<any, HospitalDetail>(API.HOSPITALDETAIL_URL + `${hosCode}`);
};

// 根据id查询医院科室的数据
export const reqHospitalDepartment = (hosCode: string) => {
    return request.get<any, DepartmentResponseData>(API.HOSPITALDEPARTMENT_URL + `${hosCode}`);
};

// 获取手机验证码
export const reqCode = (phone: string) => {
    return request.get<any, any>(API.GETUSERCODE_URL + `${phone}`);
};

// 用户登录
export const reqLogin = (data: any) => {
    return request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data);
};

// 获取预约挂号的数据
export const reqHospitalWork = (page: number, limit: number, hoscode: string, depcode: string)=>{
    return request.get<any, HospitalWorkData>(API.HOSPITALWORK_URL+`${page}`+`/${limit}`+`/${hoscode}`+`/${depcode}`);
};

// 获取医生的skill
export const reqHospitalDoctor=(hoscode:string,depcode:string,workDate:string)=>{
    return request.get<any,any>(API.HOSPITALDOCTOR_URL+`${hoscode}/`+`${depcode}/`+`${workDate}`);
}

// 获取账号下就诊人信息
export const reqUser=()=>{
    return request.get<any,any>(API.GETUSER_URL);
}

// 根据排班id查询排班数据scheduleId

export const reqDoctor=(scheduleId:string)=>{
    return request.get<any,any>(API.GETDOCTOR+`${scheduleId}`);
}