<template>
  <div class="item">
    <b-container style="margin-top:6em">
      <b-row>

      <b-col sm="12" lg="6">
        <b-img @click="clickImage" :src="data.imageurl ? data.imageurl : require('@/assets/empty-folder.png')" alt="No Image Uploaded" fluid rounded></b-img>
        <input type="file" v-show="imageVisible" v-on:change="updateImage" accept="image/*" style="margin-left:6em; margin-top:1em; margin-bottom:1em">
      </b-col>

      <b-col sm="12" lg="6">
        <b-card bg-variant="success" border-variant="success"
        :title=data.title
        style="overflow: hidden; padding: 4em"
        class="mx-auto text-center"
        align="center"
        text-variant="white"
      >
        <router-link v-if="database === 'wishlist'" :to="{ name: 'wishlist'}">
          <b-card-text style="font-style:italic; color:white; margin-bottom:1em">
            <span>
              <font-awesome-icon icon="fa-solid fa-star"/>
              Wish List
            </span>
          </b-card-text>
        </router-link>

        <b-card-text v-if="database === 'wishlist'">
          <font-awesome-icon icon="fa-solid fa-receipt"/>
          <label for="wishlist" style="margin-left:5px; font-size:15px; font-style:italic">Move to Purchased List</label>
          <input type="checkbox" @change="check($event)" name="wishlist" v-model="moveToPurchasedList" style="margin-left:1em">
        </b-card-text>

        <router-link v-else :to="{ name: 'purchasedlist'}">
          <b-card-text style="font-style:italic; color:white; margin-bottom:1em">
            <span>
              <font-awesome-icon icon="fa-solid fa-receipt"/>
              Purchased List
            </span>
          </b-card-text>
        </router-link>


        <b-card-text v-if="database === 'wishlist'">
          <font-awesome-icon icon="fa-solid fa-tags"/>
          <span class="tags" v-for="theTag in data.tags" :key="theTag" style="background-color:#0e451c; border:none"> {{theTag}} </span>
        </b-card-text>

        <b-card-text v-else>
          <font-awesome-icon icon="fa-solid fa-tags"/>
          <editable-span class="tags" :text="data.category" @edited="updateCategory" />
        </b-card-text>

        <b-card-text v-if="database === 'wishlist'">
          <b-button style="margin:0.3rem; background-color:#0e451c; border:none" :href=data.link variant="secondary" @click="$event.stopPropagation()">
            <font-awesome-icon icon="fa-solid fa-link"/>
            Link
          </b-button>
        </b-card-text>

        <b-card-text v-if="database === 'wishlist'">
          <editable-span style="font-size:15px; font-style:italic" :text="data.link" @edited="updateLink"></editable-span>
        </b-card-text>

        <b-card-text v-else style="margin-top:2em">
          <font-awesome-icon icon="fa-solid fa-sack-dollar"/>
          <span>Price: $</span>
          <editable-number-span :text= data.price @edited="updatePrice"/>
        </b-card-text>

        <b-card-text>
          <b-input-group>
            <b-input-group-prepend v-show="visible" style="margin-right:10px">
              <span>
                <font-awesome-icon icon="fa-solid fa-sack-dollar"/>
                Price: $
              </span>
            </b-input-group-prepend> 
            <b-form-input 
              class="form-input"
              id="price-input"
              placeholder="0.00"
              v-model.number="price"
              v-show="visible"
              required
            ></b-form-input>
          </b-input-group>
        </b-card-text>

        <b-card-text>
          <b-input-group>
            <b-input-group-prepend v-show="visible" style="margin-right:10px">
              <span>
                <font-awesome-icon icon="fa-solid fa-calendar-day"/>
                Date Purchased: 
              </span>
            </b-input-group-prepend>
            <b-form-datepicker class="form-input" id="date-input" v-model="date_purchased" v-show="visible"></b-form-datepicker>
          </b-input-group> 
        </b-card-text>
       
        <b-card-text v-if="database === 'purchasedlist'" style="margin-top:0px">
          <font-awesome-icon icon="fa-solid fa-calendar-day"/>
          <span>Date Purchased: </span>
          <span @click="clickDate">{{data.date}}</span>
          <b-form-datepicker @input="updateDate" class="form-input" id="date-input" v-model="date_purchased" v-show="purchasedDateVisible"></b-form-datepicker>
        </b-card-text>

        <b-card-text v-if="database === 'wishlist'" style="margin-top:2em">
          <b-button @click="moveItem(itemId, data.title, data.imageurl, data.tags[0])" v-show="visible" style="background-color:#0e451c; border:none">
            <font-awesome-icon icon="fa-solid fa-receipt"/>
            Add to Purchased List
          </b-button> 
          <b-button @click="deleteItem(itemId)" style="background-color:#0e451c; border:none; margin-left:1em">
            <font-awesome-icon icon="fa-solid fa-trash"/>
            Delete
          </b-button>
        </b-card-text>

        <b-card-text v-if="database === 'purchasedlist'" style="margin-top:1em">
          <b-button @click="deleteItem(itemId)" style="background-color:#0e451c; border:none">
            <font-awesome-icon icon="fa-solid fa-trash"/>
            Delete
          </b-button>  
        </b-card-text>

      </b-card>
      </b-col>
      </b-row>
    </b-container>
    
  </div>
