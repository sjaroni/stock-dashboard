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
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { companyArray } from '@/helpers/companyArray.js';
import { loadData } from '@/services/loadData';

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement);

export default {
  name: 'GrossMargin',

  components: {
    ChartHeadline,
    Bar,
  },

  methods: {
    async getCompanyData() {
      companyArray.forEach(async (element, index) => {
        this.grossMargin = await loadData.getFullCompanyData(
          `${element.sheetName}`,
          element['grossMarginRow'],
        );

        this.getLastValueFromEachCompany(index);
      });
    },

    getLastValueFromEachCompany(index) {
      const keys = Object.keys(this.grossMargin);
      const lastKeys = keys.slice(-1);

      this.lastValues = lastKeys.map((key) => {
        return parseFloat(this.grossMargin[key].replace(',', '.'));
      });

      this.sumLastValues = this.lastValues.reduce(
        (sum, value) => sum + (value || 0),
        0,
      );

      let newValue = this.sumLastValues.toFixed(1);

      setTimeout(async () => {
        await this.updateChartDataValue(index, newValue);
      }, 200);
    },

    async updateChartDataValue(index, newValue) {
      this.chartData.datasets[0].data[index] = newValue;
      setTimeout(() => {
        this.chartData.datasets[0].data[index];
        this.isLoading = false;
      }, 200);
    },
  },

  created() {
    setTimeout(() => {
      this.getCompanyData();
    }, 200);
  },

  data() {
    return {
      isLoading: true,
      title: 'Gross Margin in % LQ',
      chartData: {
        labels: companyArray.map((item) => item.companyName),
        datasets: [
          {
            backgroundColor: companyArray.map((item) => item.color),
            data: [62.62, 40.15, 39.5, 24.51, 26.25, 6.81, 3.16],
            borderColor: '#FFFFFF',
            borderWidth: 1.5,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false,
            labels: {
              color: '#FFFFFF',
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
          datalabels: {
            color: '#FFFFFF',
            anchor: 'end',
            align: 'start',
            font: {
              size: 12,
              weight: 'bold',
            },
            offset: -45,
            formatter: (value) => {
              return value + '%';
            },
          },
        },
        scales: {
          x: {
            display: true,
            beginAtZero: true,
            min: 0,
            max: 120,
            grid: {
              color: '#9E9E9E',
              borderColor: '#9E9E9E',
              borderWidth: 0.5,
              offset: false,
            },
            ticks: {
              stepSize: 20,
              display: true,
              color: '#011f35',
            },
          },
          y: {
            min: 0,
            beginAtZero: true,
            grid: {
              color: '#9E9E9E',
              borderColor: '#9E9E9E',
              borderWidth: 0.5,
              offset: true,
            },
            ticks: {
              color: '#FFFFFF',
              stepSize: 20,
            },
          },
        },
      },
      chartPlugins: [ChartDataLabels],
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
