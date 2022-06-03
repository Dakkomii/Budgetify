<template>
  <div class="purchase">
    <div>
      <b-form>
        <b-form-group
          id="title" 
          label="Title: "
          label-for="title-input"
        >
          <b-form-input 
            class="form-input"
            id="title-input"
            placeholder="Add title"
            v-model="title"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="category" 
          label="Category: "
          label-for="category-input"
        >
          <b-form-input 
            class="form-input"
            id="category-input"
            placeholder="Add category"
            v-model="category"
            required
          ></b-form-input>
        </b-form-group>

        <label for="date-input">Date Purchased: </label>
        <b-form-datepicker class="form-input" id="date-input" v-model="date_purchased"></b-form-datepicker>

        <b-form-group
          id="price" 
          label="Price:"
          label-for="price-input"
        >
          <b-form-input 
            class="form-input"
            id="price-input"
            placeholder="$0.00"
            v-model.number="price"
            required
          ></b-form-input>
        </b-form-group>

        <b-button @click='$emit("plupload",{title,category,date_purchased,price})' class="add-button">
          Add to Purchased List
          <font-awesome-icon icon="fa-solid fa-circle-plus"/>
        </b-button>
        
      </b-form>
    </div>

  </div>
</template>

<script>

export default {
    components: {},
    name: 'PurchaseUpload',

    data: function() {
      return {
            title:'',
            category:'',
            date_purchased:'',
            price:0,
      }
    },
};
</script>

<style scoped>

.form-label {
  text-align: left;
}

.form-input {
  width: 350px;
  margin-left: auto;
  margin-right: auto;
} 

.add-button {
  margin-top: 2em;
  background-color: rgb(18, 126, 84);
  color: white;
  border-radius: 6px;
  font-size: large;
}

</style>