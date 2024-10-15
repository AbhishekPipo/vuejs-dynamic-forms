import { createRouter, createWebHistory } from 'vue-router';
import CreateFormComponent from '../components/CreateFormComponent.vue';
import FormListComponent from '../components/FormListComponent.vue';

const routes = [
  { path: '/', component: FormListComponent },
  { path: '/create', component: CreateFormComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
