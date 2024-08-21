<template>  
  <div class="content">
    <ChartHeadline :headlineTitle="title"></ChartHeadline>
    <div class="chart">x</div>
  </div>
</template>

<script>
import ChartHeadline from './ChartHeadline.vue';

export default {  
  name: 'RevenueLastThreeYears',
  data() {
    return {
      title: "Revenue last 3 years"
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
    gap: 20px;
    background-color: #011f35;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px 32px;
    border-radius: 16px;
  }
</style>
