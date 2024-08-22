<template>
  <div class="content">
    <ChartHeadline :headlineTitle="title"></ChartHeadline>
    <div class="chart">
      <Doughnut :options="chartOptions" :data="chartData" />
      <div class="currency">In Billion USD TTM</div>
    </div>
  </div>
</template>

<script>
import ChartHeadline from './ChartHeadline.vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { companyArray } from '@/helpers/companyArray.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: 'RevenueBreakdown',
  data() {
    return {
      title: 'Revenue Breakdown Magnificent Seven',
      chartData: {
        labels: companyArray.map((item) => item.companyName),
        datasets: [
          {
            backgroundColor: companyArray.map((item) => item.color),
            data: [8.7, 5.4, 14.7, 17, 17.7, 11.5, 9.1],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              generateLabels: function (chart) {
                const dataset = chart.data.datasets[0];
                return chart.data.labels.map((label, i) => {
                  const value = dataset.data[i];
                  return {
                    text: `${label}: ${value}`,
                    fillStyle: dataset.backgroundColor[i],
                    strokeStyle: '#FFFFFF',
                    fontColor: '#FFFFFF',
                    font: {
                      family: 'Rubik',
                      size: 10,
                      weight: '400',
                      lineHeight: 1.185,
                    },
                    textAlign: 'left',
                    boxWidth: 20,
                    padding: 20,
                    hidden: false,
                    index: i,
                  };
                });
              },
            },
          },
        },
      },
    };
  },
  components: {
    ChartHeadline,
    Doughnut,
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #011f35;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px 49px;
  border-radius: 16px;
}

.chart {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.currency {
  position: absolute;
  right: 0;
  bottom: 8px;
  font-size: 8px;
  font-weight: 400;
  line-height: 9.48px;
  text-align: right;
}
</style>
