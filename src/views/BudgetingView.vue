<template>
  <div class="budgeting">


    <h1 style="margin-top:1em">
      <font-awesome-icon icon="fa-solid fa-circle-dollar-to-slot"/>
      Your Budgeting
    </h1>

    <div class="totalSpentDiv">
          <b-card
            class="cards"
            header="Total expenses"
            header-text-variant="white"
            header-tag="header"
            header-bg-variant="success"
            style="max-width: auto; max-height: auto;"
          >
          <div class="totalgraph">
            <div>
                  <h3>Total Spent:</h3>
                  <h2 class="total">${{spentsum}}</h2>

                  <h2>Expenses by categories:</h2>

                  <div v-for="category in categoriesarray" v-bind:key="category.category">
                      <div style="display: inline-flex; margin: 10px;">
                        <h2>{{category.category}}: </h2>
                        <h2 class="categoryprice">${{category.expenses}}</h2>
                      </div>
                  </div>
            </div>

            <div class="piechart">
              <BarChart :chartLabels="chartData.labels" :chartValues="chartData.datasets[0].data"></BarChart>
            </div>

          </div>

        </b-card>
    </div>

    <div class="totalSpentDiv">
      <b-card class="cards"
      header="Expenses by date"
      header-text-variant="white"
      header-tag="header"
      header-bg-variant="success"
      style="max-width: auto; max-height:auto;"
      >
        <!-- <div class="totalSpentDiv">
          <h1>Summary</h1>
          <h3>This month you have spent </h3>

        </div> -->


        <!-- <div class="totalSpentDiv"> -->
      <div>
        <b-tabs active-nav-item-class="font-weight-bold text-success"
              content-class="mt-3"
              align="center"
              small card fill>
          
          <b-tab title="This month" active>
            <h2>Total spent this month:</h2>
            <h3 class="total">${{expensesthismonth}}</h3>

            <div>
              <h2>Expenses by categories:</h2>

              <div v-for="category in expensesbycategorythismonth" v-bind:key="category.category">
                  <div style="display: inline-flex; margin: 10px;">
                    <h3>{{category.category}}: </h3>
                    <h3 class="categoryprice">${{category.expenses}}</h3>
                  </div>
              </div>
            </div>
          </b-tab>

          <b-tab title="Last month">
            <h2>Total spent last month:</h2>
            <h3 class="total">${{expenseslastmonth}}</h3>

            <div>
              <h2>Expenses by categories:</h2>

              <div v-for="category in expensesbycategorylastmonth" v-bind:key="category.category">
                  <div style="display: inline-flex; margin: 10px;">
                    <h3>{{category.category}}: </h3>
                    <h3 class="categoryprice">${{category.expenses}}</h3>
                  </div>
              </div>
            </div>
          </b-tab>

          <b-tab title="Custom date"  style=" margin: 15px;">
            <div>
              <h2> Total spent from date:</h2>
              <h5>Pick a date:</h5>
              <b-form-datepicker class="form-input" id="date-input" v-model="date"></b-form-datepicker>
              <span v-if="date == '' ">
                <h4 class="totalSpent" style="margin-top: 10px;">Total Spent: $0.00 </h4>
              </span>
              <span v-else>
                <h3 style="margin: 30px;">Total Spent: </h3>
                <h2 class="total">${{spentsumbydate}}</h2>
              </span>
            </div>

            <div>
                <span v-if="date == '' ">
                    <!-- <h5> Pick a date to see expenses by category.</h5> -->
                </span>
                <span v-else>  
                  <h3>Expenses by categories:</h3>
                  <div v-for="category in expensesbydate" v-bind:key="category.category">
                    <div style="display: inline-flex; margin: 10px;">
                      <h3>{{category.category}}: </h3>
                      <h3 class="categoryprice">${{category.expenses}}</h3>
                    </div>
                  </div>
                </span>
            </div>
          </b-tab>

        </b-tabs>
        </div>
      </b-card>
    </div>

      <!-- <div style="width: 200px; height: 200px;">
          <BarChart :chartLabels="chartData.labels" :chartValues="chartData.datasets[0].data"></BarChart>
      </div>
      <div style="width: 200px; height: 200px;">
          <PieChart :chartLabels="chartData.labels" :chartValues="chartData.datasets[0].data"></PieChart>
      </div> -->
      
    
  </div>
