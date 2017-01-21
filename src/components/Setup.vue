<template>
  <div class="login">
    <h1>Set up {{surveyName}} with code {{surveyCode}}</h1>
  </div>
</template>

<script>
export default {
  name: 'setup',
  data () {
    return {
      surveyName: 'test',
      surveyCode: 'democode'
    };
  },
  methods: {
    loginDashboard: () => {
      console.log('go to dashboard');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-control {
    display: block;
    width: 100%;
    padding: .45rem .5rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: .07143rem solid #ccc;
    border-radius: .25rem;
  }

  .event-date, .event-name {
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
}
.l-mb3 {
    margin-bottom: 30px;
}
.l-mb1 {
    margin-bottom: 10px;
}
.btn{
  padding: .375rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
    transition: background .2s ease-out;
    display: inline-block;
    font-weight: 500;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: .07143rem solid transparent;
    border-radius: .25rem;
        min-width: 7.5rem;
}
.btn-success {
    color: #fff;
    background-color: #70be4e;
    border-color: #70be4e;
}
.btn.disabled, .disabled.modal-header-close, .modal-header-actions button.disabled, .btn:disabled, .modal-header-close:disabled, .modal-header-actions button:disabled {
    cursor: not-allowed;
    opacity: .65;
     pointer-events: none;
    box-shadow: none;
}

</style>
