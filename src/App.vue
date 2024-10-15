<template>
  <div id="app" class="p-6">
    <CreateFormComponent @edit-form="handleEditForm" @delete-form="handleDeleteForm" />
  </div>
</template>

<script>
import CreateFormComponent from './components/CreateFormComponent.vue';
import FormListComponent from './components/FormListComponent.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    CreateFormComponent,
    FormListComponent,
  },
  data() {
    return {
      forms: [],
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
    handleEditForm(form) {
      this.$refs.createFormComponent.editForm(form);
    },
    handleDeleteForm(formId) {
      this.$refs.createFormComponent.deleteForm(formId);
    },
  },
};
</script>

<style>
/* Add any global styles needed */
</style>
