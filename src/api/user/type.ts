import { type } from "os";

export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

// 就诊人（用户）的ts类型
export interface User {
    address: string,
    birthdate: string,
    cardNo: string,
    certificatesNo: string,
    certificatesType: string,
    cityCode: string,
    contactsCertificatesNo: string,
    contactsCertificatesType: string,
    contactsName: string,
    contactsPhone: string,
    createTime: string,
    districtCode: string,
    id: number,
    isDeleted: number,
    isInsure: number,
    isMarry: number,
    name: string,
    param: {
        certificatesTypeString: string,
        contactsCertificatesTypeString: string,
        cityString: string,
        fullAddress: string,
        districtString: string,
        provinceString: string,
    }
    phone: string,
    provinceCode: string,
    sex: number,
    status: string,
    updateTime: string,
    userId: number
}

export type UserArr = User[];

export interface UserInfoData extends ResponseData {
    data: UserArr;
}

// 订单详情
export interface orderInfo {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "orderStatusString": string
    },
    "userId": number,
    "outTradeNo": string,
    "hoscode": string,
    "hosname": string,
    "depcode": string,
    "depname": string,
    "scheduleId": string,
    "title": string,
    "reserveDate": string,
    "reserveTime": number,
    "patientId": number,
    "patientName": string,
    "patientPhone": string,
    "hosRecordId": string,
    "number": number,
    "fetchTime": string,
    "fetchAddress": string,
    "amount": number,
    "quitTime": string,
    "orderStatus": number
}

export interface orderInfoData extends ResponseData {
    data: orderInfo
}

export type Records = orderInfo[];

// 订单列表数据接口的类型
export interface UserOrderInfoResponseData extends ResponseData {
    data: {
        "records": Records,
        "total": number,
        "size": number,
        "current": number,
        "orders": [],
        "hitCount": boolean,
        "searchCount": boolean,
        "pages": number
    }
}


// 微信支付二维码信息
export interface payInfo {
    "codeUrl": string,
    "orderId": number,
    "totalFee": number,
    "resultCode": string
}

// 微信支付二维码信息
export interface payInfoData extends ResponseData {
    data: payInfo
}


// 支付结果
export interface PayResult extends ResponseData {
    data: boolean
}

// 认证类型
export interface CertationType {
    createTime: string,
    dictCode: string,
    hasChildren: false
    id: number,
    isDeleted: number,
    name: string,
    param: {}
    parentId: number,
    updateTime: string,
    value: string,
}

export type CertationTypeArr = CertationType[];

export interface CertationTypeResponseType {
    data: CertationTypeArr
};

export interface OrderStatus {
    "comment": string,
    "status": number
}

export type OrderStatusList = OrderStatus[];

export interface OrderStatusData {
    data: OrderStatusList;
}

// 城市数据
export interface City {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {},
    "parentId": number,
    "name": string,
    "value": string,
    "dictCode": string,
    "hasChildren": boolean
}

export type CityArr = City[];

export interface CityData extends ResponseData {
    data: CityArr;
}

export interface AddOrUpdateUser {
    id: string,
    name: string,
    certificatesType: string,
    certificatesNo: string,
    sex: number,
    birthdate: string,
    phone: string,
    isMarry: number,
    isInsure: number,
    address: string,
    cityCode: string,
    contactsName: string,
    contactsPhone: string,
    contactsCertificatesType: string,
    contactsCertificatesNo: string,
    addressSelected: []
}