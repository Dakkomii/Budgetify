 <template>
 <!-- Professor Kluver's code example -->
  <span v-if="!editMode" @click="editMode=true" > {{Number(text).toFixed(2)}}</span>
  <input v-else  type="number" @blur="clickOut" v-model.number="inputContent"/>
</template>

<script>
export default {
  name: 'EditableNumberSpan',

  props: {
    text:Number
  },

  data: function() {
    return {
      editMode: false,
      inputContent: this.text,
    }
  },

  methods: {
    clickOut: function() {
      this.editMode = false;
      this.$emit("edited", this.inputContent)
    }
  }
}
</script>