// 定义详情模块数据的ts类型
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

// 代表医院详情的数据
export interface HosPitalDetail {
  "bookingRule": {
    "cycle": number,
    "releaseTime": string,
    "stopTime": string,
    "quitDay": number,
    "quitTime": string,
    "rule": string[]
  },
  "hospital": {
    "id": string,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
      "hostypeString": string,
      "fullAddress": string
    },
    "hoscode": string,
    "hosname": string,
    "hostype": string,
    "provinceCode": string,
    "cityCode": string,
    "districtCode": string,
    "address": string,
    "logoData": string,
    "intro": null,
    "route": string,
    "status": number,
    "bookingRule": null
  }
}

export interface HospitalDetail extends ResponseData {

  data: HosPitalDetail

}

// 科室的数据ts类型
export interface Department {
  "depcode": string,
  "depname": string,
  "children"?: Department[]
}

// 代表存储科室数组类型
export type DepartmentArr = Department[];

// 获取科室接口返回的数据类型
export interface DepartmentResponseData extends ResponseData {
  data: DepartmentArr
}

// 用户登录接口需要携带的参数类型
export interface LoginData {
  phone: string,
  code: string
}

// 登录接口返回用户信息数据
export interface UserInfo {
  name: string,
  token: string
}

// 登录接口返回的数据的ts类型
export interface UserLoginResponseData extends ResponseData {
  data: UserInfo
}


//
export interface BaseMap {
  "workDateString": string,
  "releaseTime": string,
  "bigname": string,
  "stopTime": string,
  "depname": string,
  "hosname": string
}

export interface workDate {
  "workDate": string,
  "workDateMd": string,
  "dayOfWeek": string,
  "docCount": number,
  "reservedNumber": null,
  "availableNumber": number,
  "status": number
}

export type BookingScheduleList = workDate[]

export interface HospitalWorkData extends ResponseData {
  data: {
    total: number,
    bookingScheduleList: BookingScheduleList,
    baseMap: BaseMap
  }
}


// 一个医生的数据
export interface Doctor {
  "id": string,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
    "dayOfWeek": string,
    "depname": string,
    "hosname": string
  },
  "hoscode": string,
  "depcode": string,
  "title": string,
  "docname": string,
  "skill": string,
  "workDate": string,
  "workTime": number,
  "reservedNumber": number,
  "availableNumber": number,
  "amount": number,
  "status": number,
  "hosScheduleId": string
}

export type DocArr = Doctor[];

// 医生排班接口返回类型
export interface DoctorData extends ResponseData {
  data: Doctor;
}
