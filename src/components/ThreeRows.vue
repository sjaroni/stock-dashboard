<template>
  <div class="three-rows-container">
    <div class="row rowOne">
      <WidgetData width="100%" height="100%">
        <CompanyCard
          v-for="(company, index) in companyArray"
          :key="index"
          :company="company"
        />
      </WidgetData>
    </div>
    <div class="row rowTwo">
      <!-- <WidgetData width="59.11%" height="100%">
        <RevenueLastThreeYears />
      </WidgetData> -->
      <WidgetData width="40.89%" height="100%">
        <RevenueBreakdown />
      </WidgetData>
    </div>
    <!-- <div class="row rowThree">
      <WidgetData width="33.33%" height="100%">
        <NetIncome />
      </WidgetData>
      <WidgetData width="24.6%" height="100%">
        <GrossMargin />
      </WidgetData>
      <WidgetData width="40.89%" height="100%">
        <RevenueGrowth />
      </WidgetData>
    </div> -->
  </div>
</template>

<script>
import { companyArray } from '@/helpers/companyArray';
import WidgetData from './WidgetData.vue';
import CompanyCard from './CompanyCard.vue';
// import RevenueLastThreeYears from './RevenueLastThreeYears.vue';
import RevenueBreakdown from './RevenueBreakdown.vue';
// import NetIncome from './NetIncome.vue';
// import GrossMargin from './GrossMargin.vue';
// import RevenueGrowth from './RevenueGrowth.vue';

export default {
  name: 'ThreeRows',
  components: {
    WidgetData,
    CompanyCard,
    // RevenueLastThreeYears,
    RevenueBreakdown,
    // NetIncome,
    // GrossMargin,
    // RevenueGrowth,
  },
  data() {
    return {
      companyArray,
    };
  },
};
</script>

<style scoped>
.three-rows-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  color: #ffffff;
  top: 155px;
  position: absolute;
  width: 1240px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  border-radius: 20px;
}

.rowOne {
  height: 191px;
  background: #023a6233;
  padding: 0 24px;
  overflow: hidden;
}

.rowTwo {
  height: 352px;
}

.rowThree {
  height: 296px;
}
</style>
