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
import { useMainStore } from '@/stores/index'; // Pastikan path ke store benar

export default {
  name: 'App',
  setup() {
    const store = useMainStore();
    const route = useRoute();
    const router = useRouter();

    // Current component based on route
    const currentComponent = computed(() => route.path !== '/');

    // Fetch users when component is created
    store.fetchUsers();

    // Method to go back
    function goBack() {
      // Directly go to the initial page ("/")
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
  background-color: #ffe4e1; /* Latar belakang pink yang lembut */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  width: 100%;
  background-color: #ffc0cb; /* Warna pink untuk header */
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
  background-color: #ff69b4; /* Warna pink untuk tombol */
  border: none;
  color: white;
  border-radius: 5px;
  text-decoration: none; /* Hindari underline pada router-link */
}

.nav-button:hover {
  background-color: #ff1493; /* Warna pink lebih gelap untuk hover */
}

.welcome-container {
  text-align: center;
  margin-top: 20%;
}

.welcome-message {
  font-size: 30px;
  color: #333;
  margin-bottom: 20px;
  font-style: italic; /* Menerapkan gaya font menjadi italic */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Memilih font yang estetis */
}

.back-button {
  background-color: #ff69b4;
}

.back-button:hover {
  background-color: #ff1493;
}
</style>
