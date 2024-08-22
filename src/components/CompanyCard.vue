<template>
  <div class="companyCard">
    <div class="company">
      <div class="logo">
        <img :src="company.icon" alt="Company Icon" />
      </div>
      <h2>{{ company.companyName }}</h2>
    </div>
    <div class="revenue">
      <div class="text">Revenue {{ normalizedQuarter }}</div>
      <div class="currentValues">
        <div class="revenueValue">{{ displayedRevenueValue }}</div>
        <div class="right">
          <div class="top" :class="getClassBasedOnValue">
            <div class="fluctuation">{{ formattedFluctuation }}</div>
            <div class="icon" :class="getIconClass" v-html="getIcon"></div>
          </div>
          <div class="bottom" :class="getClassBasedOnValue">
            <div class="percentage">{{ displayFluctuationPercentage }}</div>
            <div class="icon">%</div>
          </div>
        </div>
      </div>
      <div class="currency">In Bill USD</div>
    </div>
  </div>
</template>

<script>
import { stockService } from '@/services/stockService';
import { normalizeQuarterFormat } from '@/helpers/formatQuarter';


export default {
  props: {
    company: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quarterName: null,
      lastValue: null,
      revenueValue: null,
      fluctuationValue: null,
      fluctuationPercentage: null,
      revenueQuarterArr: {},
      revenueValueArr: {},
      rawQuarter: ''
    };
  },
  computed: {
    displayedQuarterName() {
      return this.quarterName || 'load...';
    },
    displayedRevenueValue() {
      return this.revenueValue || 'load...';
    },
    displayFluctuation() {
      return this.fluctuationValue || 'load...';
    },
    displayFluctuationPercentage() {
      return this.fluctuationPercentage || 'load...';
    },
    getClassBasedOnValue() {
      if (this.displayFluctuation > 0) {
        return 'positive';
      } else if (this.displayFluctuation < 0) {
        return 'negative';
      } else {
        return 'neutral';
      }
    },
    getIconClass() {
      if (this.displayFluctuation > 0) {
        return 'icon-positive';
      } else if (this.displayFluctuation < 0) {
        return 'icon-negative';
      } else {
        return '';
      }
    },
    getIcon() {
      if (this.displayFluctuation > 0) {
        return '&#8593;';
      } else if (this.displayFluctuation < 0) {
        return '&#8595;';
      } else {
        return '';
      }
    },
    formattedFluctuation() {      
      return this.displayFluctuation > 0
        ? `+${this.displayFluctuation}`
        : this.displayFluctuation;
    },
    normalizedQuarter() {
      return normalizeQuarterFormat(this.rawQuarter);
    },
  },
  async created() {
    this.revenueQuarterArr = await stockService.getRevenueQuarterName(`${this.company.sheetName}`, this.company['revenueQuarter']);
    this.revenueValueArr = await stockService.getRevenue(`${this.company.sheetName}`, this.company['revenueRow']);
    // this.revenueQuarterArr = {
    //   '': '21Q1',
    //   'Mar 21': '21Q2',
    //   'Jun 21': '21Q3',
    //   'Sep 21': '21Q4',
    //   'Dec 21': '22Q1',
    //   'Mar 22': '22Q2',
    //   'Jun 22': '22Q3',
    //   'Sep 22': '22Q4',
    //   'Dec 22': '23Q1',
    //   'Mar 23': '23Q2',
    //   '3 Aug 23': '23Q3',
    //   '2 Nov 23': '23Q4',
    //   '1 Feb 24': '24Q1',
    //   '2 Mai 24': '24Q2',
    //   '1 Aug 24': '24Q3',
    // };

    // this.revenueValueArr = {
    //   '': '95,678',
    //   'Mar 21': '72,683',
    //   'Jun 21': '63,948',
    //   'Sep 21': '65,083',
    //   'Dec 21': '104,429',
    //   'Mar 22': '77,457',
    //   'Jun 22': '63,355',
    //   'Sep 22': '70,958',
    //   'Dec 22': '96,388',
    //   'Mar 23': '73,929',
    //   '3 Aug 23': '60,584',
    //   '2 Nov 23': '67,184',
    //   '1 Feb 24': '96,458',
    //   '2 Mai 24': '66,886',
    //   '1 Aug 24': '61,564',
    // };

    this.quarterName =
      this.revenueQuarterArr[Object.keys(this.revenueQuarterArr).pop()];
    this.rawQuarter = this.quarterName;
    this.revenueValue =
      this.revenueValueArr[Object.keys(this.revenueValueArr).pop()];

    const keys = Object.keys(this.revenueValueArr);
    const lastTwoKeys = keys.slice(-2);
    this.lastTwoValues = lastTwoKeys.map((key) => this.revenueValueArr[key]);
    this.secondLastValue = this.lastTwoValues[0].toString().replace(',', '.');
    this.secondLastValue = 60;
    this.lastValue = this.lastTwoValues[1].toString().replace(',', '.');
    this.fluctuationValue = this.lastValue - this.secondLastValue;
    this.fluctuationValue = parseFloat(this.fluctuationValue.toFixed(2));
    this.fluctuationPercentage = parseFloat(
      (this.fluctuationValue / this.secondLastValue) * 100,
    ).toFixed(2);
  },
};
</script>

<style scoped>
.companyCard {
  background: #011f35;
  box-sizing: border-box;
  padding: 20px 24px;
  border-radius: 16px;
  color: #ffffff;
  width: 187px;
  min-width: 187px;
  max-width: 187px;
  height: 143px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.company {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    width: 24px;
  }

  h2 {
    margin-block-start: 0;
    margin-block-end: 0;
    font-family: Rubik;
    font-size: 20px;
    font-weight: 500;
    line-height: 23.7px;
    text-align: left;
  }
}

.revenue {
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  align-items: flex-start;

  .text {
    font-size: 12px;
    font-weight: 400;
    line-height: 14.22px;
    text-align: left;
  }

  .currentValues {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    width: 100%;
    height: 40px;

    .revenueValue {
      font-size: 24px;
      font-weight: 500;
      line-height: 28.44px;
      text-align: left;
    }

    .right {
      font-family: Rubik;
      font-size: 13px;
      font-weight: 500;
      line-height: 15.41px;
      text-align: left;
      width: 54px;
    }

    .positive {
      color: #3ba752;
    }

    .negative {
      color: #c41c1c;
    }

    .top,
    .bottom {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .fluctuation {
      text-align: left;
    }
    .percentage {
      text-align: right;
    }

    .icon {
      width: 20px;
      text-align: center;
    }
  }

  .currency {
    font-size: 8px;
    font-weight: 400;
    line-height: 9.48px;
    text-align: left;
  }
}
</style>
