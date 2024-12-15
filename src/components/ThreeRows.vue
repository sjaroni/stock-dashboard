<template>
  <div class="three-rows-container">
    <div class="row row-one">
      <WidgetData class="widget-data-one" width="100%" height="100%">
        <CompanyCard
          v-for="(company, index) in companyArray"
          :key="index"
          :company="company"
        />
      </WidgetData>
    </div>
    <div class="row row-two">
      <WidgetData class="widget-data-two" width="59.11%" height="352px">
        <RevenueLastThreeYears />
      </WidgetData>
      <WidgetData class="widget-data-two" width="40.89%" height="352px">
        <RevenueBreakdown />
      </WidgetData>
    </div>
    <div class="row row-three">
      <WidgetData  class="widget-data-three" width="28.5%" height="100%">
        <NetIncome />
      </WidgetData>
      <WidgetData class="widget-data-three" width="28.5%" height="100%">
        <GrossMargin />
      </WidgetData>
      <WidgetData class="widget-data-three" width="40.89%" height="100%">
        <RevenueGrowth />
      </WidgetData>
    </div>
  </div>
</template>

<script>
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
  padding-bottom: 64px;
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
  display: flex;
  flex-wrap: wrap;
}

.row-two {
  height: 352px;
  align-items: center;
}

.row-three {
  height: 296px;
}

@media screen and (max-width: 1280px) {
  .three-rows-container {
    width: 90%;
  }

  .row-one {
    flex-wrap: wrap;
    height: 382px;

    .widget-data-one {
      height: 80% !important;
    }
  }

  .row-two {
    height: 728px;
    flex-wrap: wrap;
    justify-content: center;
    
    .widget-data-two {
      width: 100% !important;
    }
  }

  .row-three {
    height: 296px;
    flex-wrap: wrap;
    justify-content: center;
    
    .widget-data-three {
      width: 100% !important;
    }
  }
}
</style>
