<template>
  <div class="content">
    <ChartHeadline :headlineTitle="title"></ChartHeadline>
    <div class="chart">x</div>
  </div>
</template>

<script>
import ChartHeadline from './ChartHeadline.vue';

export default {  
  name: 'NetIncome',
  data() {
    return {
      title: "Net Income TTM"
    };
  },
  components: {
    ChartHeadline
  }
};
</script>

<style scoped>
  .content{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 16px;
    background-color: #011f35;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 16px;
  }

  .chart{
    height: 100%;
    background-color: red;
  }
</style>
