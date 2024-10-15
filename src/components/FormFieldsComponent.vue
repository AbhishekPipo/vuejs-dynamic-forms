<template>
    <div>
      <div class="mb-4">
        <label class="block mb-2">Form Name</label>
        <input type="text" v-model="formName" class="w-full p-2 border rounded-md" placeholder="Form Name">
        <p class="text-sm text-gray-500 mt-1">No space or special symbols allowed except underscore</p>
      </div>
  
      <div class="mb-4">
        <label class="block mb-2">Form Destinations</label>
        <textarea v-model="formDestinations" class="w-full p-2 border rounded-md" rows="3" placeholder="Form Destinations"></textarea>
        <p class="text-sm text-gray-500 mt-1">Email addresses, separated by comma (,) no space</p>
      </div>
  
      <div class="mb-4">
        <label class="block mb-2">Field Title</label>
        <input type="text" v-model="fieldTitle" class="w-full p-2 border rounded-md" placeholder="Field Title">
      </div>
  
      <div class="mb-4">
        <label class="block mb-2">Field Name</label>
        <input type="text" v-model="fieldName" class="w-full p-2 border rounded-md" placeholder="Field Name">
      </div>
  
      <div class="mb-4">
        <label class="block mb-2">Required</label>
        <input type="checkbox" v-model="isRequired">
      </div>
  
      <div class="mb-4">
        <label class="block mb-2">Input Type</label>
        <select v-model="inputType" class="w-full p-2 border rounded-md">
          <option value="text">Text</option>
          <option value="radio">Radio</option>
        </select>
      </div>
  
      <div v-if="inputType === 'radio'" class="mb-4">
        <label class="block mb-2">Option Name</label>
        <input type="text" v-model="optionName" class="w-full p-2 border rounded-md mb-2" placeholder="Option Name">
        <button @click="addOption" class="bg-blue-500 text-white p-2 rounded-md">Add Option</button>
      </div>
  
      <button @click="addField" class="bg-blue-500 text-white p-2 rounded-md mt-4">Add Item</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formName: '',
        formDestinations: '',
        fieldTitle: '',
        fieldName: '',
        isRequired: false,
        inputType: 'text',
        optionName: '',
        options: []
      }
    },
    methods: {
      addOption() {
        if (this.optionName) {
          this.options.push(this.optionName)
          this.optionName = ''
        }
      },
      addField() {
        this.$emit('add-field', {
          title: this.fieldTitle,
          name: this.fieldName,
          required: this.isRequired,
          type: this.inputType,
          options: this.inputType === 'radio' ? this.options : []
        })
        this.resetFieldForm()
      },
      resetFieldForm() {
        this.fieldTitle = ''
        this.fieldName = ''
        this.isRequired = false
        this.inputType = 'text'
        this.options = []
      }
    }
  }
  </script>
  