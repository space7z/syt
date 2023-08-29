import request from "@/utils/request";
import { AddOrUpdateUser,orderInfoData, PayResult, payInfoData, OrderStatusData, UserInfoData, CityData } from "./type";

enum API {
    SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder/',

    GETORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/',

    CANCELORDER_URL = '/order/orderInfo/auth/cancelOrder/',

    QRCODE_URL = '/order/weixin/createNative/',

    PAYINFO_URL = '/order/weixin/queryPayStatus/',

    USERINFO_URL = '/user/auth/getUserInfo/',

    // 身份认证类型（身份证，户口本）
    CERTIFICATESTYPE = '/cmn/dict/findByDictCode/',

    // 用户认证
    USERAUTH_URL = '/user/auth/userAuah',
    // 订单
    ORDERINFOList_URL = '/order/orderInfo/auth/',

    // 订单状态
    ORDERSTATUS_URL = '/order/orderInfo/auth/getStatusList',

    // 全部就诊人
    ALLUSER_URL = '/user/patient/auth/findAll',

    // 添加就诊人
    ADDUSER_URL = '/user/patient/auth/save',

    // 删除就诊人
    DELETEUSER = '/user/patient/auth/remove/',

    // 获取中国的城市
    CITY_URL='/cmn/dict/findByParentId/',

    // 更新已有就诊人
    UPDATEUSER_URL='/user/patient/auth/update'

}

// 提交订单
export const reqSubmitOrder = (hoscode: string, scheduleId: string, patientId: number) => {
    return request.post(API.SUBMITORDER_URL + `${hoscode}` + `/${scheduleId}` + `/${patientId}`);
}

// 获取订单详情
export const reqGetOrderInfo = (id: number) => {
    return request.get<any, orderInfoData>(API.GETORDERINFO_URL + id);
}

// 取消订单{orderId}
export const reqCancelOrder = (orderId: number) => {
    return request.get<any, any>(API.CANCELORDER_URL + orderId);
}

// 生成订单二维码{orderId}
export const reqQrCode = (orderId: number) => {
    return request.get<any, payInfoData>(API.QRCODE_URL + orderId);
}

// 查询支付结构
export const reqPayResult = (orderId: number) => {
    return request.get<any, PayResult>(API.PAYINFO_URL + orderId);
}

// 用户信息
export const reqUserInfo = () => {
    return request.get<any, any>(API.USERINFO_URL);
}

// 身份认证类型{dictCode}
export const reqCertificatesType = (dictCode: string) => {
    return request.get<any, any>(API.CERTIFICATESTYPE + `${dictCode}`);
}


// 用户认证
export const reqUserAuth = (userAuthVo: any) => {
    return request.post<any, any>(API.USERAUTH_URL, userAuthVo);
}

// 订单 {page}/{limit}
export const reqUserOrderInfoPage = (page: number, limit: number, patientId: string, orderStatus: string) => {
    return request.get<any, any>(API.ORDERINFOList_URL + `${page}` + `/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`);
}

// 订单状态
export const reqUOrderStatus = () => {
    return request.get<any, OrderStatusData>(API.ORDERSTATUS_URL);
}

// 全部就诊人 ALLUSER_URL
export const reqAllUser = () => {
    return request.get<any, UserInfoData>(API.ALLUSER_URL);
}

// 添加就诊人AddOrUpdateUser
export const reqAddOrUpdateUser = (data:AddOrUpdateUser) => {
    if(data.id){
        return request.put<any, AddOrUpdateUser>(API.UPDATEUSER_URL,data);
    }else{
        return request.post<any, AddOrUpdateUser>(API.ADDUSER_URL,data);
    }
    
}

// 删除就诊人 {id}
export const reqDeleteUser = (id: number) => {
    return request.delete<any, any>(API.DELETEUSER + id);
}

// 城市 {parentId}
export const reqCity = (parentId: string) => {
    return request.get<any, CityData>(API.CITY_URL + parentId);
}