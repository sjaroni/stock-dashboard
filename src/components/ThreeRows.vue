<template>
  <div class="three-rows-container">
    <div class="row row-one">
      <WidgetData width="100%" height="100%">
        <CompanyCard
          v-for="(company, index) in companyArray"
          :key="index"
          :company="company"
        />
      </WidgetData>
    </div>
    <div class="row row-two">
      <WidgetData width="59.11%" height="352px">
        <RevenueLastThreeYears />
      </WidgetData>
      <WidgetData width="40.89%" height="352px">
        <RevenueBreakdown />
      </WidgetData>
    </div>
    <!-- <div class="row row-three">
      <WidgetData width="28.5%" height="100%">
        <NetIncome />
      </WidgetData>
      <WidgetData width="28.5%" height="100%">
        <GrossMargin />
      </WidgetData>
      <WidgetData width="40.89%" height="100%">
        <RevenueGrowth />
      </WidgetData>
    </div> -->
  </div>
</template>

<script>
/* eslint-disable */
import { companyArray } from '@/helpers/companyArray';
import WidgetData from './WidgetData.vue';
import CompanyCard from './CompanyCard.vue';
import RevenueLastThreeYears from './RevenueLastThreeYears.vue';
import RevenueBreakdown from './RevenueBreakdown.vue';
import NetIncome from './NetIncome.vue';
import GrossMargin from './GrossMargin.vue';
import RevenueGrowth from './RevenueGrowth.vue';

export default {
  name: 'ThreeRows',
  components: {
    WidgetData,
    CompanyCard,
    RevenueLastThreeYears,
    RevenueBreakdown,
    NetIncome,
    GrossMargin,
    RevenueGrowth,
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

.row-one {
  height: 191px;
  background: #023a6233;
  padding: 0 24px;
  overflow: hidden;
}

.row-two {
  height: 352px;
  align-items: center;
}

.row-three {
  height: 296px;
}

@media screen and (max-width: 992px){
  .row-two{
    /* background-color: pink; */
    height: 728px;
    flex-wrap: wrap;    
    justify-content: center;
  }
}

</style>
