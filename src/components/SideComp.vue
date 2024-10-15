<template>
  <aside class="w-64 bg-gray-800 text-white h-screen p-5">
    <h2 class="text-2xl font-bold mb-5">Form Generator</h2>
    <nav>
      <ul>
        <li>
          <router-link to="/" class="block py-2 hover:bg-gray-700 rounded">Home</router-link>
        </li>
        <li>
          <router-link to="/create" class="block py-2 hover:bg-gray-700 rounded">Create Form</router-link>
        </li>
        <li>
          <router-link to="/list" class="block py-2 hover:bg-gray-700 rounded">View Forms</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "SideComp",
};
</script>

<style scoped>
/* Add any styles needed for the sidebar */
</style>
