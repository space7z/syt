<template>
  <span>获取验证码({{ num }}s)</span>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
let num = ref<number>(5);
let props = defineProps(["flag"]);
let $emit = defineEmits(["getFlag"]);

watch(
  () => props.flag,
  () => {
    let timer = setInterval(() => {
      num.value -= 1;
      if (num.value <= 0) {
        clearInterval(timer);
        $emit("getFlag", true);
      }
    }, 1000);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss">
</style>