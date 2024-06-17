<template>
  <div>
    <header>
      <nav>
        <button class="nav-button" @click="showComponent('todos')">Todos</button>
        <button class="nav-button" @click="showComponent('post')">Post</button>
      </nav>
    </header>
    <ToDoList v-if="currentComponent === 'todos'" @todo-added="handleTodoAdded">
      <template v-slot:header>
        <span>Custom To-Do List Header</span>
      </template>
    </ToDoList>
    <div v-if="currentComponent === 'post'" class="post-section">
      <select v-model="selectedUserId" @change="fetchPosts">
        <option value="" disabled>Pilih pengguna</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <ul class="post-list">
        <li v-for="post in posts" :key="post.id" class="post-item">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ToDoList from "@/components/ToDoList";

export default {
  name: "App",
  components: {
    ToDoList,
  },
  data() {
    return {
      currentComponent: 'todos',
      users: [],
      posts: [],
      selectedUserId: "",
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    showComponent(component) {
      this.currentComponent = component;
    },
    async fetchUsers() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        this.users = await response.json();
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async fetchPosts() {
      if (this.selectedUserId) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`);
          this.posts = await response.json();
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      } else {
        this.posts = [];
      }
    },
    handleTodoAdded(todo) {
      console.log("Todo added:", todo);
    },
  },
};
</script>

<style>
header {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.nav-button {
  padding: 10px 20px;
  cursor: pointer;
  background-color: pink;
  border: none;
  color: white;
  border-radius: 5px;
  margin: 0 10px;
}

.nav-button:hover {
  background-color: #ff69b4;
}

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
