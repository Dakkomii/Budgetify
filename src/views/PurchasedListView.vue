<template>
  <div class="purchasedlist">
    <h1 style="margin-top:1em;  cursor: default;">
      <font-awesome-icon icon="fa-solid fa-receipt"/>
      Your Purchased List
    </h1>

    <div v-if="category_list !== false" class="tag-button-area">
      <router-link :to="{ name: 'purchasedlistCategory', params: { category: category }}" v-for="category in category_list" :key="category" class="tags">
          {{ category }}
      </router-link>
    </div>
    <div v-else>
        Loading Categories...
    </div>

    <div v-if="category_results !== false">
      <b-card-group class="d-flex justify-content-center">
        <b-row sm="12" lg="3" align-h="center">
           <item-component-purchased-list  v-for="item in purchased_results" :key="item.id" :id="item.id" :text="item.title" :imageurl="item.imageurl" :category="item.category" :date="item.date" :price="item.price" />
        </b-row>
      </b-card-group>
    </div>
    <div v-else>
        Loading Items...
    </div>
  </div>
</template>

                        

<script>
import { auth, db } from '@/firebaseConfig'
import ItemComponentPurchasedList from '../components/ItemComponentPurchasedList.vue'

export default {
  components: { ItemComponentPurchasedList },

  data: function() {
    return {
      purchased_results: false,
    }
  },
  computed: {
    category_list() {
          let category_list = [];
          for (let item of this.purchased_results) {
            if(!category_list.includes(item.category)) {
              category_list.push(item.category)
            }
          }
          return category_list
    }
  },
  firestore: function() {
    return {
      purchased_results: db.collection('purchasedlist').where('user', '==', auth.currentUser.uid)
    }
  }
}

</script>


<style scoped>

.tags {
  margin: 0.5rem;
  padding:0.5rem;
  background-color: #28a745;
  color: white;
  border-radius:13px;
  font-size: large;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.8);
}

.tag-button-area {
  margin-top: 2rem;
  margin-bottom: 1.5rem;
}

</style>