<template>
  <div class="album-list-container">
    <h1 class="heading">Albums</h1>
    <div class="filter-container">
      <label for="userSelect" class="user-select-label">Pilih Pengguna:</label>
      <select id="userSelect" v-model="selectedUser" @change="filterAlbums" class="user-select">
        <option value="">Semua Pengguna</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
    </div>
    <div class="album-list">
      <div
        v-for="album in filteredAlbums"
        :key="album.id"
        class="album-item"
        @click="showPhotos(album.id)" 
      >
        <div class="album-info">
          <div class="album-id">{{ album.id }}</div>
          <div class="album-title">{{ album.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AlbumFoto',
  data() {
    return {
      selectedUser: '',
      users: [],
      albums: []
    };
  },
  computed: {
    filteredAlbums() {
      if (!this.selectedUser) {
        return this.albums;
      }
      return this.albums.filter(album => album.userId === parseInt(this.selectedUser));
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchAlbums() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        this.albums = response.data;
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    },
    showPhotos(albumId) {
      this.$router.push({ name: 'AlbumPhotos', params: { albumId } });
    }
  },
  mounted() {
    this.fetchUsers();
    this.fetchAlbums();
  }
};
</script>

<style scoped>
.album-list-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 50px;
  background-color: #ffe4e1;
  border-radius: 8px;
}

.heading {
  text-align: center;
  color: #333;
}

.filter-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.user-select-label {
  display: block;
  margin-right: 10px;
  color: #555;
  font-size: 16px;
  line-height: 40px;
}

.user-select {
  max-width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.album-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.album-item {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.album-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.album-info {
  display: flex;
  align-items: center;
}

.album-id {
  background-color: #ccc;
  padding: 10px;
  font-weight: bold;
  margin-right: 10px;
  border-radius: 4px;
}

.album-title {
  flex: 1;
  color: #333;
}
</style>
