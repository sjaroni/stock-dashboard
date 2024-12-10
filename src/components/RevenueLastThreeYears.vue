<template>
  <div class="content">
    <ChartHeadline :headlineTitle="title"></ChartHeadline>
    <div class="chart">
      <Line :options="chartOptions" :data="chartData" />
    </div>
  </div>
</template>

<script>
import ChartHeadline from './ChartHeadline.vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { companyArray } from '@/helpers/companyArray.js';
import { lastThreeYearsQuarters } from '@/helpers/quarterArray.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default {
  name: 'RevenueLastThreeYears',

  components: {
    ChartHeadline,
    Line,
  },

  data() {
    return {
      title: 'Revenue last 3 years',
      chartData: {
        labels: lastThreeYearsQuarters,
        datasets: companyArray.map((company, index) => ({
          label: company.companyName,
          backgroundColor: company.color,
          borderColor: company.color,
          borderWidth: 1,
          data: Array(15).fill(10 + index), // Beispielhafte Daten von 10 bis 16
          pointRadius: 0,
          pointHoverRadius: 0,
        })),
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              color: '#FFFFFF',
              borderColor: '#FFFFFF',
              borderWidth: 1,
              boxWidth: 32,
              boxHeight: 12,
            },
          },
        },
        scales: {
          x: {            
            title: {
              display: true,
              color: '#FFFFFF',
            },
            ticks: {
              color: '#FFFFFF',
              font: {
                family: 'Rubik',
                size: 8,
                weight: '400',
                lineHeight: 1.185,
              },
              align: 'center',
              maxRotation: 17.04,
              minRotation: 17.04,
            },
            grid: {
              color: '#9E9E9E',
            },
          },
          y: {            
            title: {
              display: true,
              color: '#FFFFFF',
            },
            ticks: {
              color: '#FFFFFF',
              stepSize: 30,
            },
            grid: {
              color: '#9E9E9E',
            },
          },
        },
      },
    };
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
