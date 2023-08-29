import request from "@/utils/request";
import type {HospitalInfo, HospitalResponseData,HospitalLevelAndRegionResponseData } from "./type";

enum API{
    // 获取已有医院的数据接口
    HOSPITAL_URL='/hosp/hospital/',
    // 根据地区和等级查询医院的数据
    HOSPITALLEVELANDREGION_URL='/cmn/dict/findByDictCode/',

    // 根据关键字查询医院的数据
    HOSPITALINFO_URL='/hosp/hospital/findByHosname/',
}

// 获取医院数据
export const reqHospital = (page:number,limit:number,hostype:string,districtCode:string)=>{
    return request.get<any,HospitalResponseData>(API.HOSPITAL_URL+`${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`);
};

// 获取医院等级或者地区的数据
export const reqHospitalLevelAndRegion = (dictCode:string)=>{
    return request.get<any,HospitalLevelAndRegionResponseData>(API.HOSPITALLEVELANDREGION_URL+`${dictCode}`);
};


// 根据关键字查询医院的数据
export const reqHospitalInfo = (hostname:string)=>{
    return request.get<any,HospitalInfo>(API.HOSPITALINFO_URL+`${hostname}`);
};

// 根据id查询医院详情的数据
export const reqHospitalDetail = (hostname:string)=>{
    return request.get<any,HospitalInfo>(API.HOSPITALINFO_URL+`${hostname}`);
};