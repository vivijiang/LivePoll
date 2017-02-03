<template>
  <div class="page-layout-wrapper">
    <div class="page-layout-body-inner">
      <div class="flex flex-center flex-justify em-bar">Create Survey</div>
      <div class="main-panel-body bg-white shadow-b1 flex-column flex py07">
          <div class="event-name l-mb3">
          <label>What's the name of your survey?</label>
          <input class="form-control" v-model="surveyName" placeholder="Survey Name">
        </div>
        <div class="event-name l-mb3">
          <label>What's the survey about?</label>
          <input class="form-control" v-model="description" placeholder="Description">
        </div> 
        <div class="l-mb1 text-center">
          <button class="btn btn-success" v-bind:disabled="!surveyName || !description" v-on:click="goSetup"> Next </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '../utility/eventCode';
export default {
  name: 'create',
  data () {
    return {
      surveyName: '',
      description: ''
    };
  },
  methods: {
    goSetup: function () {
      const self = this;
      util.setNewEventCode(function (newSurveyCode) {
        util.getGivenEventRef(newSurveyCode).set({
          'meta': {
            'createdAt': new Date().toUTCString(),
            'surveyName': self.surveyName,
            'description': self.description
          },
          'dashboard': {
            'activeQuestionIndex': 0,
            'currentScreen': 'welcome',
            'shareScreen': false
          }
        }).then(function () {
          self.$router.push({
            name: 'setup',
            params: {
              id: newSurveyCode,
              surveyName: self.surveyName
            }});
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
