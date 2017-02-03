<template>
  <div class="progress">
  <div class="bar-container">
      <div class="bar" v-bind:class="{ gray: widthVal == 0 }" v-bind:style="{ width:  widthVal > 0 ? widthVal + '%' : '0%' }">
         <span class="bar-text">{{widthVal > 0 ? widthVal + '%' : ''}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'progressBar',
  props: ['percent'],
  data () {
    return {
    };
  },
  computed: {
    widthVal: function () {
      return (this.percent * 100).toFixed(0);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bar, .bar-container{
  background-color: #1AAD19;
  height: 18px;
  border-radius: 9px;
  position: relative;
  margin-top: 5px;
  -webkit-transition: width 1s; /* For Safari 3.1 to 6.0 */
  transition: width 1s;
}
.bar-container {
  background-color: #ddd;
  width: 100%;
}
.bar-text{
  position: absolute;
  right: -54px;
  top: -2px;
}
.gray{
  background-color: #BDBDBD;
}
</style>
