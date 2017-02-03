<template>
  <div v-on:click="focusOut">
    <div class="page-layout-header shadow-b2 z2 ui-bgc-grey-header" v-if="isPreview">
      <div class="event-header-switcher">
        <div class="container l-px2 relative flex flex-center">
          <div class="event-header-switcher__back">
            <a href v-on:click="goSurveyList">My Surveys</a>
          </div>
          <nav class="view-switcher flex-grow">
            <span v-on:click="goAdminView">Admin View</span>
            <span v-on:click="goParticipantView">Participant View</span>
            <span class="active">Present View</span>
          </nav>
        </div>        
      </div>
    </div>
    <div class="page-layout-header shadow-b2 z2 ui-bgc-grey-header" v-if="!isPreview">
      <div class="header-general">
        <div class="header-general__nav--left">
          <div class="relative dropdown" v-bind:class="{open: isMenuOpened}">
            <div class="dropdown-toggle">Menu</div>
            <div class="uib-dropdown-menu dropdown-menu-left dropdown-menu">
              <a class="dropdown-item" href="" v-on:click="pushToMobile">
                Push to mobile screen
                <span v-if="isShared" class="tick-green dropdown-item-icon">✓</span>
              </a>
            </div>
          </div>
        </div>
        <div class="header-general__content">
          <!-- <input type="text" class="form-control" placeholder="Search Survey"> -->
          {{surveyMeta.surveyName}}
        </div>
        <div class="header-general__nav--right">#{{surveyCode}}</div>
      </div>
    </div>    
    <div class="flex dashboard-layout-body-inner mt2">
      <div class="dashboard-left">
        <div class="qr">mini program QR here</div>
        <p>Scan the QR code by WeChat</p>
        <h1>#{{surveyCode}}</h1>
      </div>
      <div class="dashboard-right flex-auto mt2">
        <div v-for="(q, index) in questions">
          <div v-show="index === activeQuestionIndex" class="question">
            <div class="prev questionNav" v-show="activeQuestionIndex" v-on:click="prev">Prev</div>
            <div class="next questionNav" v-show="activeQuestionIndex < questions.length -1" v-on:click="next">Next</div>
            <h4 class="question-content">{{index + 1}}. {{q.content}}</h4>
            <div class="text-small votes-count">{{activeQuestionUsers}} votes</div>
            <div class="option" v-for="(opt, idx) in q.options">
              <div>{{opt.content}}</div>
              <progress-bar :percent="activeQuestionUsers && activeQuestionAns[opt.id] ? activeQuestionAns[opt.id].length/activeQuestionUsers : 0"></progress-bar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import util from '../utility/eventCode';
import ProgressBar from '../components/ProgressBar';
export default {
  name: 'dashboard',
  components: {
    ProgressBar
  },
  data () {
    return {
      surveyRef: null,
      surveyMeta: {},
      questions: [],
      answers: {},
      // lang: translation.en,
      activeQuestionIndex: 0,
      isPreview: false,
      isShared: false,
      isMenuOpened: false
    };
  },
  computed: {
    activeQuestionAns: function () {
      const activeQuestion = this.questions[this.activeQuestionIndex];
      if (!activeQuestion) {
        return [];
      }
      const activeAnswers = this.answers[activeQuestion.key];
      if (!activeAnswers) {
        return [];
      }
      let ansByOpt = {};
      _.forOwn(activeAnswers, (userAns, userKey) => {
        _.forOwn(userAns, (ans, optKey) => {
          (ansByOpt[optKey] || (ansByOpt[optKey] = [])).push(userKey);
        });
      });
      return ansByOpt;
    },
    activeQuestionUsers: function () {
      const activeQuestion = this.questions[this.activeQuestionIndex];
      if (!activeQuestion) {
        return 0;
      }
      const activeAnswers = this.answers[activeQuestion.key];
      if (!activeAnswers) {
        return 0;
      }
      return Object.keys(activeAnswers).length;
    }
  },
  created: function () {
    const self = this;
    self.surveyCode = self.$route.params.id;
    self.isPreview = self.$route.name === 'dashboardpreview';
    // const auth = self.$route.params.name;
    // // todo: update with backend validation and client auth
    // // goto login page if there is no auth
    // if (!isPreview) {
    //   this.$router.push({ path: '/' });
    //   return;
    // }
    const surveyRef = util.getGivenEventRef(self.surveyCode);
    self.surveyRef = surveyRef;
    surveyRef.on('value', (snapshot) => {
      const surveyDetails = snapshot.val();
      self.surveyMeta = surveyDetails.meta;
      const questionList = [];
      _.forOwn(surveyDetails.questions, function (value, key) {
        questionList.push({
          ...value,
          key
        });
      });
      self.questions = questionList;
    });

    const ansRef = surveyRef.child('answers');
    ansRef.on('value', (snapshot) => {
      self.answers = Object.assign({}, snapshot.val());
    });
  },
  methods: {
    focusOut: function (ev) {
      if (ev.target.className === 'dropdown-toggle') {
        this.isMenuOpened = !this.isMenuOpened;
        return;
      }
      this.isMenuOpened = false;
    },

    pushToMobile: function (ev) {
      const self = this;
      ev.preventDefault();
      if (!self.surveyRef) {
        return;
      }
      self.isShared = !self.isShared;
      self.surveyRef.child('dashboard').update({
        'shareScreen': self.isShared,
        'currentScreen': self.isShared ? 'questions' : 'welcome',
        'activeQuestionIndex': self.activeQuestionIndex
      });
    },

    goSurveyList: function (ev) {
      ev.preventDefault();
      this.$router.push({ name: 'surveys' });
    },
    goParticipantView: function () {},
    goAdminView: function () {
      this.$router.push({
        name: 'setup',
        params: {
          id: this.surveyCode
        }});
    },
    next: function () {
      const self = this;
      if (self.activeQuestionIndex === self.questions.length - 1) {
        return;
      }
      self.activeQuestionIndex++;
      if (!self.surveyRef) {
        return;
      }

      self.surveyRef.child('dashboard').update({'activeQuestionIndex': self.activeQuestionIndex});
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
  text-align: center;
}
.dashboard-right{
  padding-left: 6rem;
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
.votes-count{
  margin-bottom: 1em;
  font-weight: bold;
  text-align: right;
}
</style>
