<template>
  <div class="app-container">
    <!-- Navbar -->
    <header>
      <nav>
        <router-link to="/todos" class="nav-button">Todos</router-link>
        <router-link to="/post" class="nav-button">Post</router-link>
        <router-link to="/album" class="nav-button">Album Foto</router-link>
        <button class="nav-button back-button" @click="goBack">Kembali</button>
      </nav>
    </header>
    <!-- Dynamic Content -->
    <router-view />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from './stores/index'; 

export default {
  name: 'App',
  setup() {
    const store = useMainStore();
    const route = useRoute();
    const router = useRouter();

    const currentComponent = computed(() => route.path !== '/');

    store.fetchUsers();

    function goBack() {
      router.push('/');
    }

    return {
      store,
      currentComponent,
      goBack
    };
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.app-container {
  background-color: #ffe4e1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  width: 100%;
  background-color: #ffc0cb; 
  padding: 10px 0;
}

nav {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.nav-button {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #ff69b4; 
  border: none;
  color: white;
  border-radius: 5px;
  text-decoration: none; 
}

.nav-button:hover {
  background-color: #ff1493; 
}

.welcome-container {
  text-align: center;
  margin-top: 20%;
}

.welcome-message {
  font-size: 30px;
  color: #333;
  margin-bottom: 20px;
  font-style: italic; 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
}

.back-button {
  background-color: #ff69b4;
}

.back-button:hover {
  background-color: #ff1493;
}
</style>
