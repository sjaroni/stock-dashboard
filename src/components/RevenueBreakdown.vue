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
        this.revenueQuarter = await loadData.getFullCompanyData(
          `${element.sheetName}`,
          element['revenueQuarter'],
        );
        this.getLastFourValuesFromEachCompany(index);
        console.log(element.sheetName);
        // this.sortObjectEntriesByQuarter(this.revenueQuarter);

        let sortedMap = this.sortObjectEntriesByQuarter(this.revenueQuarter);
        console.log(sortedMap);

        

      });
    },

    // xsortObjectEntriesByQuarter(obj) {
    //   let entries = Object.entries(obj);

    //   entries.sort((a, b) => {
    //     const parseQuarterYear = (str) => {
    //       const match = str.match(/Q(\d)-(\d+)/);
    //       if (match) {
    //         const quarter = parseInt(match[1], 10);
    //         const year = parseInt(match[2], 10);
    //         return year * 4 + (quarter - 1);
    //       }
    //       return Infinity;
    //     };

    //     return parseQuarterYear(a[1]) - parseQuarterYear(b[1]);
    //   });

    //   console.log(entries);

    //   // Erstellen einer Map, um die Sortierung zu behalten
    //   let resultMap = new Map(entries);
    //   // Umwandlung der Map in ein Objekt, das die Sortierung beibehält
    //   let result = Object.fromEntries(resultMap);
    //   console.log(result);
    // },
//TODO - Weitermachen
    sortObjectEntriesByQuarter(obj) {
    let entries = Object.entries(obj);

    entries.sort((a, b) => {
        const parseQuarterYear = (str) => {
            const match = str.match(/Q(\d)-(\d+)/);
            if (match) {
                const quarter = parseInt(match[1], 10);
                const year = parseInt(match[2], 10);
                return year * 4 + (quarter - 1);
            }
            return Infinity;
        };

        return parseQuarterYear(a[1]) - parseQuarterYear(b[1]);
    });

    // Log der Einträge in sortierter Reihenfolge
    // console.log(entries);

    // Erstellen einer Map, um die Sortierung beizubehalten
    let resultMap = new Map(entries);

    // Rückgabe als Map, die die Sortierung garantiert
    return resultMap;
},


    getLastFourValuesFromEachCompany2(index) {
      console.log(index);
    },

    getLastFourValuesFromEachCompany(index) {
      const keys = Object.keys(this.revenueValueArr);

      // console.log(this.revenueValueArr);
      const lastFourKeys = keys.slice(-4);

      // console.log(keys);

      //this.sortObjectEntriesByQuarter();

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

    extractLastFourValues() {
      //console.log(this.revenueQuarterArr);
      // const keys = Object.keys(this.revenueQuarterArr);
      // const lastFourKeys = keys.slice(-4);
      // this.lastFourKeys = lastFourKeys.map((key) => this.revenueQuarterArr[key]);
      // console.log(this.lastFourKeys);
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
      revenueQuarterArr: {},
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
                    text: `   ${label} ${value}`,
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
  font-size: 8px;
  font-weight: 400;
  line-height: 9.48px;
  text-align: right;
}
</style>