</template>

<script>
import { auth, db } from '@/firebaseConfig'

import BarChart from '../components/BarChart.vue'
// import PieChart from '../components/PieChart.vue'

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {
  components: { BarChart },
  data: function() {
    return {
      purchased_results: false,
      orderedbydate: false,
      orderbycategoty: false,
      date: '',
      firstday: '',
      lastday: '',
      prevfirstday: '',
      prevlastday: '',
      pickeddate: false,
      categoriesarray: [],
      lab: [],
      dat: [],
      chartData: {
        labels: [ 'TEST', 'February', 'March'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12]
          }
        ]
      }
    }
  },
  firestore: function() {
    return {
      purchased_results: db.collection('purchasedlist').where('user', '==', auth.currentUser.uid),
      orderedbydate: db.collection("purchasedlist").where("date", ">", this.date).where('user', '==', auth.currentUser.uid).orderBy("date", "asc"),
      orderbycategoty: db.collection("purchasedlist").where('user', '==', auth.currentUser.uid).orderBy("category", "asc")

    }
  },
  created() {
    console.log('Component has been created!');
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var firstdayprev = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    var lastdayprev = new Date(date.getFullYear(), date.getMonth(), 0);

    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }

    this.firstday = formatDate(firstDay);
    this.lastday = formatDate(lastDay);
    this.prevfirstday = formatDate(firstdayprev);
    this.prevlastday = formatDate(lastdayprev);
  },
  computed: {
    spentsum() {
      let results = [...this.purchased_results];
      if(results === false){
        return 0;
      }
      else{
        let sum = results.reduce((acc, curr) => {
          return acc + curr.price;
        }, 0);
        return sum.toFixed(2);
      }
    },
    spentsumbydate() {
      let results = [...this.orderedbydate];
      if(results === false){
        return 0;
      }
      else{
        let sum = results.reduce((acc, curr) => {
          return acc + curr.price;
        }, 0);
        return sum.toFixed(2);
      }
    },
    expensesbydate: function(){
      var results = this.orderedbydate;
      if(results == false){
        return;
      }
      else{
        let categoryarray = [];
        for (let i = 0; i < results.length; i++) {
          if (categoryarray.includes(results[i].category) == false) {
            categoryarray.push(results[i].category);
          }
        }
        var categoryexpenses = [];
        let sum = 0;
        for ( let i = 0; i < categoryarray.length; i++) {
          for (let j = 0; j < results.length; j++) {
            if (categoryarray[i] === results[j].category) {
              sum += results[j].price;
            }
            else{
              continue;
            }
          }
          categoryexpenses.push({category: categoryarray[i], expenses: sum.toFixed(2)});
          sum = 0;
        }
        return categoryexpenses;
      }
    },
    expensesthismonth() {
      let results = [...this.purchased_results];
      if(results === false){
        return 0;
      }
      else{
        let sum = 0;
        for (let i = 0; i < results.length; i++) {
          if (results[i].date >= this.firstday && results[i].date <= this.lastday) {
            sum+= results[i].price;
          }
          else{
            continue;
          }
        }
        return sum.toFixed(2);
      }
    },
    expensesbycategorythismonth: function(){
      var results = this.purchased_results;
      if(results == false){
        return;
      }
      else{
        let categoryarray = [];
        for (let i = 0; i < results.length; i++) {
          if ( (categoryarray.includes(results[i].category) == false) && (results[i].date >= this.firstday && results[i].date <= this.lastday) ) {
            categoryarray.push(results[i].category);
          }
        }
        var categoryexpenses = [];
        let sum = 0;
        for ( let i = 0; i < categoryarray.length; i++) {
          for (let j = 0; j < results.length; j++) {
            if (categoryarray[i] === results[j].category) {
              sum += results[j].price;
            }
            else{
              continue;
            }
          }
          categoryexpenses.push({category: categoryarray[i], expenses: sum.toFixed(2)});
          sum = 0;
        }
        return categoryexpenses;
      }
    },
    expenseslastmonth() {
      let results = [...this.purchased_results];
      if(results === false){
        return 0;
      }
      else{
        let sum = 0;
        for (let i = 0; i < results.length; i++) {
          if (results[i].date >= this.prevfirstday && results[i].date <= this.prevlastday) {
            sum+= results[i].price;
          }
          else{
            continue;
          }
        }
        return sum.toFixed(2);
      }
    },
    expensesbycategorylastmonth: function(){
      var results = this.purchased_results;
      if(results == false){
        return;
      }
      else{
        let categoryarray = [];
        for (let i = 0; i < results.length; i++) {
          if ( (categoryarray.includes(results[i].category) == false) && (results[i].date >= this.prevfirstday && results[i].date <= this.prevlastday) ) {
            categoryarray.push(results[i].category);
          }
        }
        var categoryexpenses = [];
        let sum = 0;
        for ( let i = 0; i < categoryarray.length; i++) {
          for (let j = 0; j < results.length; j++) {
            if (categoryarray[i] === results[j].category) {
              sum += results[j].price;
            }
            else{
              continue;
            }
          }
          categoryexpenses.push({category: categoryarray[i], expenses: sum.toFixed(2)});
          sum = 0;
        }
        return categoryexpenses;
      }
    },
  },
  methods: {
    expensesbycategory(){
      var results = this.purchased_results;
      if(results == false){
        return;
      }
      else{
        let categoryarray = [];
        for (let i = 0; i < results.length; i++) {
          if (categoryarray.includes(results[i].category) == false) {
            categoryarray.push(results[i].category);
          }
        }
        var categoryexpenses = [];
        let sum = 0;
        for ( let i = 0; i < categoryarray.length; i++) {
          for (let j = 0; j < results.length; j++) {
            if (categoryarray[i] === results[j].category) {
              sum += results[j].price;
            }
            else{
              continue;
            }
          }
          categoryexpenses.push({category: categoryarray[i], expenses: sum.toFixed(2)});
          this.lab.push(categoryarray[i]);
          this.dat.push(parseFloat(sum.toFixed(2)));
          sum = 0;
        }
        this.chartData.labels = this.lab;
        this.chartData.datasets[0].data = this.dat;
        this.categoriesarray = categoryexpenses;
      }
    },
  },
  watch:{
    date: {
      immediate: true,
      handler(date) {
        this.$bind('orderedbydate', db.collection("purchasedlist").where('user', '==', auth.currentUser.uid).where("date", ">", date).orderBy("date", "asc"))
        this.pickeddate = true;
      },
    },
    purchased_results: {
      immediate: true,
      handler: function() {
        this.expensesbycategory();
      }
    },
  },

}

</script>

<style>
.totalSpent{
  font-size: 1.5em;
  font-weight: bold;
  color: #2f8b13;
  /* margin: 30px; */
}

@media (max-width: 400px) {
  .totalgraph{
    display: inline-block;
  }
  .piechart{
    width: 280px;
    height: auto;
    /* margin-left: 10px; */
  }
  .cards{
    max-width: auto; 
    max-height: auto;
  }
}
@media (min-width: 600px) {
  .totalgraph{
    display: inline-flex;
  }
  .totalSpentDiv{
  margin-right: auto;
  margin-left: auto;
  display: inline-flex;
  border: solid 5px #2f8b13;
  margin: 30px;
  }
  .piechart{
    width: 500px; 
    height: auto;
    margin-left: 50px;
  }
  
}
.totalSpentDiv{
  margin-right: auto;
  margin-left: auto;
  display: inline-flex;
  border: solid 5px #73b65e;
  margin: 10px;
  margin-bottom: 30px;
}

.total{
  font-size: 2em;
  font-weight: bold;
  color: #2f8b13;
  margin: 30px;
}
.categoryprice{
  /* font-size: 1.5em; */
  font-weight: bold;
  color: #2f8b13;
  margin-left: 20px;
}
</style>