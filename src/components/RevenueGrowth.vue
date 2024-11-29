<template>
  <div class="content">
    <ChartHeadline :headlineTitle="title"></ChartHeadline>
    <div v-if="isLoading">
      <p>load ...</p>
    </div>
    <div v-else class="chart">
      <Bar :options="chartOptions" :data="chartData" />
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

  created() {
    // setTimeout(() => {
    //   this.getCompanyData();
    // }, 200);

    this.getLastFourQuarters();
    // this.chartData.datasets[0].data[index] = newValue;
  },

  methods: {
    getLastFourQuarters() {
      const date = new Date();
      let currentQuarter = Math.floor(date.getMonth() / 3) + 1;
      let currentYear = date.getFullYear();

      const results = [];

      for (let i = 0; i < 4; i++) {
        results.push(`Q${currentQuarter} ${currentYear}`);
        currentQuarter--;
        if (currentQuarter === 0) {
          currentQuarter = 4;
          currentYear--;
        }
        this.chartData.datasets[i].label = results[i];
      }
    },
  },

  data() {
    return {
      // isLoading: true,
      isLoading: false,
      title: 'Revenue Growth in % YoY',
      chartData: {
        labels: companyArray.map((item) => item.companyName),
        datasets: [
          {
            color: 'FFFFFF',
            backgroundColor: '#39DAFF',
            borderColor: '#FFFFFF',
            borderWidth: 1,
            data: [80, 55, 70, 85, 60, 50, 75], // Werte für Firma A bis G
          },
          {
            color: '#FFFFFF',
            backgroundColor: '#31BFE2',
            borderColor: '#FFFFFF',
            borderWidth: 1,
            data: [60, 45, 65, 70, 55, 40, 65],
          },
          {
            color: '#FFFFFF',
            backgroundColor: '#29A5C5',
            borderColor: '#FFFFFF',
            borderWidth: 1,
            data: [50, 35, 60, 55, 50, 30, 55],
          },
          {
            color: '#FFFFFF',
            backgroundColor: '#218AA8',
            borderColor: '#FFFFFF',
            borderWidth: 1,
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
              color: '#FFFFFF',
              font: {
                size: 10,
              },
              boxWidth: 20,
              padding: 10,
              hidden: false,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#FFFFFF',
              font: {
                size: 8,
              },
            },
          },
          y: {
            min: 0,
            max: 90,
            ticks: {
              stepSize: 10,
              color: '#FFFFFF',
            },
            grid: {
              color: '#9E9E9E',
              borderColor: '#9E9E9E',
              borderWidth: 0.5,
              offset: false,
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
