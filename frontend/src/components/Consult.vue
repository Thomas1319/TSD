<template>
 <div>
    <h1 id="wherePage"><strong>Title : {{this.titleSurvey}} -
    Category : {{this.category}}</strong></h1>
    
    
    <apexchart type="bar" height="430" :options="chartOptions" :series="series"></apexchart>
    <div v-for="(question, index) in questions" :key="index">
        <b-card id="card">
        <h2 class="header">Question n°{{ question.number }}</h2>
        <h4 :id=question.number>Number of votes : {{ TotalAnswer(question.idQ, question.number) }}</h4>
        <h3><strong>{{ question.statement }}</strong></h3>
        <ul>
            <li>{{question.answer1}} : {{countAnswer(question.idQ,question.answer1)}}%</li>
            <li>{{question.answer2}} : {{countAnswer(question.idQ,question.answer2)}}%</li>
            <li v-if="question.answer3 !== ''">{{question.answer3}} : {{countAnswer(question.idQ,question.answer3)}}%</li>
            <li v-if="question.answer4 !== ''">{{question.answer4}} : {{countAnswer(question.idQ,question.answer4)}}%</li>
            <li v-if="question.answer5 !== ''">{{question.answer5}} : {{countAnswer(question.idQ,question.answer5)}}%</li>
        </ul>
        </b-card>   
    </div>
 </div>
</template>

<script>
import axios from 'axios';
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'Consult',
  components: {
          apexchart: VueApexCharts,
        },
  data() {
    return {
        idS: '',
        titleSurvey: '',
        category: '',
        questions: [],
        votes: [],
        countA1Array : [],
        countA2Array : [],
        countA3Array : [],
        countA4Array : [],
        countA5Array : [],
        QuestionArray : [],
        series: [{
            name: 'Answer 1',
            data: [0, 0]
          }, {
            name: 'Answer 2',
            data: [0, 0]
          }, {
            name: 'Answer 3',
            data: [0, 0]
          }, {
            name: 'Answer 4',
            data: [0, 0]
          }, {
            name: 'Answer 5',
            data: [0, 0]
          }],
          
          chartOptions: {
            chart: {
              type: 'bar',
              height: 430
            },
            plotOptions: {
              bar: {
                horizontal: true,
                dataLabels: {
                  position: 'top',
                },
              }
            },
            dataLabels: {
              enabled: true,
              offsetX: -6,
              style: {
                fontSize: '12px',
                colors: ['#fff']
              }
            },
            stroke: {
              show: true,
              width: 0.5,
              colors: ['#fff']
            },
            xaxis: {
              categories: ["test"],
            },
          },
    };
  },
  methods: {

    countAnswer(idQ, answer)
    {
        var counter = 0;
        var counterTotal=0;
        var countPerCent;
        this.votes.map(vote=>{
            if(vote.idQ === idQ){
                if(vote.answer === answer)
                {
                    counter++;
                }
            counterTotal++;
            }
        })
        if(counterTotal === 0)//to avoid error if there is no vote for a question
        {
            counterTotal = 1;
        }
        countPerCent = (counter/counterTotal)*100;
        return countPerCent;
    },

    countAnswer2()
    {
        this.questions.map(question=>{
            let CountA1=0;
            let CountA2=0;
            let CountA3=0;
            let CountA4=0;
            let CountA5=0;
            this.votes.map(vote=>{
              if(vote.idQ === question.idQ){
                if(vote.answer === question.answer1)
                {
                    CountA1++;
                }
                if(vote.answer === question.answer2)
                {
                    CountA2++;
                }
                if(vote.answer === question.answer3)
                {
                    CountA3++;
                }
                if(vote.answer === question.answer4)
                {
                    CountA4++;
                }
                if(vote.answer === question.answer5)
                {
                    CountA5++;
                }
              }
            })
            this.countA1Array.push(CountA1);
            this.countA2Array.push(CountA2);
            this.countA3Array.push(CountA3);
            this.countA4Array.push(CountA4);
            this.countA5Array.push(CountA5);
            var Ques = "Question "+question.number;
            this.QuestionArray.push(Ques);

        })
        this.chartOptions = {...this.chartOptions, ...{xaxis: {categories:this.QuestionArray}}}
        this.series = [{
            name: 'Answer 1',
            data: this.countA1Array
          }, {
            name: 'Answer 2',
            data: this.countA2Array
          }, {
            name: 'Answer 3',
            data: this.countA3Array
          }, {
            name: 'Answer 4',
            data: this.countA4Array
          }, {
            name: 'Answer 5',
            data: this.countA5Array
          }]
    },

    TotalAnswer(idQ)
    {
        var counterTotal=0;
        
        this.votes.map(vote=>{
          if(vote.idQ === idQ){
            counterTotal++;
          }
        })
        return counterTotal;
    },

    TotalParticipant(idQ){
      var participant =0;
      var idU= this.votes[0].idU;
      
        if(idU !== null)
        {
          participant =1;
        }
      
      this.votes.map(vote=>{
        if(vote.idQ === idQ){
          if(vote.idU !== idU){
            participant++;
            idU=vote.idU;
          }
        }
      })
      return participant;


    },

    getVotes(idS){
        const path = 'http://localhost:5000/vote';
         const payload ={
            idS: idS,
      };
      axios.post(path, payload)
        .then((res) => {
            console.log(res.data.votes);
          this.votes = res.data.votes;
          this.getQuestions(this.idS);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error.response);
        });
    },
    getQuestions(idS) {
      const path = 'http://localhost:5000/get_question';
      const payload ={
            idS: idS,
       };
       axios.post(path, payload)
        .then((res) => {
            console.log(res);
          this.questions = res.data.questions;
          this.countAnswer2();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error.response);
        });
    },
  
 },
created() {
    this.idS=this.$route.params.idS,
    this.titleSurvey=this.$route.params.title;
    this.category=this.$route.params.category;
    this.getVotes(this.idS);
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#card{
  margin: 1% 20%;
  padding: 0%;
  max-width: 60%;
  .header{
  margin:0%;
  padding: 2%;
  background-color: #eeecec;
}
}
#wherePage{
  margin:0%;
  padding: 1%;
  background-color: #eeeeee;
}

</style>
