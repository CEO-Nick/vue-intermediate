<template>
    <div class="inputBox shadow">
        <!-- v-model: input에 입력된 값을 동적으로 vue 인스턴스 안에 매핑하는 역할 -->
         <!-- 화면에서의 데이터 변경과 Vue 인스턴스의 데이터 변경이 서로 동기화되어 있다 -->
          <!-- keyup.enter : input 박스에서 입력 후 엔터 눌렀을 때 동작할 메서드 -->
        <input type="text" v-model="newTodoItem" @keyup.enter="addTodo">
        <span class="addContainer" @click="addTodo">
            <i class="fas fa-plus addBtn"></i>
        </span>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                newTodoItem: ""     // input에 입력되는 텍스트 값을 저장할 변수
            }
        },
        methods: {
            addTodo: function() {
                if (this.newTodoItem === '') return;
                this.$emit('addTodoItem', this.newTodoItem);
                this.clearInput();
            },
            clearInput: function() {
                this.newTodoItem = '';
            }
        }
        
    }
</script>


<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
.closeModalBtn {
  color: #42b983;
}
</style>