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
<div class="page-layout-body-inner">
  <div class="flex flex-center flex-justify em-bar">Surveys</div>
  <div class="main-panel-body bg-white shadow-b1 flex-column flex">
    <div>
      <ul v-for="(s, index) in surveys">
        <li v-on:click="goSurveyDetail(s.surveyCode, (s.meta && s.meta.surveyName) || 'unknownName')">
          <div>{{s.surveyCode}}</div>
          <div v-if="s.meta">{{s.meta.surveyName}}</div>
          <div v-if="s.meta">{{s.meta.description}}</div>
        </li>
      </ul>
    </div>
    <div class="pointer no-shrink create-component create-component--bottom-border create-component--perma-bg"> 
      <label for="placeholderLabel"> </label> 
      <div class="create-component__placeholder stretch-x" v-on:click="goNewSurvey">Create a survey</div> 
    </div>
  </div>
</div>    
</div>

</template>

<script>
import _ from 'lodash';
import util from '../utility/eventCode';
export default {
  name: 'surveyList',
  data () {
    return {
      surveys: []
    };
  },
  created: function () {
    // get answers
    const self = this;
    const rootRef = util.rootRef;
    rootRef.once('value', (snapshot) => {
      const rootObj = snapshot.val();
      _.forOwn(rootObj, function (value, key) {
        self.surveys.push({
          ...value,
          surveyCode: key
        });
        console.log('self.surveys');
        console.log(self.surveys);
      });
    });
  },
  methods: {
    goSurveyDetail: function (surveyCode, surveyName) {
      this.$router.push({
        name: 'setup',
        params: {
          id: surveyCode,
          surveyName: surveyName
        }});
    },
    goNewSurvey: function () {
      console.log('go to new survey');
      this.$router.push({ path: 'create' });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newoption-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.newoption-list li{
  margin-bottom: 15px;
  padding: 5px 60px 5px 10px;
  text-align: left;
  border: .07143rem solid #ccc;
  border-radius: .25rem;
}
.newoption-list .pointer{
  color: #4285f4;
  position: absolute;
  right: 10px;
  top: 5px;
}
</style>
