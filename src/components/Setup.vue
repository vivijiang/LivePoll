<template>
<div class="page-layout-body-inner">
  <div class="event-header container l-px2 relative">
    <div class="event-header__left hidden-sm-down">
      <div class="event-header__event truncate">{{surveyName}}</div>
    </div>
    <div class="event-header__center">
      <span>Join mini program with code {{surveyCode}}</span>
    </div>
  </div>
  <div class="main-panel-body bg-white shadow-b1 flex-column flex">
    <div></div>
    <div class="pointer no-shrink create-component create-component--bottom-border create-component--perma-bg"> 
      <label for="placeholderLabel"> </label> 
      <div class="create-component__placeholder stretch-x" v-on:click="draftQuestion">Create a question</div> 
    </div>
  </div>
  <div v-show="editing" class="modal">
  <div class="flex flex-column modal-dialog modal-dialog-stretch-ie10">
    <div class="flex-none modal-header">
      Create Question
    </div>
    <div class="flex-auto modal-body scroll-y scrollbar-default relative">
      <form action="">
        
      </form>
    </div>
    <div class="flex-none modal-footer bg-white py07 ng-scope">
      <div class="right"> 
        <button type="button" class="btn btn-clear mx1"> Cancel </button> 
        <button type="submit" class="btn btn-primary"> Save </button> 
      </div>
    </div>
  </div>
    <div class="modal-backdrop"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'setup',
  data () {
    return {
      editing: false
    };
  },
  computed: {
    surveyCode: function () {
      return this.$route.params.id;
    },
    surveyName: function () {
      return this.$route.params.surveyName;
    }
  },
  methods: {
    draftQuestion: function () {
      console.log('qustion');
      this.editing = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
