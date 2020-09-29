<template>
 <div id="container">
   <h1 id="TitlePage">You are editing a question</h1>
   <b-card id="card">
    <h2 id="surveyTitle"><strong>Survey : {{survey.title}}</strong></h2>
    <h2 id="numberQ"><strong>Question n°{{question.number}}</strong></h2>
    <h3 id="AnsType">Type of answer : {{question.answerType}}</h3><br/>
    <form
     id="app"
     @submit="onSubmit"
     method="post"
    >
    <p>
        <label for="statement">Statement</label>
        <input
            id="statement"
            name="statement"
            v-model="question.statement"
            type="text"
            :class="{ 'has-error': submitting && invalidStatement }"
            @focus="clearStatus"
            
        >
    </p>

    <p>
        <label for="Answer1">Answer n°1</label>
        <input
            id="Answer1"
            name="Answer1"
            v-model="question.answer1"
            type="text"
            :class="{ 'has-error': submitting && invalidAnswer1 }"
            @focus="clearStatus"
            
        >
    </p>

    <p>
        <label for="Answer2">Answer n°2</label>
        <input
            id="Answer2"
            name="Answer2"
            v-model="question.answer2"
            type="text"
            :class="{ 'has-error': submitting && invalidAnswer2 }"
            @focus="clearStatus"
        >
    </p>

    <p>
        <label for="Answer3">Answer n°3</label>
        <input
            id="Answer3"
            name="Answer3"
            v-model="question.answer3"
            type="text"
            
        >
    </p>

    <p>
        <label for="Answer4">Answer n°4</label>
        <input
            id="Answer4"
            name="Answer4"
            v-model="question.answer4"
            type="text"
            
        >
    </p>

    <p>
        <label for="Answer5">Answer n°5</label>
        <input
            id="Answer5"
            name="Answer5"
            v-model="question.answer5"
            type="text"
            
        >
    </p>

    <p>
        <input
            class="btn btn-danger btn-sm"
            type="submit"
            value="Submit"
        >
    </p>

    </form>
    <p v-if="error" class="error-message">
		❗Please fill out all required fields
    </p>
    <p v-if="success" class="success-message">
		✅ Question successfully edited
    </p>
  </b-card>
 </div>
</template>

<script>
import axios from 'axios';
import router from '../router';
import swal from 'sweetalert';

export default {
  name: 'EditQuestion',
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      idQ: '',
      survey: '',
      question: {
        idQ: '',
        idS: '',
        number: '',
        statement: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: '',
        answerType: '',
      }
    };
  },   
  computed: {
		invalidStatement() {
			return this.question.statement === ''
    },
    invalidAnswer1() {
			return this.question.answer1 === ''
    },
    invalidAnswer2() {
			return this.question.answer2 === ''
		},
  },
  methods: {
    getSurveys() {
      const path = 'http://localhost:5000';
      const payload = {
            idS: this.question.idS
        };
      axios.post(path, payload)
        .then((res) => {
            console.log(res);
          let surveys = res.data.surveys;
          this.survey=surveys[0];
        })
        .catch((error) => {
          console.error(error.response);
        });
    },
    getQuestions() {
      const path = 'http://localhost:5000/get_question';
      const payload = {
            idQ: this.idQ
        };
      axios.post(path, payload)
        .then((res) => {
            console.log(res);
            let questions = res.data.questions;
          this.question = questions[0];
          this.getSurveys();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error.response);
        });
    },
    onSubmit() {
      event.preventDefault();
      this.submitting = true
      this.clearStatus()
      if (this.invalidStatement||this.invalidAnswer1||this.invalidAnswer2) {
          this.error=true
				return 
		}
      const payload ={
            idQ: this.question.idQ,
            statement: this.question.statement,
            answer1: this.question.answer1,
            answer2: this.question.answer2,
            answer3: this.question.answer3,
            answer4: this.question.answer4,
            answer5: this.question.answer5,
      };
      const path = 'http://localhost:5000/update_question';
      axios.post(path, payload)
        .then(() => {
            swal("Congratulations! You edited a question.");
            const idS = this.survey.idS;
            router.push({ name: 'EditSurvey', params :{
                idS: idS
            } })
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },

    clearStatus() {
			this.success = false
			this.error = false
		}

 
  
 },
created() {
    this.idQ=this.$route.params.idQ;
    this.getQuestions();
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#card{
  margin: 3% 20%;
  padding: 2%;
  max-width: 60%;
}
#TitlePage{
  margin:0%;
  padding: 1%;
  background-color: #eeeeee;
}
#container{
  width: 100%;
  font-size: 20px;
}

button{
  margin: 2%;
}

$mobile-width-limit: 700px;//maximum width for mobile device
$desktop-width-limit: 1024px;//minimum width for destock device
@media only screen and (max-width: $mobile-width-limit) {
  #card{
    margin: 15% 5%;
    max-width: 90%;
  }
}
@media only screen and (min-width: $mobile-width-limit + 1) and (max-width: $desktop-width-limit - 1) {
  #card{
    margin: 8% 12.5%;
    max-width: 75%;
  }
}
[class*='-message'] {
    font-weight: 500;
  }

  .error-message {
    color: #d33c40;
  }

  .success-message {
    color: #32a95d;
  }

  .has-error{
    border: 1px solid #d33c40;
  }
</style>
