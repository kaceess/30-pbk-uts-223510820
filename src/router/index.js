import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import ToDoList from '@/components/ToDoList.vue';
import Post from '@/components/Post.vue';
import AlbumFoto from '@/components/AlbumFoto.vue';
import AlbumPhotos from '@/components/AlbumPhotos.vue'; // Perbaiki nama komponen import

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/todos', name: 'todolist', component: ToDoList },
  { path: '/post', name: 'post', component: Post },
  { path: '/album', name: 'album', component: AlbumFoto },
  {
    path: '/albums/:albumId',
    name: 'AlbumPhotos',
    component: AlbumPhotos, 
    props: true // Aktifkan properti untuk mengirimkan albumId sebagai properti komponen
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
