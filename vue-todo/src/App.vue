<template>
  <div id="app">
    <TodoHeader />
    <TodoInput @add-todo="addTodo"/>
    <TodoList :todo-list="todoItems" @remove-todo="removeTodo"/>
    <TodoFooter />
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';

  export default {
    name: 'App',

    components: {
      TodoHeader,
      TodoInput,
      TodoList,
      TodoFooter,
    },

    data: function() {
      return {
        todoItems: []
      }
    },

    methods: {
      addTodo: function(todo) {
        localStorage.setItem(todo, todo);
        this.todoItems.push(todo);
      },

      removeTodo: function(todoItem, index) {
        localStorage.removeItem(todoItem);
        this.todoItems.splice(index, 1); 
      }
    },
    
    created: function() {
      console.log('created');
      if (localStorage.length <= 0) return;
      for (var i = 0; i < localStorage.length; i++) {
          if (localStorage.key(i) === 'naveruserlocale') continue;
          this.todoItems.push(localStorage.key(i))
      }
    },

  }
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0,0,0,0.03);
}
</style>