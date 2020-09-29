<template>
 <div>
    <h1 id="wherePage">You are Voting - <strong>{{this.titleSurvey}} - Category : {{this.category}}</strong></h1>
    <b-card id="card">
    <div class="NumberQ"><h3>Question n°{{question.number}}</h3></div>
    <form
     id="app"
     @submit="onSubmit"
     method="post"
    >
    <div class="statement"><h3><strong>{{question.statement}}</strong></h3></div>
    <div v-if="question.answerType === 'single'">

    <p>
        <input type="radio"
            v-model="addVoteForm.Answer"
            id="Answer1"
            name="answer"
            :value="question.answer1">
        <label for="Answer1">{{question.answer1}}</label>
    </p>

    <p>
        <input type="radio"
            v-model="addVoteForm.Answer"
            id="Answer2"
            name="answer"
            :value="question.answer2">
        <label for="Answer2">{{question.answer2}}</label>
    </p>

    <p v-if="question.answer3 !== ''">
        <input type="radio"
            v-model="addVoteForm.Answer"
            id="Answer3"
            name="answer"
            :value="question.answer3">
        <label for="Answer3">{{question.answer3}}</label>
    </p>

    <p v-if="question.answer4 !== ''">
        <input type="radio"
            v-model="addVoteForm.Answer"
            id="Answer4"
            name="answer"
            :value="question.answer4">
        <label for="Answer4">{{question.answer4}}</label>
    </p>

    <p v-if="question.answer5 !== ''">
        <input type="radio"
            v-model="addVoteForm.Answer"
            id="Answer5"
            name="answer"
            :value="question.answer5">
        <label for="Answer5">{{question.answer5}}</label>
    </p>
    </div>
    <div v-else>
       <p>
        <input type="checkbox"
            v-model="addVoteForm.Answer1"
            id="Answer1"
            name="answer"
            :value="question.answer1">
        <label for="Answer1">{{question.answer1}}</label>
    </p>

    <p>
        <input type="checkbox"
            v-model="addVoteForm.Answer2"
            id="Answer2"
            name="answer"
            :value="question.answer2">
        <label for="Answer2">{{question.answer2}}</label>
    </p>

    <p v-if="question.answer3 !== ''">
        <input type="checkbox"
            v-model="addVoteForm.Answer3"
            id="Answer3"
            name="answer"
            :value="question.answer3">
        <label for="Answer3">{{question.answer3}}</label>
    </p>

    <p v-if="question.answer4 !== ''">
        <input type="checkbox"
            v-model="addVoteForm.Answer4"
            id="Answer4"
            name="answer"
            :value="question.answer4">
        <label for="Answer4">{{question.answer4}}</label>
    </p>

    <p v-if="question.answer5 !== ''">
        <input type="checkbox"
            v-model="addVoteForm.Answer5"
            id="Answer5"
            name="answer"
            :value="question.answer5">
        <label for="Answer5">{{question.answer5}}</label>
    </p>
    </div>

    <p>
        <input
            type="submit"
            value="Submit"
        >
    </p>

    </form>

    <p v-if="error" class="error-message">
		❗Please answer to the question before submit
    </p>
  </b-card>
 </div>
</template>

<script>
import axios from 'axios';
import router from '../router';
import swal from 'sweetalert';

export default {
  name: 'Vote',
  data() {
    return {
        submitting: false,
        error: false,
        success: false,
        titleSurvey: '',
        category: '',
        numberOfQuestion: '',
        number: '',
        questions: [],
        question: '',
        addVoteForm: {
            Answer: '',
            Answer1: '',
            Answer2: '',
            Answer3: '',
            Answer4: '',
            Answer5: '',
      }
    }
  },
  computed: {
		invalidAnswer() {
			return this.addVoteForm.Answer === ''
    },
    invalidAnswer1() {
			return this.addVoteForm.Answer1 === ''
    },
    invalidAnswer2() {
			return this.addVoteForm.Answer2 === ''
    },
    invalidAnswer3() {
			return this.addVoteForm.Answer3 === ''
    },
    invalidAnswer4() {
			return this.addVoteForm.Answer4 === ''
    },
    invalidAnswer5() {
			return this.addVoteForm.Answer5 === ''
    },
  },
  methods: {

    initForm() {
      this.clearStatus()
      this.submitting=false;
      this.addVoteForm.Answer = '';

    },

    addVote(payload) {
      const path = 'http://localhost:5000/add_vote';
      axios.post(path, payload)
        .then((res) => {
           console.log(res.data.status);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },

    getQuestions(idS) {
        const payload ={
            idS: idS,
      };
      const path = 'http://localhost:5000/get_question';
      axios.post(path, payload)
        .then((res) => {
          this.questions = res.data.questions;
          this.question = this.questions[0];
          console.log(res.data.questions);
        })
        .catch((error) => {
          console.error(error.response);
        });
    },

    onSubmit(event) {
        event.preventDefault();
        this.submitting = true
        this.clearStatus()
      /*  if (this.invalidAnswer) {
          this.error=true
				return 
			}*/
        if(this.question.answerType === "single") {
          if (this.invalidAnswer) {
            this.error=true
            return
          }
          const payload = {
              answer: this.addVoteForm.Answer,
              idQ: this.question.idQ,
              idU: this.$store.state.user.idU,
          };
          this.addVote(payload);
        }
        else{
          if (this.invalidAnswer1 && this.invalidAnswer2 && this.invalidAnswer3 && this.invalidAnswer4 && this.invalidAnswer5)
          {
            this.error=true
            return
          }
          if(this.addVoteForm.Answer1)
          {
            const payload = {
                answer: this.question.answer1,
                idQ: this.question.idQ,
                idU: this.$store.state.user.idU,
            };
            this.addVote(payload);
          }
          if(this.addVoteForm.Answer2)
          {
            const payload = {
                answer: this.question.answer2,
                idQ: this.question.idQ,
                idU: this.$store.state.user.idU,
            };
            this.addVote(payload);
          }
          if(this.addVoteForm.Answer3)
          {
            const payload = {
                answer: this.question.answer3,
                idQ: this.question.idQ,
                idU: this.$store.state.user.idU,
            };
            this.addVote(payload);
          }
          if(this.addVoteForm.Answer4)
          {
            const payload = {
                answer: this.question.answer4,
                idQ: this.question.idQ,
                idU: this.$store.state.user.idU,
            };
            this.addVote(payload);
          }
          if(this.addVoteForm.Answer5)
          {
            const payload = {
                answer: this.question.answer5,
                idQ: this.question.idQ,
                idU: this.$store.state.user.idU,
            };
            this.addVote(payload);
          }
        }
      this.initForm();
      this.number = this.question.number;
      if(this.number < this.numberOfQuestion)
      {
          let index = this.number;//in array, the index begin to 0, and our question number begin to 1
          this.question = this.questions[index];
      }
      else
      {
          swal("Survey completed!", "Thank you :)");
          router.push({ path: '/ListSuveys'})
      }
    },
    clearStatus() {
			this.success = false
			this.error = false
		}
    
  },
  created() {
    this.titleSurvey=this.$route.params.title;
    this.category=this.$route.params.category;
    this.numberOfQuestion=this.$route.params.numberOfQuestion;
    this.getQuestions(this.$route.params.idS)
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
  margin: 6.5% 30%;
  padding: 1.5%;
  max-width: 60%;
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
