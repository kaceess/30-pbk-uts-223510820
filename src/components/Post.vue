<template>
  <div class="post-section">
    <!-- Select untuk memilih user -->
    <select v-model="selectedUser" @change="fetchPosts">
      <option value="" disabled selected>Pilih Pengguna</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>

    <!-- Daftar postingan -->
    <ul class="post-list">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PostComponent",

  data() {
    return {
      users: [],         // Inisialisasi users sebagai array kosong
      posts: [],
      selectedUser: null // Inisialisasi selectedUser sebagai null
    };
  },

  created() {
    // Fetch data saat komponen dibuat
    this.fetchUsers();
  },

  methods: {
    // Method untuk mengambil daftar user
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        this.users = data;

        // Set selectedUser default ke null atau option disabled
        this.selectedUser = ''; // Menggunakan string kosong untuk memilih opsi "Pilih Pengguna"
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },

    // Method untuk mengambil postingan berdasarkan user yang dipilih
    async fetchPosts() {
      if (!this.selectedUser) {
        return;
      }
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        this.posts = data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
  }
};
</script>

<style scoped>
.post-section {
  padding: 20px;
}

select {
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.post-list {
  list-style: none;
  padding: 0;
}

.post-item {
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 5px;
}

.post-item h3 {
  margin: 0;
  margin-bottom: 10px;
  color: #333;
}

.post-item p {
  margin: 0;
  color: #666;
}
</style>
