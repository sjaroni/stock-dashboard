<template>
  <HeadLine />
  <!-- <ThreeRows /> -->
</template>

<script>
import HeadLine from './components/HeadLine.vue';
// import ThreeRows from './components/ThreeRows.vue';
import { loadData } from '@/services/loadData';

export default {
  name: 'App',
  components: {
    HeadLine,
    // ThreeRows,
  },
  beforeCreate(){    
    loadData.checkLastData();
  }
};
</script>

<style>
*{
  scrollbar-color: #39DAFF;
}

::-webkit-scrollbar {
    width: 4px;
    height: 6px;
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
