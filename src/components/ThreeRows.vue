<template>
  <div class="three-rows-container">
    <div class="row rowOne">
      <BaseCard v-for="(company, index) in globalArray" :key="index">
        <img :src="company.icon" alt="xxxx" srcset="">
      <h1>{{company.companyName}}</h1>      
    </BaseCard>
    </div>
    <div class="row rowTwo">Zeile 2 Inhalt</div>
    <div class="row rowThree">Zeile 3 Inhalt</div>
  </div>
</template>

<script>
import { globalArray } from '@/helpers/globalArray';
import BaseCard from './BaseCard.vue';

export default {
  name: 'ThreeRows',
  components: {    
    BaseCard,
  },
  data() {
    return {
      globalArray
    };
  }
};
</script>

<style scoped>
.three-rows-container {
  display: flex;
  flex-direction: column;  
  justify-content: center;
  gap: 32px;
  color: #FFFFFF;
  top: 155px;
  position: absolute;
  width: 1240px;
}

.row{
  display: flex;
  align-items: center;
  justify-content: flex-start;  
  gap: 24px;
  border-radius: 20px;
}

.rowOne {
  height: 191px;  
  background: #023a6233;
}
.rowTwo {
  height: 352px;  
  background: #011F35;
}
.rowThree {
  height: 296px;
  background: #011F35;
}
</style>
