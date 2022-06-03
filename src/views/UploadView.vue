<template>
  <div class="upload" style="margin-top:3em;margin-bottom:3em">
    <font-awesome-icon icon="fa-solid fa-star"/>
    <label for="wishlist" style="margin-left:5px">Wish List</label>
    <input type="checkbox" name="wishlist" v-model="wishlist" style="margin-left:1em">
    <br><br>
    <input type="file" v-on:change="newImage" accept="image/*" style="margin-left:6em">
    <img :src="imgsrc" :width="theWidth" :height="theHeight" style="border-radius:10px">
    <br>
    <br>
    <span v-if="wishlist == true">
      <wish-list-upload @wlupload="uploadWishList"/>
    </span>
    <span v-else>
      <purchase-upload @plupload="uploadPurchase"/>
    </span>
    
  </div>
</template>


<script>

import WishListUpload from '../components/WishListUpload.vue'
import PurchaseUpload from '../components/PurchaseUpload.vue'
import {db,auth,storageRef} from '../firebaseConfig'


export default {

    components: { WishListUpload,PurchaseUpload },
    data: function() {
      return {
        wishlist: false,
        image: File,
        imgsrc:'',
        theWidth: 0,
        theHeight: 0,
      }
    },
    methods: {
      uploadWishList: function(data) {
         if(this.image.name == "File"){
            db.collection('wishlist').add({
              link: data.link,
              tags: data.tags,
              title: data.title,
              user: auth.currentUser.uid, 
              imageurl: "",
            });

         }
         else{
          let f = this.image.name;
          let dotIndex = f.indexOf(".");
          let now = Date.now().toString();
          let fntimestamp = f.substring(0, dotIndex) + now + f.substring(dotIndex);

          var ref = storageRef.child(fntimestamp);
    
          ref.put(this.image).then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
                  db.collection('wishlist').add({
                    link: data.link,
                    tags: data.tags,
                    title: data.title,
                    user: auth.currentUser.uid, 
                    imageurl: downloadURL,
                  });

              })                 
          });
      }
      this.$router.replace('wishlist')
      },
      uploadPurchase: function(data){
         if(this.image.name == "File"){
            db.collection('purchasedlist').add({
              date: data.date_purchased,
              category: data.category,
              price: data.price,
              user: auth.currentUser.uid, 
              title: data.title,
              imageurl: "",
            });
         }
         else{
            let f = this.image.name;
            let dotIndex = f.indexOf(".");
            let now = Date.now().toString();
            let fntimestamp = f.substring(0, dotIndex) + now + f.substring(dotIndex);

            var ref = storageRef.child(fntimestamp);
      
          ref.put(this.image).then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
              db.collection('purchasedlist').add({
                date: data.date_purchased,
                category: data.category,
                price: data.price,
                user: auth.currentUser.uid, 
                title: data.title,
                imageurl: downloadURL,
              });
            })                 
          });
      }

      this.$router.replace('purchasedlist')
      },
      newImage: function(event){
         this.image = event.target.files[0];
         this.theWidth = 250;
         this.theHeight = 200;
         this.imgsrc = URL.createObjectURL(this.image);

      }
    },
}

</script>

<style scoped>

</style>
