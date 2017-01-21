<template>
  <div class="login">
    <h1>create new live survey</h1>
    
    <div class="event-name l-mb3">
    <h2>What's the name of your survey?</h2>
      <input class="form-control" v-model="surveyName" placeholder="Survey Name">
    </div>
<!--     <div class="event-name l-mb3">
        <h2>When does the survey start?</h2>
      <input class="form-control" v-model="startDate" placeholder="Start Date">
    </div> -->
<!--     <div class="event-name l-mb3">
        <h2>Participants can join with WeChat mini program with the event code:</h2>
        <h3>Search 'XXX' or scan the QR code by WeChat</h3>
      <input class="form-control" v-model="surveyCode" placeholder="Survey Code">
    </div>  -->   
    <div class="l-mb1">
      <button class="btn btn-success" v-bind:disabled="!surveyName" v-on:click="goSetup"> Next </button>
    </div>
  </div>
</template>

<script>
import util from '../utility/eventCode';
export default {
  name: 'create',
  data () {
    return {
      surveyName: ''
    };
  },
  methods: {
    goSetup: function () {
      const self = this;
      util.setNewEventCode(function (newSurveyCode) {
        self.$router.push({
          name: 'setup',
          params: {
            id: newSurveyCode,
            surveyName: self.surveyName
          }});
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
