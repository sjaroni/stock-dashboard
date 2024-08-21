<template>
  <div :style="{ width: width, height: height }" class="widget-container">
    <div class="widget-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.widget-container {
  box-sizing: border-box;  
}
.widget-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;  
  gap: 24px;
  flex-direction: row;
  height: 100%;
}
</style>
