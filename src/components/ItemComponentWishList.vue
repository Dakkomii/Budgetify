<template>
<router-link :to="{ name: 'ItemView', params: { itemId: id, database: database }}">
    <div>
        <b-card border-variant="secondary"
            :title=text
            :img-src="imageurl ? imageurl : require('@/assets/empty-folder.png')"
            img-alt="Image"
            img-top
            :tag= tags[0]
            style="overflow: hidden; width: 20rem; height: 28rem; margin: 1rem;"
            class="mb-2"
        >
            <b-card-text>
                <span>
                    <font-awesome-icon icon="fa-solid fa-tags"/>
                    <span class="tags" v-for="theTag in tags" :key="theTag"> {{theTag}} </span>
                </span>
            </b-card-text>
          
            <span>
                <font-awesome-icon icon="fa-solid fa-link" />

                <b-button style="margin: 0.3rem; background-color: #166429; border: none" :href=link variant="secondary" @click="$event.stopPropagation()">Link</b-button>
            </span>
        </b-card>
    </div>
</router-link>  
</template>

<script>

export default {
  name: 'ItemComponentWishList',
  props: {
      id:String,
      text:String,
      link:String,
      imageurl:String,
      tags:Array
  },
  data () {
    return {
        database: "wishlist"
    }
  },
  
  methods: {
  }
}
</script>

<style scoped>
.card-text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.card {
    color: #2c5042;
    text-decoration: none;
    border-radius: 25px;
    background-image: linear-gradient(rgb(109, 109, 109), rgb(255, 255, 255));
}

.card:hover {
    text-decoration: none !important;
}

.card-img-top {
    width: 100%;
    height: 15rem;
    /* height: 20vw; */
    object-fit: cover;
}

.tags {
  margin: 0.3rem;
  margin-bottom: 1rem;
  padding: 0.3rem;
  background-color: #28a745;
  color: white;
  border-radius: 13px;
  font-size: large;
}

.imageless > .card-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
</style>