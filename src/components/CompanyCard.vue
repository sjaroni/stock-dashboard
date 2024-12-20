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
import { loadData } from '@/services/loadData';
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
      rawQuarter: '',
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

  created() {
    setTimeout(() => {
      this.loadContent();
    }, 200);
  },
  methods: {
    
    async loadContent() {
      await this.loadRevenueData();
      this.rawQuarter = this.getQuarterName();
      this.revenueValue = await this.getRevenueValue();

      this.extractLastTwoValues();

      await this.calculateFluctuations();
    },

    async loadRevenueData() {
      this.revenueQuarterArr = await loadData.getFullCompanyData(
        `${this.company.sheetName}`,
        this.company['revenueQuarter'],
      );
      this.revenueValueArr = await loadData.getFullCompanyData(
        `${this.company.sheetName}`,
        this.company['revenueRow'],
      );
    },

    extractLastTwoValues() {
      const keys = Object.keys(this.revenueValueArr);
      const lastTwoKeys = keys.slice(-2);
      this.lastTwoValues = lastTwoKeys.map((key) => this.revenueValueArr[key]);
    },    

    async calculateFluctuations() {
      const secondLastValue = await this.convertNumberToFixedNumber(
        this.lastTwoValues[0],
        2,
      );
      const lastValue = await this.convertNumberToFixedNumber(
        this.lastTwoValues[1],
        2,
      );
      this.fluctuationValue = this.calculateFluctuationValue(
        parseFloat(lastValue),
        parseFloat(secondLastValue),
      );
      this.fluctuationPercentage = this.calculateFluctuationPercentage(
        this.fluctuationValue,
        parseFloat(secondLastValue),
      );
      this.secondLastValue = secondLastValue;
    },

    getQuarterName() {      
      return this.revenueQuarterArr[Object.keys(this.revenueQuarterArr).pop()];
    },

    calculateFluctuationValue(lastValue, secondLastValue) {
      let fluctuationValue = lastValue - secondLastValue;
      return parseFloat(fluctuationValue.toFixed(2));
    },

    calculateFluctuationPercentage(fluctuationValue, secondLastValue) {
      return parseFloat(
        ((fluctuationValue / secondLastValue) * 100).toFixed(2),
      );
    },

    async getRevenueValue() {
      let revenueValue =
        this.revenueValueArr[Object.keys(this.revenueValueArr).pop()];

      revenueValue = await this.convertNumberToFixedNumber(revenueValue, 2);
      return revenueValue;
    },

    async convertNumberToFixedNumber(number, decimal) {
      let convertedNumber = number.toString().replace(',', '.');
      convertedNumber = parseFloat(convertedNumber);
      return convertedNumber.toFixed(decimal);
    },
  },
};
</script>

<style scoped>
.companyCard {
  background: #011f35;
  box-sizing: border-box;
  padding: 1.25rem 1.5rem;
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
    font-size: 1.25rem;
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
    font-size: .75rem;
    font-weight: 400;
    line-height: .89rem;
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
      font-size: 1.5rem;
      font-weight: 500;
      line-height: 1.8rem;
      text-align: left;
    }

    .right {
      font-family: Rubik;
      font-size: .8rem;
      font-weight: 500;
      line-height: .96rem;
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
    font-size: .5rem;
    font-weight: 400;
    line-height: .59rem;
    text-align: left;
  }
}

@media screen and (max-width: 440px) {
  .companyCard {
    width: 100%;
    min-width: 100%;
  }
}

</style>
