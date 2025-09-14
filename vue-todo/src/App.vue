<template>
  <div id="app">
    <TodoHeader />
    <!-- v-on:add-todo="addTodo"와 동일 -->
    <TodoInput @add-todo="addTodo"/>

    <!-- v-bind:todo-list="todoItems" 와 동일 -->
    <TodoList :todo-list="todoItems" @remove-todo="removeTodo" @toggle-complete="toggleComplete"/>
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
        var obj = {completed: false, item: todo};
        localStorage.setItem(todo, JSON.stringify(obj));
        this.todoItems.push(obj);
      },

      removeTodo: function(todoItem, index) {
        localStorage.removeItem(todoItem);
        this.todoItems.splice(index, 1); 
      },

      toggleComplete: function(todo, index) {
        var todoObj = JSON.parse(localStorage.getItem(todo));
        todoObj.completed = !todoObj.completed;

        // localStorage와 Array에 모두 반영하기
        localStorage.setItem(todo, JSON.stringify(todoObj));  // 로컬 스토리지 update api 없음 -> 덮어쓰기
        // this.todoItems[index] = todoObj; // 이렇게 하면 자동 반응이 안된다 (refresh 직접 해야 반영됨)
        this.$set(this.todoItems, index, todoObj);  // 이렇게 해야 Vue가 감지해서 자동 반응한다 (reactive)
      }
    },
    
    created: function() {
      console.log('created');
      if (localStorage.length <= 0) return;
      for (var i = 0; i < localStorage.length; i++) {
          if (localStorage.key(i) === 'naveruserlocale') continue;
          // localStorage에서 key에 대한 value를 가져온다 -> 근데 JSON.stringify()로 Obj를 string으로 만들어서 넣는다.
          var str = localStorage.getItem(localStorage.key(i));
          // string을 다시 Object로 변환
          var obj = JSON.parse(str);
          this.todoItems.push(obj);
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