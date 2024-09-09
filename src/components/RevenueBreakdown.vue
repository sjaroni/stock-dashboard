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
import { stockService } from '@/services/stockService';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: 'RevenueBreakdown',
  revenueSums: [],
  components: {
    ChartHeadline,
    Doughnut,
  },
  methods: {
    getCompanyData(){      

      companyArray.forEach(async element => {
        let revenueValueArr = await stockService.getRevenue(`${element.sheetName}`, element['revenueRow']);
        console.log(element.companyName);
        
        console.log(revenueValueArr);                
      });
    }
  },
  mounted() {
    this.getCompanyData();
  },
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

  async sayHello(item) {
    console.log(item);    
  },
  // async created(item) {
  //   this.revenueValueArr = {
  //     '': '95,678',
  //     'Mar 21': '72,683',
  //     'Jun 21': '63,948',
  //     'Sep 21': '65,083',
  //     'Dec 21': '104,429',
  //     'Mar 22': '77,457',
  //     'Jun 22': '63,355',
  //     'Sep 22': '70,958',
  //     'Dec 22': '96,388',
  //     'Mar 23': '73,929',
  //     '3 Aug 23': '60,584',
  //     '2 Nov 23': '67,184',
  //     '1 Feb 24': '96,458',
  //     '2 Mai 24': '66,886',
  //     '1 Aug 24': '61,564',
  //   };

  //   // Holen der letzten 4 Schlüssel
  //   const keys = Object.keys(this.revenueValueArr);
  //   const lastFourKeys = keys.slice(-4);

  //   // Konvertieren der letzten 4 Werte in Zahlen und Summieren
  //   this.lastFourValues = lastFourKeys.map((key) => {
  //     // Ersetzen von Kommas durch Punkte und Konvertieren in eine Zahl
  //     return parseFloat(this.revenueValueArr[key].replace(',', '.'));
  //   });

  //   // Berechnen der Summe der letzten 4 Werte
  //   this.sumLastFourValues = this.lastFourValues.reduce(
  //     (sum, value) => sum + (value || 0),
  //     0,
  //   );

  //   console.log('Last Four Values:', this.lastFourValues);
  //   console.log('Sum of Last Four Values:', this.sumLastFourValues);
  // },
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
