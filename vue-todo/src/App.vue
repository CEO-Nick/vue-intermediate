<template>
  <div id="app">
    <TodoHeader/>
    <TodoInput/>  <!-- @하위 컴포넌트에서 발생시킨 이벤트 이름="현재 컴포넌트 메서드명"-->
    <TodoList/>
    <TodoFooter/>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';

// default는 1개 파일에서 1개만 export 가능 = 모듈화
export default {
  name: 'App',

  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
  },

  // data() {
  //   return {
  //     todoItems: []
  //   }
  // },

  // 전부 store로 넘어감!
  // methods: {
  //   addOneItem(todo) {
  //     const obj = {completed: false, item: todo};
  //     localStorage.setItem(todo, JSON.stringify(obj));
  //     this.todoItems.push(obj);
  //   },
  //
  //   removeOneItem(todoItem, index) {
  //     localStorage.removeItem(todoItem);
  //     this.todoItems.splice(index, 1);
  //   },
  //
  //   toggleOneItem(todo, index) {
  //     // todo를 수정해서 todoItems에 반영하는건 좋지 못한 패턴 -> Vue가 감지하지 못함
  //     // 그래서 이 컨테이너 안에 있는 todoItems를 수정
  //     const current = this.todoItems[index];
  //     current.completed = !current.completed;
  //     localStorage.setItem(current.item, JSON.stringify(current));  // 로컬 스토리지 update api 없음 -> 덮어쓰기
  //   },
  //
  //   clearAllItems() {
  //     localStorage.clear();
  //     this.todoItems = [];
  //   }
  // },
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
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>