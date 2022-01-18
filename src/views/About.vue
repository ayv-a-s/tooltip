<template>
  <div class="about">
    <h1
      :data-tooltip="tip.txt"
      :data-options ="tip.opt"
    >
      This is an about page
    </h1>

    <div class="container">
      <p>
        <span
          data-tooltip="default"
        >
          aaa
        </span>
        aa aaaa aaa a aa a a aaaa aa aaa aaa a
        <span
          @click="onClick"
          style="cursor: pointer"
        >
          tip
        </span>
        ddd aaa aa a a aaa aaaa
      </p>
    </div>
    <div v-for="i in 30" :key="i">
      <h1>Line {{i}}</h1>
    </div>
  </div>
</template>
<script lang="ts">

import Vue from "vue";
import InitTooltip from '../functions/initTooltip'
export default Vue.extend({
  name: 'About',
  data(){
    const tipOpened = true;
    return {tipOpened}
  },
  methods:{
    onClick(){
      this.tipOpened = !this.tipOpened
      InitTooltip();
    }
  },
  computed: {
    tip(): {txt: string, opt: string}{
      return {
        txt: this.tipOpened ? "ХОБА!" : "ОБАНА",
        opt: this.tipOpened ? 'warning , onClick , bottom' : 'error , onFloat , top'
      }
    }
  },
  mounted() {
     InitTooltip();
  }
})
</script>
<style>

.container{
  margin: auto;
  max-width: 100%;
}
body {
  overflow: hidden;
}
</style>