</template>

<script>
import { auth, db, storageRef } from "@/firebaseConfig.js"
import EditableSpan from '@/components/EditableSpan.vue'
import EditableNumberSpan from '@/components/EditableNumberSpan.vue'


export default {
  name: 'ItemView',

  components: {
    EditableSpan,
    EditableNumberSpan
  },

  data: function() {
      return {
        data: false,
        visible: false,
        imageVisible: false,
        purchasedDateVisible: false,
        price: 0,
        date_purchased: '',
        moveToPurchasedList: false,
        image: File,
      }
  },

  props: ["itemId", "database"],
  
  firestore: function() {
    return {
      data: db.collection(this.database).doc(this.itemId)
    }
  },

  computed: {
    priceText () {
      return Number(this.price).toFixed(2)
    }
  },

  methods: {

    check: function() {
      this.visible = true
    },

    clickImage: function() {
      this.imageVisible = true
    },

    updateImage: function(event) {
      this.image = event.target.files[0];
      let f = this.image.name;
      let dotIndex = f.indexOf(".");
      let now = Date.now().toString();
      let fntimestamp = f.substring(0, dotIndex) + now + f.substring(dotIndex);

      var ref = storageRef.child(fntimestamp);
      
      ref.put(this.image).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.$firestoreRefs.data.update({imageurl:downloadURL});
        })                 
      });
    
    },

    updateLink: function(newLink) {
      this.$firestoreRefs.data.update({link:newLink})
    },

    updateCategory: function(newCategory) {
      this.$firestoreRefs.data.update({category:newCategory})
    },

    updatePrice: function(newPrice) {
      this.$firestoreRefs.data.update({price:newPrice})
    },

    clickDate: function() {
      this.purchasedDateVisible = true
    },

    updateDate: function(newDate) {
      this.$firestoreRefs.data.update({date:newDate}) 
    },
    
    moveItem: function(itemId, title, imageurl, firstTag) {
      db.collection('purchasedlist').add({
        title: title,
        user: auth.currentUser.uid,
        imageurl: imageurl,
        date: this.date_purchased,
        category: firstTag,
        price: this.price
      });

      db.collection(this.database).doc(this.itemId).delete()

      this.$router.push('/purchasedlist')
    },

    deleteItem: function() {
      db.collection(this.database).doc(this.itemId).delete()
      console.log("calling delete")
      this.$router.push('/' + this.database)
    }
  }
}

</script>

<style scoped>
.tags {
  margin: 0.3rem;
  margin-bottom: 1rem;
  padding: 0.3rem;
  background-color: #166429;
  color: rgb(255, 255, 255);
  border-radius: 13px;
  font-size: large;
}

.card-title {
  font-size: 40px;
  font-weight: bold;
}

.card-text {
  font-size: 20px;
}



</style>