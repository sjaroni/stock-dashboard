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
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { companyArray } from '@/helpers/companyArray.js'; 
import { colorArray } from '@/helpers/colorArray.js'; 
import { lastThreeYearsQuarters } from '@/helpers/quarterArray.js'; 

ChartJS.register(CategoryScale,  LinearScale,  PointElement,  LineElement,  Title,  Tooltip,  Legend);

export default {
  name: 'RevenueLastThreeYears',
  // data() {
  //   return {
  //     title: 'Revenue last 3 years',
  //     chartData: {
  //       labels: lastThreeYearsQuarters,        
  //         datasets: [
  //         {
  //           label: 'Revenue',
  //           backgroundColor: colorArray,
  //           borderColor: 'rgba(75, 192, 192, 1)',
  //           borderWidth: 2,
  //           pointBackgroundColor: 'rgba(75, 192, 192, 1)',
  //           pointBorderColor: '#fff',            
  //           data: companyArray.map((item) => item.companyName),
  //         }
  //       ],
  //     },
  //     chartOptions: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       plugins: {
  //         legend: {
  //           position: 'right',
  //           labels: {
  //             generateLabels: function (chart) {
  //               const dataset = chart.data.datasets[0];
  //               return chart.data.labels.map((label, i) => {
  //                 const value = dataset.data[i];
  //                 return {
  //                   text: `${label}: ${value}`,
  //                   fillStyle: dataset.backgroundColor[i],
  //                   strokeStyle: '#FFFFFF',
  //                   fontColor: '#FFFFFF',
  //                   font: {
  //                     family: 'Rubik',
  //                     size: 10,
  //                     weight: '400',
  //                     lineHeight: 1.185,
  //                   },
  //                   textAlign: 'left',
  //                   boxWidth: 20,
  //                   padding: 20,
  //                   hidden: false,
  //                   index: i,
  //                 };
  //               });
  //             },
  //           },
  //         },
  //       },
  //     },
  //   };
  // },
  data() {
    return {
      title: 'Revenue last 3 years',
      chartData: {
        labels: lastThreeYearsQuarters, // Quartale auf der X-Achse
        datasets: [
          {
            label: 'Revenue',
            backgroundColor: colorArray,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: '#fff',
            data: companyArray.map((item) => item.revenueRow) // Beispiel-Daten für Y-Achse, angepasst auf deinen Use-Case
          }
        ]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#FFFFFF',
            }
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              color: '#FFFFFF'
            },
            ticks: {
              color: '#FFFFFF'
            }
          },
          y: {
            title: {
              display: true,
              color: '#FFFFFF'
            },
            ticks: {
              color: '#FFFFFF'
            }
          }
        }
      }
    };
  },
  components: {
    ChartHeadline,
    Line,
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
