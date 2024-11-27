<template>
  <div class="content">
    <ChartHeadline :headlineTitle="title"></ChartHeadline>
    <div v-if="isLoading">
      <p>load ...</p>
    </div>
    <div v-else class="chart">
      <Bar :options="chartOptions" :data="chartData" :plugins="chartPlugins" />
    </div>
  </div>
</template>

<script>
import ChartHeadline from './ChartHeadline.vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { companyArray } from '@/helpers/companyArray.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
);

export default {
  name: 'RevenueGrowth',

  components: {
    ChartHeadline,
    Bar,
  },
  data() {
    return {
      title: 'Revenue Growth in % YoY',
      chartData: {
        labels: companyArray.map((item) => item.companyName),
        datasets: [
          {
            label: 'Q4 2024',
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            data: [80, 55, 70, 85, 60, 50, 75], // Werte für Firma A bis G
          },
          {
            label: 'Q3 2024',
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            data: [60, 45, 65, 70, 55, 40, 65],
          },
          {
            label: 'Q2 2024',
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            data: [50, 35, 60, 55, 50, 30, 55],
          },
          {
            label: 'Q1 2024',
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            data: [40, 25, 50, 45, 40, 20, 45],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                size: 14,
              },
            },
          },
        },
        scales: {
          y: {
            min: 0,
            max: 90,
            ticks: {
              stepSize: 10,
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
  gap: 16px;
  background-color: #011f35;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 16px;
}

.chart {
  height: 100%;
}
</style>
