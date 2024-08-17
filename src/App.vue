<template>

  <HeadLine />
  <ThreeRows />
  <!-- <BaseCard>
    <h1>Revenue last 3 years</h1>
    <p>Dies ist ein Beispielinhalt für die erste Karte.</p>
  </BaseCard> -->
</template>

<script>
import HeadLine from './components/HeadLine.vue';
import ThreeRows from './components/ThreeRows.vue';
// import BaseCard from './components/BaseCard.vue';
import { stockService } from './services/stockService';

export default {
  name: 'App',
  components: {
    HeadLine,
    ThreeRows,
    // BaseCard,
  },
  async created() {
    // this.data = await stockService.fetchData('$AAPL');
    this.data = await stockService.getRevenue('$AAPL');
    console.log('Loaded data', this.data);    
  },
};
</script>

<style>
*{
  scrollbar-color: #39DAFF;
}

::-webkit-scrollbar {
    width: 4px;
    height: 10px;
}

::-webkit-scrollbar-thumb {
    background-color: #39DAFF;
    border-radius: 2px;
}

::-webkit-scrollbar-track {
    background-color: #00000000;
    border: 1px solid #00000000;
}

body {
  margin: 0;
  font-family: 'Rubik', sans-serif;
  display: flex;
  justify-content: center;  
  height: 100vh;
  background: radial-gradient(
    71.11% 100% at 50% 0%,
    #020204 14.6%,
    #011f35 100%
  );
  background-attachment: fixed;
  background-size: cover;
}
#app {
  position: relative;
  width: 100vw;
  max-width: 1440px;  
  height: 100%;
  padding: 100px;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
</style>
