<template>
  <div class="home-container">
    <div class="welcome-container" v-if="isHomeRoute">
      <h1 class="welcome-message">˖𓍢ִ໋🌷𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐏𝐑𝐎𝐉𝐄𝐂𝐓 𝐔𝐀𝐒 𝐇𝐄𝐑𝐒𝐘𝐀✧🩷</h1>
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'HomeView',
  setup() {
    const route = useRoute()

    const isHomeRoute = computed(() => {
      return route.matched.some((record) => record.path === '/' || record.path === '/home')
    })

    return {
      isHomeRoute
    }
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  background-color: #ffe4e1;
}

.welcome-container {
  text-align: center;
  margin-top: 20%;
}

.welcome-message {
  font-size: 30px;
  color: #333;
  margin-top: 6rem;
  margin-bottom: 20px;
  font-style: italic; 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
</style>
