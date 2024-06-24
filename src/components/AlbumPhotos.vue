<template>
  <div class="photos-container">
    <h1 class="heading">Photos in Album {{ albumId }}</h1>
    <div class="photo-list">
      <div v-for="photo in photos" :key="photo.id" class="photo-item">
        <a :href="photo.url" target="_blank">
          <img :src="photo.thumbnailUrl" :alt="photo.title">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AlbumPhotos',
  props: ['albumId'],
  data() {
    return {
      photos: []
    };
  },
  async created() {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${this.albumId}`);
      this.photos = response.data;
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  }
};
</script>

<style scoped>
.photos-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.heading {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.photo-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.photo-item {
  text-align: center;
}

.photo-item img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
