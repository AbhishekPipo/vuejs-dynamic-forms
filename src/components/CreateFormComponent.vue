<template>
  <div class="bg-white shadow-md rounded-lg p-6">
    <h2 class="text-2xl font-semibold mb-6">Create Form</h2>

    <!-- Button to create a new form -->
    <button 
      @click="toggleFormCreation" 
      class="bg-green-500 text-white p-2 rounded-md mb-4">
      Create New Form
    </button>

    <!-- Existing forms -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-4">Existing Forms</h3>
      <div class="bg-gray-100 p-4 rounded-md">
        <div v-for="form in forms" :key="form.id" class="flex justify-between items-center mb-2">
          <span>{{ form.name }}</span>
          <div>
            <button @click="editForm(form)" class="bg-blue-500 text-white p-2 rounded-md mr-2">Edit</button>
            <button @click="deleteForm(form.id)" class="bg-red-500 text-white p-2 rounded-md">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- New form creation section in a card layout -->
    <div v-if="showFormCreation" class="bg-gray-100 p-6 rounded-md shadow-lg">
      <h3 class="text-lg font-semibold mb-4">New Form Creation</h3>
      <div class="grid grid-cols-1 gap-4">
        <div>
          <label class="block mb-2">Form Name</label>
          <input type="text" v-model="formName" class="w-full p-2 border rounded-md" placeholder="Form Name">
        </div>

        <div>
          <label class="block mb-2">Form Destinations</label>
          <textarea v-model="formDestinations" class="w-full p-2 border rounded-md" rows="3" placeholder="Form Destinations"></textarea>
        </div>

        <!-- Fields section -->
        <div v-for="(field, index) in fields" :key="index" class="bg-white p-4 rounded-md mb-4">
          <h4 class="text-lg font-semibold mb-2">Field {{ index + 1 }}</h4>
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block mb-2">Field Title</label>
              <input type="text" v-model="field.title" class="w-full p-2 border rounded-md" placeholder="Field Title">
            </div>

            <div>
              <label class="block mb-2">Field Name</label>
              <input type="text" v-model="field.name" class="w-full p-2 border rounded-md" placeholder="Field Name">
            </div>

            <div>
              <label class="block mb-2">Required</label>
              <input type="checkbox" v-model="field.required">
            </div>

            <div>
              <label class="block mb-2">Input Type</label>
              <select v-model="field.type" class="w-full p-2 border rounded-md">
                <option value="text">Text</option>
                <option value="radio">Radio</option>
                <!-- Add other options as needed -->
              </select>
            </div>

            <div v-if="field.type === 'radio'">
              <label class="block mb-2">Options</label>
              <div v-for="(option, optionIndex) in field.options" :key="optionIndex" class="flex mb-2">
                <input type="text" v-model="field.options[optionIndex]" class="flex-grow p-2 border rounded-md mr-2">
                <button @click="removeOption(index, optionIndex)" class="bg-red-500 text-white p-2 rounded-md">Remove</button>
              </div>
              <div class="flex">
                <input type="text" v-model="field.newOption" class="flex-grow p-2 border rounded-md mr-2" placeholder="New Option">
                <button @click="addOption(index)" class="bg-blue-500 text-white p-2 rounded-md">Add Option</button>
              </div>
            </div>

            <button @click="removeField(index)" class="bg-red-500 text-white p-2 rounded-md">Remove Field</button>
          </div>
        </div>

        <button @click="addField" class="bg-green-500 text-white p-2 rounded-md">Add New Field</button>

        <button @click="saveForm" class="bg-blue-500 text-white p-2 rounded-md mt-4">Save Form</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      forms: [],
      formName: '',
      formDestinations: '',
      fields: [],
      showFormCreation: false,
      editingFormId: null,
    };
  },
  mounted() {
    this.fetchForms();
  },
  methods: {
    async fetchForms() {
      try {
        const response = await axios.get('http://localhost:3000/forms');
        this.forms = response.data;
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    },
    async saveForm() {
      try {
        const newForm = {
          name: this.formName,
          destinations: this.formDestinations,
          fields: this.fields.map(field => ({
            title: field.title,
            name: field.name,
            required: field.required,
            type: field.type,
            options: field.type === 'radio' ? field.options : [],
          })),
        };

        if (this.editingFormId) {
          await axios.put(`http://localhost:3000/forms/${this.editingFormId}`, newForm);
        } else {
          await axios.post('http://localhost:3000/forms', newForm);
        }

        this.resetForm();
        this.fetchForms();
        this.toggleFormCreation();
      } catch (error) {
        console.error('Error saving form:', error);
      }
    },
    async deleteForm(formId) {
      try {
        await axios.delete(`http://localhost:3000/forms/${formId}`);
        this.fetchForms();
      } catch (error) {
        console.error('Error deleting form:', error);
      }
    },
    editForm(form) {
      this.formName = form.name;
      this.formDestinations = form.destinations;
      this.fields = form.fields.map(field => ({
        ...field,
        newOption: '',
      }));
      this.editingFormId = form.id;
      this.showFormCreation = true;
    },
    addField() {
      this.fields.push({
        title: '',
        name: '',
        required: false,
        type: 'text',
        options: [],
        newOption: '',
      });
    },
    removeField(index) {
      this.fields.splice(index, 1);
    },
    addOption(fieldIndex) {
      const field = this.fields[fieldIndex];
      if (field.newOption) {
        field.options.push(field.newOption);
        field.newOption = '';
      }
    },
    removeOption(fieldIndex, optionIndex) {
      this.fields[fieldIndex].options.splice(optionIndex, 1);
    },
    resetForm() {
      this.formName = '';
      this.formDestinations = '';
      this.fields = [];
      this.editingFormId = null;
    },
    toggleFormCreation() {
      this.showFormCreation = !this.showFormCreation;
      if (!this.showFormCreation) {
        this.resetForm();
      }
    },
  },
};
</script>

<style scoped>
/* Add any styles needed for this component */
</style>