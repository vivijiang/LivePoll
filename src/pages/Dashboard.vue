<template>
  <div class="login">
    <div class="flex">
      <div class="dashboard-left">
        <div class="qr">mini program QR here</div>
        <p>Scan the QR code by WeChat</p>
        <p>Survey Code: <strong>{{surveyCode}}</strong> </p>

      </div>
      <div class="dashboard-right flex-auto">
        <div v-for="(q, index) in questions">
          <div v-show="index === activeQuestionIndex" class="question">
            <div class="prev questionNav" v-show="activeQuestionIndex" v-on:click="prev">Prev</div>
            <div class="next questionNav" v-show="activeQuestionIndex" v-on:click="next">Next</div>
            <h4 class="question-content">{{index + 1}}. {{lang[q.code]}}</h4>
            <div class="text-small">{{activeQuestionUsers}} votes</div>
            <div class="option" v-for="(opt, idx) in q.options">
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
    const self = this;
    const auth = self.$route.params.auth;
    // todo: update with backend validation and client auth
    // goto login page if there is no auth
    if (!auth) {
      this.$router.push({ path: '/' });
      return;
    }
    console.log(self.surveyCode);
    const ansRef = util.getGivenEventRef(self.surveyCode).child('answers');
    ansRef.on('value', (snapshot) => {
      self.answers = snapshot.val();
      self.answers = Object.assign({}, snapshot.val());
      // self.$set(this.answers, 'b', 2)
      console.log('self.answers:');
      console.log(self.answers);
    });
  },
  methods: {
    next: function () {
      const self = this;
      if (self.activeQuestionIndex === self.questions.length - 1) {
        return;
      }
      self.activeQuestionIndex++;
      const dashboardRef = util.getGivenEventRef(self.surveyCode).child('dashboard');
      dashboardRef.update({'activeQuestionIndex': self.activeQuestionIndex});
    },
    prev: function () {
      const self = this;
      if (!self.activeQuestionIndex) {
        return;
      }
      self.activeQuestionIndex--;
      const dashboardRef = util.getGivenEventRef(self.surveyCode).child('dashboard');
      dashboardRef.update({'activeQuestionIndex': self.activeQuestionIndex});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4{
  margin-top: 0;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  min-height: 4em;
}
.qr{
  background: #ccc;
  width: 20rem;
  height: 20rem;
  margin: 0 auto;
}
.dashboard-left{
  padding: 20px;
}
.dashboard-right{
  padding: 2rem 6rem;
  text-align: left;
}
.option {
  margin-top: 2rem;
}
.question{
  position: relative;
}
.questionNav{
  position: absolute;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #ccc;
  color: #fff;
  font-size: 1rem;
  line-height: 4rem;
  text-align: center;
  top: 0;
  cursor: pointer;
}
.questionNav:hover{
  background-color: #aaa;
}
.prev{
  left: -6rem;
}
.next{
  right: -6rem;
}
</style>
