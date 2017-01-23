<template>
  <div class="page-layout-wrapper">
    <div class="page-layout-header shadow-b2 z2 ui-bgc-grey-header">
      <div class="header-general">
        <div class="header-general__nav--left">My Survey</div>
        <div class="header-general__content">
          <!-- <input type="text" class="form-control" placeholder="Search Survey"> -->
        </div>
        <div class="header-general__nav--right">UserName here</div>
      </div>
    </div>
    <h1>Create new live survey</h1>
    
    <div class="event-name l-mb3">
      <label>What's the name of your survey?</label>
      <input class="form-control" v-model="surveyName" placeholder="Survey Name">
    </div>
    <div class="event-name l-mb3">
      <label>What's the survey about?</label>
      <input class="form-control" v-model="description" placeholder="Description">
    </div>
<!--     <div class="event-name l-mb3">
        <h2>Participants can join with WeChat mini program with the event code:</h2>
        <h3>Search 'XXX' or scan the QR code by WeChat</h3>
      <input class="form-control" v-model="surveyCode" placeholder="Survey Code">
    </div>  -->   
    <div class="l-mb1">
      <button class="btn btn-success" v-bind:disabled="!surveyName || !description" v-on:click="goSetup"> Next </button>
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
