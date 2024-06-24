import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    users: [],
    posts: [],
    selectedUserId: ''
  }),
  actions: {
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
    setSelectedUserId(userId) {
      this.selectedUserId = userId;
    }
  }
});
