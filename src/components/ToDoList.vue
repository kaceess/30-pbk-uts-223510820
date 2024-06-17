<template>
  <div class="container mt-4" style="max-width: 30em;">
    <div class="card shadow-lg bg-light">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <slot name="header">To-Do List</slot>
        <form @submit.prevent="addTodo" class="d-flex align-items-center">
          <input
            v-model="newTodo"
            type="text"
            class="form-control form-control-sm me-2"
            name="newTodo"
            id="newTodo"
            placeholder="Add a new task"
            required
          />
          <button
            class="btn btn-success btn-sm"
            type="submit"
            title="Add Todo"
          >
            <i class="bi bi-plus-lg"></i>
          </button>
        </form>
      </div>

      <div class="card-body">
        <div class="d-flex justify-content-between mb-3">
          <div>
            <button
              class="btn btn-outline-success btn-sm"
              @click="allDone"
              title="Mark all as done"
            >
              <i class="bi bi-check-all"></i>
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="allRemove"
              title="Remove all"
            >
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
          <div>
            <button
              class="btn btn-outline-info btn-sm"
              @click="toggleFilter('done')"
              title="Show checked tasks"
            >
              Checked
            </button>
            <button
              class="btn btn-outline-warning btn-sm"
              @click="toggleFilter('undone')"
              title="Show unchecked tasks"
            >
              Unchecked
            </button>
          </div>
        </div>

        <ul class="list-group list-group-flush">
          <li
            class="list-group-item d-flex align-items-center justify-content-between"
            v-for="(todo, index) in filteredTodos"
            :key="index"
            :class="{ 'text-muted': todo.done, 'text-decoration-line-through': todo.done }"
          >
            <div>
              <input
                class="form-check-input"
                type="checkbox"
                v-model="todo.done"
                :id="'todo-' + index"
              />
              <label
                class="ms-2"
                :for="'todo-' + index"
              >
                {{ todo.title }}
              </label>
            </div>
            <button
              @click="removeTodo(todo)"
              class="btn btn-danger btn-sm"
              title="Remove todo"
            >
              <i class="bi bi-trash-fill"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToDoList",
  props: {
    initialTodos: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      newTodo: "",
      todos: this.initialTodos,
      filter: null,
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        const todo = {
          title: this.newTodo,
          done: false,
        };
        this.todos.push(todo);
        this.newTodo = "";
        this.$emit('todo-added', todo);
      }
    },
    removeTodo(todo) {
      const index = this.todos.indexOf(todo);
      if (index >= 0) {
        this.todos.splice(index, 1);
      }
    },
    allDone() {
      this.todos.forEach((todo) => {
        todo.done = true;
      });
    },
    allRemove() {
      this.todos = [];
    },
    toggleFilter(type) {
      this.filter = this.filter === type ? null : type;
    },
  },
  computed: {
    filteredTodos() {
      if (this.filter === "done") {
        return this.todos.filter((todo) => todo.done);
      } else if (this.filter === "undone") {
        return this.todos.filter((todo) => !todo.done);
      } else {
        return this.todos;
      }
    },
  },
};
</script>

<style>
.text-decoration-line-through {
  text-decoration: line-through;
}

.card-header {
  font-size: 1.25em;
}

.list-group-item {
  transition: all 0.2s ease-in-out;
}

.list-group-item:hover {
  background-color: #f1f1f1;
}

.form-check-input {
  transform: scale(1.2);
}
</style>
