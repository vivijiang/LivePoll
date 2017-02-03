<template>
<div class="page-layout-wrapper">
  <div class="page-layout-header shadow-b2 z2 ui-bgc-grey-header">
    <div class="event-header-switcher">
      <div class="container l-px2 relative flex flex-center">
        <div class="event-header-switcher__back">
          <a href v-on:click="goSurveyList">My Surveys</a>
        </div>
        <nav class="view-switcher flex-grow">
          <span class="active">Admin View</span>
          <!-- <span v-on:click="goParticipantView">Participant View</span> -->
          <span v-on:click="goPresentView">Present View</span>
        </nav>
      </div>        
    </div>  
  </div>
  <div class="page-layout-body-inner mt2">
    <div class="event-header container l-px2 relative">
      <div class="event-header__left hidden-sm-down">
        <div class="event-header__event truncate">{{surveyMeta.surveyName}}</div>
      </div>
      <div class="event-header__center">
        <span>Join mini program with code #<strong>{{surveyCode}}</strong></span>
      </div>
    </div>
    <div class="main-panel-body bg-white shadow-b1 flex-column flex">
      <div class="present-item" v-for="(q, index) in questions">
        <div class="present-item__icon">{{index + 1}}</div>
        <div class="present-item__content">{{q.content}}</div>
        <div class="present-item__actions">
          <button class="btn btn-clear" v-on:click="editQuestion(q, q.key)">edit</button>
        </div>
      </div>
      <div class="pointer no-shrink create-component create-component--bottom-border create-component--perma-bg"> 
        <label for="placeholderLabel"> </label> 
        <div class="create-component__placeholder stretch-x" v-on:click="draftQuestion">Create a question</div> 
      </div>
    </div>
    <div v-show="editing" class="modal">
    <div class="flex flex-column modal-dialog modal-dialog-stretch-ie10">
      <div class="flex-none modal-header">
        <div class="mt2 px3">
          <strong>Create Question</strong>
        </div>
      </div>
      <div class="flex-auto modal-body scroll-y scrollbar-default relative">
        <form action="" class="px3">
          <input class="form-control" v-model="newQuestionText" placeholder="What would you like to ask?">
          <div>
            <h5>Options:</h5>
            <ul v-for="(opt, index) in newOptions" class="newoption-list">
                <li class="relative">
                  {{opt.content}} 
                  <span v-show="false">{{opt.val}}</span>
                  <span class="pointer right" v-on:click="removeOption(index)">delete</span>
                </li>
            </ul>
            <input type="text" class="form-control" v-model="newOptionText">
            <button class="btn btn-primary right" v-on:click='addOption'>save option</button>
          </div>
        </form>
      </div>
      <div class="flex-none modal-footer bg-white py07 ng-scope">
        <div class="right"> 
          <button type="button" class="btn btn-clear mx1" v-on:click="closeModal"> Cancel </button> 
          <button type="submit" class="btn btn-primary" v-on:click="saveQuestion"> Save </button> 
        </div>
      </div>
    </div>
      <div class="modal-backdrop"></div>
    </div>
  </div>
</div>  
</template>

<script>
import _ from 'lodash';
import util from '../utility/eventCode';
export default {
  name: 'setup',
  data () {
    return {
      surveyCode: '',
      surveyMeta: {},
      questions: [],
      editing: false,
      newQuestionText: '',
      newOptions: [],
      newOptionText: '',
      newOptionVal: 1,
      questionKey: '',
      surveyRef: null
    };
  },
  created: function () {
    const self = this;
    self.surveyCode = self.$route.params.id;
    console.log('surveyCode: ' + self.surveyCode);
    self.surveyRef = util.getGivenEventRef(self.surveyCode);
    self.surveyRef.on('value', (snapshot) => {
      const surveyDetails = snapshot.val();
      console.log(surveyDetails);
      self.surveyMeta = surveyDetails.meta;
      self.questions = [];
      _.forOwn(surveyDetails.questions, function (value, key) {
        self.questions.push({
          ...value,
          key
        });
      });
    });
  },
  computed: {
    questionCount: function () {
      return this.questions.length;
    }
  },
  methods: {
    goSurveyList: function (ev) {
      ev.preventDefault();
      this.$router.push({ name: 'surveys' });
    },
    goParticipantView: function () {},
    goPresentView: function () {
      this.$router.push({
        name: 'dashboardpreview',
        params: {
          id: this.surveyCode
        }});
    },
    editQuestion: function (question) {
      this.editing = true;
      this.newQuestionText = question.content;
      this.newOptions = question.options || [];
      this.questionKey = question.key;
    },
    draftQuestion: function () {
      console.log('qustion');
      this.editing = true;
    },
    closeModal: function () {
      this.editing = false;
      this.newQuestionText = '';
      this.newOptions = [];
      this.newOptionText = '';
      this.newOptionVal = 1;
      this.questionKey = '';
    },
    saveQuestion: function () {
      const self = this;
      // self.surveyRef = util.getGivenEventRef(self.surveyCode);
      if (self.questionKey) {
        self.surveyRef.child('questions/' + self.questionKey).set({
          content: self.newQuestionText,
          multiple: false,
          options: self.newOptions
        })
        .then(function () {
          console.log('updated');
          self.closeModal();
        });
        return;
      }
      console.log('new');
      self.surveyRef.child('questions').push({
        content: self.newQuestionText,
        multiple: false,
        options: self.newOptions
      })
      .then(function () {
        self.closeModal();
      });
    },
    addOption: function () {
      const content = this.newOptionText && this.newOptionText.trim();
      if (!content) {
        return;
      }
      this.newOptions.push({
        content: content,
        val: this.newOptionVal ? this.newOptionVal : 1,
        id: Date.now() // todo: how to generate option id?
      });
      this.newOptionText = '';
      this.newOptionVal = 1;
    },
    removeOption: function (optionIndex) {
      this.newOptions.splice(optionIndex, 1);
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
