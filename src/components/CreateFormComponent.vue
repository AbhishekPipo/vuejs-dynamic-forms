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

        <div>
          <label class="block mb-2">Field Title</label>
          <input type="text" v-model="fieldTitle" class="w-full p-2 border rounded-md" placeholder="Field Title">
        </div>

        <div>
          <label class="block mb-2">Field Name</label>
          <input type="text" v-model="fieldName" class="w-full p-2 border rounded-md" placeholder="Field Name">
        </div>

        <div>
          <label class="block mb-2">Required</label>
          <input type="checkbox" v-model="isRequired">
        </div>

        <div>
          <label class="block mb-2">Input Type</label>
          <select v-model="inputType" class="w-full p-2 border rounded-md">
            <option value="text">Text</option>
            <option value="radio">Radio</option>
            <!-- Add other options as needed -->
          </select>
        </div>

        <div v-if="inputType === 'radio'">
          <label class="block mb-2">Option Name</label>
          <input type="text" v-model="optionName" class="w-full p-2 border rounded-md mb-2" placeholder="Option Name">
          <button @click="addOption" class="bg-blue-500 text-white p-2 rounded-md">Add Option</button>
        </div>

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
      fieldTitle: '',
      fieldName: '',
      isRequired: false,
      inputType: 'text',
      optionName: '',
      options: [],
      showFormCreation: false, // Track visibility of the form creation section
      editingFormId: null, // Track the form being edited
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
          fields: [
            {
              title: this.fieldTitle,
              name: this.fieldName,
              required: this.isRequired,
              type: this.inputType,
              options: this.inputType === 'radio' ? this.options : [],
            },
          ],
        };

        if (this.editingFormId) {
          await axios.put(`http://localhost:3000/forms/${this.editingFormId}`, newForm);
        } else {
          await axios.post('http://localhost:3000/forms', newForm);
        }

        this.resetForm();
        this.fetchForms();
        this.toggleFormCreation(); // Close the form creation section after saving
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
      // Populate field data for editing
      this.fieldTitle = form.fields[0]?.title || '';
      this.fieldName = form.fields[0]?.name || '';
      this.isRequired = form.fields[0]?.required || false;
      this.inputType = form.fields[0]?.type || 'text';
      this.options = form.fields[0]?.options || [];
      this.editingFormId = form.id; // Track the form being edited
      this.showFormCreation = true; // Show the form creation section when editing
    },
    addOption() {
      if (this.optionName) {
        this.options.push(this.optionName);
        this.optionName = '';
      }
    },
    resetForm() {
      this.formName = '';
      this.formDestinations = '';
      this.fieldTitle = '';
      this.fieldName = '';
      this.isRequired = false;
      this.inputType = 'text';
      this.options = [];
      this.editingFormId = null; // Reset editing form ID
    },
    toggleFormCreation() {
      this.showFormCreation = !this.showFormCreation; // Toggle visibility of the form creation section
    },
  },
};
</script>

<style scoped>
/* Add any styles needed for this component */
</style>
