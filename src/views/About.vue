<template>
  <div class="about">
    <h1 :data-tooltip="JSON.stringify(test1)" id="test1" >This is an about page</h1>

    <div class="container">
      <p>
        <span :data-tooltip="JSON.stringify(test2)" id="test2">aaa</span>
        aa aaaa aaa a aa a a aaaa aa aaa aaa a
        <span :data-tooltip="JSON.stringify(test3)" id="test3">tip</span>
        aaaa aaa aa a a aaa aaaa
      </p>
    </div>
    <div v-for="i in 30" :key="i">
      <h1>Line {{i}}</h1>
    </div>
  </div>
</template>
<script lang="ts">

import Vue from "vue";

import initTooltip from '../functions'
export default Vue.extend({
  name: 'About',
  data(){
    const test1 = {
      content: 'adfadgag',
      theme: 'warning',
      effect:'onFloat',
    };
    const test2 = {
      theme: 'success',
      effect:'onClick',
      position: 'top',
      content: "sssss ssss ss sssss sss ssssss ssss ss"
    }
    const test3 = {
      theme: 'error',
      position: 'left',
      content: "<b>ПодсказОчка</b> <br/> dfujbadfjnbo ;ajbjadfjb ln badkfj bnkaj dfnb;k jn;ROEIJ GVPDJF LKBad lfjnbv nfrjf"
    }
     return {
       test3,
       test1,
       test2
     }
  },
  mounted() {
     initTooltip();
  }
})
</script>
<style>

.container{
  margin: auto;
  max-width: 100%;
}
</style>