<template>
  <div class="content">
    <ChartHeadline :headlineTitle="title"></ChartHeadline>
    <div v-if="isLoading">
      <p>load ...</p>
    </div>
    <div v-else class="chart">
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
import { loadData } from '@/services/loadData';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: 'RevenueBreakdown',
  revenueSums: [],
  components: {
    ChartHeadline,
    Doughnut,
  },

  methods: {
    async getCompanyData() {
      companyArray.forEach(async (element, index) => {
        this.revenueValueArr = await loadData.getFullCompanyData(
          `${element.sheetName}`,
          element['revenueRow'],
        );

        this.getLastFourValuesFromEachCompany(index);
      });
    },

    getLastFourValuesFromEachCompany(index) {
      const keys = Object.keys(this.revenueValueArr);
      const lastFourKeys = keys.slice(-4);

      this.lastFourValues = lastFourKeys.map((key) => {
        return parseFloat(this.revenueValueArr[key].replace(',', '.'));
      });

      this.sumLastFourValues = this.lastFourValues.reduce(
        (sum, value) => sum + (value || 0),
        0,
      );

      let newValue = this.sumLastFourValues.toFixed(1);

      setTimeout(async () => {
        await this.updateChartDataValue(index, newValue);
      }, 200);
    },

    async updateChartDataValue(index, newValue) {
      if (index < this.chartData.datasets[0].data.length) {
        this.chartData.datasets[0].data[index] = newValue;
        setTimeout(() => {
          this.chartData.datasets[0].data[index];
          this.isLoading = false;
        }, 200);
      }
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
      title: 'Revenue Breakdown Magnificent Seven',
      chartData: {
        labels: companyArray.map((item) => item.companyName),
        datasets: [
          {
            backgroundColor: companyArray.map((item) => item.color),
            data: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
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
  font-size: .5rem;
  font-weight: 400;
  line-height: .6rem;
  text-align: right;
}

@media screen and (max-width: 440px) {
  .content {
    padding: 16px;
  }
}
</style>
