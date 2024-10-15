<template>
  <div class="bg-white shadow-md rounded-lg p-6">
    <h2 class="text-2xl font-semibold mb-6">Existing Forms</h2>
    <div class="bg-gray-100 p-4 rounded-md">
      <div v-for="form in forms" :key="form.id" class="flex justify-between items-center mb-2">
        <span>{{ form.name }}</span>
        <div>
          <button @click="$emit('edit-form', form)" class="bg-blue-500 text-white p-2 rounded-md mr-2">Edit</button>
          <button @click="$emit('delete-form', form.id)" class="bg-red-500 text-white p-2 rounded-md">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forms: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Add any styles needed for this component */
</style>
