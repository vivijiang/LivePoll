<template>
  <div class="login">
    <div class="flex">
      <div class="dashboard-left">
        <div class="qr">mini program QR here</div>
        <p>Scan the QR code by WeChat</p>
        <p>Survey Code: <strong>{{surveyCode}}</strong> </p>

      </div>
      <div class="dashboard-right">
        <div v-for="(q, index) in questions">
          <div v-show="index === activeQuestionIndex">
            <div class="question-content">{{lang[q.code]}}</div>
            <div class="text-small">{{activeQuestionUsers}} votes</div>
            <div class="options" v-for="(opt, idx) in q.options">
              <div>{{lang[opt]}}</div>
              <progress-bar :percent="activeQuestionUsers && activeQuestionAns['o_' + idx] ? activeQuestionAns['o_' + idx].length/activeQuestionUsers : 0"></progress-bar>
            </div>
          </div>
        </div>
        <!-- <div class="l-mb1">
          <button class="btn btn-success" v-bind:disabled="!surveyName || !description" v-on:click="goSetup"> Next </button>
        </div> -->
      </div>
    </div>
<!--     <div class="event-name l-mb3">
        <h2>Participants can join with WeChat mini program with the event code:</h2>
        <h3>Search 'XXX' or scan the QR code by WeChat</h3>
      <input class="form-control" v-model="surveyCode" placeholder="Survey Code">
    </div>  -->   
  </div>
</template>

<script>
import _ from 'lodash';
import translation from '../language/index';
import questions from '../data/questions';
import util from '../utility/eventCode';
import ProgressBar from '../components/ProgressBar';
export default {
  name: 'dashboard',
  components: {
    ProgressBar
  },
  data () {
    return {
      // surveyName: '',
      // description: '',
      questions: questions,
      answers: {},
      lang: translation.en,
      activeQuestionIndex: 0
    };
  },
  computed: {
    surveyCode: function () {
      return this.$route.params.id;
    },
    activeQuestionAns: function () {
      console.log('activeQuestionAns');
      const activeQuestion = this.questions[this.activeQuestionIndex];
      if (!activeQuestion) {
        return [];
      }
      const activeAnswers = this.answers['q_' + this.activeQuestionIndex];
      if (!activeAnswers) {
        return [];
      }
      let ansByOpt = {};
      _.forOwn(activeAnswers, (userAns, userKey) => {
        _.forOwn(userAns, (ans, optKey) => {
          (ansByOpt[optKey] || (ansByOpt[optKey] = [])).push(userKey);
        });
      });
      console.log(ansByOpt);
      return ansByOpt;
    },
    activeQuestionUsers: function () {
      console.log('activeQuestionUsers');
      const activeQuestion = this.questions[this.activeQuestionIndex];
      if (!activeQuestion) {
        return 0;
      }
      const activeAnswers = this.answers['q_' + this.activeQuestionIndex];
      if (!activeAnswers) {
        return 0;
      }
      console.log('Object.keys(activeAnswers).length');
      console.log(Object.keys(activeAnswers).length);
      return Object.keys(activeAnswers).length;
    }
  },
  created: function () {
    // get answers
    const self = this;
    console.log('created: ');
    console.log(self.surveyCode);
    const ansRef = util.getGivenEventRef(self.surveyCode).child('answers');
    ansRef.on('value', (snapshot) => {
      self.answers = snapshot.val();
      self.answers = Object.assign({}, snapshot.val())
      // self.$set(this.answers, 'b', 2)
      console.log('self.answers:');
      console.log(self.answers);
    });
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
.qr{
  background: #ccc;
  width: 15rem;
  height: 15rem;
}
.dashboard-left{
  padding: 20px;
}
.dashboard-right{
  padding: 20px 50px;
  text-align: left;
}
</style>
