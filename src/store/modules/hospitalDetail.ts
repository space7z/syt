import {defineStore} from 'pinia';

import {reqHospitalDetail,reqHospitalDepartment} from '@/api/hospital';

import type {HospitalDetail,DepartmentResponseData,DepartmentArr} from '@/api/hospital/type';
import type { DetailState } from './interface';
import type { HosPitalDetail } from '@/hospital/type';

// pinia仓库写法：组合式API、选择式API写法

const useDetailStore = defineStore('Detail',{
    state:():DetailState=>{
        return {
            hospitalInfo:({} as HosPitalDetail),
            departmentArr:([] as DepartmentArr )
        }
    },
    actions:{
        async getHospital(hoscode:string){
            const res:HospitalDetail = await reqHospitalDetail(hoscode);
            if(res.code===200){
                this.hospitalInfo=res.data
            }
        },
        async getDepartment(hoscode:string){
            const res:DepartmentResponseData = await reqHospitalDepartment(hoscode);
            
            if(res.code===200){
                this.departmentArr=res.data
            }
        }
    },
    getters:{}
});

// 获取仓库的方法对外暴露

export default useDetailStore;