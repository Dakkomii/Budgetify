<template>
  <div class="home">
    <h1 id="title" class="display-3" style="margin-top:1em"> Welcome to Budgetify </h1>
    <b-container>
      <b-row>
        <b-col sm>
          <font-awesome-icon id="splash-icon" icon="fa-solid fa-circle-dollar-to-slot fa-10x"/>
          <h3>Budget</h3>
        </b-col>
        <b-col sm>
          <font-awesome-icon id="splash-icon" icon="fa-solid fa-receipt fa-10x"/>
          <h3>Track Expenses</h3>
        </b-col>
        <b-col sm>
          <font-awesome-icon id="splash-icon" icon="fa-solid fa-star fa-10x"/>
          <h3>Plan Expenses</h3>
        </b-col>
      </b-row>
    </b-container>
    <h1 id="footer" class="display-4">Log In with Google to start your financial journey!</h1>
  </div>
</template>

<script>
import { auth } from '@/firebaseConfig'



export default {
  name: 'HomeView',
  
  components: {

  },

  beforeCreate: function() {
    if(auth.currentUser) {
      this.$router.replace("/wishlist")
    }
  }
}
</script>

<style scoped>

#splash-icon{
  font-size: 9rem;
  margin-top: 20px;
  margin-bottom: 20px;
}

#title{
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 3rem;
}

#footer{
  margin-top: 30px;
  font-size: 2rem;
}

</style>