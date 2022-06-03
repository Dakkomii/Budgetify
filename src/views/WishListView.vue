<template>
  <div class="wishlist">
    <h1 style="margin-top:1em; cursor: default;">
      <font-awesome-icon icon="fa-solid fa-star"/>
      Your Wish List
    </h1>

    <div v-if="tags_list !== false" class="tag-button-area">
      <router-link :to="{ name: 'wishlistCategory', params: { category: tag }}" v-for="tag in tags_list" :key="tag" class="tags">
          {{ tag }}
      </router-link>
    </div>
    <div v-else>
        Loading Categories...
    </div>

    <div v-if="category_results !== false">
      <b-card-group class="d-flex justify-content-center">
        <b-row sm="12" lg="3" align-h="center">
          <item-component-wish-list v-for="item in wishlist_results" :key="item.id" :id="item.id" :text="item.title" :link="item.link" :imageurl="item.imageurl" :tags="item.tags" />
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
import ItemComponentWishList from '../components/ItemComponentWishList.vue'

export default {
  components: { ItemComponentWishList },
  name: 'WishListView',
  props: {
  },
  data: function() {
    return {
      wishlist_results: false
    }
  },
  computed: {
    tags_list() {
          let tags_list = [];
          for (let item of this.wishlist_results) {
            for(let tag of item.tags) {
              if(!tags_list.includes(tag)) {
                tags_list.push(tag)
              }
            }
          }
          return tags_list
    }
  },
  firestore: function() {
    return {
      wishlist_results: db.collection('wishlist').where('user', '==', auth.currentUser.uid),
      
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