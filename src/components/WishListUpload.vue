<template>
  <div class="wishlist">
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

        <label for="tags-pills">Tag(s):</label>
          <b-form-tags
            class="form-input" 
            input-id="tags-pills"
            placeholder="Add tag(s)"
            v-model="tags"
            tag-variant="success"
            tag-pills
            separator=" "
            
          ></b-form-tags>

        <b-form-group
          id="link" 
          label="Link: "
          label-for="link-input"
        >
          <b-form-input 
            class="form-input"
            id="link-input"
            placeholder="Add link"
            v-model="link"
            required
          ></b-form-input>
        </b-form-group>

        <b-button @click='$emit("wlupload",{title,tags,link})' class="add-button">
          Add to Wish List
          <font-awesome-icon icon="fa-solid fa-circle-plus"/>
        </b-button>

      </b-form>
    </div>

  </div>
</template>

<script>

export default {
    components: {},
    name: 'WishListUpload',
    data: function() {
      return {
            title:'',
            tag:'',
            tags:[],
            link:'',
      }
    },
    methods: {
        add: function(){
            this.tags.push(this.tag);
            this.tag = '';
        },
    }
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