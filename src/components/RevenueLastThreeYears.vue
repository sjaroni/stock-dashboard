<template>
  <div class="content">
    <ChartHeadline :headlineTitle="title"></ChartHeadline>
    <div v-if="isLoading">
      <p>load ...</p>
    </div>
    <div v-else class="chart">
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
import { loadData } from '@/services/loadData';

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

  methods: {
    async getCompanyData() {
      companyArray.forEach(async (element, index) => {
        if (element.sheetName === '$MSFT' || element.sheetName === '$TSLA') {
          this.revenueValueArr = element.additional_values;
        } else {
          this.revenueValueArr = await loadData.getFullCompanyData(
            `${element.sheetName}`,
            element['revenueRow'],
          );
        }
        this.getValuesFromEachCompany(index);
      });
    },

    async getValuesFromEachCompany(index) {
      const keys = Object.keys(this.revenueValueArr);
      const lastKeys = keys.slice(-12);

      this.lastValues = lastKeys.map((key) => {
        return parseFloat(this.revenueValueArr[key].replace(',', '.'));
      });

      await this.setChartData(this.lastValues, index);
    },

    async setChartData(results, index) {
      const maxQuarter = this.getMaxQuarterAndAdjustResults(results, index);
      this.populateChartData(results, index, maxQuarter);
      this.finalizeLoading(index);
    },

    getMaxQuarterAndAdjustResults(results, index) {
      let maxQuarter = 12;

      switch (index) {
        case 1:
        case 3:
          maxQuarter = 11;
          results.shift();
          break;
        case 4:
          maxQuarter = 10;
          results.shift(2);
          break;
        case 6:
          maxQuarter = 12;
          this.adjustResultsForIndexSix(results);
          break;
      }

      return maxQuarter;
    },

    adjustResultsForIndexSix(results) {
      results.unshift('', '', '');
      results.splice(-3, 3);
    },

    populateChartData(results, index, maxQuarter) {
      for (let i = 0; i < maxQuarter; i++) {
        this.chartData.datasets[index].data[i] = results[i];
      }
    },

    finalizeLoading(index) {
      if (index === 6) {
        this.isLoading = false;
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
      title: 'Revenue last 3 years',
      chartData: {
        labels: lastThreeYearsQuarters,
        datasets: companyArray.map((company) => ({
          label: company.companyName,
          backgroundColor: company.color,
          borderColor: company.color,
          borderWidth: 2,
          data: [],
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
  font-size: .5rem;
  font-weight: 400;
  line-height: .6rem;
  text-align: right;
}
</style>
