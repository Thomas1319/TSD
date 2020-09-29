<template>
 <div>
   <h1 id="wherePage">Create Question</h1>
   <b-card id="card">
    <h2 class="title"><strong>Survey : {{this.titleSurvey}}</strong></h2>
    <h2 class="title"><strong>Category : {{this.category}}</strong></h2>
    <h3 class="title">Question n°{{numberOfQuestion}}</h3>
    <form
     id="app"
     @submit="onSubmit"
     method="post"
    >

     <p>
        <label for="answerType">Answer type :</label>
        <input type="radio"
            v-model="addQuestionForm.answerType"
            id="answerType1"
            name="answerType"
            value="single">
        <label for="answerType1">Only one answer possible</label> <br/>

        <input type="radio"
            v-model="addQuestionForm.answerType"
            id="answerType2"
            name="answerType"
            value="multiple">
        <label for="Gender2">Multiples answers possible</label>
    </p>

    <p>
        <label for="statement">Statement</label>
        <input
            id="statement"
            name="statement"
            v-model="addQuestionForm.statement"
            type="text"
            :class="{ 'has-error': submitting && invalidStatement }"
            @focus="clearStatus"
            placeholder="Enter statement"
            
        >
    </p>

    <p>
        <label for="Answer1">Answer n°1</label>
        <input
            id="Answer1"
            name="Answer1"
            v-model="addQuestionForm.Answer1"
            type="text"
            :class="{ 'has-error': submitting && invalidAnswer1 }"
            @focus="clearStatus"
            placeholder="Enter Answer*"
            
        >
    </p>

    <p>
        <label for="Answer2">Answer n°2</label>
        <input
            id="Answer2"
            name="Answer2"
            v-model="addQuestionForm.Answer2"
            type="text"
            :class="{ 'has-error': submitting && invalidAnswer2 }"
            @focus="clearStatus"
            placeholder="Enter Answer*"
            
        >
    </p>

    <p>
        <label for="Answer3">Answer n°3</label>
        <input
            id="Answer3"
            name="Answer3"
            v-model="addQuestionForm.Answer3"
            type="text"
            placeholder="Enter Answer"
            
        >
    </p>

    <p>
        <label for="Answer4">Answer n°4</label>
        <input
            id="Answer4"
            name="Answer4"
            v-model="addQuestionForm.Answer4"
            type="text"
            placeholder="Enter Answer"
            
        >
    </p>

    <p>
        <label for="Answer5">Answer n°5</label>
        <input
            id="Answer5"
            name="Answer5"
            v-model="addQuestionForm.Answer5"
            type="text"
            placeholder="Enter Answer"
            
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

    <button
        type="button"
        class="btn btn-danger btn-sm"
        @click="addSurvey()"
    >
    Save Survey</button>
    </b-card>
    <p v-if="error" class="error-message">
		❗Please fill out all required fields
    </p>
    <p v-if="success" class="success-message">
		✅ Question successfully added
    </p>
 </div>
</template>

<script>
import axios from 'axios';
import router from '../router';
import swal from 'sweetalert';

export default {
  name: 'CreateQuestion',
  data() {
    return {
        submitting: false,
        error: false,
        success: false,
        titleSurvey: '',
        category: '',
        numberOfQuestion: 1,
        payloadQuestion: [],
      addQuestionForm: {
        number: '',
        answerType: '',
        statement: '',
        Answer1: '',
        Answer2: '',
        Answer3: '',
        Answer4: '',
        Answer5: '',
      }
    }
  },

  computed: {
    
    invalidAnswerType() {
			return this.addQuestionForm.answerType === ''
    },
		invalidStatement() {
			return this.addQuestionForm.statement === ''
    },
    invalidAnswer1() {
			return this.addQuestionForm.Answer1 === ''
    },
    invalidAnswer2() {
			return this.addQuestionForm.Answer2 === ''
		},
  },
  
  methods: {

    initForm() {
      this.clearStatus()
      this.submitting=false;
      this.addQuestionForm.answerType = '';
      this.addQuestionForm.statement = '';
      this.addQuestionForm.Answer1 = '';
      this.addQuestionForm.Answer2 = '';
      this.addQuestionForm.Answer3 = '';
      this.addQuestionForm.Answer4 = '';
      this.addQuestionForm.Answer5 = '';

    },

    addQuestion(payload) {
      const path = 'http://localhost:5000/add_question';
      axios.post(path, payload)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },

    addQuestions(idS) {    
      this.payloadQuestion.map((Question) => {
          const payload = {
            number: Question.number,
            statement: Question.statement,
            answer1: Question.answer1,
            answer2: Question.answer2,
            answer3: Question.answer3,
            answer4: Question.answer4,
            answer5: Question.answer5,
            answerType: Question.answerType,
            idS: idS,
        };
                this.addQuestion(payload);
                swal("Survey Created!", "Thank you");
                router.push({ path: '/ListSuveys'})
            });
      
    },
    addSurvey() {
        this.submitting = true
        this.clearStatus()
        if (this.invalidStatement||this.invalidAnswer1||this.invalidAnswer2||this.invalidAnswerType) {
          this.error=true
				return 
			}
        this.addpayload();
        const payload ={
              title: this.titleSurvey,
              category: this.category,
              nbOfQuestions: this.numberOfQuestion,
              idU: this.$store.state.user.idU,
        };
        const path = 'http://localhost:5000/add_survey';
        axios.post(path, payload)
          .then((res) => {
            this.addQuestions(res.data.idS);
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
          });
     
    },

    addpayload(){
        const payload = {
            number: this.numberOfQuestion,
            title: this.addQuestionForm.title,
            statement: this.addQuestionForm.statement,
            answer1: this.addQuestionForm.Answer1,
            answer2: this.addQuestionForm.Answer2,
            answer3: this.addQuestionForm.Answer3,
            answer4: this.addQuestionForm.Answer4,
            answer5: this.addQuestionForm.Answer5,
            answerType: this.addQuestionForm.answerType
        };
      this.payloadQuestion.push(payload);
    },

    onSubmit(event) {
      event.preventDefault();
      this.addQuestOnSub();
    },

    addQuestOnSub(){
      this.submitting = true
        this.clearStatus()
        if (this.invalidStatement||this.invalidAnswer1||this.invalidAnswer2||this.invalidAnswerType) {
          this.error=true
				return 
			}
        this.addpayload();
        
      this.numberOfQuestion=this.numberOfQuestion+1;
      this.initForm();
    },

    clearStatus() {
			this.success = false
			this.error = false
		}
    
  },
  created() {
    this.titleSurvey=this.$route.params.title;
    this.category=this.$route.params.category;
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#wherePage{
  margin:0%;
  padding: 1%;
  background-color: #eeeeee;
}
#card{
  margin: 5% 20%;
  padding: 0%;
  max-width: 60%;
}
$mobile-width-limit: 600px;//maximum width for mobile device
$desktop-width-limit: 1024px;//minimum width for destock device
@media only screen and (max-width: $mobile-width-limit) {
  #card{
    margin: 10% 5%;
    max-width: 90%;
  }
}
@media only screen and (min-width: $mobile-width-limit + 1) and (max-width: $desktop-width-limit - 1) {
  #card{
    margin: 10% 15%;
    max-width: 70%;
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
