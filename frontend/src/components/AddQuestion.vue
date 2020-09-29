<template>
 <div>
    <h1 id="surveyTitle">Title : {{survey.title}}</h1>
    <h1>Category : {{survey.category}}</h1>
    <h2 id="numberQ">Question n°{{survey.nbOfQuestions+1}}</h2>
    <form
     id="app"
     @submit="onSubmit"
     method="post"
    >

     <p>
        <label for="Gender">Answer type :</label>
        <input type="radio"
            v-model="addQuestionForm.answerType"
            id="answerType1"
            name="answerType"
            value="single">
        <label for="Gender1">Only one answer possible</label>

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
  name: 'AddQuestion',
  data() {
    return {
        submitting: false,
        error: false,
        success: false,
        idS: '',
        survey: '',
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
    getSurveys() {
      const path = 'http://localhost:5000';
      const payload = {
            idS: this.idS
        };
      axios.post(path, payload)
        .then((res) => {
            console.log(res);
          let surveys = res.data.surveys;
          this.survey=surveys[0];
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error.response);
        });
    },
    addQuestions() {    
          const payload = {
            status: 'edit',
            number: this.survey.nbOfQuestions+1,
            statement: this.addQuestionForm.statement,
            answer1: this.addQuestionForm.Answer1,
            answer2: this.addQuestionForm.Answer2,
            answer3: this.addQuestionForm.Answer3,
            answer4: this.addQuestionForm.Answer4,
            answer5: this.addQuestionForm.Answer5,
            answerType: this.addQuestionForm.answerType,
            idS: this.survey.idS,
        };
    const path = 'http://localhost:5000/add_question';
      axios.post(path, payload)
        .then((res) => {
          console.log(res.data);
           swal("Added question!", "You add a new question to your survey");
                 router.push({ name: 'EditSurvey', params : {
                        idS: this.idS,
                    }
                 })
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
               
      
    },

    onSubmit(event) {
      event.preventDefault();
      this.submitting = true
        this.clearStatus()
        if (this.invalidStatement||this.invalidAnswer1||this.invalidAnswer2||this.invalidAnswerType) {
          this.error=true
				return 
			}
       this.addQuestions();
    },

    clearStatus() {
			this.success = false
			this.error = false
		}
    
  },
  created() {
    this.idS=this.$route.params.idS;
    this.getSurveys();
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
