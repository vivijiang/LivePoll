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
        <li>{{s.surveyCode}}</li>
      </ul>
    </div>
    <div class="pointer no-shrink create-component create-component--bottom-border create-component--perma-bg"> 
      <label for="placeholderLabel"> </label> 
      <div class="create-component__placeholder stretch-x" v-on:click="draftQuestion">Create a question</div> 
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
      surveys: [],
      editing: false,
      newQuestionText: '',
      newOptions: [],
      newOptionText: '',
      newOptionVal: 1
    };
  },
  computed: {
    surveyCode: function () {
      return this.$route.params.id;
    },
    surveyName: function () {
      return this.$route.params.surveyName;
    },
    questionCount: function () {
      return this.questions.length;
    }
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
      });
      // self.$set(this.answers, 'b', 2)
      console.log('self.answers:');
      console.log(self.answers);
    });
  },
  methods: {
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
    },
    saveQuestion: function () {
      console.log('save q');
      const self = this;
      const surveyRef = util.getGivenEventRef(self.surveyCode);
      surveyRef.child('questions/' + self.questionCount).set({
        content: self.newQuestionText,
        multiple: false,
        options: self.newOptions
      })
      .then(function () {
        self.editing = false;
        self.newQuestionText = '';
        self.newOptions = [];
        self.newOptionText = '';
        self.newOptionVal = 1;
      });
    },
    addOption: function () {
      const content = this.newOptionText && this.newOptionText.trim();
      if (!content) {
        return;
      }
      this.newOptions.push({ content: content, val: this.newOptionVal ? this.newOptionVal : 1 });
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
