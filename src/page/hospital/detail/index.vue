<template>
  <div class="detail">
    <div class="top">
      <div class="title">
        {{ hospitalStore.hospitalInfo.hospital?.hosname }}
      </div>
      <div class="level">
        <svg
          t="1690254137173"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2321"
          width="16"
          height="16"
        >
          <path
            d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
            p-id="2322"
          ></path>
        </svg>
        <span>{{
          hospitalStore.hospitalInfo.hospital?.param.hostypeString
        }}</span>
      </div>
    </div>

    <div class="logo">
      <div class="left">
        <img
          :src="
            `data:image/jpeg;base64,` +
            hospitalStore.hospitalInfo.hospital?.logoData
          "
          alt=""
        />
      </div>
      <div class="right">
        
        <div class="address">
            <svg t="1690261790703" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3415" width="16" height="16"><path d="M511.492567 260.820614q52.773043 0 98.949455 19.789891t80.681863 54.295342 54.295342 80.681863 19.789891 98.949455-19.789891 99.456888-54.295342 81.189296-80.681863 54.295342-98.949455 19.789891-98.949455-19.789891-80.681863-54.295342-54.295342-81.189296-19.789891-99.456888 19.789891-98.949455 54.295342-80.681863 80.681863-54.295342 98.949455-19.789891zM1018.925669 450.600595l0 127.873142-60.891972 0q-10.148662 75.100099-43.131814 141.066402t-84.233895 117.217047-116.709613 84.741328-140.558969 43.639247l0 58.86224-126.858276 0 0-58.86224q-75.100099-11.163528-140.051536-45.161546t-115.187314-84.741328-83.219029-116.20218-42.116947-140.558969l-64.951437 0 0-127.873142 65.966303 0q11.163528-73.070367 44.654113-136.499504t83.726462-113.157582 114.172448-82.204163 137.006938-43.639247l0-70.025768 126.858276 0 0 69.010902q74.085233 10.148662 138.529237 43.131814t115.187314 82.711596 84.233895 113.665015 44.654113 137.006938l62.921705 0zM511.492567 833.205154q65.966303 0 124.32111-24.864222t101.48662-68.503469 68.503469-101.994054 25.371655-124.32111-25.371655-124.32111-68.503469-101.48662-101.48662-68.503469-124.32111-25.371655-124.32111 25.371655-101.994054 68.503469-68.503469 101.48662-24.864222 124.32111 24.864222 124.32111 68.503469 101.994054 101.994054 68.503469 124.32111 24.864222z" p-id="3416" fill="#8a8a8a"></path></svg>
          <span>具体地址：{{hospitalStore.hospitalInfo.hospital?.param.fullAddress  }}</span>
        </div>
        <div class="route">规划路线：{{hospitalStore.hospitalInfo.hospital?.route }}</div>
      </div>
    </div>

    <div class="info">
        医院介绍：{{ hospitalStore.hospitalInfo.hospital?.intro }}
    </div>
  </div>
</template>

<script setup lang="ts">
import useDetailStore from "@/store/modules/hospitalDetail";
let hospitalStore = useDetailStore();
</script>

<style scoped lang="scss">
.detail {
  .top {
    display: flex;
    .title {
      font-size: 30px;
      font-weight: 900;
    }
    .level {
      color: #7f7f7f;
      margin-left: 20px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      span {
        margin-left: 5px;
      }
    }
  }
  .logo {
    display: flex;
    margin-top: 20px;
    .left {
      width: 80px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .right {
      color: #7f7f7f;
      margin-left: 20px;
      .address{
        height: 20px;
      }
      .route{
        padding-left: 16px;
      }
      div{
        margin:5px 0;
      }
    }
  }
  .info{
    color: #7f7f7f;
    margin-top: 20px;
    line-height: 1.5;
  }
}
</style>