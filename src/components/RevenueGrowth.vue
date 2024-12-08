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
import { loadData } from '@/services/loadData';

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
    setTimeout(() => {
      this.loadContent();
    }, 200);
    this.setChartLabels();
  },

  methods: {
    async loadContent() {
      await this.loadRevenueGrowthData();
    },

    async loadRevenueGrowthData() {
      companyArray.forEach(async (element, index) => {
        this.revenueGrowthArr = await loadData.getFullCompanyData(
          `${element.sheetName}`,
          element['revenueGrowthRow'],
        );
        await this.getLastFourValuesFromEachCompany(
          this.revenueGrowthArr,
          index,
        );
      });
    },

    setChartLabels() {
      const date = new Date();
      let currentQuarter = Math.floor(date.getMonth() / 3);
      let currentYear = date.getFullYear();

      const results = [];

      for (let i = 3; i >= 0; i--) {
        results[i] = `Q${currentQuarter} ${currentYear}`;
        this.chartData.datasets[i].label = results[i];
        currentQuarter--;
        if (currentQuarter === 0) {
          currentQuarter = 4;
          currentYear--;
        }
      }
    },

    async getLastFourValuesFromEachCompany(arr, index) {
      const keys = Object.keys(arr);
      const lastFourKeys = keys.slice(-4);

      this.lastFourValues = lastFourKeys.map((key) => {
        return parseFloat(arr[key].replace(',', '.'));
      });

      await this.setChartData(this.lastFourValues, index);
    },

    async setChartData(results, index) {
      for (let i = 0; i < 4; i++) {
        this.chartData.datasets[i].data[index] = results[i];
      }
      
      if(index === 6){
        this.isLoading = false;
      }
    },
  },

  data() {
    const commonDatasetSettings = {
      color: '#FFFFFF',
      borderColor: '#FFFFFF',
      borderWidth: 1,
    };

    return {
      isLoading: true,
      title: 'Revenue Growth in % YoY',
      chartData: {
        labels: companyArray.map((item) => item.companyName),
        datasets: [
          {
            ...commonDatasetSettings,
            backgroundColor: '#218AA8',
            data: [],
          },
          {
            ...commonDatasetSettings,
            backgroundColor: '#29A5C5',
            data: [],
          },
          {
            ...commonDatasetSettings,
            backgroundColor: '#31BFE2',
            data: [],
          },
          {
            ...commonDatasetSettings,
            backgroundColor: '#39DAFF',
            data: [],
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
            max: 80,
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
