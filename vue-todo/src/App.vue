<template>
  <div id="app">
    <TodoHeader />
    <TodoInput @addTodoItem="addOneItem"/>  <!-- @하위 컴포넌트에서 발생시킨 이벤트 이름="현재 컴포넌트 메서드명"-->
    <TodoList :todo-list="todoItems" @removeItem="removeOneItem" @toggleItem="toggleOneItem"/>
    <TodoFooter @clearAll="clearAllItems"/>
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
      addOneItem: function(todo) {
        const obj = {completed: false, item: todo};
        localStorage.setItem(todo, JSON.stringify(obj));
        this.todoItems.push(obj);
      },

      removeOneItem: function(todoItem, index) {
        localStorage.removeItem(todoItem);
        this.todoItems.splice(index, 1); 
      },

      toggleOneItem: function(todo, index) {
        // todo를 수정해서 todoItems에 반영하는건 좋지 못한 패턴 -> Vue가 감지하지 못함
        // 그래서 이 컨테이너 안에 있는 todoItems를 수정
        const current = this.todoItems[index];  
        current.completed = !current.completed;
        localStorage.setItem(current.item, JSON.stringify(current));  // 로컬 스토리지 update api 없음 -> 덮어쓰기
      },

      clearAllItems: function() {
        localStorage.clear();
        this.todoItems = [];
      }
    },
    
    created: function() {
      console.log('created');
      if (localStorage.length <= 0) return;
      for (let i = 0; i < localStorage.length; i++) {
          if (localStorage.key(i) === 'naveruserlocale') continue;
          // localStorage에서 key에 대한 value를 가져온다 -> 근데 JSON.stringify()로 Obj를 string으로 만들어서 넣는다.
          const str = localStorage.getItem(localStorage.key(i));
          // string을 다시 Object로 변환
          const obj = JSON.parse(str);
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